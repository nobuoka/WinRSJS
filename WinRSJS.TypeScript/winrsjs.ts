declare module WinRSJS {
    module Collections {
        function createMap(keyType: string, valType: string): Windows.Foundation.Collections.IMap<any, any>;
    }
}

module WinRSJS {
    export var log: { (msg: string, tags: string, type: string): void; } = () => {};
}

module WinRSJS.HResults {
    //#region HResult values
    // HResult values, which are evaluated as an signed 32-bit integer.

    export var INET_E_CANNOT_CONNECT = (0x800C0004 | 0);
    export var INET_E_RESOURCE_NOT_FOUND = (0x800C0005 | 0);

    //#endregion HResult values

    /**
     * Converts an HResult value which was evaluated as an signed 32-bit integer to an eight-digit hexadecimal string.
     * Capital letters are used for alphabets in the hexadecimal string.
     */
    export function convertHResultStyleFromInt32To8DigitHexStr(int32HResult: number): string {
        // Evaluates `int32HResult` as an unsigned 32-bit integer, then convert it to a hexadecimal string,
        // because `int32HResult` is a HResult value, which was evaluated as an signed 32-bit integer.
        var hresultHexStr = (int32HResult < 0 ? ((int32HResult & 0x7FFFFFFF) + 0x80000000) : int32HResult).toString(16);
        // Made an eight-digit number, it may be padded by zero.
        return ("0000000" + hresultHexStr).substring(hresultHexStr.length - 1).toUpperCase();
    }
}

module WinRSJS.HttpUtils {
    var Http = Windows.Web.Http;
    var Uri = Windows.Foundation.Uri;

    export interface HttpContent {
        type: Windows.Web.Http.Headers.HttpMediaTypeHeaderValue;
        data: Windows.Storage.Streams.IBuffer;
    }

    export interface HttpError extends Error {
        statusCode: number;
        content: HttpContent;
    }

    export interface ClientError extends Error {
        sourceError: Error;
    }

    export function readContentAsync(content: Windows.Web.Http.IHttpContent): Windows.Foundation.IPromise<HttpContent> {
        return content.readAsBufferAsync().then((buffer) => {
            return {
                type: content.headers.contentType,
                data: buffer,
            };
        });
    }

    export function postWwwFormUrlEncodedContent(uriStr: string, data: { [key: string]: string; }): Windows.Foundation.IPromise<HttpContent> {
        var reqMethod = Http.HttpMethod.post;
        var uri = new Uri(uriStr);
        var httpClient = new Http.HttpClient();
        var req = new Http.HttpRequestMessage(reqMethod, uri);
        req.content = __constructRequestContent(data);
        var res: Windows.Web.Http.HttpResponseMessage;
        var p = httpClient.sendRequestAsync(req).then((r) => {
            res = r;
            if (r.statusCode === Http.HttpStatusCode.ok) {
                return readContentAsync(r.content);
            } else {
                return readContentAsync(r.content).then<any>((content) => {
                    var err = <HttpError>Object.create(Error, {
                        statusCode: { value: r.statusCode },
                    });
                    err.name = "HttpError";
                    err.message = "Failed to request post message. (status code: " + r.statusCode + ")";
                    err.content = content;
                    throw err;
                });
            }
        }, <any>((e: any) => {
            var err = <ClientError>Object.create(Error, {
                sourceError: { value: e },
            });
            err.name = "ClientError";
            err.message = "Failed to connect.";
            throw err;
        }));
        // finally
        p.then(null, () => {}).then(() => {
            if (res) res.close();
            req.close();
            httpClient.close();
        });
        return p;
    }

    function __constructRequestContent(reqBodyObj: { [key: string]: string; }): Windows.Web.Http.HttpFormUrlEncodedContent {
        var map = WinRSJS.Collections.createMap("System.String", "System.String");
        Object.keys(reqBodyObj).forEach((k) => { map.insert(k, reqBodyObj[k]) });
        return new Http.HttpFormUrlEncodedContent(map);
    }
}

module WinRSJS.GoogleAnalytics {
    export class ScreenInfoAccessors {
        getScreenHeight(): number {
            return screen.height;
        }
        getScreenWidth(): number {
            return screen.width;
        }
        getViewportHeight(): number {
            return document.documentElement.clientHeight;
        }
        getViewportWidth(): number {
            return document.documentElement.clientWidth;
        }
    }

