/// <reference path="../tsDefinitions/lib/jquery/jquery.d.ts" />
/// <reference path="../tsDefinitions/lib/jquery/jqueryui.d.ts" />
"use strict";
import Ps = require("../modules/main");

interface DialogOptions {
    name?;
    id?;
    close?;
    callback?;
    width?;
    maxWidth?;
}

/** Dialogs namespace
 * for managing, showing, and closing UI dialog boxes
 * @since 2015-1-9
 */

class Dialogs {

    static showDbSaveDialog(message?: string): JQuery {
        var dlg = Dialogs.openDialogNoCloseNoOK(message || "Please wait while data is saved...");
        return dlg;
    }


    static closeDbSaveDialog(dlg: JQuery) {
        Dialogs.closeDialogNoCloseNoOK();
    }


<<<<<<< HEAD
=======
    
>>>>>>> 7327ba2f17bd0ba8249fe662956814e1b53f2235
    static openDialogOk(title: string, message: string, callback?: () => void): JQuery {
        var dlg = Dialogs.openDialog(message, callback);
        dlg.dialog("option", "title", title || "");
        return dlg;
    }


    /** open dialog with message
     * @param {String} message the text to display in the dialog
     * @param {Function()} callback the function to call when the dialog is closed
     */
    //static openDialog(message: (index: number, oldHtml: string) => string, callback): JQuery;
    static openDialog(message: string, callback?: () => void): JQuery {
        var dlg = Ps.getJQueryContext().find("#dialog");
        //dlg.dialog("close");
        dlg.find("p").html(message);
        if (dlg.find("button").length === 0 && dlg.find(".light-button").length === 0) {
            dlg.append("<div style='text-align: center;'>" +
                "<button style='padding: 5px; text-align:center; margin-top: 25px; display:inline-block; width: 50px;'>Ok</button></div>");

            var btn = dlg.find("button");
            var btnCb = function openDialogCallback() {
                btn.off("click", btnCb);
                if (callback) {
                    callback();
                }
                dlg.dialog("close");
            };
            btn.on("click", btnCb);

            dlg.dialog("option", "title", '');
        }
        dlg.dialog("open");
        return dlg;
    }


    /** Create a popup dialog box with the specified title and message.
     * For example:
     * opeDialogWithTitle("Title", "Would you like to saving this very important data?", [{
     *   id: "submitButton",
     *   name: "Confirm Submission",
     *   close: true,
     *   callback: function () { ... }
     * }, {
     *   // optional: id: "saveLocallyButton",
     *   name: "Update Info, but Don't Submit",
     *   close: true,
     *   callback: function () { ... }
     * }])
     *
     * @param {String} title: the title of the popup box
     * @param {String} message: the message in the popup box
     * @param {Function()|Array} callback: a function to call when one of the popup box's buttons is clicked,
     * or an array of objects with:
     * {String} ['id'] the optional HTML id="" to assign to the button
     * {String} 'name' text to display on button, maybe be HTML
     * {Function} 'callback' call this function when the button is activated
     * {Boolean} 'close' close the dialog when this button is activated
     * properties that represent the button names, callbacks, and button actions for each button to add to the dialog
     * @param {Object} [dialogOptions]: an list of optional properties to pass to the jQuery UI dialog that is created, for example 'minWidth' or 'buttons'
     */
    //static openDialogWithTitle(title: string, (index: number, oldHtml: string) => string, callback, dialogOptions): JQuery;
    static openDialogWithTitle(title: string, message: string, callback?: (() => void) | DialogOptions[], dialogOptions?: DialogOptions): JQuery {
        var dlg = Ps.getJQueryContext().find("#dialog-with-title");
        //dlg.dialog("close");
        dlg.html("<p></p>");
        dlg.find("p").html(message);
        // setup buttons
        if (Array.isArray(callback)) {
            var buttons: DialogOptions[] = <DialogOptions[]>callback;
            var buttonsHtml = ["<div style='text-align: center;'>"];
            for (var i = 0, size = buttons.length; i < size; i++) {
                buttonsHtml.push("<button id='" + (buttons[i].id ? buttons[i].id : "dialogWithTitleButton" + i) + "' style='padding: 5px; margin: 5px; text-align:center; margin-top: 25px; display:inline-block; " +
                    "min-width: " + (buttons[i].width ? buttons[i].width : "40px; ") + "max-width: " + (buttons[i].maxWidth ? buttons[i].maxWidth : "120px") + "'>" +
                    buttons[i].name + "</button>");
            }
            buttonsHtml.push("</div>");
            dlg.append(buttonsHtml.join("\n"));
            for (var i = 0, size = buttons.length; i < size; i++) {
                var btn = dlg.find("#" + (buttons[i].id ? buttons[i].id : "dialogWithTitleButton" + i));

                var btnCb = (function (buttonObj, btn) {
                    var cbFunc = function openDialogWithTitleCallback1() {
                        if (buttonObj.close) {
                            dlg.dialog("close");
                        }
                        if (buttonObj.callback) {
                            buttonObj.callback();
                        }
                        btn.off("click", cbFunc);
                    };
                    return cbFunc;
                } (buttons[i], btn));

                btn.on("click", btnCb);
            }
        }
        else {
            dlg.append("<div style='text-align: center;'>" +
                "<button style='padding: 5px; text-align:center; margin-top: 25px; display:inline-block; width: 50px;'>" +
                "Ok" + "</button>" +
                "</div>");
            var btn = dlg.find("button");
            var btnCb = function openDialogWithTitleCallback2() {
                if (callback) {
                    (<() => void>callback)();
                }
                dlg.dialog("close");
                btn.off("click", btnCb);
            };
            btn.on("click", btnCb);
        }
        dlg.dialog("option", "title", title);
        if (dialogOptions) {
            dlg.dialog(dialogOptions);
        }
        dlg.dialog("open");
        return dlg;
    }


