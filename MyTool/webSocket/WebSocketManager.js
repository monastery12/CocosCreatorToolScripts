
var WebSocketManager = {


    createWebSocket(url){
        var ws = new WebSocket(url);

        ws.onopen = function(evt) {
            console.log("连接服务器成功");
            //ws.send("Hello WebSockets!")
        };

        ws.onmessage = function(evt) {
            console.log("收到服务器消息",evt.data);
            if(typeof evt.data == String) {
                console.log("接收数据字符串");
            }
            if(evt.data instanceof ArrayBuffer){
                let buffer = evt.data;
                console.log("接收数据二进制数据");
            }
        };

        ws.onclose = function(evt) {
            console.log("关闭与服务器的连接")
        };

        ws.onerror = function(event) {
            console.log("发生错误 ",event);
        };
    }

}

module.exports = WebSocketManager;