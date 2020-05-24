

cc.Class({
    extends: cc.Component,

    properties: {
        lbNum:cc.Label,
    },


    start () {

    },

    init(){
        this._coinNum = window.GL.GLFunc.randomInt(100,200);
        this.lbNum.string = this._coinNum;
    },

    onDestroy(){
        window.GL.PlayerManager.coin += this._coinNum;
    }
});
