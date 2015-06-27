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
