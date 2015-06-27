/// <reference path="..\..\WinRSJS.TypeScript\ts-definitions\winrt.d.ts" />
/// <reference path="..\..\WinRSJS.TypeScript\winrsjs.ts" />
/// <reference path="..\ts-definitions\winjs.d.ts" />
/// <reference path="..\ts-definitions\mocha.d.ts" />

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

// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    mocha.setup("bdd");
    function runSpecs() {
        mocha.run();
    }

    app.addEventListener("error", (args: CustomEvent) => {
        var errorsList = document.querySelector("#errors ul");
        var errorEl = document.createElement("li");
        errorEl.innerText = JSON.stringify(args.detail.exception);
        errorsList.appendChild(errorEl);

        (<HTMLElement>document.querySelector("#errors")).style.display = "block";
        // By returning true, we signal that the exception was handled,
        // preventing the application from being terminated
        return true;
    });

    app.addEventListener("activated", (args) => {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // This application has been newly launched. Initialize
                // your application here.
            } else {
                // This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll().then(() => {

                runSpecs();

            }));
        }
    });

    app.addEventListener("checkpoint", (args: CustomEvent) => {
        // This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    });

    app.start();
})();
