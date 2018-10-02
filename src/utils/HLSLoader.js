function loadHLSPlayer() {
    $("#liveplayer").remove();
    jwplayer('player').setup({
        file: 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8',
        events: {
            onComplete: function () { console.log("播放结束!!!"); },
            onVolume: function () { console.log("声音大小改变!!!"); },
            onReady: function () { console.log("准备就绪!!!"); },
            onPlay: function () { console.log("开始播放!!!"); },
            onPause: function () { console.log("暂停!!!"); },
            onBufferChange: function () { console.log("缓冲改变!!!"); },
            onBufferFull: function () { console.log("视频缓冲完成!!!"); },
            onError: function (obj) { console.log("播放器出错!!!" + obj.message); },
            onFullscreen: function (obj) {
                if (obj.fullscreen) {
                    console.log("全屏");
                    $("#player").css("border", "none");
                } else {
                    console.log("非全屏");
                    $("#player").css("border", "3px white solid");
                }
            },
            onMute: function (obj) { console.log("静音/取消静音") }
        }
        // width:"100%",
    });
}