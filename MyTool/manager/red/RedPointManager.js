

cc.Class({
    extends: cc.Component,

    properties: {
        doorUpgradeRed:cc.Node,

        stationUpgradeRed:cc.Node,
        stationUpgradeAnim:cc.Animation,

        // extraRed:cc.Node,

        taskRed:cc.Node,
        //
        // chairUpgradeRed:cc.Node,

        achiRed:cc.Node,
    },


    start () {

        let interver = 1;
        this.schedule(function () {
            this.isCanUpgrade();

            for(let i = 0 ; i < window.GL.PlayerManager.taskData.length ; i++){
                if(window.GL.PlayerManager.taskData[i].had >= window.GL.PlayerManager.taskData[i].TaskNum ){
                    //this.taskRed.active = true;
                    let colora = new cc.Color(255,255,255);
                    let colorb = new cc.Color(228,47,47);
                    window.GL.ColorManager.setColorAToColorB(colora,colorb,this.taskRed);

                    return ;
                }
            }

            window.GL.ColorManager.setWrite(this.taskRed);
            //this.taskRed.active = false;

        },interver);

    },

    //成就是否可以升级
    isAchiEvenmentUpgrade(){
        let lv = -1;
        for(let i = 0 ; i < window.GL.JsonData.jsonData.achievement.length; i++ ){
            if( window.GL.PlayerManager.trainload >= window.GL.JsonData.jsonData.achievement[i].Target ){
                lv = i;
            }
        }

        if(lv <= window.GL.PlayerManager.achiEvenmentData){
            //this.achiRed.active = false;
            window.GL.ColorManager.setWrite(this.achiRed);
        }else {
            //this.achiRed.active = true;
            let colora = new cc.Color(255,255,255);
            let colorb = new cc.Color(228,47,47);
            window.GL.ColorManager.setColorAToColorB(colora,colorb,this.achiRed);
        }
    },

    isCanUpgrade(){
        this.isCanDoorUpgrade();

        this.isCanStationUpgrade();

        this.isAchiEvenmentUpgrade();

    },

    isCanDoorUpgrade(){
        let isCan_1 = window.GL.DoorModel.isCanUpGradeNum();
        let isCan_2 = window.GL.DoorModel.isCanUpGradeSpeed();

        if(isCan_1 || isCan_2 ){
            this.doorUpgradeRed.active = true;
        }else {
            this.doorUpgradeRed.active = false;
        }
    },

    isCanStationUpgrade(){
        let isCan = window.GL.StationModel.isCanUpgrade();
        if(isCan){
            this.stationUpgradeRed.active = true;
            this.stationUpgradeAnim.play('shengji');
        }else{
            this.stationUpgradeRed.active = false;

            this.stationUpgradeAnim.stop('shengji');
            this.stationUpgradeAnim.node.scaleX = 1;
            this.stationUpgradeAnim.node.scaleY = 1;
        }
    },

    isCanChairUpgrade(){
        let isCan_1 = window.GL.ChairModel.isCanUpGradeNum();
        let isCan_2 = window.GL.ChairModel.isCanUpGradeSpeed();
        let isCan_3 = window.GL.ChairModel.isCanUpGradeServer();

        if(isCan_1 || isCan_2 || isCan_3 ){
            this.chairUpgradeRed.active = true;
        }else {
            this.chairUpgradeRed.active = false;
        }
    },

    // update(dt) {
    //
    // },

});
