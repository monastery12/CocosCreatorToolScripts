var BaseComponent = require("BaseComponent")

cc.Class({
    extends: BaseComponent,

    properties: {
        rootNode:cc.Node,
        lbTip:cc.Label,
        showTime:1,
    },


    start () {
        this.gyRegEvent(window.GL.EventDef._msg_msgTip,this.showMsgTip,this);
    },

    showMsgTip(str) {
        if(this.rootNode){

            this.lbTip.string = str;
            this.rootNode.opacity = 255;
            this.rootNode.active = true;

            this.rootNode.runAction( new cc.fadeOut(this.showTime));
        }
    }
});
