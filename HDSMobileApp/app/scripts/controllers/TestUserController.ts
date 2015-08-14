"use strict";
import Defer = require("../modules/Defer");
import Services = require("../modules/services/Services");

/** Example controller
 * @since 2015-8-11
 */
class TestUserController {

    /** Check if a user name is valid against a service
     */
    public static isValidUserByName(userName: string): PsPromise<boolean, void> {
        var dfd = Defer.newDefer<PsDeferred<boolean, void>>();

        Services.UserMaster.search({}).done(function (res) {
            var users: any[] = res.result.Items;

            console.log("user search done: ", users);

            var foundMatch = false;
            var matchingUser = null;

            for (var i = 0, size = users.length; i < size; i++) {
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
    }

}

export = TestUserController;