    export class GAClient {
        private _trackingId: string;
        private _appName: string;
        private _appVersion: string;
        private _clientId: string;
        private _isAvailable = true;
        private _collectUri = "http://www.google-analytics.com/collect";

        postWwwFormUrlEncodedContent: { (uriStr: string, data: { [key: string]: string; }): Windows.Foundation.IPromise<WinRSJS.HttpUtils.HttpContent>; };
        screeenInfoAccessors: ScreenInfoAccessors;

        constructor(trackingId: string, appName: string, appVersion: string, clientId: string) {
            this._trackingId = trackingId;
            this._appName = appName;
            this._appVersion = appVersion;
            this._clientId = clientId;

            this.postWwwFormUrlEncodedContent = WinRSJS.HttpUtils.postWwwFormUrlEncodedContent;
            this.screeenInfoAccessors = new ScreenInfoAccessors();
        }

        updateAvailability(isAvailable: boolean) {
            this._isAvailable = isAvailable;
            WinRSJS.log("update availability: " + this._isAvailable, "analytics", "debug");
        }

        updateClientId(clientId: string) {
            this._clientId = clientId;
        }

        sendAppview(screenName: string, opts?: { newSession?: boolean; }) {
            if (!opts) opts = {};
            var data = <{ [key: string]: string; }>{
                v: "1",                // Version.
                tid: this._trackingId, // Tracking ID / Web property / Property ID.
                cid: this._clientId,   // Anonymous Client ID.

                t: "appview",          // Appview hit type.
                an: this._appName,     // App name.
                av: this._appVersion,  // App version.
                cd: screenName,        // Screen name / content description.

                sr: this.__getScreenResolution(),
                vp: this.__getViewportSize(),
            };
            if (opts.newSession) data["sc"] = "start";
            this.__sendData(data);
        }

        sendEvent(category: string, action: string, label?: string, value?: number) {
            var data = <{ [key: string]: string; }>{
                v: "1",                // Version.
                tid: this._trackingId, // Tracking ID / Web property / Property ID.
                cid: this._clientId,   // Anonymous Client ID.

                t: "event",            // Event hit type.
                an: this._appName,     // App name.
                av: this._appVersion,  // App version.
            };
            if (category) data["ec"] = category;
            if (action) data["ea"] = action;
            if (label) data["el"] = label;
            if (value !== undefined) {
                // Event value must be non-negative integer.
                // See: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ev
                if (value >= 0) {
                    data["ev"] = String(Math.floor(value));
                }
            }
            this.__sendData(data);
        }

        private __sendData(data: { [key: string]: string; }): void {
            if (!this._isAvailable) {
                WinRSJS.log("Not sending data because of being disabled", "analytics", "info");
                return;
            }

            this.postWwwFormUrlEncodedContent(this._collectUri, data).then((res) => {
                WinRSJS.log("Success on sending data", "analytics", "debug");
            }, (err) => {
                if (err.name === "HttpError") {
                    var httpError = <WinRSJS.HttpUtils.HttpError>err;
                    WinRSJS.log("Error on sending data (status code: " + httpError.statusCode + ")", "analytics", "error");
                } else if (err.name === "ClientError") {
                    var clientError = <WinRSJS.HttpUtils.ClientError>err;
                    // See: https://msdn.microsoft.com/ja-jp/library/windows/apps/dn263211.aspx
                    var sourceError = clientError.sourceError;
                    var hresult = (<any>sourceError).number;
                    var hresultHexStr = "0x" + WinRSJS.HResults.convertHResultStyleFromInt32To8DigitHexStr(hresult);
                    if (hresult === WinRSJS.HResults.INET_E_RESOURCE_NOT_FOUND ||
                        hresult === WinRSJS.HResults.INET_E_CANNOT_CONNECT) {
                        WinRSJS.log("Cannot connect to the server", "analytics", "error");
                    } else {
                        WinRSJS.log("Failed to connect: " + hresultHexStr, "analytics", "error");
                    }
                } else {
                    WinRSJS.log("Unknown error: " + err, "analytics", "error");
                }
            });
        }

        private __getScreenResolution(): string {
            return this.screeenInfoAccessors.getScreenWidth() + "x" + this.screeenInfoAccessors.getScreenHeight();
        }

        private __getViewportSize(): string {
            return this.screeenInfoAccessors.getViewportWidth() + "x" + this.screeenInfoAccessors.getViewportHeight();
        }
    }
}
