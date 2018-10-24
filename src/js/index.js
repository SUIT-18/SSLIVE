var playing = false;
var playmode = "";
var settinghided = false;
console.log(window.location.search);
var debugmode = false;
if (window.location.search.search("debug=1") > 0) { debugmode = true; }
//跳转
var now = new Date().getTime();//当前时间
var liveplay = new Date(2018, 10, 25, 13, 00).getTime();//直播8点开始
var leftTime = liveplay - now;//计算时差
var delta = 60000;//一分钟
if (leftTime <= delta) {
    //alert("已到开播时间前1分钟");无需跳转
}
else {
    growl.show({ text: "跳转中...", type: "notice" });
    if (debugmode) {
        growl.show({ text: "debug模式下不跳转", type: "none", autoclose: 1500 });
    } else {
        window.location.href = 'introduction.html';
    }
}
//---------------
function cons(content) {
    console.log(content);
    if (debugmode) {
        content = $(".logcontents").val() + content + "\n";
        $(".logcontents").val(content);
    }
}
function clearlog() {
    $(".logcontents").val("");
}
$(document).ready(function () {
    if (debugmode) {
        $(".log").css("display", "block");
        var str = "调试模式已启动\n";
        $(".logcontents").val(str);
        $(".HLSmode").css("display", "");
        $(".log").css("width", $(".logcontents").width() + "px");
        $(".danmutime").css("display", "inline-block");
        $("#danmu").css({ "background-color": "red", "opacity": "0.5" });
    }
    //------兼容性检测---------
    var info = new Browser();
    if (info.device != '') {
        cons(info.browser + " " + info.version + " " + info.engine);
        if (info.browser == "IE") {
            growl.show({ text: "浏览器版本太旧", type: "warning", autoclose: 5000 });
        }
        if (info.browser == "Safari" && info.version <= 10.0) {
            growl.show({ text: "浏览器版本太旧", type: "warning", autoclose: 5000 });
        }
    }
    //------------------------
    //设置播放器大小
    cons("窗口高度:" + $(window).height() + " header高度:" + $("header").height() + " 控制条高度:" + $(".controls").height() + " title高度:" + $(".title-section").height());
    var x = 0.8;
    if ($(window).width() < $(window).height()) {
        x = 0.5;
        cons("竖屏模式");
    } else {
        cons("横屏模式");
        x = 0.8;
    }
    if (playmode == "FLV") { //FLV模式下
        $("video").css("max-height", ($(window).height() - $("header").height()) * 0.8 + "px");
        $(".controls").width($("video").width());
        $("#danmu").css({ "top": $("video").offset().top + "px", "left": $("video").offset().left + "px", "width": $("video").width(), "height": $("video").height() });
        $("#vol").val($("video").volume * 100);
        $("#vol").change(function () {
            $("video").volume = $("#vol").val() / 100;
        });
        $('video').trigger('play');
        playing = true;
        $("#play").css("background-image", "url(src/img/pause.svg)");
    } else { //jwplayer模式下
        $("#player").css("height", ($(window).height() - $("header").height()) * x + "px");
        $("#player").css("width", $("#player").height() * 16 / 9 + 10 + "px");
        if ($("#player").width() > $(window).width()) {
            $("#player").css("width", $(window).width());
            $("#player").css("height", $("#player").width() * 9 / 16 + "px");
        }
        cons("height:" + $("#player").height() + " width:" + $("#player").width());
        $(".controls").width($("#player").width());
        $("#danmu").css({ "top": $("#player").offset().top + "px", "left": $("#player").offset().left + "px", "width": $("#player").width(), "height": $("#player").height() });
        $("#vol").val(jwplayer().getVolume());
        $("#vol").change(function () {
            jwplayer().setVolume($("#vol").val());
        });
    }
    //---------响应按钮点击事件-------------
    $("#danmuset").click(function () {
        if (!settinghided) {
            if (playmode == "FLV") {
                $(".ctr").css({ top: ($("video").offset().top + $("video").height() - 140) + "px", left: $("#danmuset").offset().left + "px" });
            } else {
                $(".ctr").css({ top: ($("#player").offset().top + $("#player").height() - 140) + "px", left: ($("#player").width()) + "px" });
            }
            $(".ctr").fadeIn();
            cons("显示弹幕设置");
            settinghided = true;
        } else {
            $(".ctr").fadeOut();
            cons("隐藏弹幕设置");
            settinghided = false;
        }
    });
    $("#fullscreen").click(function () {
        if (playmode == "FLV") {
            var ele = document.getElementById("liveplayer");
            // going full-screen
            if (ele.requestFullscreen) {
                ele.requestFullscreen();
            }
            else if (ele.webkitRequestFullscreen) {
                ele.webkitRequestFullscreen();
            }
            else if (ele.msRequestFullscreen) {
                ele.msRequestFullscreen();
            }
            else if (ele.mozRequestFullScreen) {
                ele.mozRequestFullScreen();
            }
        } else {
            jwplayer().setFullscreen(true);
        }
    });
    $(".icon").click(function () {
        window.location.href = "index.html";
    });
    // growl.show({ text: "发送中...", type: "loading", autoclose: 3000 });
});
$(window).resize(function () {  //当浏览器大小变化时
    cons("窗口高度:" + $(window).height() + " header高度:" + $("header").height() + " 控制条高度:" + $(".controls").height());
    var x = 0.8;
    if ($(window).width() < $(window).height()) {
        cons("竖屏模式");
        x = 0.5;
    } else {
        cons("横屏模式");
        x = 0.8;
    }
    if (playmode == "FLV") { //FLV模式下
        $("video").css("max-height", ($(window).height() - $("header").height()) * 0.8 + "px");
        $(".controls").width($("video").width());
        $("#danmu").css({ "top": $("video").offset().top + "px", "left": $("video").offset().left + "px", "width": $("video").width(), "height": $("video").height() });
    } else { //jwplayer模式下
        $("#player").css("height", ($(window).height() - $("header").height()) * x + "px");
        $("#player").css("width", $("#player").height() * 16 / 9 + 10 + "px");
        if ($("#player").width() > $(window).width()) {
            $("#player").css("width", $(window).width());
            $("#player").css("height", $("#player").width() * 9 / 16 + "px");
        }
        cons("height:" + $("#player").height() + " width:" + $("#player").width());
        $(".controls").width($("#player").width());
        $("#danmu").css({ "top": $("#player").offset().top + "px", "left": $("#player").offset().left + "px", "width": $("#player").width(), "height": $("#player").height() });
    }
});
function play() {
    if (playing) {
        $('video').trigger('pause');
        playing = false;
        $("#play").css("background-image", "url(src/img/play.svg)");
    } else {
        $('video').trigger('play');
        playing = true;
        $("#play").css("background-image", "url(src/img/pause.svg)");
    }
}