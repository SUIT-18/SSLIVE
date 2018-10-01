 //FLV加载器
if (flvjs.isSupported()){
    var videoElement = document.getElementById('liveplayer');
    var flvPlayer = flvjs.createPlayer({
        type:'flv',
        url:"src/media/test.flv"//改为直播FLV的url
    }
    );
    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load();
    flvPlayer.play();
    playmode = "FLV";
}
else{
    // alert("您的浏览器不支持HTML5 FLV直播，将为您跳转到HLS模式。");
    playmode = "HLS";
    loadHLSPlayer();
}
// alert(playmode);