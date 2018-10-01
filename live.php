<?php session_start(); ?>
<!DOCTYPE html>
<!-- 电脑用户主页 -->
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta content="width=device-width,user-scalable=0;" name="viewport"/>
        <title>SSLIVE 2018 直播</title>
        <!-- 检测用户设备类型 -->
        <script src="src/utils/platforms.js" type="application/javascript"></script>
        <!-- 加载jQuery -->
        <script src="src/lib/jquery-3.3.1.min.js" type="application/javascript"></script>
    </head>
    <body>
        <div>
            <?php include 'player.php';?>
        </div>
    </body>
</html>
