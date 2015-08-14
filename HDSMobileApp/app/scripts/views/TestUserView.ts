"use strict";
import TestUserController = require("../controllers/TestUserController");

/**
 * @since 2015-8-11
 */
class TestUserView {
    private domContext: Element;
    private validateBtnListener;


    public static initView(appTools: Main) {
        var inst = new TestUserView();

        var domContext = appTools.getPageDocument().querySelector("#test-user-view");

        inst.domContext = domContext;

        var nameField = <HTMLInputElement>domContext.querySelector(".user-name-input.text-field");
        var resultElem = <HTMLSpanElement>domContext.querySelector(".user-name-result");

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
    }


    public static deregister(appTools: Main, view: TestUserView) {
        view.domContext.querySelector(".validate-user-name.btn").removeEventListener("click", view.validateBtnListener);
        view.domContext = null;
        view.validateBtnListener = null;
    }

}

export = TestUserView;