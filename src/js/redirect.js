var debugmode = false;
if (window.location.search.search("debug=1") > 0) { debugmode = true; }
var now = new Date().getTime();//当前时间
var liveplay = new Date(2018, 10, 25 ,8 , 00).getTime();//直播8点开始
var leftTime = liveplay - now;//计算时差
var delta = 1200000;//二十分钟
if (leftTime<=delta){
	//alert("已到开播时间前20分钟");无需跳转
}
else{
	//alert("未到开播日期");跳转
	if (debugmode){
		alert("debug模式下不跳转");
	}
	else{
		window.location.href = 'introduction.html';
	}
}