$(document).ajaxStart(function () {
    $(window.document.body).append($(
        "<div class='container loading'>" +
            "<div class='col-md-2 col-md-offset-5 text-center'>" +
                "Loading. Please Wait." +
                "<br /> <img class='img-responsive' src='/app/images/loading.gif' height='10'>" +
            "</div>" +
        "</div>"
        ));

    $("#content").hide();

    }).ajaxStop(function () {
        $(".loading").remove();
        $("#content").show();
    });
