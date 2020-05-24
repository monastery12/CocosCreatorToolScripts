var NotEnough = require("NotEnough");
var ConfigModel = require("ConfigModel");
cc.Class({
    extends: cc.Component,

    properties: {
        tipItemPrefab:cc.Prefab,
        tipItemContent:cc.Node,

        lbCash:cc.Label,
        lbManDuoshao:cc.Label,
        lbRemain:cc.Label,

        lbFrameReward:cc.Label,
        lbFrame20:cc.Label,
        lbFrame50:cc.Label,
        lbFrame100:cc.Label,
        lbFrame200:cc.Label,

        lbRewardSkin:cc.Label,
        lbSkinNum:cc.Label,
    },


    start () {
        this.initUI();
    },

    initUI(){
        this.lbCash.string = `${window.GL.GLFunc.truncPoint( window.GL.PlayerManager.cash ,2 )}元`;
        this.lbManDuoshao.string = `红包满${ConfigModel.cashMax}元即可提现`;
        this.lbRemain.string = window.GL.GLFunc.truncPoint( ConfigModel.cashMax - window.GL.PlayerManager.cash ,2);

        this.lbFrameReward.string = `${ConfigModel.fragmentReward}元`;
        this.lbFrame20.string = `${window.GL.PlayerManager.fragment[0]}/${ConfigModel.fragmentMax}`;
        this.lbFrame50.string = `${window.GL.PlayerManager.fragment[1]}/${ConfigModel.fragmentMax}`;
        this.lbFrame100.string = `${window.GL.PlayerManager.fragment[2]}/${ConfigModel.fragmentMax}`;
        this.lbFrame200.string = `${window.GL.PlayerManager.fragment[3]}/${ConfigModel.fragmentMax}`;

        this.initSkinUI();
    },

    initSkinUI(){
        this.lbRewardSkin.string = `${ConfigModel.skinReward}元`;

        let had = 0;
        for(let i = 0 ; i < window.GL.PlayerManager.skinsData.length ; i++){
            if(window.GL.PlayerManager.skinsData[i]){
                had ++;
            }
        }
        this.lbSkinNum.string = ConfigModel.skinConfigData.length - had;
    },

    btnClickLinqu(){
        window.GL.AudioManager.playEffect('button',false);
        NotEnough.ShowNotEnough(this.tipItemContent,this.tipItemPrefab,1,150);
    },

    btnClickClose(){
        window.GL.AudioManager.playEffect('button',false);
        this.node.destroy();
    },
});
