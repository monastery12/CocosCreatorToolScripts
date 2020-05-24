

cc.Class({
    extends: cc.Component,

    properties: {

    },



    start () {

    },

    addBasicEvent(){

    },

    //坐标变化
    addPositionChange(targetNode){
        targetNode.on(cc.Node.EventType.POSITION_CHANGED, function () {

        }, this);
    },


    //缩放变化
    addScaleChange(targetNode){
        targetNode.on(cc.Node.EventType.SCALE_CHANGED, function () {

        }, this);
    },

    //尺寸变化
    addSizeChange(targetNode){
        targetNode.on(cc.Node.EventType.SIZE_CHANGED, function () {

        }, this);
    },

    //锚点变化
    addAnchorChange(targetNode){
        targetNode.on(cc.Node.EventType.ANCHOR_CHANGED, function () {

        }, this);
    },

    //颜色变化
    addColorChange(targetNode){
        targetNode.on(cc.Node.EventType.COLOR_CHANGED, function () {

        }, this);
    },

    //添加子节点变化
    addChildChange(targetNode){
        targetNode.on(cc.Node.EventType.CHILD_ADDED, function () {

        }, this);
    },


});