    /** open dialog box with message and ok and cancel buttons
     * @param {String} message the text to display in the dialog
     * @param {Function()} okayCallback a parameterless function. If the dialog has a default
     * "Ok" button, this function is called when the user clicks on that "Ok" button
     * @param {Function()} cancelCallback a parameterless function. If the dialog has a default
     * "Cancel" or exit button, this function is called when the user clicks on that "Cancel" or exit button
     */
    //static openDialogOkCancel(message: (index: number, oldHtml: string) => string, okayCallback: () => void, cancelCallback: () => void): JQuery
    static openDialogOkCancel(message: string, okayCallback?: () => void, cancelCallback?: () => void): JQuery {
        var dlg = Ps.getJQueryContext().find("#dialog-ok-cancel");
        dlg.dialog("close");
        dlg.find("p").html(message);
        var clickedOk = function () {
            if (okayCallback) {
                okayCallback();
            }
        };
        var clickedCancel = function () {
            if (cancelCallback) {
                cancelCallback();
            }
        };
        var dlgConfirm = dlg.parent().find(".dialog-ok-cancel-ok");
        var dlgCancel = dlg.parent().find(".dialog-ok-cancel-cancel");
        var dlgExit = dlg.parent().find(".ui-dialog-titlebar-close");

        dlgConfirm.on("click", clickedOk);
        dlgCancel.on("click", clickedCancel);
        dlgExit.on("click", clickedCancel);

        dlg.on("dialogclose", function () {
            dlgConfirm.off("click", clickedOk);
            dlgCancel.off("click", clickedCancel);
            dlgExit.off("click", clickedCancel);
        });
        dlg.dialog("option", "title", "info");
        dlg.dialog("open");
        return dlg;
    }


    /** open dialog with message and no close X button
     * @param {String} message the message to display in the dialog box
     */
    //static openDialogNoClose(message: (index: number, oldHtml: string) => string, title: string): JQuery
    static openDialogNoClose(message: string, title?: string): JQuery {
        var dlg = Ps.getJQueryContext().find("#noclosedialog");
        dlg.dialog("close");
        dlg.html(message);
        if (typeof title !== "undefined") {
            dlg.dialog("option", "title", title);
        } else {
            dlg.dialog("option", "title", '');
        }
        dlg.dialog("open");
        return dlg;
    }


    /** open a dialog box with a message and no close X and no okay button
     * @param {String} message the message to display in the dialog box
     */
    //static openDialogNoCloseNoOK(message: (index: number, oldHtml: string) => string): JQuery
    static openDialogNoCloseNoOK(message: string): JQuery {
        var dlg = Ps.getJQueryContext().find("#dialog");
        dlg.dialog("close");
        dlg.find("p").html(message);
        dlg.find("button").remove();
        Ps.getJQueryContext().find(".ui-dialog-titlebar-close").css({ visibility: "hidden" });
        dlg.dialog("open");
        return dlg;
    }


    /** close a dialog box, or if none is provided, close the default dialog box
     */
    static closeDialog(dlg: JQuery) {
        dlg.dialog("close");
    }


