<?php 
//创建websocket服务器对象，监听0.0.0.0:9505端口
$serv = new swoole_websocket_server("0.0.0.0", 9505, SWOOLE_PROCESS, SWOOLE_SOCK_TCP | SWOOLE_SSL);
//配置证书文件位置
$key_dir = "/var/ssl/";
$serv->set(array(
                'work_num'=>1,
                'ssl_cert_file'=>$key_dir.'backend.crt',
                'ssl_key_file' =>$key_dir.'backend.key'
                )
            );
//监听WebSocket连接打开事件
$serv->on('open', function ($serv, $request) {
    //var_dump($request->fd, $request->get, $request->server);
    //相当于记录一个日志吧，有连接时间和连接ip
    echo $request->fd.'-----time:'.date("Y-m-d H:i:s",$request->server['request_time']).'--IP--'.$request->server['remote_addr'].'-----';
});
 
//监听WebSocket消息事件
$serv->on('message', function ($serv, $frame) {
    //记录收到的消息，可以写到日志文件中
    echo "Message: {$frame->data}\n";
 
    //遍历所有连接，循环广播
    foreach($serv->connections as $fd){
        //如果是某个客户端，自己发的则加上isnew属性，否则不加
        if($frame->fd == $fd){
            $serv->push($frame->fd, $frame->data.',"isnew":""');
        }else{
            $serv->push($fd, "{$frame->data}");
        }
    }
});
 
//监听WebSocket连接关闭事件
$serv->on('close', function ($serv, $fd) {
    echo "client-{$fd} is closed\n";
});
 
$serv->start();
?>