$("#danmu").css({ "background-color": "black", "opacity": "0.5" });
var wsServer = 'wss://backend.ssersay.cn:9505';
var websocket = new WebSocket(wsServer);
function load_danmu() {
  websocket.onopen = function (evt) {
    $("#send").removeAttr("disabled");
    $("#send").css("background-color", "rgb(200, 160, 106)");
    //连上之后就打开弹幕
    $('#danmu').danmu('danmuResume');
  };

  websocket.onmessage = function (evt) {
    var time = $('#danmu').data("nowTime") + 1;
    var text_obj = evt.data + ',"time":' + time + '}';//获取加上当前时间
    var new_obj = eval('(' + text_obj + ')');
    $('#danmu').danmu("addDanmu", new_obj);//添加弹幕
    var history = text_obj.toString();
    var text_history = "<b>"+history.split('"')[3]+"</b><br>";
    $("#history").append(text_history);
    $("b").css("background-color","yellow");
  };
} 
load_danmu();
//初始化
$("#danmu").danmu({
  left: 500,
  top: 100,
  margin: 0,
  height: "100%",
  width: "1000px",
  speed: 6000,
  opacity: 0.5,
  font_size_small: 16,
  font_size_big: 24,

});
//一个定时器，监视弹幕时间并更新到页面上
function timedCount() {
  $("#time").text($('#danmu').data("nowTime"));
    t = setTimeout("timedCount()", 50);
}
timedCount();
function send() {
  var text = document.getElementById('text').value;
  var color = document.getElementById('color').value;
  var position = document.getElementById('position').value;
  var size = "小文字";
  var text_obj = '{ "text":"' + text + '","color":"' + color + '","size":"' + size + '","position":"' + position + '"';
  websocket.send(text_obj);
  document.getElementById('text').value = '';
  }