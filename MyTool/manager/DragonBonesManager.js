/**
 * 龙骨动画
 */

var DragonBonesManager = {

    //播放龙骨动画通过名字
    playAnimationByName(dragonNode,animationName,loop){

        //龙骨动画使用方法
        //获取 ArmatureDisplay
        this._armatureDisPlay = dragonNode.getComponent(dragonBones.ArmatureDisplay);

        // //获取 Armatrue
        // this._armature = this._armatureDisPlay.armature();

        loop = !loop? 0 : 1 ;
        this._armatureDisPlay.playAnimation(animationName,loop);
    },

    //获取龙骨上的所有动画
    getAnimationsByDragon(dragonNode){
        //获取 ArmatureDisplay
        let armatureDisPlay = dragonNode.getComponent(dragonBones.ArmatureDisplay);

        //获取 Armatrue
        let armature = armatureDisPlay.armature();

        let animationNames = armature.animation.animationNames;

        return    ;
    },

    //获取ArmatureDisplay
    getArmatureDisplay(dragonNode){
        //获取 ArmatureDisplay
        let armatureDisPlay = dragonNode.getComponent(dragonBones.ArmatureDisplay);
        return armatureDisPlay;
    },

    //获取Armature
    getArmature(dragonNode){
        //获取 ArmatureDisplay
        let armatureDisPlay = dragonNode.getComponent(dragonBones.ArmatureDisplay);
        let armature = armatureDisPlay.getArmature();
        return armature;
    },

    //


}

module.exports = DragonBonesManager;