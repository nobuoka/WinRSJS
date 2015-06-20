/// <reference path="..\..\..\WinRSJS.TypeScript\winrsjs.ts" />

/// <reference path="..\..\ts-definitions\mocha.d.ts" />
/// <reference path="..\..\ts-definitions\chai.d.ts" />

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
