var playing = false;
var playmode = "";
var settinghided = false;
var PicLive = {};
console.log(window.location.search);
var debugmode = false;
if (window.location.search.search("debug=1") > 0) { debugmode = true; }
//跳转
var now = new Date().getTime();//当前时间
var liveplay = new Date(2018, 11, 28, 14, 30).getTime();
var leftTime = liveplay - now;//计算时差
var delta = 60000;//一分钟
if (leftTime <= delta) {
    //alert("已到开播时间前1分钟");无需跳转
} else {
    growl.show({ text: "跳转中...", type: "notice" });
    if (debugmode) {
        growl.show({ text: "debug模式", type: "none", autoclose: 1500 });
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
function getProgram() {
    $.ajax({
        url: "currentprogram.json",
        dataType: "json",
        cache: false,
        success: function (data) {
            console.log(data);
            if (data.previous == "") {
                $(".pre").hide();
                $("#prebr").hide();
            } else {
                $("#prebr").show();
                $(".pre").show();
                $("#pre").text(data.previous);
            }
            $("#now").text(data.current);
            if (data.next == "") {
                $(".next").hide();
            } else {
                $(".next").show();
                $("#next").text(data.next);
            }
        }
    });
}
function ShowGallery(index) {
    //----------PhotoSwipe设置-------------
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var items = [
        {
            src: PicLive.Img1,
            w: PicLive.img1w,
            h: PicLive.img1h,
            caption: PicLive.text
        },
        {
            src: PicLive.Img2,
            w: PicLive.img2w,
            h: PicLive.img2h,
            caption: PicLive.text
        }
    ];
    var options = {
        index: index
    };
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
}
function loadpopup() {
    cons("popped:" + localStorage.getItem("popped"));
    if (localStorage.getItem("popped") == null) {
        localStorage.setItem("popped", "yes");
        $(".noticemask").fadeIn("slow", function () {
            $(".noticemask").click(function () {
                $(".noticemask").fadeOut(function () { $(".noticemask").remove(); });
            });
        });
    }
}
function setsize() {  //当浏览器大小变化时
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
        $("video").css("max-height", ($(window).height() - $("header").height() - $(".proglist").height()) * 0.8 + "px");
        $(".controls").animate({ width: $("video").width() }, function () {
            $(".proglist").animate({ "top": $(".videoframe").offset().top + $(".videoframe").height() + 15 + "px", "width": $(".controls").width() - 20 + "px" });
            $("#danmu").css({ "top": $("video").offset().top + "px", "left": $("video").offset().left + "px", "width": $("video").width(), "height": $("video").height() });
        });
    } else { //jwplayer模式下
        $("#player").css("height", ($(window).height() - $("header").height() - $(".proglist").height()) * x + "px");
        $("#player").css("width", $("#player").height() * 16 / 9 + 10 + "px");
        if ($("#player").width() > $(window).width()) {
            $("#player").css("width", $(window).width());
            $("#player").css("height", $("#player").width() * 9 / 16 + "px");
        }
        cons("height:" + $("#player").height() + " width:" + $("#player").width());
        $(".controls").animate({ width: $("#player").width() }, function () {
            $(".proglist").animate({ "top": $(".videoframe").offset().top + $(".videoframe").height() + 15 + "px", "width": $(".controls").width() - 20 + "px" });
            $("#danmu").css({ "top": $("#player").offset().top + "px", "left": $("#player").offset().left + "px", "width": $("#player").width(), "height": $("#player").height() });
        });
    }
}
$(document).ready(function () {
    $("#error").remove();
    if (debugmode) {
        $("head").append('<meta http-equiv="Expires" content="0"><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Cache-control" content="no-cache"><meta http-equiv="Cache" content="no-cache">');
        $(".log").css("display", "block");
        var str = "调试模式已启动\n";
        $(".logcontents").val(str);
        $(".HLSmode").css("display", "");
        $(".log").css("width", $(".logcontents").width() + "px");
        $("#danmu").css({ "background-color": "red", "opacity": "0.5" });
    }
    getProgram();
    setInterval("getProgram()", 60000);
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
    if (info.device == "PC") { //电脑端
        $(".title1").text("广东实验中学新年音乐会");
        $(".title1").append("<br><span class='title2'>New Year's Concert | 2019</span>");
        $("body").css("background-size", "cover");
        $(".livetext").css("font-size", "30px");
    } else {
        $("video").css("min-width", "93%");
        $("#player").css("min-width", "93%");
        $("#play").css("margin-left", "1px");
        $("#play").css("margin-right", "1px");
        $(".livelabel").css("margin-left", "1px");
        $(".livelabel").css("margin-right", "1px");
        $(".senddanmu").css("margin", "10px 0");
        $(".controls").css("font-size", "smaller");
        $("#text").css({ "max-width": "100px", "height": "35px" });
        $(".fullscreen").css("margin-right", "0");
        $("button").css({ "height": "35px", "min-width": "35px" });
        $("#send").css({ "height": "39px", "padding": "5px 0" });
        setTimeout("loadpopup()", 5000);
        $(".proglist-title").text("节目单");
        $(".proglist-title").css("border-bottom", "5px rgb(133, 83, 23) solid");
        $(".proglist").css("text-align", "center");
        $(".mode").remove();
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
    setTimeout(function () {
        if (playmode == "FLV") { //FLV模式下
            $('video').trigger('play');
            $("video").css("max-height", ($(window).height() - $("header").height() - $(".proglist").height()) * 0.8 + "px");
            $(".controls").width($("video").width());
            $("#danmu").css({ "top": $("video").offset().top + "px", "left": $("video").offset().left + "px", "width": $("video").width(), "height": $("video").height() });
            playing = true;
            $("#play").css("background-image", "url(src/img/pause.svg)");
        } else { //jwplayer模式下
            jwplayer().play();
            $("#player").css("height", ($(window).height() - $("header").height() - $(".proglist").height()) * x + "px");
            $("#player").css("width", $("#player").height() * 16 / 9 + 10 + "px");
            if ($("#player").width() > $(window).width()) {
                $("#player").css("width", $(window).width());
                $("#player").css("height", $("#player").width() * 9 / 16 + "px");
            }
            cons("height:" + $("#player").height() + " width:" + $("#player").width());
            $(".controls").width($("#player").width());
            $("#danmu").css({ "top": $("#player").offset().top + "px", "left": $("#player").offset().left + "px", "width": $("#player").width(), "height": $("#player").height() });
        }
        $(".proglist").css({ "top": $(".videoframe").offset().top + $(".videoframe").height() + 15 + "px", "width": $(".controls").width() - 20 + "px" });
        setsize();
    }, 3000);
    //---------swiper设置------------------
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal', // 水平切换选项
        loop: false, // 循环模式选项
    })
    mySwiper.on("slideChange", function () {
        //更新图文直播内容
        if (mySwiper.activeIndex == 1) {
            $.ajax({
                url: "src/piclive/piclive.json",
                dataType: "json",
                success: function (data) {
                    PicLive = data;
                    PicLive.Img1 = "src/piclive/" + PicLive.Img1;
                    PicLive.Img2 = "src/piclive/" + PicLive.Img2;
                    $(".livetext").text(data.text);
                    $("#liveimg1").attr("src", PicLive.Img1);
                    $("#liveimg2").attr("src", PicLive.Img2);
                }
            });
        }
    });
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
    $("#res").click(function () {
        cons("清晰度切换:" + $('#test option:selected').val());
        switch ($('#test option:selected').val()) {
            case "480P":
                if (playmode == "FLV") {

                } else {
                    jwplayer('player').setup({
                        file: ""
                    });
                }
                break;
            case "720P":

                break;
            case "1080P":

                break;
        }
    });
    $(".liveimg").click(function () {
        cons("打开了第" + $(this).attr("id").substring(7, 8) + "张图");
        ShowGallery($(this).attr("id").substring(7, 8) - 1);
    });
});
$(window).resize(function () {
    setTimeout("setsize()", 300);
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