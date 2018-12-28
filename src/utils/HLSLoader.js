function loadHLSPlayer() {
    $("#liveplayer").remove();
    jwplayer('player').setup({
        file: 'https://suit.ssersay.cn/SUIT/stream.m3u8',
        // file: "src/media/test.mp4",
        autostart: true,
        controlbar: "none",
        overstretch: "true",
        events: {
            onComplete: function () { cons("jwplayer:播放结束"); },
            onVolume: function () {
                cons("jwplayer:声音大小改变");
                $("#vol").val(jwplayer().getVolume());
            },
            onReady: function () { cons("jwplayer:准备就绪"); },
            onPlay: function () {
                playing = true;
                $("#play").css("background-image", "url(./src/img/pause.SVG)");
                cons("jwplayer:开始播放");
            },
            onPause: function () {
                playing = false;
                $("#play").css("background-image", "url(./src/img/play.SVG)");
                cons("jwplayer:暂停");
            },
            onBufferFull: function () { cons("jwplayer:视频缓冲完成"); },
            onError: function (obj) { cons("jwplayer:播放器出错" + obj.message); },
            onFullscreen: function (obj) {
                if (obj.fullscreen) {
                    cons("jwplayer:全屏");
                    $("#player").css("background-color", "#000");
                } else {
                    cons("jwplayer:非全屏");
                    $("#player").css("background-color", "#fff");
                }
            },
            onMute: function (obj) { cons("jwplayer:静音/取消静音") }
        }
    });
    playmode = "HLS";
}