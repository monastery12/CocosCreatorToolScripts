

var ConfigModel = require("ConfigModel");
var MyAnimManager = require("MyAnimManager");
var AdComponent = require("AdComponent");

cc.Class({
    extends: cc.Component,

    properties: {
        lbReward:cc.Label,
        lbCashSub:cc.Label,
        lbCashHad:cc.Label,
        animNode:cc.Node,
        adComponent:AdComponent,
        btnContinueNode:cc.Node,
    },


    start () {
        if(window._redPackReward){
            this.initUI();
        }else {
            this.randomCash();
            this.initUI();
        }

        this.adComponent.node.active = true;
        this.adComponent.init(2,this.btnClickLinqu,this);
        this.lbReward.node.active = true;

        window.GL.AudioManager.playEffect('open',false);
    },

    initUI(){
        this.lbReward.string = window._redPackReward;
        this.lbCashSub.string = window.GL.GLFunc.truncPoint(ConfigModel.cashMax - window.GL.PlayerManager.cash,2);
        this.lbCashHad.string = window.GL.PlayerManager.cash;

        MyAnimManager.spreadAnim(this.animNode);
    },

    //随机金钱
    randomCash(){

        if(window._redPackReward){
            return ;
        }

        //剩余可以随机的金钱
        let residueCash =  ConfigModel.cashMax - window.GL.PlayerManager.cash ;

        let randomNum = Math.random();

        if(residueCash <= 1 ){
            residueCash = 0.01;
        }else if( residueCash <ConfigModel.cashMax/10 ){
            residueCash = (ConfigModel.cashMax/5) * randomNum * randomNum * 0.5 + 0.01;
        }else if(residueCash < ConfigModel.cashMax/5 ){
            residueCash = residueCash * randomNum * randomNum * 0.8  + 0.01;
        }else{
            residueCash = residueCash * randomNum  + 0.01;
        }

        residueCash = window.GL.GLFunc.truncPoint(residueCash,2);
        window._redPackReward = residueCash;
    },

    btnClickClose(){
        window.GL.AudioManager.playEffect("button",false);
        this.node.destroy();
    },

    //领取
    btnClickLinqu(){

        window.GL.AudioManager.playEffect("button",false);
        this.lbReward.node.active = false;
        window.GL.PlayerManager.cash += window._redPackReward;
        window.GL.PlayerManager.redPackTime = ConfigModel.redPackTime;

        this.lbCashSub.string = window.GL.GLFunc.truncPoint(ConfigModel.cashMax - window.GL.PlayerManager.cash,2);
        this.lbCashHad.string = window.GL.PlayerManager.cash;

        window._redPackReward = 0;
        this.adComponent.node.active = false;
        this.btnContinueNode.active = true;


    }


});
