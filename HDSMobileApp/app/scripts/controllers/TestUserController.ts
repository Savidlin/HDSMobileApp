"use strict";
import Defer = require("../modules/Defer");
import Services = require("../modules/services/Services");

/** Example controller
 * @since 2015-8-11
 */
class TestUserController {

    /** Check if a user name is valid against a service
     */
    public static isValidUserByName(userName: string, $http: angular.IHttpService): angular.IPromise<boolean> {
        return Services.Employee.search($http, {}, {}).success(function (res) {
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
