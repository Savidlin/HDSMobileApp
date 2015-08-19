"use strict";
var Services = require("../services/Services");
/** Example controller
 * @since 2015-8-11
 */
var TestUserController = (function () {
    function TestUserController() {
    }
    TestUserController.prototype.initView = function (appTools, ngApp) {
        var inst = new TestUserController();
        var domContext = appTools.getPageDocument().querySelector("#test-user-view");
        inst.domContext = domContext;
        var nameField = domContext.querySelector(".user-name-input.text-field");
        var resultElem = domContext.querySelector(".user-name-result");
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
    };
    TestUserController.prototype.deregister = function (appTools, view) {
        view.domContext.querySelector(".validate-user-name.btn").removeEventListener("click", view.validateBtnListener);
        view.domContext = null;
        view.validateBtnListener = null;
    };
    /** Check if a user name is valid against a service
     */
    TestUserController.isValidUserByName = function (userName, $http) {
        return Services.Employee.search($http, {}, {}).then(function (res) {
            var users = res.Items;
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
    };
    return TestUserController;
})();
module.exports = TestUserController;
