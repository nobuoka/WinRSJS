/// <reference path="..\..\..\WinRSJS.TypeScript\ts-definitions\winrt.d.ts" />
/// <reference path="..\..\..\WinRSJS.TypeScript\built\winrsjs.d.ts" />

/// <reference path="..\..\ts-definitions\winjs.d.ts" />
/// <reference path="..\..\ts-definitions\mocha.d.ts" />
/// <reference path="..\..\ts-definitions\chai.d.ts" />

/*
Copyright 2015 Yu Nobuoka

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

class ScreenInfoAccessorsMock {
    private _vals: { sh: number; sw: number; vh: number; vw: number };
    constructor(vals: { sh: number; sw: number; vh: number; vw: number }) {
        this._vals = vals;
    }
    getScreenHeight(): number {
        return this._vals.sh;
    }
    getScreenWidth(): number {
        return this._vals.sw;
    }
    getViewportHeight(): number {
        return this._vals.vh;
    }
    getViewportWidth(): number {
        return this._vals.vw;
    }
}

describe("`WinRSJS.GoogleAnalytics.GAClient` object", () => {

    var expect = chai.expect;

    var analyticsCollectUri = "http://www.google-analytics.com/collect";

    var gaClient = new WinRSJS.GoogleAnalytics.GAClient("test_tracking_id", "test_app_name", "test_app_version", "test_client_id");
    var postWwwFormUrlEncodedContentCalled = <[string, { [key: string]: string }][]>[];
    gaClient.postWwwFormUrlEncodedContent = (uri: string, data: { [key: string]: string }) => {
        postWwwFormUrlEncodedContentCalled.push([uri, data]);
        return WinJS.Promise.wrap({
            type: new Windows.Web.Http.Headers.HttpMediaTypeHeaderValue("text/plain"),
            data: WinRSJS.WindowsRuntimeBuffer.create(0),
        });
    };
    gaClient.screeenInfoAccessors = new ScreenInfoAccessorsMock({ sw: 640, sh: 480, vw: 320, vh: 240 });

    describe("`sendAppview` method", () => {
        it("sends post request to API of Google Analytics.", () => {
            postWwwFormUrlEncodedContentCalled = [];
            gaClient.sendAppview("test_screen_name_1");
            chai.assert.deepEqual(postWwwFormUrlEncodedContentCalled, [[analyticsCollectUri, {
                v: "1",
                tid: "test_tracking_id",
                cid: "test_client_id",
                t: "appview",
                an: "test_app_name",
                av: "test_app_version",
                cd: "test_screen_name_1",
                sr: "640x480",
                vp: "320x240",
            }]]);
        });

        it("sends post request including new session option.", () => {
            postWwwFormUrlEncodedContentCalled = [];
            gaClient.sendAppview("test_screen_name_2", { newSession: true });
            chai.assert.deepEqual(postWwwFormUrlEncodedContentCalled, [[analyticsCollectUri, {
                v: "1",
                tid: "test_tracking_id",
                cid: "test_client_id",
                t: "appview",
                an: "test_app_name",
                av: "test_app_version",
                cd: "test_screen_name_2",
                sr: "640x480",
                vp: "320x240",
                sc: "start",
            }]]);
        });

        it("sends post request excluding new session option.", () => {
            postWwwFormUrlEncodedContentCalled = [];
            gaClient.sendAppview("test_screen_name_3", { newSession: false });
            chai.assert.deepEqual(postWwwFormUrlEncodedContentCalled, [[analyticsCollectUri, {
                v: "1",
                tid: "test_tracking_id",
                cid: "test_client_id",
                t: "appview",
                an: "test_app_name",
                av: "test_app_version",
                cd: "test_screen_name_3",
                sr: "640x480",
                vp: "320x240",
            }]]);
        });
    });

    describe("`sendEvent` method", () => {
        it("sends post request to API of Google Analytics.", () => {
            postWwwFormUrlEncodedContentCalled = [];
            gaClient.sendEvent("test_category_1", "test_action_1");
            chai.assert.deepEqual(postWwwFormUrlEncodedContentCalled, [[analyticsCollectUri, {
                v: "1",
                tid: "test_tracking_id",
                cid: "test_client_id",
                t: "event",
                an: "test_app_name",
                av: "test_app_version",
                ec: "test_category_1",
                ea: "test_action_1",
            }]]);
        });

        it("sends post request including event label.", () => {
            postWwwFormUrlEncodedContentCalled = [];
            gaClient.sendEvent("test_category_2", "test_action_2", "test_label_2");
            chai.assert.deepEqual(postWwwFormUrlEncodedContentCalled, [[analyticsCollectUri, {
                v: "1",
                tid: "test_tracking_id",
                cid: "test_client_id",
                t: "event",
                an: "test_app_name",
                av: "test_app_version",
                ec: "test_category_2",
                ea: "test_action_2",
                el: "test_label_2",
            }]]);
        });

        it("sends post request including event value.", () => {
            postWwwFormUrlEncodedContentCalled = [];
            gaClient.sendEvent("test_category_3", "test_action_3", "test_label_3", 0);
            chai.assert.deepEqual(postWwwFormUrlEncodedContentCalled, [[analyticsCollectUri, {
                v: "1",
                tid: "test_tracking_id",
                cid: "test_client_id",
                t: "event",
                an: "test_app_name",
                av: "test_app_version",
                ec: "test_category_3",
                ea: "test_action_3",
                el: "test_label_3",
                ev: "0",
            }]]);
        });
    });

});
