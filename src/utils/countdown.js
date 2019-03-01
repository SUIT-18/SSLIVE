var end = new Date("2019/04/03,19:00:00");
var countdown;
function newtime() {
    var now = new Date();
    var rest = parseInt((end.getTime() - now.getTime()) / 1000);
    var day = parseInt(rest / 3600 / 24);
    var hour = parseInt((rest / 3600) % 24);
    var min = parseInt((rest / 60) % 60);
    var sec = parseInt(rest % 60);
    if (day.toString().length == 1) { day = "0" + day }
    if (hour.toString().length == 1) { hour = "0" + hour }
    if (min.toString().length == 1) { min = "0" + min }
    if (sec.toString().length == 1) { sec = "0" + sec }
    if (rest <= 0) {
        $("#timer").html('00 <span class="small">天</span> 00 <span class="small">时</span> 00 <span class="small">分</span> 00 <span class="small">秒</span>');
        clearInterval(countdown);
    } else {
        $("#timer").html(day + ' <span class="small">天</span> ' + hour + ' <span class="small">时</span> ' + min + ' <span class="small">分</span> ' + sec + ' <span class="small">秒</span>');
    }
}
window.onload = function () {
    countdown = setInterval(newtime, 1000);
}