/// <reference path="ts-definitions\winrt.d.ts" />

declare module WinRSJS {
    module Collections {
        function createMap(keyType: string, valType: string): Windows.Foundation.Collections.IMap<any, any>;
    }
}
