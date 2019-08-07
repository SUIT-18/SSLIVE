function load() {
    // 判断浏览器版本是否足够，以flv.js提供的为基准
    var browser = new Browser();
    // 提醒用户珍惜生命远离IE
    if (browser.browser == 'IE') {
        window.location.href = 'IE.html';
    }

    // debug模式，直接进入live.html，两种方式进入 1.在HTML中设置 2.在地址栏中输入?debug=1
    var debugmode = false;
    if (window.location.search.search("debug=1") >= 0) { debugmode = true; }

    // 根据直播情况分发页面
    $.ajax({
        url: "/config/livestatus.json",
        method: "GET",
        success: function (data) {
            var live = data.Live;//是否开播

            var nowtime = new Date().getTime();//当前时间
            var livetime = new Date(data.Time.year, data.Time.month - 1, data.Time.date, data.Time.hour, data.Time.minute).getTime();//开播时间
            // 请注意，这里的月份一定要减1，即一月应该是“0月”
            var leftTime = livetime - nowtime;//计算时差

            // 分发到直播页面条件：
            // 1.剩余时间小于预设值且直播已经开始  2.开启debug模式
            if ((leftTime < data.Delta && live) || debugmode) {
                window.location.href = 'live.html'
            }else {
                window.location.href = 'introduction.html';
            }
        },
        error: function () {
            $('#loading').text(" ")
            $("#errmsg").text("错误！请检查网络链接并刷新页面");
        }
    });
}

$('document').ready(load)
