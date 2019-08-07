// 调整页面的字体大小
var rem = 16;
function resize() {
    if ($(window).width() < 500) {
        rem = $(window).width() / 31.25;
    } else {
        rem = 16
    }
    $('html').css('font-size', rem + 'px')
    $('#main').css('margin-top', rem * 3.5 + 'px');
    $('#bgimg').css('font-size', $(window).height() - rem * 3.5 + 'px');
}

// 判断是否已经开播
function check() {
    $.ajax({
        url: "/config/livestatus.json",
        method: "GET",
        success: function (data) {
            var live = data.Live;//是否开播
            var nowtime = new Date().getTime();//当前时间
            var livetime = new Date(data.Time.year, data.Time.month, data.Time.date, data.Time.hour, data.Time.minute).getTime();//开播时间
            var leftTime = livetime - nowtime;//计算剩余时间
            // 分发到直播页面条件：
            // 剩余时间小于预设值且直播已经开始
            if (leftTime < data.Delta && live) {
                window.location.href = 'live.html'
            }
        }
    });
}

function load() {
    setInterval(newtime, 1000);
    setInterval(check, 10000);
    resize();
}

$('document').ready(load)
$(window).resize(resize)
