

var AdComponent = cc.Class({
    extends: cc.Component,

    properties: {

        nodeFreeButton:cc.Node,
        nodeVidoButton:cc.Node,
        nodeShareButton:cc.Node,

    },

    start()
    {
        if(window.GL._platform == '4399' && window.GL._release ){

            let callBackSucess = function(){
                this.nodeVidoButton.active = true;
            }.bind(this);

            let callBackFail = function(){
                this.nodeVidoButton.active = false;
            }
            window.GL.SDK_4399.getVideoCanPlay(callBackSucess,callBackFail,this);
        }
    },

    init(key, callback,target)
    {
        this.target = target;
        this.callBack = callback;
        // this.nodeFreeButton.active  = (key == 1);
        // this.nodeVidoButton.active  = (key == 2);
        // this.nodeShareButton.active = (key == 3);
    },

    //免费
    buttonFree(){

        let self = this;
        //播放音效
        window.GL.AudioManager.playEffect('button',false);

        return ;

    },

    //视频
    buttonVidio(){

        let self = this;

        //播放音效
        window.GL.AudioManager.playEffect('button',false);

        if(window.GL.CheckPlatform.checkIsAndroid() ){

            self.callBack && self.callBack.call(self.target);

            // let bReward=false;
            // BASE.SDK.ShowVideoAd((nRet)=>{
            //
            //     if (nRet == "1") {
            //         bReward = true;
            //     }else if(nRet=="2"){
            //         if(bReward==true){
            //             self.callBack.call(self.target);
            //         }else{
            //
            //         }
            //     }
            // });
        }else {
            if(window.GL._platform == '4399'){
                //4399api
                window.GL.SDK_4399.vidio(function () {
                    self.callBack && self.callBack.call(self.target);
                }.bind(this) );

            }else if(window.GL._platform == 'WX'){

                if(window.GL._canVideo){
                    window.GL.AdManager.playeRewardAd(function () {

                        self.callBack && self.callBack.call(self.target);

                    }.bind(this));
                }else {
                    window.GL.Share.shareGame(function () {
                        this.callBack.call(this.target);
                    }.bind(this));
                }

            }else if(window.GL._platform == 'TT'){

                window.GL.AdManager.playeRewardAd(function () {
                    self.callBack && self.callBack.call(self.target);
                }.bind(this));

            }else {
                this.callBack && this.callBack.call(this.target);
            }
        }

    },

    //分享
    buttonShare(){

        let self = this;
        //播放音效
        window.GL.AudioManager.playEffect('button',false);

        window.GL.Share.shareGame(function () {
            this.callBack.call(this.target);
        }.bind(this),this);
    },

});

module.exports = AdComponent;