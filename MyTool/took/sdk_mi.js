const className = "org/cocos2dx/javascript/AppActivity"
//const methodSignatureString = "(Ljava/lang/String;)V"
const methodSignatureInt = "()I"                    //无参数，返回int
// const methodSignatureFloat = "(F)V"
// const methodSignatureBool = "(Z)V"

var sdk_mi = {


    //创建（加载）视频广告
    createVidioAd(callBackFunc){

        if(cc.sys.isMobile){
            var methodName = "lunchAd";
            var return_num = jsb.reflection.callStaticMethod( className, methodName, methodSignatureInt);

            if(callBackFunc){
                iosOrScriptsButton_cb = callBackFunc;
            }
        }else{
            callBackFunc();
        }
    },

    recordGuidence(guidenceIndex,count){
        if(cc.sys.isMobile){
            var methodName = "guidenceRecord";
            let myMethodSignature = "(Ljava/lang/String;I)I";
            var return_num = jsb.reflection.callStaticMethod( className, methodName, myMethodSignature,guidenceIndex,count);
        }
    },

    recordGrade(gradeName,count){
        if(cc.sys.isMobile){
            var methodName = "upgradeRecord"
            let myMethodSignature = "(Ljava/lang/String;I)I";
            var return_num = jsb.reflection.callStaticMethod( className, methodName, myMethodSignature,gradeName,count);
        }
    },



}

module.exports = sdk_mi;
window.sdk_mi = sdk_mi;