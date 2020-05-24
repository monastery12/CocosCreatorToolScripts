


cc.Class({
    extends: cc.Component,

    properties: {

        // loadNode:cc.Node,
        // btnNode:cc.Node,
        lbChooseStrItem:cc.Label,

        dropDownItem:cc.Prefab,
        contentItem:cc.Node,
        dropDownBoxNode:cc.Node,

        openIconNode:cc.Node,
        closeIconNode:cc.Node,


        chooseIndex:0,
    },



    start () {
        cc.systemEvent.on('DROP_DOWN_BOX',this.chooseDropDownBox.bind(this) );
        this.init();
        window.GL.PlayerManager.province = this.chooseIndex;
    },

    init(){

        this._dropDownStrArr = [];
        let confDataMap = window.GL.JsonData.jsonData.Map;

        for(let i = 0 ; i < confDataMap.length ;i++){
            this._dropDownStrArr.push(confDataMap[i].province);
        }



        for(let i = 0 ; i < this._dropDownStrArr.length; i++){
            let dropDownItem ;

            if(this.contentItem.children[i]){
                dropDownItem = this.contentItem.children[i];
            }else {
                dropDownItem = cc.instantiate(this.dropDownItem);
                dropDownItem.setParent(this.contentItem);
            }

            dropDownItem.getComponent('dropDownItem').init(i, this._dropDownStrArr[i]);
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

    },


    initUI(){
        let str = this._dropDownStrArr[this.chooseIndex];
        this.lbChooseStrItem.string = str;
        this.dropDownBoxNode.active = false;

        this.openIconNode.active = true;
        this.closeIconNode.active = false;
    },

    chooseDropDownBox(index){
        this.chooseIndex = index;
        this.initUI();
        window.GL.PlayerManager.province = this.chooseIndex;

        this._open = false;
        this.dropDownBoxNode.active = false;
    },

    onDestroy() {
        cc.systemEvent.off('DROP_DOWN_BOX',this.chooseDropDownBox.bind(this));
    },

    btnSure(){

        //播放音效
        window.GL.AudioManager.playEffect('button',false);
        // this.btnNode.active = false;
        window.GL.PlayerManager.province = this.chooseIndex;
        cc.director.loadScene("game");
    },
});
