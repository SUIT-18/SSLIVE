function loadHLSPlayer() {
    $("#liveplayer").remove();
    jwplayer('player').setup({
        file: 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8',
        events: {
            onComplete: function () { cons("HLS:播放结束"); },
            onVolume: function () { cons("HLS:声音大小改变"); },
            onReady: function () { cons("HLS:准备就绪"); },
            onPlay: function () { cons("HLS:开始播放"); },
            onPause: function () { cons("HLS:暂停"); },
            onBufferFull: function () { cons("HLS:视频缓冲完成"); },
            onError: function (obj) { cons("HLS:播放器出错" + obj.message); },
            onFullscreen: function (obj) {
                if (obj.fullscreen) {
                    cons("HLS:全屏");
                    $("#player").css("border", "none");
                } else {
                    cons("HLS:非全屏");
                    $("#player").css("border", "3px white solid");
                }
            },
            onMute: function (obj) { cons("HLS:静音/取消静音") }
        }
        // width:"100%",
    });
}