//平台、设备和操作系统
var system ={
win : false,
mac : false,
x11 : false
};
//检测平台
var p = navigator.platform;
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
if(system.win||system.mac||system.x11){}
//上述条件均不满足时则为手机用户
else{
    window.location.href="live_mobile.php";//跳转到相应页面
}