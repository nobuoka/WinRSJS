/// <reference path="..\..\ts-definitions\mocha.d.ts" />
/// <reference path="..\..\ts-definitions\chai.d.ts" />

describe("`WinRSJS.Collections.createMap` function",() => {

    var expect = chai.expect;

    it("creates `Windows.Foundation.Collections.IMap` object when correct parameters are passed.", () => {
        var map = <Windows.Foundation.Collections.IMap<string, string>>WinRSJS.Collections.createMap("System.String", "System.String");
        chai.assert.doesNotThrow(() => {
            new Windows.Web.Http.HttpFormUrlEncodedContent(map);
        }, "The `map` value is a `Windows.Foundation.Collections.IMap<string, string>` object.");
    });

    it("throws error when invalid key type name is passed as parameter.",() => {
        chai.assert.throw(() => {
            <Windows.Foundation.Collections.IMap<string, string>>WinRSJS.Collections.createMap("string", "System.String");
        }, /System\.ArgumentException.+Key type name `string` is invalid\./);
    });

    it("throws error when invalid value type name is passed as parameter.",() => {
        chai.assert.throw(() => {
            <Windows.Foundation.Collections.IMap<string, string>>WinRSJS.Collections.createMap("System.String", "string");
        }, /System\.ArgumentException.+Value type name `string` is invalid\./);
    });

});
