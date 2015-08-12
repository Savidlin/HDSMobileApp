"use strict";
var Defer = require("../modules/Defer");
var Services = require("../modules/services/Services");
/** Example controller
 * @since 2015-8-11
 */
var TestUserController = (function () {
    function TestUserController() {
    }
    /** Check if a user name is valid against a service
     */
    TestUserController.isValidUserByName = function (userName) {
        var dfd = Defer.newDefer();
        Services.UserMaster.search({}).done(function (res) {
            var users = res.result.Items;
            console.log("user search done: ", users);
            var foundMatch = false;
            var matchingUser = null;
            for (var i = 0, size = users.length; i < size; i++) {
                console.log("names match: ", users[i].Name, " = ", userName, " : ", (users[i].Name === userName));
                if (users[i].Name === userName) {
                    matchingUser = users[i];
                    foundMatch = true;
                }
            }
            dfd.resolve(foundMatch);
        }, function (err) {
            dfd.reject(null);
        });
        return dfd.promise;
    };
    return TestUserController;
})();
module.exports = TestUserController;
