function loadHLSPlayer(){
    $("#liveplayer").remove();
    jwplayer('player').setup({
    file: 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8',
    width:"100%",
    });
}