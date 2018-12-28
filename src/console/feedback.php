<?php
//error_reporting(0);
header("Content-Type: text/html;charset=utf-8");
$ip = $_SERVER['REMOTE_ADDR'];
$title = $_GET["title"];
$content = $_GET["content"];
//-----------------------------
$con = mysqli_connect("localhost:3306", "root", "lovesuit");
mysqli_select_db($con, "sslive");
if (mysqli_num_rows(mysqli_query($con, "SELECT Id FROM feedback WHERE IP='$ip'")) <= 5) {
    $result = mysqli_query($con, "INSERT INTO feedback VALUES(NULL,'$ip','$title','$content')");
    if (!$result){
        echo "错误！" . mysqli_error($con);
    } else {
        echo "success";
    }
} else {
    echo "您提交了过多的反馈";
}
mysqli_close($con);
?>