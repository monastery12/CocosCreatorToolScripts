

cc.Class({
    extends: cc.Component,

    properties: {

        longPressTime:0.5,            //长按时间
        timesPreScenonds:2,              //一秒两次
        touchNode: cc.Node,
    },

    start () {
        this._touchTime = 0;
        this.addTouchEvent();

    },

    init(callback,target)
    {
        this.target = target;
        this.callBack = callback;
    },

    addTouchEvent(){
        this.touchNode.on(cc.Node.EventType.TOUCH_START,function(){
            this._touchOn = true;
            window.GL._canClose = false;
            this.timesPreScenonds = 6;
            let interver = 1 / this.timesPreScenonds;

            this.schedule(this.beginCountTime,interver );
        }.bind(this));

        this.touchNode.on(cc.Node.EventType.TOUCH_END,function(){
            this._touchTime = 0;
            this.unschedule(this.beginCountTime);
            window.GL._canClose = true;
        }.bind(this));

        this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL,function(){
            this._touchTime = 0;
            this.unschedule(this.beginCountTime);
            window.GL._canClose = true;
        }.bind(this));
    },

    beginCountTime(){

        if(!this._touchOn){
            this.unschedule(this.beginCountTime);
            return ;
        }

        this.longPressTime = 0.25;
        let interver = 1 / this.timesPreScenonds;
        this._touchTime += interver;
        
        if(!this.touchNode.active || window.GL._longCompress == false){
            this._touchOn = false;
            this.unschedule(this.beginCountTime);
            return ;
        }

        if(this._touchTime > this.longPressTime){
            this.callBack.call(this.target);
        }
    },
});
