"use strict";
var TestUserController = require("../controllers/TestUserController");
/**
 * @since 2015-8-11
 */
var TestUserView = (function () {
    function TestUserView() {
    }
    TestUserView.newView = function (model, domContext) {
        var inst = new TestUserView();
        inst.model = model;
        inst.domContext = domContext;
        var nameField = domContext.querySelector(".user-name-input.text-field");
        var resultElem = domContext.querySelector(".user-name-result");
        function validateBtnListener(evt) {
            var userName = (nameField.value || "").trim();
            resultElem.textContent = "Loading...";
            TestUserController.isValidUserByName(userName).done(function (success) {
                resultElem.textContent = success ? "found user '" + encodeURIComponent(userName) + "'" : "could not find user '" + encodeURIComponent(userName) + "'";
            }, function (err) {
                resultElem.textContent = "failed to validate user name: " + err;
            });
        }
        domContext.querySelector(".validate-user-name.btn").addEventListener("click", validateBtnListener);
        inst.validateBtnListener = validateBtnListener;
        return inst;
    };
    TestUserView.deregister = function (view) {
        view.domContext.querySelector(".validate-user-name.btn").removeEventListener("click", view.validateBtnListener);
        view.domContext = null;
        view.model = null;
        view.validateBtnListener = null;
    };
    return TestUserView;
})();
module.exports = TestUserView;