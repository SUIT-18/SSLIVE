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
}
else{
    alert("您的浏览器过旧不支持HTML5 FLV直播，请使用更新的Chrome、Edge、Safari、Firefox浏览器访问。");
}