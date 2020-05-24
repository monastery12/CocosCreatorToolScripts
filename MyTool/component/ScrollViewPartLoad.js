/**
 * 当item很多的时候，不会全部加载，只会部分加载
 * 等滑动到底部的时候，再继续加载
 */

cc.Class({
    extends: cc.Component,

    properties: {

        touchContent:cc.Node,
        loadItem:cc.Prefab,

        horizontal:false,

        spaceInterver:0,

        spaceTop_Left:0,
        spaceBottom_Right:0,

        singleDealNum:5,

        _firstInit:true,

    },


    start () {

        if(this.horizontal){                                //水平
            this._itemLength = this.loadItem.data.width;
        }else{                                              //垂直
            this._itemLength = this.loadItem.data.height;
        }
     
        this.initTouchEvent();
    },

    init(itemNum){

        this._itemNum = itemNum;

        //初始化长度
        if(this._firstInit){
            if(this.horizontal){
                this.touchContent.width = 0;
                this.touchContent.width += this.spaceTop_Left;
                this.touchContent.width += this.spaceBottom_Right;
            }else{
                this.touchContent.height = 0;
                this.touchContent.height += this.spaceTop_Left;
                this.touchContent.height += this.spaceBottom_Right;
            }
        }

        //
        for(let i = 0 ; i < this.singleDealNum && i < this._itemNum ; i++ ){
            if(this.horizontal){
                this.touchContent.width += this._itemLength;
                this.touchContent.width += this.spaceInterver
            }else{
                this.touchContent.height += this._itemLength;
                this.touchContent.height += this.spaceInterver;
            }
        }

        if(this.horizontal){
            this.touchContent.width -= this.spaceInterver;
        }else{
            this.touchContent.height -= this.spaceInterver;
        }



    },

    initTouchEvent(){
        if(!this.touchContent){
            return;
        }

        //滑动
        this.touchContent.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if(this.horizontal){
                
            }else{

            }
        }.bind(this),);
    },

});
