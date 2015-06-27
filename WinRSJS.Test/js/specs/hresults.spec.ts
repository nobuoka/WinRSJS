/// <reference path="..\..\..\WinRSJS.TypeScript\winrsjs.ts" />

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

describe("`WinRSJS.HResults.convertHResultStyleFromInt32To8DigitHexStr` function", () => {

    var expect = chai.expect;

    it("converts HResult value which evaluated as an signed 32-bit integer to an eight-digit hexadecimal string.", () => {
        var hresultVal = WinRSJS.HResults.INET_E_CANNOT_CONNECT;
        chai.assert.strictEqual(hresultVal, -2146697212);

        var hresultHexStr = WinRSJS.HResults.convertHResultStyleFromInt32To8DigitHexStr(hresultVal);
        chai.assert.strictEqual(hresultHexStr, "800C0004");

        var hresultHexStr = WinRSJS.HResults.convertHResultStyleFromInt32To8DigitHexStr(0);
        chai.assert.strictEqual(hresultHexStr, "00000000");

        var hresultHexStr = WinRSJS.HResults.convertHResultStyleFromInt32To8DigitHexStr(1);
        chai.assert.strictEqual(hresultHexStr, "00000001");
    });

});
