var str = "";
var bgsetting = {};
var mySwiper;
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
        mute: true
    });
}
function nextbg() {
    var time = 0;
    switch (mySwiper.realIndex) {
        case 0:
            time = bgsetting.item1.time;
            break;
        case 1:
            time = bgsetting.item2.time;
            break;
        case 2:
            time = bgsetting.item3.time;
            break;
    }
    mySwiper.slideNext(1500);
    setTimeout("nextbg()", time);
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
        }
    }
    setsize();
    mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
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
    mySwiper.on('slideChange', function () {
        console.log(mySwiper.realIndex);
        //---检查是否有视频需要暂停---
        switch (mySwiper.realIndex) {
            case 0:
                if (bgsetting.item1.type == "video") {
                    $('video').trigger('play');
                    $("#player").css("width", $("#player").height() * 16 / 9 + 5 + "px");
                } else {
                    $('video').trigger('pause');
                }
                break;
            case 1:
                if (bgsetting.item2.type == "video") {
                    $('video').trigger('play');
                    $("#player").css("width", $("#player").height() * 16 / 9 + 5 + "px");
                } else {
                    $('video').trigger('pause');
                }
                break;
            case 2:
                if (bgsetting.item3.type == "video") {
                    $('video').trigger('play');
                    $("#player").css("width", $("#player").height() * 16 / 9 + 5 + "px");
                } else {
                    $('video').trigger('pause');
                }
                break;
        }
    });
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
    //---------------图片轮播-----------------
    $.ajax({
        url: "src/background/background.json",
        dataType: "json",
        success: function (data) {
            console.log(data);
            bgsetting = data;
            if (data.item1.type == "img") {
                $(".s1").append("<img src='" + data.item1.url + "'>");
            } else {
                $(".s1").append("<div id='player' class='1'></div>");
                loadPlayer(data.item1.url);
            }
            if (data.item2.type == "img") {
                $(".s2").append("<img src='" + data.item2.url + "'>");
            } else {
                $(".s2").append("<div id='player' class='2'></div>");
                loadPlayer(data.item2.url);
            }
            if (data.item3.type == "img") {
                $(".s3").append("<img src='" + data.item3.url + "'>");
            } else {
                $(".s3").append("<div id='player' class='3'></div>");
                loadPlayer(data.item3.url);
            }
            mySwiper.slideToLoop(0);
            //-----------------------------
            setTimeout(function () {
                nextbg();
            }, data.item1.time);
        }
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
