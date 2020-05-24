var ConfigModel = require("ConfigModel");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    start () {
        if(ConfigModel.showHongbao){
            this.node.opacity = 255;
            this.node.active = true;
        }else {
            this.node.active = false;
        }
    },

    btnClickQianBao(){
        window.GL.AudioManager.playEffect("button",false);
        window.GL.MessageCenter.emit(GL.EventDef._msg_load_ui,"CashManager");
    }
});
