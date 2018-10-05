//WebSocket
var wsServer = 'ws://localhost:9505';
var websocket = new WebSocket(wsServer);
websocket.onopen = function (evt) {
  cons("Connected to WebSocket server.");
  //连上之后就打开弹幕
  $('#danmu').danmu('danmuResume');
};

websocket.onclose = function (evt) {
  cons("Disconnected");
};

websocket.onmessage = function (evt) {
  cons('Retrieved data from server: ' + evt.data);
  var time = $('#danmu').data("nowTime") + 1;
  var text_obj = evt.data + ',"time":' + time + '}';//获取加上当前时间
  cons(text_obj);
  var new_obj = eval('(' + text_obj + ')');
  $('#danmu').danmu("addDanmu", new_obj);//添加弹幕
};

websocket.onerror = function (evt, e) {
  cons('Error occured: ' + evt.data);
};



//初始化
$("#danmu").danmu({
  left: 500,
  top: 100,
  margin: 0,
  height: "100%",
  width: "500px",
  speed: 6000,
  opacity: 0.5,
  font_size_small: 16,
  font_size_big: 24,
  top_botton_danmu_time: 6000,
});
//一个定时器，监视弹幕时间并更新到页面上
function timedCount() {
  $("#time").text($('#danmu').data("nowTime"));
  if (debugmode) {
    t = setTimeout("timedCount()", 50);
  }
}
timedCount();


function starter() {
  $('#danmu').danmu('danmuStart');
}
function pauser() {
  $("#rr").css("display", "inline-block");
  $("#pr").css("display", "none");
  $('#danmu').danmu('danmuPause');
}
function resumer() {
  $("#pr").css("display", "inline-block");
  $("#rr").css("display", "none");
  $('#danmu').danmu('danmuResume');
}
function stoper() {
  $('#danmu').danmu('danmuStop');
}
function getime() {
  alert($('#danmu').data("nowTime"));
}
function getpaused() {
  alert($('#danmu').data("paused"));
}

//发送弹幕，使用了文档README.md第7节中推荐的方法
function send() {
  var text = document.getElementById('text').value;
  var color = document.getElementById('color').value;
  var position = document.getElementById('position').value;
  //var time = $('#danmu').data("nowTime")+1;
  // var size = document.getElementById('text_size').value;
  var size = "小文字";
  //var text_obj='{ "text":"'+text+'","color":"'+color+'","size":"'+size+'","position":"'+position+'","time":'+time+'}';
  //为了处理简单，方便后续加time，和isnew，就先酱紫发一半吧。
  //注：time为弹幕出来的时间，isnew为是否加边框，自己发的弹幕，常理上来说是有边框的。
  var text_obj = '{ "text":"' + text + '","color":"' + color + '","size":"' + size + '","position":"' + position + '"';
  //利用websocket发送
  websocket.send(text_obj);
  //清空相应的内容
  document.getElementById('text').value = '';
}
//调整透明度函数
function op() {
  var op = document.getElementById('op').value;
  $('#danmu').danmu("setOpacity", op / 100);
}

//调隐藏 显示
function changehide() {
  var op = document.getElementById('op').value;
  op = op / 100;
  if (document.getElementById("ishide").checked) {
    $("#danmu").danmu("setOpacity", 1)
  } else {
    $("#danmu").danmu("setOpacity", 0)

  }
}

//设置弹幕时间
function settime() {
  var t = document.getElementById("set_time").value;
  t = parseInt(t)
  $('#danmu').danmu("setTime", t);
}