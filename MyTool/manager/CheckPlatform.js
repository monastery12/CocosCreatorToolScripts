
var CheckPlatform = {

    checkIsAndroid(){
        return cc.sys.isMobile && cc.sys.browserType == cc.sys.BROWSER_TYPE_ANDROID
    },

    checkIsIOS(){
        return cc.sys.isMobile && true;
    },

    checkIsWX(){
         return  cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME;
    },

}

module.exports = CheckPlatform;