/**
 * ScrollView功能增强版
 * 增加滑动到第几个item，返回第几个item 的index
 */

cc.Class({
    extends: cc.Component,

    properties: {
        contentNode:cc.Node,
        viewNode:cc.Node,
    },

    start () {
        this.shakeEffect(3)
        this.index = 1;
        this.touch_start_x = 0;
        this.move_x = 0;
        this.max_index = this.contentNode.children.length;
        //**********************触摸开始
        this.viewNode.on(cc.Node.EventType.TOUCH_START,function (event) {
            console.log("触摸开始");
            this.touch_start_x = event.getLocationX();

        }.bind(this));

        //**********************触摸移动
        this.viewNode.on(cc.Node.EventType.TOUCH_MOVE,function (event) {
            let move_offset = event.getDelta().x;
            this.contentNode.x += move_offset;
        }.bind(this));

        //************************触摸离开
        this.viewNode.on(cc.Node.EventType.TOUCH_END,function (event) {
            let touch_end_x = event.getLocationX();                                 //
            console.log("滑动距离",touch_end_x);
            let move_offset = touch_end_x - this.touch_start_x ;                          //触摸差

            if( move_offset <= 0){
                let add_index = parseInt( Math.abs(move_offset) / 120 );
                this.index =  (this.index - add_index >= 1 ? this.index - add_index:1);

                for(let i = 0 ; i<this.max_index;i++){
                    this.contentNode.children[i].x = move_offset ;
                }

            }else {
                let add_index = parseInt(move_offset/120);
                this.index = (this.index + add_index <= this.max_index ?this.index + add_index:this.max_index );
            }
        }.bind(this));

    },

    // 参数：duration 震屏时间
    shakeEffect: function (duration) {
        this.viewNode.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.moveTo(0.02, cc.v2(5, 7)),
                    cc.moveTo(0.02, cc.v2(-6, 7)),
                    cc.moveTo(0.02, cc.v2(-13, 3)),
                    cc.moveTo(0.02, cc.v2(3, -6)),
                    cc.moveTo(0.02, cc.v2(-5, 5)),
                    cc.moveTo(0.02, cc.v2(2, -8)),
                    cc.moveTo(0.02, cc.v2(-8, -10)),
                    cc.moveTo(0.02, cc.v2(3, 10)),
                    cc.moveTo(0.02, cc.v2(0, 0))
                )
            )
        );

        setTimeout(() => {
            this.viewNode.stopAllActions();
            this.viewNode.setPosition(0,0);
        }, duration*1000);
    },

    btn_click(){
      console.log("*****************this.index = ",this.index);
    },
});
