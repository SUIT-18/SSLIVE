var str = "";
var bgsetting = {};
var mySwiper;
var timeout;
var now = new Date().getTime();//当前时间
var liveplay = new Date(2018, 11, 28, 18, 00, 00).getTime();//开始时间 ！！注意：12月应写为11
function setsize() {
    console.log("Risizing...");
    $(".main").css("margin-top", $("header").height() + 30 + "px");
    $(".main").css("height", $(window).height() - $("header").height() - 10 + "px");
    $("#player").css("width", $("#player").height() * 16 / 9 + 10 + "px");
}
function loadPlayer(url) {
    jwplayer('player').setup({
        file: url,
        autostart: false,
        overstretch: "true",
        mute: true,
        repeat: true,
        bwfile: "src/img/bg1.jpg"
    });
}
function nextbg() {
    mySwiper.slideNext(1500);
    var time = bgsetting.items[mySwiper.realIndex].time;
    timeout = setTimeout("nextbg()", time);
    return;
}
$(document).ready(function () {
    $('#timer').countdown('2018/12/28 18:00:00', function (event) {
        $(this).html(event.strftime('%D <span class="small">天</span> %H <span class="small">时</span> %M <span class="small">分</span> %S <span class="small">秒</span>'));
    });
    var interval = setInterval(function () {
        now = new Date().getTime();//当前时间
        console.log(liveplay - now);
        if (liveplay - now <= 60000) {//提前1分钟显示直播入口
            $(".timer").animate({ top: "35%" });
            $(".QRcode").fadeIn();
            clearInterval(interval);
        }
    }, 1000);
    var info = new Browser();
    if (info.device != '') {
        console.log(info.device);
        if (info.device == "PC") {
            $(".title").text("广东实验中学2019新年音乐会直播");
            $("#QRcode").css("width", "150px");
            $("#QRcode").css("height", "150px");
            $(".main").css("font-size", "3.5em");
            $(".small").css("font-size", "38px");
            $(".main").css("top", "45%");
            $(".promote p").css("font-size", "22px");
            $(".main").css("top", "40%");
            $("section").css("border-right", "1px #888888 solid");
        } else {
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
                    $(str).append("<img src='" + data.items[i].url + "'>");
                } else if (data.items[i].type == "video") {
                    $(str).append("<div id='player'></div>");
                    j = i;
                }
            }
            if (info.device == "PC") {
                mySwiper = new Swiper('.swiper-container', {
                    direction: 'horizontal',
                    loop: true,
                    centeredSlides: true,
                    observer: true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true,//修改swiper的父元素时，自动初始化swiper
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                })
            } else {
                mySwiper = new Swiper('.swiper-container', {
                    direction: 'horizontal',
                    loop: true,
                    centeredSlides: true,
                    observer: true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true,//修改swiper的父元素时，自动初始化swiper
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                })
            }
            mySwiper.on('slideChange', function () {
                console.log(mySwiper.realIndex);
                //---检查是否有视频需要暂停---
                if (bgsetting.items[mySwiper.realIndex].type == "video") {
                    $('video').trigger('play');
                    $("#player").css("width", $("#player").height() * 16 / 9 + 5 + "px");
                    $(".timer").animate({opacity: "0.5"});
                } else {
                    $(".timer").animate({opacity: "1"});
                    $('video').trigger('pause');
                }
                clearTimeout(timeout);
                var time = bgsetting.items[mySwiper.realIndex];
                setTimeout("nextbg()", time);
            });
            setTimeout(function () {
                loadPlayer(bgsetting.items[j].url);
            }, 1000);
            mySwiper.slideToLoop(0);
            //-----------------------------
            setTimeout(function () {
                nextbg();
            }, data.items[0].time);
        }
    });
    setsize();
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
});
$(window).resize(function () {
    setsize();
});
