
var ConfigModel = require("ConfigModel");
var BaseComponent = require("BaseComponent");

cc.Class({
    extends: BaseComponent,

    properties: {
        btnRedPackNode:cc.Node,
        btnGiftBoxNode:cc.Node,
    },


    start () {
        this.gyRegEvent(GL.EventDef._msg_cash_change,this.checkShowRedPackBtn,this);
        this.checkShowRedPackBtn();
    },

    checkShowRedPackBtn(){

        if(ConfigModel.showHongbao){
            if(window.GL.PlayerManager.cash < ConfigModel.cashMax - 0.08){
                this.btnRedPackNode.active = true;
                this.btnGiftBoxNode.active = true;
            }else {
                this.btnRedPackNode.active = false;
                this.btnGiftBoxNode.active = false;
            }

        }else {
            this.btnGiftBoxNode.active = false;
            this.btnRedPackNode.active = false;
        }



    },
});
