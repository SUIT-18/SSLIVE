var growl = new Object;
growl.show = function (settings) {
    console.log(settings);
    if (typeof (settings) != "object") { return "参数错误" };
    $("body").append("<div class='growl'></div>");
    $(".growl").html("<div class='growl-img'><img id='growl-img'><br></div><p class='growl-text'>" + settings.text + "</p>");
        var src = "";
        $(".growl-img").css("display", "inline-block");
        if (typeof (settings.imgsrc) == "string") {
            src = settings.imgsrc;
        } else {
            switch (settings.type) {
                case "loading":
                    src = "src/img/loading.gif";
                    break;
                case "notice":
                    src = "src/img/notice.svg";
                    break;
                case "warning":
                    src = "src/img/warning.svg";
                    break;
                default:
                    src = "";
                    break;
            }
        }
        $("#growl-img").attr("src", src);
    if (typeof (settings.mask) == "boolean") {
        if (settings.mask && settings.autoclose > 0) {
            $("body").attr("disabled", true);
            setTimeout(function () { $("body").attr("disabled", false); }, settings.autoclose);
        }
    }
    if (typeof (settings.autoclose) == "number" && settings.autoclose > 0) {
        setTimeout("growl.close()", settings.autoclose);
    }
    if (settings.onclick != null) {
        $(".growl").click(settings.onclick);
    }
    return 0;
}
growl.close = function (option) {
    if (typeof (option) != "undefined") {
        if (option == "hard") {
            $(".growl").fadeToggle("slow", function () { $(".growl").remove(); });
        }else{
            $(".growl").remove();
        }
    } else {
        $(".growl").fadeToggle("slow", function () { $(".growl").remove(); });
    }
}