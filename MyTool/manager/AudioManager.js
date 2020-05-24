/**
 * 说明
 *  调用init()初始化
 *  播放指定背景音乐 playBG(name,loop,volumn);
 *  暂停/恢复背景音乐 switchBG()
 *  
 *  播放指定音效 playEffect(name,loop,volumn);
 *  停止/恢复音效 switchEffect()
 */
const OPEN_CLOSE = true;

var AudioManager = {

    /**
     * 初始化音乐
     */
    init() {
        this.clips = new Map();
        let infos = [
            { name: "button",           file: "button",     volumn: 1 },
            { name: "win",              file: "win",     volumn: 1 },
            { name: "move",             file: "move",     volumn: 1 },
            { name: "back",             file: "back",     volumn: 1 },
            { name: "Box",              file: "Box",     volumn: 1 },
            { name: "open",              file: "open",     volumn: 1 },
        ];
        for (let i in infos) {
            let info = infos[i];
            cc.loader.loadRes("audio/" + info.file, cc.AudioClip, function(err, clip) {
                if (null == err) {
                    this.clips.set(info.name, {clip: clip, volumn: info.volumn})
                }
            }.bind(this))
        }


        this.loadBG();
    }, 


    /**
     * 加载背景音乐
     */
    loadBG() {
        let infos = [
            {name: "Bg", file: "Bg", volumn: 1},
        ];
        for (let i in infos) {
            let info = infos[i];
            cc.loader.loadRes("audio/" + info.file, cc.AudioClip, function(err, clip) {
                if (null == err) {
                    this.clips.set(info.name, {clip: clip, volumn: info.volumn})
                }
                window.GL.MessageCenter.emit(window.GL.EventDef._msg_load_assest);
            }.bind(this))
        }
    },

    /**
     * 暂停，恢复背景音乐
     */
    switchBG() {
        window.GL.PlayerManager.music = ! window.GL.PlayerManager.music;

        if(window.GL.PlayerManager.music)
        {
            this.resumeBg();
        }else
        {
            cc.audioEngine.pauseMusic();                        //暂停背景音乐
        }
    },

    /**
     * 停止，恢复音效
     */
    switchEffect(){
        window.GL.PlayerManager.effect = !window.GL.PlayerManager.effect;

        if(!window.GL.PlayerManager.effect){
            cc.audioEngine.stopEffect();
        }
    },


    /**
     * 播放背景音乐
     * @param {*} name      音乐名      必填
     * @param {*} loop      是否循环    可不填
     * @param {*} volumn    声音大小    可不填
     */
    playBG(name,loop){

        let volumn;

        if (!window.GL.PlayerManager.music) {
            return null
        }

        //判断当前的背景音乐是否正在播放
        if( cc.audioEngine.isMusicPlaying() ){
            cc.audioEngine.stopMusic();
        }
        
        let clipRes = this.clips.get(name);
        if(clipRes){
            if(!loop){
                loop = true;
            }
            if(!volumn){
                volumn = clipRes.volumn
            }
            cc.audioEngine.setMusicVolume(volumn);
            cc.audioEngine.playMusic(clipRes.clip,loop);
        }
    },


    /**
     * 播放音效
     * @param {*} name      音效名      必填
     * @param {*} loop      是否循环    可不填
     * //@param {*} volumn    声音大小    可不填
     */
    playEffect(name, loop) {

        if(window.GL.No_Music_Effect){
            return ;
        }

        let volumn = null;

        if (!window.GL.PlayerManager.effect) {
            return null
        }
        let clipRes = this.clips.get(name)
        if (clipRes) {
            if (!volumn) {
                volumn = clipRes.volumn
            }

            if (!loop) {
                loop = false
            }
            cc.audioEngine.setEffectsVolume(volumn);
            cc.audioEngine.playEffect(clipRes.clip, loop);
            return 
        }
        return null
    },

    playEffectForce(name, loop) {

        let volumn = null;

        if (!window.GL.PlayerManager.effect) {
            return null
        }
        let clipRes = this.clips.get(name)
        if (clipRes) {
            if (!volumn) {
                volumn = clipRes.volumn
            }

            if (!loop) {
                loop = false
            }
            cc.audioEngine.setEffectsVolume(volumn);
            cc.audioEngine.playEffect(clipRes.clip, loop);
            return 
        }
        return null
    },

    resumeBg(){
        //判断当前的背景音乐是否正在播放
        if( cc.audioEngine.isMusicPlaying() ){
            cc.audioEngine.resumeMusic();                       //回复背景音乐
        }else{
            this.playBG('Bg',true);
        }
    },
}

module.exports = AudioManager
