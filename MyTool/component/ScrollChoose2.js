

cc.Class({
    extends: cc.Component,

    properties: {

        itemContent:cc.Node,
        centerPoint:cc.Node,

        _chooseIndex:0,

        speed:1000,             //一秒钟移动的像素
        interverScal:100,       //每隔interverscal像素缩小0.1
        
        horizontal:true,
    },


    getChooseIndex(){
        return this._chooseIndex;
    },

    start () {

        if(this.horizontal){
            this._len = this.itemContent.children[0].width;
            this._maxX = -(this._len/2);
            this._minX = -(this.itemContent.width -this._len/2);
        }else{
            this._len = this.itemContent.children[0].height;
            this._maxX = -(this._len/2);
            this._minX = -(this.itemContent.height -this._len/2);
        }
        this.addTouchEvent();
    },

    addTouchEvent(){

        this.itemContent.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            let deltaPos = event.getDelta();

            if(this.horizontal){
                if(deltaPos.x > 0){                     //右滑动
                    if(this.itemContent.x >= this._maxX ){
                        return ;
                    }
    
                    if(this.itemContent.x + deltaPos.x >= this._maxX){
                        deltaPos.x = this._maxX - this.itemContent.x;
                    }
    
                }else{                                  //左滑动
                    if(this.itemContent.x <= this._minX ){
                        return ;
                    }
    
                    if(this.itemContent.x + deltaPos.x <= this._minX){
                        deltaPos.x = this._minX - this.itemContent.x;
                    }
                }
    
                this.itemContent.x += deltaPos.x;
            }
            else{
                if(deltaPos.y > 0){                     //右滑动
                    if(this.itemContent.y >= this._maxX ){
                        return ;
                    }
    
                    if(this.itemContent.y + deltaPos.y >= this._maxX){
                        deltaPos.y = this._maxX - this.itemContent.y;
                    }
    
                }else{                                  //左滑动
                    if(this.itemContent.y <= this._minX ){
                        return ;
                    }
    
                    if(this.itemContent.y + deltaPos.y <= this._minX){
                        deltaPos.y = this._minX - this.itemContent.y;
                    }
                }
    
                this.itemContent.x += deltaPos.x;
            }
  

            this.controlScale();

        }.bind(this));

        this.itemContent.on(cc.Node.EventType.TOUCH_END, function (event) {
            let deltaPos = event.getDelta();
            if(this.horizontal){
                this.formatPos(deltaPos.x);
            }else{
                this.formatPos(deltaPos.y);
            }
 
        }.bind(this));

        this.itemContent.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            let deltaPos = event.getDelta();
            if(this.horizontal){
                this.formatPos(deltaPos.x);
            }else{
                this.formatPos(deltaPos.y);
            }
        }.bind(this),);
    },


    formatPos(moveX){
        let posX = Math.abs(this.itemContent.x) ;

        let num = Math.trunc(posX / this._len);
        let surplusX = posX - (num * this._len);

        if( surplusX >= this._len * 0.6 ){
            if(moveX > 0){
                //右滑动
                num += 1;
            }
            else if(moveX < 0){
                num -= 1;
            }   
        }

        num  = num < 0 ? 0 : num;
        num = num > this.itemContent.length - 1 ? this.itemContent.length -1 : num;

        this.init(num);
    },

    init (chooseIndex){
        this._chooseIndex = chooseIndex;

        let moveX = this._len/2 - (this._len)*(chooseIndex+1) ;

        if(this.horizontal){
            let posX = this.itemContent.x;

            let moveTime = Math.abs(moveX - posX)/this.speed;
            
            let action_1 = cc.moveTo(moveTime,cc.v2(moveX,this.itemContent.y) );
            let action_2 = cc.callFunc(function(){
                this.controlScale();
                window.GL.MessageCenter.emit(window.GL.EventDef._msg_station_upgrade);
                   //播放音效
                window.GL.AudioManager.playEffect('button',false);
            },this);
        
            this.itemContent.runAction( cc.sequence(action_1,action_2) );
        }else{
            let posX = this.itemContent.y;

            let moveTime = Math.abs(moveX - posX)/this.speed;
            
            let action_1 = cc.moveTo(moveTime,cc.v2(this.itemContent.x,moveX ) );
            let action_2 = cc.callFunc(function(){
                this.controlScale();
                window.GL.MessageCenter.emit(window.GL.EventDef._msg_station_upgrade);
                   //播放音效
                window.GL.AudioManager.playEffect('button',false);
            },this);
        
            this.itemContent.runAction( cc.sequence(action_1,action_2) );
        }

    },

    initUI(chooseIndex){
        this._chooseIndex = chooseIndex;

        let moveX = this._len/2 - (this._len)*(chooseIndex+1) ;
        this.itemContent.x = moveX;

        this.controlScale();
    },

    controlScale(){

        //判断每一个item距离中心的距离
        //距离越大，缩放越大        （缩放再限制一个极限）

        let minScale = 0.6;
        let maxScale = 1;

        if(this.horizontal){
            for(let i = 0 ; i < this.itemContent.children.length ; i++ ){
                let localPoint = window.GL.PointManager.originToTargetPoint(this.itemContent.children[i] , this.node);
    
    
                let subX = Math.abs(this.centerPoint.x - localPoint.x);
    
                let changeScale = maxScale - (subX / this.interverScal)*0.1 ;
                changeScale = changeScale < minScale ? minScale : changeScale;
    
                this.itemContent.children[i].scale = changeScale;
    
            }
        }
        else{
            for(let i = 0 ; i < this.itemContent.children.length ; i++ ){
                let localPoint = window.GL.PointManager.originToTargetPoint(this.itemContent.children[i] , this.centerPoint.parent);
    
                let subX = Math.abs(this.centerPoint.y - localPoint.y);
    
                let changeScale = maxScale - (subX / this.interverScal)*0.1 ;
                changeScale = changeScale < minScale ? minScale : changeScale;
    
                this.itemContent.children[i].scale = changeScale;
            }
        }

    },

});
