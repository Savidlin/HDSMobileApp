"use strict";
import Defer = require("../modules/Defer");
import Services = require("../services/Services");

/** Example controller
 * @since 2015-8-11
 */
class TestUserController {
    private domContext: Element;
    private validateBtnListener;


    public initView(appTools: Main, ngApp: ng.IModule) {
        var inst = new TestUserController();

        var domContext = appTools.getPageDocument().querySelector("#test-user-view");

        inst.domContext = domContext;

        var nameField = <HTMLInputElement>domContext.querySelector(".user-name-input.text-field");
        var resultElem = <HTMLSpanElement>domContext.querySelector(".user-name-result");

        function validateBtnListener(evt) {
            var userName = (nameField.value || "").trim();

            resultElem.textContent = "Loading...";

            TestUserController.isValidUserByName(userName, null).then(function (success) {
                resultElem.textContent = success ? "found user '" + encodeURIComponent(userName) + "'" : "could not find user '" + encodeURIComponent(userName) + "'";
            }, function (err) {
                resultElem.textContent = "failed to validate user name: " + err;
            });
        }

        domContext.querySelector(".validate-user-name.btn").addEventListener("click", validateBtnListener);

        inst.validateBtnListener = validateBtnListener;

        return inst;
    }


    public deregister(appTools: Main, view: TestUserController) {
        view.domContext.querySelector(".validate-user-name.btn").removeEventListener("click", view.validateBtnListener);
        view.domContext = null;
        view.validateBtnListener = null;
    }


    /** Check if a user name is valid against a service
     */
    public static isValidUserByName(userName: string, $http: angular.IHttpService): PsPromise<boolean, void> {
        return Services.Employee.search($http, {}, {}).then(function (res) {
            var users: any[] = res.Items;

            console.log("employee search done: ", users);

            var foundMatch = false;
            var matchingUser = null;

            for (var i = 0, size = users.length; i < size; i++) {
                if (users[i].businessEntityId === userName) {
                    matchingUser = users[i];
                    foundMatch = true;
                }
            }
            return true;
        });
    }

}

export = TestUserController;
