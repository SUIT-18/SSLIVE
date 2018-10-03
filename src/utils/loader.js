//FLV加载器
if (flvjs.isSupported()) {
    var videoElement = document.getElementById('liveplayer');
    var flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: "src/media/test.flv"//改为直播FLV的url
    }
    );
    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load();
    flvPlayer.play();
    playmode = "FLV";
    setTimeout(function () { $(".controls").width($("video").width()); }, 1000);
}
else {
    //alert("您的浏览器不支持HTML5 FLV直播，将为您跳转到HLS模式。");
    playmode = "HLS";
    loadHLSPlayer();
    $("#player").css("width", $("#player").height() * 9 / 16);
    $("#player").css("left", "50%");
    $("#player").css("display", "inline-block");
    $(".controls").width($("#player").width());
}
cons("播放器:" + playmode);
