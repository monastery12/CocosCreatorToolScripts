/**
 *红包答题正确就能领取
 */
var NotEnough = require("NotEnough");
var MyAnimManager = require("MyAnimManager");

cc.Class({
    extends: cc.Component,

    properties: {
        weiwancheng:cc.Node,
        wancheng:cc.Node,

        notEnoughContent:cc.Node,
        notEnoughitem:cc.Prefab,

        lbTime:cc.Label,
    },

    start () {

    },

    update(dt){

        let stime = Math.floor( window.GL.PlayerManager.redPackTime );

        if(stime <= 0 ){
            this.lbTime.string = '待领取';
            this.weiwancheng.active = false;

            this.wancheng.active = true;

            if(!this._shakeIng){
                MyAnimManager.shakeAnim(this.wancheng);
                this._shakeIng = true;
            }


        }else {
            this.lbTime.string = window.GL.GLFunc.showTime(stime);
            this.weiwancheng.active = true;

            this.wancheng.active = false;
            this.wancheng.stopAllActions();

            this._shakeIng = false;
        }

        window.GL.PlayerManager.redPackTime -= dt;
    },

    //
    btnClickOpen(){

        window.GL.AudioManager.playEffect('button',false);
        if(window.GL.PlayerManager.redPackTime <= 0 && this.wancheng.active ){
            //打开背包
            window.GL.MessageCenter.emit(window.GL.EventDef._msg_load_ui,'RedPack');
        }else {
            NotEnough.ShowNotEnough(this.notEnoughContent,this.notEnoughitem,1,100);
        }
    }

});
