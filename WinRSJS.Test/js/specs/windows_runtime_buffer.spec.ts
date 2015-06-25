/// <reference path="..\..\..\WinRSJS.TypeScript\ts-definitions\winrt.d.ts" />
/// <reference path="..\..\..\WinRSJS.TypeScript\winrsjs.ts" />

/// <reference path="..\..\ts-definitions\mocha.d.ts" />
/// <reference path="..\..\ts-definitions\chai.d.ts" />

describe("`WinRSJS.WindowsRuntimeBuffer.create` function",() => {

    var expect = chai.expect;

    it("creates a IBuffer object.", () => {
        var buffer = WinRSJS.WindowsRuntimeBuffer.create(128);
        chai.assert.strictEqual(buffer.length, 0, "Initial length is zero.");
        chai.assert.strictEqual(buffer.capacity, 128, "The capacity is a specified value.");
    });

});
