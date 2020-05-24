

cc.Class({
    extends: cc.Component,

    properties: {

        contentNode:cc.Node,        //
        maxNum:10,                  //最大数量

        space:5,                    //间隔
        vertical:false,             //垂直排列
        moveSpeed:100,              //移动速度

        left_to_right:false,
    },


    start () {
        this.init();
    },

    init(){
        this.dealQueue();
    },

    //增加
    pushContentNode(itemNode,callBackFunc){

        //避免重复添加
        for(let i = 0 ; i< this.contentNode.children.length ;i++){
            if(this.contentNode.children[i]._manId == itemNode._manId){
                return ;
            }
        }

        window.GL.PointManager.setOriginToTargetPoint(itemNode,this.contentNode);
        itemNode.position = cc.v2(-431,0);

        if(this.vertical){
            itemNode.x = 0;
        }else {
            itemNode.y = 0;
        }

        this.dealQueue(callBackFunc);
    },

    //减少
    popContentNode(){

        let itemNode = null;
        if( this.contentNode.children.length > 0 ){
            itemNode = this.contentNode.children[0];
            itemNode.removeFromParent(false);

            window.GL.GLFunc.gLog(`移除的manNode._manId = ${itemNode._manId}`);
        }
        this.dealQueue();
        return itemNode;
    },

    getLayoutComponent2Ing(){
        let itemNode = null;
        if(this.contentNode.children.length > 0){
            itemNode = this.contentNode.children[0];
        }
        if(itemNode){
            return itemNode._layoutComponent2Ing;
        }else {
            return true;
        }
    },

    //排队
    dealQueue(callBackFunc){

        for(let i = 0 ; i < this.contentNode.children.length ; i++){

            let itemNode = this.contentNode.children[i];
            itemNode._layoutComponent2Ing = true;

            let targetLen ;
            if(this.left_to_right){
                targetLen= i*this.space;
            }else {
                targetLen = -i*this.space;
            }

            let moveTime = 1;

            let movePoint = null ;
            if(this.vertical){
                let moveLen = Math.abs(itemNode.y - targetLen);
                moveTime = moveLen / this.moveSpeed;
                movePoint = cc.v2(0,-targetLen);   //垂直排列,x轴为0
            }else{
                let moveLen = Math.abs(itemNode.x - targetLen);
                moveTime = moveLen / this.moveSpeed;
                movePoint = cc.v2(targetLen,0);   //水平排列,y轴为0
            }


            let action_1 = cc.moveTo(moveTime,movePoint);
            let action_2 = cc.callFunc(function () {
                itemNode._layoutComponent2Ing = false;
            },this);
            let action = cc.sequence(action_1,action_2);

            this.scheduleOnce(function () {
                window.GL.GLFunc.gLog(`回调`);
                callBackFunc && callBackFunc();
            },moveTime);
            this.contentNode.children[i].stopAllActions();
            window.GL.GLFunc.gLog(`stopAllActions的manNode._manId = ${  this.contentNode.children[i]._manId}`);

            //this.contentNode.children[i].getComponent('MoveManager').setMoveState(this.contentNode.children[i].position,movePoint);
            this.contentNode.children[i].runAction(action);
        }
    },

    //下一个节点放入后处在的坐标
    getNextPoint(){
        let itemNum = this.contentNode.children.length;

        let targetLen = itemNum * this.space;

        let nextPoint = null;
        if(this.vertical){
            nextPoint = cc.v2(0,-targetLen);
        }else {
            nextPoint = cc.v2(targetLen,0);
        }

        //转世界坐标
        nextPoint = window.GL.PointManager.localToWorldPointByPointAndFatherNode(nextPoint,this.contentNode);

        return nextPoint;
    },

    //获取排队人数
    getQueueNum(){
        return this.contentNode.children.length;
    },

});
