

cc.Class({
    extends: cc.Component,

    properties: {
        layoutNode:cc.Node,
        btnNode:cc.Node,
        pop_rate:0.5,
    },


    // onLoad () {},

    start () {
        this.init();
    },

    init(){

        this._layoutLength = this.layoutNode.width;
        this._isPop = false;
        this.layoutNode.x = this._layoutLength;
        this.node.width = this.layoutNode.width;
        this.node.height = this.layoutNode.height;
    },

    btnClick(){
        if(this._isPop){
            this._isPop = false;
            this.layoutNode.stopAllActions();
            this.btnNode.scaleX = 1;
            this.layoutNode.runAction(cc.moveTo(this.pop_rate,cc.v2(this._layoutLength,0)));    //窗口处于弹出状态,点击则需要将其收回
        }else{
            this._isPop = true;
            this.layoutNode.stopAllActions();
            this.btnNode.scaleX = -1;
            this.layoutNode.runAction(cc.moveTo(this.pop_rate,cc.v2(0,0)));
        }
    },


    /**
     * 往下添加按钮回调函数
     */
});
