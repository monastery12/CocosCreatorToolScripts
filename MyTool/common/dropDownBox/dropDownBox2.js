


cc.Class({
    extends: cc.Component,

    properties: {

        loadNode:cc.Node,
        btnNode:cc.Node,
        lbChooseStrItem:cc.Label,

        dropDownItem:cc.Prefab,
        contentItem:cc.Node,
        dropDownBoxNode:cc.Node,

        openIconNode:cc.Node,
        closeIconNode:cc.Node,


        chooseIndex:0,
    },



    start () {
        cc.systemEvent.on('DROP_DOWN_BOX2',this.chooseDropDownBox.bind(this) );
        cc.systemEvent.on('DROP_DOWN_BOX',this.init.bind(this) );
        this.init();
        window.GL.PlayerManager.city = this.chooseIndex;
    },

    init(){

        let confDataMap = window.GL.JsonData.jsonData.Map;

        let provinceIndex = window.GL.PlayerManager.province;
        if(provinceIndex < 0){
            provinceIndex = 0;
        }

        let cityCtr = confDataMap[provinceIndex].city;
        this._dropDownStrArr = window.GL.GLFunc.getStr_StrArr(cityCtr);

        for(let i = 0 ; i < this.contentItem.children.length ; i++){
            this.contentItem.children[i].active = false;
        }

        for(let i = 0 ; i < this._dropDownStrArr.length; i++){
            let dropDownItem ;

            if(this.contentItem.children[i]){
                dropDownItem = this.contentItem.children[i];
                dropDownItem.active = true;
            }else {
                dropDownItem = cc.instantiate(this.dropDownItem);
                dropDownItem.setParent(this.contentItem);
                dropDownItem.active = true;
            }

            dropDownItem.getComponent('dropDownItem2').init(i, this._dropDownStrArr[i]);
        }

        this.initUI();
    },

    openDropDownBox(){

        //播放音效
        window.GL.AudioManager.playEffect('button',false);

        if(!this._open){
            this.dropDownBoxNode.active = true;
            this._open = true;
        }else {
            this._open = false;
            this.dropDownBoxNode.active = false;
        }

        this.openIconNode.active = false;
        this.closeIconNode.active = true;

        this.init();

    },


    initUI(){
        let str = this._dropDownStrArr[this.chooseIndex];
        this.lbChooseStrItem.string = str;
        // this.dropDownBoxNode.active = false;

        this.openIconNode.active = true;
        this.closeIconNode.active = false;
    },

    chooseDropDownBox(index){
        this.chooseIndex = index;
        this.initUI();
        window.GL.PlayerManager.city = index;

        this._open = false;
        this.dropDownBoxNode.active = false;
    },

    onDestroy() {
        cc.systemEvent.off('DROP_DOWN_BOX2',this.chooseDropDownBox.bind(this));
        cc.systemEvent.off('DROP_DOWN_BOX',this.init.bind(this));
    },

    btnSure(){

        //播放音效
        window.GL.AudioManager.playEffect('button',false);

        this.loadNode.active = true;
        this.btnNode.active = false;
        window.GL.PlayerManager.city = this.chooseIndex;
        cc.director.loadScene("game");
    },
});
