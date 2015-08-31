$(document).ajaxStart(function () {
    $("#content").hide();
    $(window.document.body).append($(
        "<div class='container loading'>" +
            "<div class='row'>" +
                "<div class='col-md-3 col-md-offset-5'>" +
                    "<img class='img-responsive run' src='/app/images/loading.gif'>" +
                    "<p class='devour'>...............Loading</p>" +
                "</div>" +
            "</div>" +
        "</div>"
        ));

    $("img").load(function() {
          $(function () {
            var $devour = $('.devour');
            var timer = setInterval(function () {
                var ln = $devour.text().length;
                if (ln == 0) clearInterval(timer);

                $('.devour').text(function (i, v) {
                    return v.substring(1);
                });
            }, 150);
        });
    });

    }).ajaxStop(function () {
        $(".loading").remove();
        $("#content").show();
    });
