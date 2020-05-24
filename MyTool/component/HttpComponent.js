

var HttpComponent = {

    getUserId(code){

        let senddata =
            {
                USERID:'',
                JSCODE:code
            };

        window.GL.HttpMgr.sendHttpRequest("logincheck", senddata, function (resp, status) {

            if (status >= 200)
            {
                try
                {
                    let playerdata = JSON.parse(resp);
                    if (playerdata)
                    {
                        switch (playerdata.errcode)
                        {
                            case 0:
                            {
                                // 1.保存微信userid  playerdata.list.userId

                                if(playerdata.list.data == null)
                                {
                                    // 服务器没有数据就使用本地数据
                                }
                                else
                                {
                                    // 没有本地数据就使用网络数据(玩家卸载了游戏，但是网络还有数据)
                                }
                                break
                            }
                        }
                    }
                }
                catch (e)
                {

                }
            }
            else
            {
                //网络错误
            }
        });
    },

    //获取服务器配置
    getConfig(){

        // let userId = 0;
        // let jsCode = 0;
        // let senddata = {
        //     USERID: userId || "",
        //     JSCODE: jsCode || ""
        // };
        //
        // HttpMgr.sendHttpRequest("logincheck", senddata, function (resp, status) {
        //
        //     console.log("*****************resp = ",resp);
        //     console.log("*****************status = ",status);
        // });
    },

    //获取存档
    getSaveData(){

    },

}
module.exports = HttpComponent