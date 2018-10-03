var playing = false;
var playmode = "";
console.log(window.location.search);
var debugmode = false;
if (window.location.search.search("debug=1") > 0) { debugmode = true; }
function cons(content) {
    console.log(content);
    if (debugmode) {
        content = $(".logcontents").val() + content + "\n";
        $(".logcontents").val(content);
    }
}
function clearlog(){
    $(".logcontents").val("");
}
$(document).ready(function () {
    if (debugmode) {
        $(".log").css("display", "block");
        var str = "调试模式已启动\n";
        $(".logcontents").val(str);
        $(".HLSmode").css("display", "");
        $(".log").css("width", $(".logcontents").width() + "px");
    }
    //设置播放器大小
    cons("窗口高度:" + $(window).height() + " header高度:" + $("header").height() + " 控制条高度:" + $(".controls").height() + " title高度:" + $(".title-section").height());
    //$("video").css("max-height", ($(window).height() - $("header").height() - $(".title-section").height()) * 0.8 + "px");
    //$("#player").css("height", ($(window).height() - $("header").height() - $(".title-section").height()) * 0.8 + "px");
	$("video").width($(window).width()*0.6);
	$("#player").width($(window).width()*0.6);
	$('#danmu').css("max-width",($("video").width()));
	$('#danmu').css("max-height",($("video").height()));
    $('#danmu').width($("video").width);
	$('#danmu').height($("video").height);
    $('.videoframe').css("max-width",($("video").width()));
	$('.videoframe').css("max-height",($("video").height()));
    $('.videoframe').width($(window).width);
	$('.videoframe').height($(window).height);
    $('video').trigger('play');
    playing = true;
    $("#play").css("background-image", "url(src/img/pause.SVG)");
    $("#vol").val($("video").volume * 100);
    $("#vol").change(function () {
         $("video").volume = $("#vol").val() / 100;
     });
});
$(window).resize(function () {  //当浏览器大小变化时
    cons("窗口高度:" + $(window).height() + " header高度:" + $("header").height() + " 控制条高度:" + $(".controls").height() + " title高度:" + $(".title-section").height());
    //$("video").css("max-height", ($(window).height() - $("header").height() - $(".title-section").height()) * 0.8 + "px");
    //$("#player").css("height", ($(window).height() - $("header").height() - $(".title-section").height()) * 0.8 + "px");
	$("video").width($(window).width()*0.6);
	$("#player").width($(window).width()*0.6);
	$('#danmu').css("max-width",($("video").width()));
	$('#danmu').css("max-height",($("video").height()));
    $('#danmu').width($("video").width);
	$('#danmu').height($("video").height);
    $('.videoframe').css("max-width",($("video").width()));
	$('.videoframe').css("max-height",($("video").height()));
    $('.videoframe').width($(window).width);
	$('.videoframe').height($(window).height);
});
function play(){
if (playing) {
             $('video').trigger('pause');
             playing = false;
             $("#play").css("background-image", "url(src/img/play.SVG)");
         } else {
             $('video').trigger('play');
             playing = true;
             $("#play").css("background-image", "url(src/img/pause.SVG)");
         }
}