

cc.Class({
    extends: cc.Component,

    properties: {
        chooseContent:cc.Node,
        chooseItem:cc.Prefab,

        chooseTime:1,
        _chooseTime:1,
        _rightIndex:1,
    },

    start () {
        cc.systemEvent.on('CHOOSE_COMPONENT',this.getChoose.bind(this));
    },


    getChoose(chooseIndex){

        if(this._chooseTime > 0){
            this._chooseTime -= 1;

            if(this._rightIndex == chooseIndex){
                //选中
            }else {
                //选错
            }
        }
    },

    /**
     *
     * @param chooseData
     */
    init(chooseData){

        //初始化一些数据
        this._chooseTime = this.chooseTime;
        this._rightIndex = chooseData.rightIndex;

        let chooseArr = chooseData.chooseArr;

        for(let i = 0 ; i < chooseArr.length ; i ++){
            let chooseItem = null;

            if(this.chooseContent.children[i]){
                chooseItem = this.chooseContent.children[i];
            }else {
                chooseItem = cc.instantiate(this.chooseItem);
                chooseItem.parent = this.chooseContent;
            }
            chooseItem.getComponent("chooseItem").init(chooseArr[i]);
        }
    },

    onDestroy() {
        cc.systemEvent.off('CHOOSE_COMPONENT',this.getChoose.bind(this) );
    },
});
