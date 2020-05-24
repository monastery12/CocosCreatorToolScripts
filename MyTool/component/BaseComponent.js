var BaseComponent = cc.Class({
    extends: cc.Component,
    // 压栈
    // param 参数
    push(param)
    {

    },
    // 只执行一次,以后不再执行，比如消息注册
    // param 参数
    once(param)
    {

    },
    // 置顶的时候调用，比如 栈中有A.B，当弹出B时候，那么A.top就执行
    top(param)
    {

    },
    // 从栈顶变为非栈顶调用 比如 栈中有A,这个时候压如了新的B，然后A.unTop调用
    unTop()
    {

    },
    // 从栈中弹出
    pop(param)
    {

    },
    gyPlayDragonAni(dragon, effName, completeCallback, target)
    {
        if(completeCallback != null)
        {
            let func = function(event)
            {
                dragon.removeEventListener(dragonBones.EventObject.COMPLETE, func, null)
                if(target)
                    completeCallback.call(target, event)
                else
                    completeCallback.call(event)
            }
            dragon.addEventListener(dragonBones.EventObject.COMPLETE, func, null)
        }
        else
        {

        }
        dragon.playAnimation(effName)
    },
    // 播放翻开动画
    //@param ani cc.Animation 如果为null就getComponent
    //@param aniName 动画名字
    //@param finishedCallback 播放完成回调
    //@param 播放完成回传参数
    gyPlayAnimation(ani, aniName, finishedCallback, param)
    {
        if(ani == null)
            ani = this.node.getComponent(cc.Animation)

        if(ani == null)
        {
            console.error("没有找到动画组件(cc.Animation) 播放的动画名 = ", aniName)
            return;
        }

        if(ani)
        {
            let funCallback = function ()
            {
                if(finishedCallback)
                    finishedCallback(param)
                ani.off("finished", funCallback, this)
            }
            ani.play(aniName)
            ani.on("finished", funCallback, this)
        }
        else
        {
            if(finishedCallback)
                finishedCallback(param)
        }
    },
    // 加载spriteframe
    //@param sprite cc.sprite
    //@param url 路径 "texture/ice/bingkuai_01"
    //@param callback 加载完成回调
    gyLoadSpriteFrame(sprite, url, callback)
    {
        if(sprite == null)
        {
            console.error("----------gyLoadSpriteFrame sprite == null", url, callback)
            return
        }
        this.scheduleOnce(() => {
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, res)
            {
                if(!err)
                {
                    sprite.spriteFrame = res
                    if(callback)
                        callback(res)
                }
                else
                {
                    if(callback)
                        callback(null)
                    console.error("load url error ", err, url)
                }
            })
        }, 0.005)
    },
    // 注册事件
    gyRegEvent(msg, callback, target)
    {
        // 保存注册的事件，方便自动销毁
        this._gy_events = this._gy_events || []
        if( this._gy_events[msg] == null)
        {
            this._gy_events[msg] = []
            this._gy_events[msg].push({callback:callback, target:target})
        }
        else
        {
            for (let msg in this._gy_events)
            {
                let ev = this._gy_events[msg]
                if(ev)
                {
                    if(ev.callback=== callback && ev.target === target)
                    {
                        console.error("不能注册同一个函数事件", callback, target)
                        return
                    }
                }
            }
            this._gy_events[msg].push({callback:callback, target:target})
        }
        window.GL.MessageCenter.on(msg, callback, target)
    },
    // 反注册
    gyUnRegEvent(msg, callback, target)
    {
        this._gy_events = this._gy_events || []
        let events = this._gy_events[msg]
        if(events == null)
        {
            //window.GL.DBug.warn("没找到要销毁事件", callback, target)
            return;
        }
        else
        {
            for (let i = 0; i < events.length; i++) {
                let ev = events[i];
                if(ev && ev.callback === callback && ev.target === target)
                {
                    ev.callback = null;
                    ev.target = null;
                    events.splice(i, 1);
                    break;
                }
            }
        }
        window.GL.DBug.error("反注册 = ", msg)
        window.GL.MessageCenter.off(msg, callback, target)

    },
    gyDispatch(msg, param)
    {
        window.GL.MessageCenter.emit(msg, param)
    },
    onDestroy()
    {
        // 销毁注册的消息
        if(this._gy_events != null)
        {
            for (let msg in this._gy_events)
            {
                let events = this._gy_events[msg]
                if(events != null)
                {
                    // 倒叙删除
                    for (let i = 0; i < events.length; i++)
                    {
                        let ev = events[i]
                        if(ev)
                        {
                            window.GL.MessageCenter.off(msg,  ev.callback, ev.target)
                        }
                    }
                }
                this._gy_events[msg].length = 0;
            }
        }

    },
});

module.exports = BaseComponent
