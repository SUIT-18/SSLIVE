<?php
$cmd = $_POST["cmd"];
header("Content-Type: text/html;charset=utf-8");
$json_string = file_get_contents("../../livestatus.json"); // 从文件中读取数据到PHP变量
$data = json_decode($json_string, true); // 把JSON字符串转成PHP数组
$data["hasLive"] = $cmd=="start";
$json_strings = json_encode($data, JSON_UNESCAPED_UNICODE);
$code = file_put_contents("../../livestatus.json", $json_strings); //写入
if ($code > 0) {
    echo "success";
}
?>