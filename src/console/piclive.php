<?php
    //error_reporting(0);
    if ($_POST["pw"] != ""){
        if($_POST["pw"] == "lovesuit"){
            die("success");
        } else {
            die("密码错误！");
        }
    }
    $data = array();
    $data["text"] = $_POST["text"];
    $data["img1w"] = $_POST["img1w"];
    $data["img1h"] = $_POST["img1h"];
    $data["img2w"] = $_POST["img2w"];
    $data["img2h"] = $_POST["img2h"];
    $imgname1 = $_FILES['img1']['name'];
        $tmp1 = $_FILES['img1']['tmp_name'];
        $filepath1 = '../piclive/';
        if (move_uploaded_file($tmp1, $filepath1 . $imgname1)) {
            $data["Img1"] = $imgname1;
            $imgname2 = $_FILES['img2']['name'];
            $tmp2 = $_FILES['img2']['tmp_name'];
            $filepath2 = '../piclive/';
            if (move_uploaded_file($tmp2, $filepath2 . $imgname2)) {
                $data["Img2"] = $imgname2;
            } else {
                die("上传第二张图片时失败:". $_FILES["img2"]["error"]);
            }
        } else {
            die("上传第一张图片时失败:". $_FILES["img1"]["error"]);
        }
    $json = json_encode($data, JSON_UNESCAPED_UNICODE);
    $file = fopen('../piclive/piclive.json','w+');
    fwrite($file, $json);
    fclose($file);
    echo "上传成功！";
?>