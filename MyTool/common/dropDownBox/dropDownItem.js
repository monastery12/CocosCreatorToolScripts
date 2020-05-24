

cc.Class({
    extends: cc.Component,

    properties: {
        lbStrItem:cc.Label,
    },


    start () {

    },

    init(index,str,callBackFunc,target){
        this._index = index;
        this.lbStrItem.string = str;

        this._callBackFunc = callBackFunc;
        this._target = target;
    },

    chooseDropDownItem(){

        //播放音效
        window.GL.AudioManager.playEffect('button',false);
        cc.systemEvent.emit('DROP_DOWN_BOX',this._index);
    },

});