    /** close the default dialog box
     */
    static closeDialogNoCloseNoOK() {
        Ps.getJQueryContext().find("#dialog").dialog("close");
    }



    /** Popup trigger behavior
     */
    static setPopupTrigger(params: { popup: JQuery | string; trigger?: string; container?: JQuery; callback?: (elem: Element) => void; hide? ; noCloseOnPopup? ; noPosition? ; positionOffset? ; direction? ; }) {
        var jqc = Ps.getJQueryContext();
        var popup = typeof params.popup === "string" ? jqc.find(<string>params.popup) : <JQuery>params.popup;
        var trigger = params.trigger;
        var container = params.container;
        var callback = params.callback;

        if (trigger) {
            jqc.find(container).on("click", trigger, onClick);
        } else {
            jqc.find(container).on("click", onClick);
        }

        function onClick(e: JQueryEventObject) {
            var jq = Ps.getJQuery();
            var jqc = Ps.getJQueryContext();
            var button = jq(this);

            function closePopup(e: JQueryEventObject) {
                var targetId = e.target["id"];
                if (targetId && targetId != "" && jqc.find("#" + targetId).closest(".ui-autocomplete").length > 0) {
                    return false;
                }
                button.removeClass("active");
                popup.hide().trigger("hide.popup");
            }

            jq(Ps.getPageWindow()).one("resize", function (e) {
                closePopup(e);
            });

            if (!button.hasClass("active")) {
                e.stopPropagation();
                button.trigger("click.closePopup");
                jq(trigger, container).filter(".active").removeClass("active");
                var showParams = {
                    caller: button,
                    popup: popup,
                    closeHandler: closePopup,
                    noCloseOnPopup: params.noCloseOnPopup,
                    noPosition: params.noPosition,
                    positionOffset: params.positionOffset,
                    direction: params.direction || "vertical"
                };
                Dialogs.showPopup(showParams);
                popup.data("show-params", showParams);
                if (params.hide) {
                    setTimeout(function () {
                        button.removeClass("active");
                        popup.hide(200);
                    }, 2000);
                }
                if (callback) {
                    callback(this);
                }
            }
        }
    }


    // show popup
    static showPopup(params: { popup; caller; direction? ; noPosition; positionOffset?: { top: number; left: number; }; noCloseOnPopup? ; closeHandler?: (event: JQueryEventObject) => void }) {
        var jqc = Ps.getJQueryContext();
        var caller = jqc.find(params.caller);
        var popup = jqc.find(params.popup);
        var pageHeight = Ps.getPageDocument().body.clientHeight;

        popup.trigger("showing.popup").css({
            top: '',
            bottom: ''
        });

        popup.show().removeClass("show-up show-left");

        caller.addClass("active");

        var tail = popup.find(".tail");
        var offset = caller.offset();
        var tailPosition = tail.position();
        var popupHeight = popup.height();

        offset.top += caller.outerHeight();

        if (tailPosition) {
            offset.left += caller.outerWidth() / 2;
            offset.left -= tailPosition.left + tail.width() / 2;

            var contentWidth = Ps.getJQueryContext().width();
            if (params.direction == "vertical" && offset.left + popup.outerWidth() > contentWidth - 2) {
                var diff = contentWidth - (offset.left + popup.outerWidth() + 2);
                tail.css("left", tailPosition.left - diff + "px");
                offset.left += diff;
            }
        }

        if (!params.noPosition) {

            if (params.positionOffset) {
                offset.left += params.positionOffset.left;
                offset.top += params.positionOffset.top;
            }

            if (popupHeight + offset.top > pageHeight) {
                offset.top -= (caller.outerHeight() + popupHeight);
                if (params.positionOffset) {
                    offset.top -= 2 * params.positionOffset.top;
                }
                popup.addClass("show-up");
            }

            popup.offset(offset);

            if (popup.hasClass("show-up")) {
                popup.css({
                    bottom: (pageHeight - offset.top - popup.height()) + "px",
                    top: ''
                });
            }
        }

        popup.trigger("show.popup");

        if (params.noCloseOnPopup) {
            popup.off("click.clickOnPopup").on("click.clickOnPopup", function (e) {
                e.stopPropagation();
            });
        }

        if (typeof params.closeHandler == "function") {
            setTimeout(function () {
                Ps.getJQueryContext().one("click.closePopup", params.closeHandler);
            }, 0);
        }
    }

}
/* end Dialogs namespace definition */


export = Dialogs;
