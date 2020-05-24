/**
 * 1 如何获取唯一的userId
 * 2 请求字段
 * 3 返回数据格式
 */

var HttpMgr = {

    sendHttpRequest:function(uri, tabbleargs, callBackResponse)
    {
        return;
        let url = window.GL.Server.httpUrl + uri;

        let requestType = "POST";
        let xhr = cc.loader.getXMLHttpRequest();
        let args = null;
        window.GL.Lib._.forEach(tabbleargs || {}, function(value, key)
        {
            if(value && key)
            {
                if(args == null)
                {
                    args = "";
                    args = args + cc.js.formatStr("%s=%s",key, value);
                }
                else{
                    args = args + cc.js.formatStr("&%s=%s",key, value);
                }
            }
        });
        //get 不需要参
        if(requestType === "GET")
        {
            if(args)
            {
                url = cc.js.formatStr(url + "?%s", args)
            }
            xhr.open(requestType, url,true);
        }
        else{
            xhr.open(requestType, url,true);
            xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        }
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status <= 300)
            {
                callBackResponse(xhr.responseText, xhr.status);
            }
        };
        xhr.onerror = function()
        {
            callBackResponse(xhr.responseText, xhr.status);
        };

        xhr.send(args);
    },

    //发送存档给
    sendPlayerDataHttp()
    {
        return ;
        if(!CC_WECHATGAME)
            return;
        //发送给自己的服务器
        let senddata =
            {
                USERID:window.GL.Conf.userId,
                SAVE:window.GL.SaveManager.saveData,               //存档数据
            };

        HttpMgr.sendHttpRequest(
            "save",
            senddata,
            (resp, status)=>
            {
                if(status >= 200 && status <= 300)
                {
                    //发送成功
                }
                else
                {
                    //网络错误
                    setTimeout(()=>
                    {
                    }, 5000)
                }
            })
    },
}
module.exports = HttpMgr
