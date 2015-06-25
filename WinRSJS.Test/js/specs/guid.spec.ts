/// <reference path="..\..\..\WinRSJS.TypeScript\ts-definitions\winrt.d.ts" />
/// <reference path="..\..\..\WinRSJS.TypeScript\winrsjs.ts" />

/// <reference path="..\..\ts-definitions\mocha.d.ts" />
/// <reference path="..\..\ts-definitions\chai.d.ts" />

describe("`WinRSJS.Guid.newGuid` function",() => {

    var expect = chai.expect;

    it("creates a GUID string.", () => {
        var guid = WinRSJS.Guid.newGuid();
        chai.assert.typeOf(guid, "string", "The value is a string.");
        chai.assert.match(guid, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
    });

});
