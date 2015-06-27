/// <reference path="..\..\..\WinRSJS.TypeScript\ts-definitions\winrt.d.ts" />
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

describe("`WinRSJS.WindowsRuntimeBuffer.create` function",() => {

    var expect = chai.expect;

    it("creates a IBuffer object.", () => {
        var buffer = WinRSJS.WindowsRuntimeBuffer.create(128);
        chai.assert.strictEqual(buffer.length, 0, "Initial length is zero.");
        chai.assert.strictEqual(buffer.capacity, 128, "The capacity is a specified value.");
    });

});
