/// <reference path="..\..\..\WinRSJS.TypeScript\ts-definitions\winrt.d.ts" />
/// <reference path="..\..\..\WinRSJS.TypeScript\built\winrsjs.d.ts" />

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

describe("`WinRSJS.Guid.newGuid` function",() => {

    var expect = chai.expect;

    it("creates a GUID string.", () => {
        var guid = WinRSJS.Guid.newGuid();
        chai.assert.typeOf(guid, "string", "The value is a string.");
        chai.assert.match(guid, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
    });

});
