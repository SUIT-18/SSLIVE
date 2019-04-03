<?php
$cmd=$_POST["cmd"];
header("Content-Type: text/html;charset=utf-8");
if ($cmd=="next"){
	$json_string = file_get_contents("../../programlist.json");// 从文件中读取数据到PHP变量
    $data = json_decode($json_string,true);// 把JSON字符串转成PHP数组
    $data["current"]=$data["current"]+1;
    $json_strings = json_encode($data, JSON_UNESCAPED_UNICODE);
	var_dump($json_strings);
    $code = file_put_contents("../../programlist.json",$json_strings);//写入
	if($code>0){
		echo "success";
	}
}
if ($cmd=="last"){
	$json_string = file_get_contents("../../programlist.json");// 从文件中读取数据到PHP变量
    $data = json_decode($json_string,true);// 把JSON字符串转成PHP数组
    $data["current"]=$data["current"]-1;
    $json_strings = json_encode($data, JSON_UNESCAPED_UNICODE);
    file_put_contents("../../programlist.json",$json_strings);//写入
	if($code>0){
		echo "success";
	}
}
?>