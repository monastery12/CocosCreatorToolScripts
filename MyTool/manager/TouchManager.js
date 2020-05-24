
var TouchManager = {

    addTouchStar(touchNode,touchEvent,target){
        touchNode.on(cc.Node.EventType.TOUCH_START,function (event) {
            touchEvent.call(target,event);
        })
    },

    addTouchMove(touchNode,touchEvent,target){
        touchNode.on(cc.Node.EventType.TOUCH_MOVE,function (event) {
            touchEvent.call(target,event);
        })
    },

    addTouchEnd(touchNode,touchEvent,target){
        touchNode.on(cc.Node.EventType.TOUCH_END,function (event) {
            touchEvent.call(target,event);
        })
    },

    addTouchCancel(touchNode,touchEvent,target){
        touchNode.on(cc.Node.EventType.TOUCH_CANCEL,function (event) {
            touchEvent.call(target,event);
        })
    }
}

module.exports = TouchManager;