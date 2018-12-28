var end = new Date("2018/12/28,14:30:00");
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
    $("#timer").html(day + ' <span class="small">天</span> ' + hour + ' <span class="small">时</span> ' + min + ' <span class="small">分</span> ' + sec + ' <span class="small">秒</span>');
}
window.onload = function () {
    setInterval(newtime, 1000);
}