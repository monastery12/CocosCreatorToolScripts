
var BaseComponent = require("BaseComponent");
cc.Class({
    extends: BaseComponent,

    properties: {
        uiContent:cc.Node,
    },

    start () {
        this.gyRegEvent(window.GL.EventDef._msg_load_ui,this.openUI,this);
    },

    openUI(uiName){

        if( this.checkIsHadNode(uiName) ){
            return ;
        }

        let uiPath = 'prefab/'+uiName;
        cc.loader.loadRes(uiPath,cc.Prefab,function (err,prefab) {
            if(!err){
                let ui = cc.instantiate(prefab);
                ui.setParent(this.uiContent);
            }
        }.bind(this) );
    },

    checkIsHadNode(uiName){
        let ui = this.uiContent.getChildByName(uiName);
        if(ui){
            ui.active = true;
            return true;
        }else {
            return false;
        }
    },

});
