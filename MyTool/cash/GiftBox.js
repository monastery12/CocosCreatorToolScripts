var PointManager = require("PointManager");
var ConfigModel = require("ConfigModel");
var AdComponent = require("AdComponent");

cc.Class({
    extends: cc.Component,

    properties: {
        animNode:cc.Node,
        giftItemArr:[cc.Node],
        posItemArr:[cc.Node],
        startPosNode:cc.Node,
        backPosNode:cc.Node,

        giftItemTemp:cc.Prefab,

        btnLinquNode:cc.Node,
        lbCash:cc.Label,
        lbDiamondNum:cc.Label,

        adComponent:AdComponent,
    },


    start () {
        this._cashNum = 0;
        this._fragmenArr = [];

        this.btnLinquNode.active = false;

        this.adComponent.init(2,this.BtnLinqu,this);
        this.OpenBox();

        this._giftItemRealHadArr = [];
        this._giftItemTempArr = [];
    },

    //打开箱子
    OpenBox(){

        let self = this;
        let nCount = 0;
        let giftCount = this.giftItemArr.length;

        setTimeout(function () {
            window.GL.AudioManager.playEffect('Box',false);
        },1000);

        self.animNode.runAction(cc.repeat(cc.sequence([

            cc.repeat(cc.sequence([

                cc.callFunc(()=>{
                    //播放礼包声音
                }),
                cc.rotateTo(0.1,8),

                cc.rotateTo(0.1,-8),

            ]),2),

            cc.rotateTo(0.1,0),

            cc.callFunc(()=>{
                self.animNode.runAction(cc.sequence([

                    cc.scaleTo(0.2,1.15,0.8),

                    cc.scaleTo(0.4,0.95,1.1),

                    cc.callFunc(()=>{

                        this.CheckShowItem(nCount);

                        nCount ++;

                        if(nCount==giftCount){
                            this.animNode.scaleX = 1;
                            this.animNode.scaleY = 1;

                            this.btnLinquNode.active = true;
                        }
                    }),
                    cc.scaleTo(0.3,1,1),
                ]));
            })
        ]),giftCount) );
    },

    RunItemShow(index){

        let self = this;
        let tWorldPos   =   PointManager.localToWorldPoint(this.posItemArr[index]);
        let tLocalPos    =   PointManager.worldToLocalPoint(tWorldPos,this.giftItemArr[index].parent);


        this.giftItemArr[index].runAction(cc.sequence([

            cc.callFunc(()=>{
                self.giftItemArr[index].scaleX = 0;
                self.giftItemArr[index].scaleY = 0;

                PointManager.setNodePosToOriginNodePos(self.giftItemArr[index],self.startPosNode);
            }),

            cc.scaleTo(0.2,1),

            cc.moveTo(1,tLocalPos),

            cc.callFunc(()=>{

            })
        ]));
    },

    RunItemTempShow(giftItemTemp,index){

        let self = this;
        let tWorldPos   =   PointManager.localToWorldPoint(this.posItemArr[index]);
        let tLocalPos    =   PointManager.worldToLocalPoint(tWorldPos,giftItemTemp.parent);


        giftItemTemp.runAction(cc.sequence([

            cc.callFunc(()=>{
                giftItemTemp.scaleX = 0;
                giftItemTemp.scaleY = 0;

                PointManager.setNodePosToOriginNodePos(giftItemTemp,self.startPosNode);
            }),

            cc.scaleTo(0.2,1),

            cc.moveTo(1,tLocalPos),

            cc.callFunc(()=>{

            })
        ]));
    },

    addGiftItemTemp(index){
        let giftItemTemp = cc.instantiate(this.giftItemTemp);
        giftItemTemp.setParent(this.giftItemArr[index].parent);
        giftItemTemp.setPosition(this.giftItemArr[index]);
        giftItemTemp.getComponent("giftItemTemp").init();
        this._giftItemRealHadArr.push(giftItemTemp);
        this._giftItemTempArr.push(giftItemTemp);
        this.RunItemTempShow(giftItemTemp,index);
    },

    //检查能不能显示
    CheckShowItem(index){

        if(index == 4){
            //奖励红包
            if(window.GL.PlayerManager.cash < ConfigModel.cashMax - 0.08 ){

                this.RandomCashNum();
                this.RunItemShow(index);

                this._giftItemRealHadArr.push(this.giftItemArr[index]);
            }else {
                //用零时gift代替
                this.addGiftItemTemp(index);
            }
        }
        else if(index == 5){
            this._diamondNum = window.GL.GLFunc.randomInt(200,400);
            this.lbDiamondNum.string = this._diamondNum;
            this._giftItemRealHadArr.push(this.giftItemArr[index]);
            this.RunItemShow(index);
        }
        else
            {
            //奖励碎片
            if(window.GL.PlayerManager.fragment[index] < ConfigModel.fragmentMax-1){
                //箱子里面的东西动画
                this.RunItemShow(index);
                this._fragmenArr[index] = 1;
                this._giftItemRealHadArr.push(this.giftItemArr[index]);
            }else {
                //用零时gift代替
                this.addGiftItemTemp();
            }
        }
    },

    //随机红包数额
    RandomCashNum(){

        this._cashNum = 0;
        let residueCash = ConfigModel.cashMax - window.GL.PlayerManager.cash;          //剩余可领取的红包数额

        let random_1 = Math.random();
        let random_2 = Math.random();

        if( random_1 < 0.5  && residueCash > 20 ){           //前期可以多给一点
            this._cashNum = residueCash * random_1 * 0.5 ;        //保底
        }else {
            if( residueCash < 10 ){
                this._cashNum = residueCash * random_1 * random_2 ;
            }
            else if(residueCash < 5 ){
                this._cashNum = residueCash * random_1 * random_2 ;
            }
            else if(residueCash < 2 ){
                this._cashNum = residueCash * 0.01 ;
            }
        }

        this._cashNum = window.GL.GLFunc.truncPoint(this._cashNum,2);            //保留两位小数
        this._cashNum += 0.01;
        this.lbCash.string = Math.trunc(this._cashNum*100) / 100;
    },

    //关闭
    BtnClose(){
        window.GL.AudioManager.playEffect('button',false);
        //销毁
        this.node.destroy();
    },

    //领取
    BtnLinqu(){
        //红包
        window.GL.PlayerManager.cash += this._cashNum;

        for(let i = 0 ; i < this._fragmenArr.length ; i ++){
            window.GL.PlayerManager.fragment[i] += this._fragmenArr[i];
        }

        window.GL.PlayerManager.diamond += this._diamondNum;

        let backTime = 0.8;

        for(let i = 0 ; i < this._giftItemRealHadArr.length ; i++){

            let worldPos = PointManager.localToWorldPoint(this.backPosNode);
            let backPos = PointManager.worldToLocalPoint(worldPos,this.giftItemArr[i].parent);

            let actionBack =
                cc.spawn([
                    cc.moveTo(backTime,backPos),
                    cc.scaleTo(backTime,0.1)
                ]);
            this._giftItemRealHadArr[i].runAction( actionBack );
        }

        //刷新时间
        window.GL.PlayerManager.giftTime = 60 * 3;

        setTimeout(function () {

            //销毁零时item
            for(let i = 0 ; i < this._giftItemTempArr.length;i++){
                this._giftItemTempArr[i].destroy();
            }
            //关闭
            this.BtnClose();

        }.bind(this),backTime * 1000);


    },


});
