//FLV加载器
function loadPlayer(player) {
    if (player == "auto" && flvjs.isSupported()) {
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
        setTimeout(function () {
            $(".controls").width($("video").width());
            $('#danmu').width($("video").width());
            $('#danmu').height($("video").height());
            $("#danmu").css("top", $("video").offset().top + 3 + "px");
            $("#danmu").css("left", $("video").offset().left + 3 + "px");
        }, 1000);
    } else if (player == "jwplayer" || !flvjs.isSupported()) {
        //alert("您的浏览器不支持HTML5 FLV直播，将为您跳转到HLS模式。");
        playmode = "HLS";
        loadHLSPlayer();
        $("#player").css("display", "inline-block");
        var x = 0.8;
        if ($(window).width() < $(window).height()) {
            cons("竖屏模式");
            x = 0.5;
        } else {
            cons("横屏模式");
            x = 0.8;
        }
        setTimeout(function () {
            $("#player").css("height", ($(window).height() - $("header").height() - $(".title-section").height()) * x + "px");
            $("#player").css("width", $("#player").height() * 16 / 9 + 10 + "px");
            $(".controls").width($("#player").width());
            $('#danmu').width($("#player").width());
            $('#danmu').height($("#player").height() - 50 + "px");
            $("#danmu").css("top", $("#player").offset().top + 3 + "px");
            $("#danmu").css("left", $("#player").offset().left + 3 + "px");
        }, 1000);
        $(".HLSmode").css("display", "none");
    }
    cons("播放器:" + playmode);
    return 0;
}
loadPlayer("auto");