var str = "";
var bgsetting = {};
var mySwiper;
var timeout;
var live = false;
var firstslide = true;
if (window.location.search.search("debug=1") > 0) { $("head").append('<meta http-equiv="Expires" content="0"><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Cache-control" content="no-cache"><meta http-equiv="Cache" content="no-cache">'); }
var now = new Date().getTime();//当前时间
var liveplay = new Date(2019, 3, 3, 19, 00).getTime();//开始时间 ！！注意：12月应写为11
function setsize() {
    console.log("Risizing...");
    $(".main").css("margin-top", $("header").height() + 30 + "px");
    $(".main").css("height", $(window).height() - $("header").height() - 10 + "px");
    $("#player").css("height", $(window).width() * 9 / 16 + 10 + "px");
    $(".contents").css({ width: $(window).width() });
}
function loadPlayer(url) {
    jwplayer('player').setup({
        file: url,
        autostart: false,
        overstretch: "true",
        volume: 60,
        // mute: true,
        repeat: true,
        smoothing: true,
        enablejs: true,
        onComplete: function () {
            cons("jwplayer:播放结束");
            nextbg();
        }
    });
}
function nextbg() {
    mySwiper.slideNext(2000);
    if (bgsetting.items[mySwiper.realIndex].type != "video") {
        var time = bgsetting.items[mySwiper.realIndex].time;
        timeout = setTimeout("nextbg()", time);
    }
    return;
}
$(document).ready(function () {
    $("#error").remove();
    var interval = setInterval(function () {
        $.ajax({
            url: "livestatus.json",
            method: "GET",
            success: function (data) {
                if (data.hasLive) {
                    live = true;
                }
            }
        })
        now = new Date().getTime();//当前时间
        if (liveplay - now <= 300000 || live) {//提前5分钟显示直播入口
            $(".timer").animate({ top: "35%" });
            $(".QRcode").fadeIn();
            clearInterval(interval);
        }
    }, 60000);
    var info = new Browser();
    if (info.device != '') {
        console.log(info.device);
        if (info.device == "PC") {
            $(".title").text("广东实验中学第四届“青春诗会”");
            $("#QRcode").css("width", "150px");
            $("#QRcode").css("height", "150px");
            $(".main").css("font-size", "3.5em");
            $(".small").css("font-size", "38px");
            $(".main").css("top", "45%");
            $(".promote p").css("font-size", "22px");
            $(".main").css("top", "40%");
            $("section").css("border-right", "1px #888888 solid");
            $(".spliter").css("height", "350px");
        } else {
            $(".logos").css("transform", "translateX(27.5px)");
            $(".logo").css({ "height": "50px" });
            $(".passlogo").css({ "height": "30px", "margin": "10px 0" });
            $(".swiper-button-prev").remove();
            $(".swiper-button-next").remove();
        }
    }
    //---------------图片轮播-----------------
    var j = 0;
    $.ajax({
        url: "src/background/background.json",
        dataType: "json",
        success: function (data) {
            console.log(data);
            bgsetting = data;
            for (i = 0; i <= data.items.length - 1; i++) {
                str = ".s" + i;
                if (data.items[i].type == "img") {
                    if (info.device == "PC") {
                        $(str).append("<img src='" + data.items[i].url.pc + "'>");
                    } else {
                        $(str).append("<img src='" + data.items[i].url.mobile + "'>");
                    }
                } else if (data.items[i].type == "video") {
                    $(str).append("<div id='player'></div>");
                    j = i;
                }
            }
            if (info.device == "PC") {
                mySwiper = new Swiper('.Pic', {
                    direction: 'horizontal',
                    loop: true,
                    centeredSlides: true,
                    observer: true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true,//修改swiper的父元素时，自动初始化swiper
                    pagination: {
                        el: '.Pic-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.Pic-button-r',
                        prevEl: '.Pic-button-l',
                    },
                })
            } else {
                mySwiper = new Swiper('.Pic', {
                    direction: 'horizontal',
                    loop: true,
                    centeredSlides: true,
                    observer: true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true,//修改swiper的父元素时，自动初始化swiper
                    pagination: {
                        el: '.Pic-pagination',
                        clickable: true,
                    },
                })
            }
            mySwiper.on('slideChange', function () {
                console.log(mySwiper.realIndex);
                //---检查是否有视频需要暂停---
                clearTimeout(timeout);
                if (firstslide) {
                    var i = mySwiper.realIndex - 1;
                } else {
                    var i = mySwiper.realIndex;
                }
                $(".description").text(bgsetting.items[i].des);
                if (bgsetting.items[i].type == "video") {
                    $('video').trigger('play');
                    $("#player").css("height", $(window).width() * 9 / 16 + 10 + "px");
                    $(".openvideo").fadeIn();
                } else {
                    var time = bgsetting.items[i];
                    timeout = setTimeout("nextbg()", time);
                    $('video').trigger('pause');
                    $(".openvideo").fadeOut();
                }
            });
            setTimeout(function () {
                if (info.device == "PC") {
                    loadPlayer(bgsetting.items[j].url.pc);
                } else {
                    loadPlayer(bgsetting.items[j].url.mobile);
                }
            }, 1000);
            var index = 0;
            // var index = Math.floor(Math.random() * (bgsetting.items.length - 1));
            firstslide = false;
            timeout = setTimeout("nextbg()", 20000);
            $(".description").text(bgsetting.items[index].des);
            mySwiper.slideToLoop(index);
            firstslide = false;
        }
    });
    //设置大小
    setsize();
    setTimeout(function () {
        $(".contents").animate({ height: $(".contents").contents().find("#swiper").height() });
    }, 1000);
    //动画
    newtime();
    $(".timer").fadeIn().queue(function (next) {
        $(".main").fadeIn();
        $(".promote").fadeIn();
        $(".bg-img").fadeIn().queue(function (next) {
            $("#1").fadeIn(function () {
                $("#dot1").css("background-color", "white");
            });
            next();
        });
        next();
    });
    setInterval(function () { //“向下滑动”的动画
        $(".promote").animate({ bottom: "+=50px" }, { duration: 2000 }).queue(function (next) {
            $(".promote").fadeOut(function () { $(".promote").css("bottom", "0"); });
            next();
        }).queue(function (next) {
            $(".promote").fadeIn();
            next();
        });
    }, 10000);
    setInterval(function () { //切换按钮自动变暗
        $(".swiper-button-prev").animate({ opacity: "0.5" });
        $(".swiper-button-next").animate({ opacity: "0.5" });
    }, 5000);
    $(".swiper-button-prev").mouseover(function () {
        $(this).animate({ opacity: "1" });
    });
    $(".swiper-button-next").mouseover(function () {
        $(this).animate({ opacity: "1" });
    });
    $(".icon").click(function () {
        window.location.href = "index.html";
    });
    $(".QRcode").click(function () {
        window.location.href = "index.html";
    });
    $("#follow").click(function () {
        $(".followbox").fadeIn();
    });
    $("#close").click(function () {
        $(".followbox").fadeOut();
    });
    $("#QR1").click(function () { window.open("https://space.bilibili.com/362781087"); });
    $("#QR2").click(function () { window.open("http://v.qq.com/vplus/40459976ac5f7141f5b4cb69d2266a89"); });
    $(".openvideo").click(function () { jwplayer().setFullscreen(true); });
});
$(window).resize(function () {
    setsize();
});
