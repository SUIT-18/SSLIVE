var videowidth, videoheight;

function resize() {
    if ($(window).width() < 750) {
        // 根据屏幕宽度更改文字，以保证文字在一行内显示
        $('#title').text('省实高中部军训会操直播')
        $('html').css('font-size', $(window).width() / 31.25 + 'px');
        videowidth = $(window).width() * 0.95;
        videoheight = videowidth / 16 * 9;
        $('#video').css('width', videowidth);
        $('#video').css('height', videoheight);
        $('#video').css('max-width', videowidth);
        $('#video').css('min-height', videoheight);
    } else {
        // 根据屏幕宽度更改文字，以保证文字在一行内显示
        $('#title').text('广东实验中学高中部军训会操直播');
        videowidth = $(window).width() * 0.618 > 750 ? $(window).width() * 0.618 : 750;
        videoheight = videowidth / 16 * 9;
        $('#video').css('width', videowidth);
        $('#video').css('height', videoheight);
        $('#video').css('min-width', 750);
        $('#video').css('min-height', 421.875);
    }

    $('#controls').css('width', videowidth - 4);
    // 适配微信
    $('body').css('height', $(window).height());
    $('body').css('width', $(window).width());
}

var player;
function load() {
    player = videojs('video', {
        liveui: true,
        controls: false,
        preload: true,
    });

    player.src("https://suit.ssersay.cn/SUIT/stream.m3u8");

    var isplay = false;
    $('#play').click(function () {
        if (isplay) {
            player.pause();
            $('#play').css('background-image', "url('/src/img/play.svg')");
            isplay = false;
        } else {
            player.play();
            $('#play').css('background-image', "url('/src/img/pause.svg')");
            isplay = true;
        }
    });

    $('#fullscreen').click(function () {
        player.requestFullscreen();
    });

    resize();
}

$('document').ready(load)
$(window).resize(resize)
