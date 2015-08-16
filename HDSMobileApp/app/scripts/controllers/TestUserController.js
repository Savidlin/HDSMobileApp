"use strict";
var Services = require("../modules/services/Services");
/** Example controller
 * @since 2015-8-11
 */
var TestUserController = (function () {
    function TestUserController() {
    }
    /** Check if a user name is valid against a service
     */
    TestUserController.isValidUserByName = function (userName, $http) {
        return Services.Employee.search($http, {}, {}).success(function (res) {
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
