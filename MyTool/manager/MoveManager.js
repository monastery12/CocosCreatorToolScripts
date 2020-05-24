const ZHENGMIAN = 'zhengmian';
const CEMIAN = 'cemian';
const BEIMIAN = 'beimian';

var moveState = {
    left:                   1,
    right:                  2,
    top:                    3,
    bottom:                 4,

    left_top_bias:          5,
    right_top_bias:         6,
    left_bottom_bias:       7,
    right_bottom_bias:      8
};

cc.Class({
    extends: cc.Component,

    properties: {

        playerNode:cc.Node,
        animMan:cc.Animation,
        divInterver:2,


    },


    start () {

    },

    playAngryAnim(){
        this.animMan.playAdditive('angry');
    },

    //控制人物移动的时候显示 正面，侧面，还是背面
    moveOriginToTargetPoint(originPoint,targetPoint){

        if(Math.abs(originPoint.x - targetPoint.x ) < 10 && Math.abs(originPoint.y - targetPoint.y) < 10){
            return moveState.top;
        }

        let sub_x = targetPoint.x - originPoint.x == 0 ? 0.0001 : targetPoint.x - originPoint.x;      //避免 n / 0
        let sub_y = targetPoint.y - originPoint.y == 0 ? 0.0001 : targetPoint.y - originPoint.y;

        let absDivNum = Math.abs(sub_y / sub_x); //大小控制x轴y轴


        if(sub_x > 0){
            if(sub_y > 0){                                      //第一象限
                if( absDivNum >= this.divInterver){
                    return moveState.top;
                }else if(absDivNum >= (1/this.divInterver) && absDivNum < this.divInterver){
                    return moveState.right_top_bias;
                }else {
                    return moveState.right;
                }
            }else {
                if(absDivNum >= this.divInterver){              //第四象限
                    return moveState.bottom;
                }else if(absDivNum >= (1/this.divInterver) && absDivNum < this.divInterver){
                    return moveState.right_bottom_bias;
                }else {
                    return moveState.right;
                }
            }
        }else {
            if(sub_y >0){
                if(absDivNum >= this.divInterver){              //第二象限
                    return moveState.top;
                }else if(absDivNum >= (1/this.divInterver) && absDivNum < this.divInterver){
                    return moveState.left_top_bias;
                }else {
                    return moveState.left;
                }
            }else {                                             //第三象限
                if(absDivNum >= this.divInterver){
                    return moveState.bottom;
                }else if(absDivNum >= (1/this.divInterver) && absDivNum < this.divInterver){
                    return moveState.left_bottom_bias;
                }else {
                    return moveState.left;
                }
            }
        }


    },

    //设置移动状态
    setMoveState(originPoint,targetPoint){

        // if(originPoint.x == targetPoint.x && originPoint.y == targetPoint.y){
        //     this.animMan.play(BEIMIAN);             //播放背面
        // }

        // if(Math.abs(originPoint.x - targetPoint.x ) < 5 && Math.abs(originPoint.y - targetPoint.y) < 5){
        //     this.animMan.play(BEIMIAN);             //播放背面
        // }

        let state = this.moveOriginToTargetPoint(originPoint,targetPoint);
        switch (state) {
            case moveState.left:{
                this.playerNode.scaleX = 1;
                this.playerNode.scaleY = 1;
                this.animMan.play(CEMIAN);
                break;
            }
            case moveState.right:{
                this.playerNode.scaleX = -1;
                this.playerNode.scaleY = 1;
                this.animMan.play(CEMIAN);
                break;
            }
            case moveState.top:{
                this.playerNode.scaleX = 1;
                this.playerNode.scaleY = 1;
                this.animMan.play(BEIMIAN);             //播放背面
                break;
            }
            case moveState.bottom:{
                this.playerNode.scaleX = 1;
                this.playerNode.scaleY = 1;
                this.animMan.play(ZHENGMIAN);           //播放正面
                break;
            }
            case moveState.left_top_bias:{
                this.playerNode.scaleX = 1;
                this.playerNode.scaleY = 1;
                this.animMan.play(CEMIAN);
                break;
            }
            case moveState.left_bottom_bias:{
                this.playerNode.scaleX = 1;
                this.playerNode.scaleY = 1;
                this.animMan.play(CEMIAN);
                break;
            }
            case moveState.right_top_bias:{
                this.playerNode.scaleX = -1;
                this.playerNode.scaleY = 1;
                this.animMan.play(CEMIAN);
                break;
            }
            case moveState.right_bottom_bias:{
                this.playerNode.scaleX = -1;
                this.playerNode.scaleY = 1;
                this.animMan.play(CEMIAN);
                break;
            }
        }
    },

    setMoveStateBottom(){
        this.playerNode.scaleX = 1;
        this.playerNode.scaleY = 1;
        this.animMan.play(ZHENGMIAN);           //播放正面
    },

    setMoveStateUp(){
        this.playerNode.scaleX = 1;
        this.playerNode.scaleY = 1;
        this.animMan.play(BEIMIAN);             //播放背面
    },




});
