
var KeyBoardManager = {

    initAddKeyBoardEvent(){
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    initOffKeyBoardEvent(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    //键盘按下响应事件
    onKeyDown(event){
        var macro = cc.macro;
        switch(event.keyCode) {
            case macro.KEY.a:
            case macro.KEY.left:


                break;
            case macro.KEY.d:
            case macro.KEY.right:


                break;
        }
    },

    //键盘弹起响应事件
    onKeyUp(event){
        var macro = cc.macro;
        switch(event.keyCode) {
            case macro.KEY.a:
            case macro.KEY.left:


                break;
            case macro.KEY.d:
            case macro.KEY.right:


                break;
        }
    },
};

module.exports = KeyBoardManager;