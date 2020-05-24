

cc.Class({
    extends: cc.Component,

    properties: {

        lbDes:cc.Label,
    },


    start () {

    },

    init(chooseData){

        this.lbDes.string = chooseData.des;
        this._chooseIndex = chooseData.index;
    },

    chooseBtn(){
        cc.systemEvent.emit('CHOOSE_COMPONENT',this._chooseIndex);
    },

    onDestroy() {

    },

});
