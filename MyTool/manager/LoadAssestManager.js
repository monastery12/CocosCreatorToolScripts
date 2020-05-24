/**
 *加载资源
 */

var LoadAssestManager = {


    loadFanmaijiAssest(spriteFrameName,sprite){
        let path = spriteFrameName;
        cc.loader.loadRes(path,cc.SpriteFrame,function (err,res) {
            if(!err){
                sprite.spriteFrame = res;
            }
        }.bind(this) );
    },

    //加载人物资源
    loadManBg(spriteFrameName,sprite){

        let path = 'plist/man';

        if(this._manAssest){
            sprite.spriteFrame = this._manAssest.getSpriteFrame(spriteFrameName);
        }else {
            cc.loader.loadRes(path,cc.SpriteAtlat,function (err,res) {
                if(!err){
                    this._manAssest = res;
                    sprite.spriteFrame = this._manAssest.getSpriteFrame(spriteFrameName);
                }
            }.bind(this) );
        }

    },

    //加载车资源
    loadCarAssest(isVip,sprite){
        if(!sprite){
            return;
        }
        let path = 'plist/che';

        let spriteFrameName ;

        //随机车子图片
        let normalCarArr = ['che_1','che_2','che_3'];
        if(isVip){
            spriteFrameName = 'che_4';
        }else {
            let randomNum = window.GL.GLFunc.randomInt(0,normalCarArr.length-1);
            spriteFrameName = normalCarArr[randomNum];
        }

        if(this._carAssest){
            sprite.spriteFrame = this._carAssest.getSpriteFrame(spriteFrameName);
        }else {
            cc.loader.loadRes(path,cc.SpriteAtlat,function (err,res) {
                if(!err){
                    this._carAssest = res;
                    sprite.spriteFrame = this._carAssest.getSpriteFrame(spriteFrameName);
                }
            }.bind(this) );
        }
    },

    //加载候车室资源
    loadWaitRoomAssest(){

    },

    //加载check图片
    loadChecItemAssest(spriteFrameName,sprite){

        if(!sprite){
            return;
        }

        let path = 'plist/buildIng';

        if(this._butldAssest){
            sprite.spriteFrame = this._butldAssest.getSpriteFrame(spriteFrameName);
        }else {
            cc.loader.loadRes(path,cc.SpriteAtlat,function (err,res) {
                if(!err){
                    this._butldAssest = res;
                    sprite.spriteFrame = this._butldAssest.getSpriteFrame(spriteFrameName);
                }
            }.bind(this) );
        }
    },

    loadTicketsAssest(spriteFrameName,sprite){
        if(!sprite){
            return;
        }
        let path = 'plist/buildIng';

        if(this._butldAssest){
            sprite.spriteFrame = this._butldAssest.getSpriteFrame(spriteFrameName);
        }else {
            cc.loader.loadRes(path,cc.SpriteAtlat,function (err,res) {
                if(!err){
                    this._butldAssest = res;
                    sprite.spriteFrame = this._butldAssest.getSpriteFrame(spriteFrameName);
                }
            }.bind(this) );
        }
    },

    //加载建筑图片
    loadBuildAssest(spriteFrameName,sprite){
        if(!sprite){
            return;
        }
        let path = 'plist/buildIng';

        if(this._butldAssest){
            sprite.spriteFrame = this._butldAssest.getSpriteFrame(spriteFrameName);
        }else {
            cc.loader.loadRes(path,cc.SpriteAtlat,function (err,res) {
                if(!err){
                    this._butldAssest = res;
                    sprite.spriteFrame = this._butldAssest.getSpriteFrame(spriteFrameName);
                }
            }.bind(this) );
        }
    },

    //加载商店图片
    loadShopAssest(spriteFrameName,sprite){
        if(!sprite){
            return;
        }
        let path = 'plist/shop';

        if(this._shopAssest){
            sprite.spriteFrame = this._shopAssest.getSpriteFrame(spriteFrameName);
        }else {
            cc.loader.loadRes(path,cc.SpriteAtlat,function (err,res) {
                if(!err){
                    this._shopAssest = res;
                    sprite.spriteFrame = this._shopAssest.getSpriteFrame(spriteFrameName);
                }
            }.bind(this) );
        }
    },

    //加载凳子资源
    loadChairAssest(spriteFrameName,sprite){
        if(!sprite){
            return;
        }
        let path = 'plist/buildIng';

        if(this._butldAssest){
            sprite.spriteFrame = this._butldAssest.getSpriteFrame(spriteFrameName);
        }else {
            cc.loader.loadRes(path,cc.SpriteAtlat,function (err,res) {
                if(!err){
                    this._butldAssest = res;
                    sprite.spriteFrame = this._butldAssest.getSpriteFrame(spriteFrameName);
                }
            }.bind(this) );
        }
    },

    //加载草地资源
    loadCaodiAssest(spriteFrameName,sprite){
        if(!sprite){
            return;
        }
        let path = 'plist/caodi';
        if(this._caodiAssest){
            sprite.spriteFrame = this._caodiAssest.getSpriteFrame(spriteFrameName);
        }else {
            cc.loader.loadRes(path,cc.SpriteAtlat,function (err,res) {
                if(!err){
                    this._caodiAssest = res;
                    sprite.spriteFrame = this._caodiAssest.getSpriteFrame(spriteFrameName);
                }
            }.bind(this) );
        }
    },

    //火车资源
    loadHuocheAssest(spriteFrameName,sprite){
        if(!sprite){
            return;
        }
        let path = 'plist/huoche';
        if(this._huocheAssest){
            sprite.spriteFrame = this._huocheAssest.getSpriteFrame(spriteFrameName);
        }else {
            cc.loader.loadRes(path,cc.SpriteAtlat,function (err,res) {
                if(!err){
                    this._huocheAssest = res;
                    sprite.spriteFrame = this._huocheAssest.getSpriteFrame(spriteFrameName);
                }
            }.bind(this) );
        }
    },

    //加载任务需要的资源
    loadTaskAssest(spriteFrameName,sprite){
        if(!sprite){
            return;
        }
        let path = 'plist/task';
        if(this._huocheAssest){
            sprite.spriteFrame = this._huocheAssest.getSpriteFrame(spriteFrameName);
        }else {
            cc.loader.loadRes(path,cc.SpriteAtlat,function (err,res) {
                if(!err){
                    this._huocheAssest = res;
                    sprite.spriteFrame = this._huocheAssest.getSpriteFrame(spriteFrameName);
                }
            }.bind(this) );
        }
    },

    //加载火车站资源
    loadStationAssest(spriteFrameName,sprite){
        if(!sprite){
            return;
        }

        let lv = window.GL.PlayerManager.stationData.lv;

        let path = `plist/jianzhu_${lv}`;

        if(!this._jianzhuAssestArr){
            this._jianzhuAssestArr = [null,null,null,null,null];
        }

        if(this._jianzhuAssestArr[lv-1]){
            sprite.spriteFrame = this._jianzhuAssestArr[lv-1].getSpriteFrame(spriteFrameName);
        }else {
            cc.loader.loadRes(path,cc.SpriteAtlat,function (err,res) {
                if(!err){
                    this._jianzhuAssestArr[lv-1] = res;
                    sprite.spriteFrame = this._jianzhuAssestArr[lv-1].getSpriteFrame(spriteFrameName);
                }
            }.bind(this) );
        }

    },

    //加载额外升级icon
    loadExtraItemIcon(extraIndex,parent){
        let extraIconName = 'prefab/extra/extraItemIconNode_' + extraIndex;

        cc.loader.loadRes(extraIconName,function (err,prefab) {
            if(!err){
                let extraItem = cc.instantiate(prefab);
                extraItem.setParent(parent);
            }
        }.bind(this) );
    },

    //加载商店icon
    loadShopIcon(sprite,shopIndex){

        let shopIconName = ['icon_chaoshi','icon_shuiguo','icon_techan','icon_kuaican','icon_coffee'];

        if(this._gaikuoAssest){
            sprite.spriteFrame = this._gaikuoAssest.getSpriteFrame(shopIconName[shopIndex] );
        }else {
            cc.loader.loadRes('plist/gaikuo',cc.SpriteAtlat,function (err,res) {
                this._gaikuoAssest = res;
                sprite.spriteFrame = this._gaikuoAssest.getSpriteFrame(shopIconName[shopIndex] );
            }.bind(this));
        }
    },

    loadBiaoqing(sprite,spame){
        console.log('spname = ',spame);
        if(this._gaikuoAssest){

            sprite.spriteFrame = this._gaikuoAssest.getSpriteFrame(spame);
        }else {

            cc.loader.loadRes('plist/gaikuo',cc.SpriteAtlat,function (err,res) {

                this._gaikuoAssest = res;
                sprite.spriteFrame = this._gaikuoAssest.getSpriteFrame(spame );
            }.bind(this));
        }
    },

    loadGroundAssest(groundName,sprite){
        let pathName = 'ground/'+groundName;
        cc.loader.loadRes(pathName,cc.SpriteFrame,function (err,res) {
            sprite.spriteFrame = res;
        }.bind(this));
    },

    loadDibanAssest(dibanName,sprite){

    },

    setStopAssest(spriteNode){

        let path = 'plist/buildIng';

        if(this._butldAssest){
            if(window.GL.PlayerManager.stationData.lv == 1){
                spriteNode.getComponent(cc.Sprite).spriteFrame = this._butldAssest.getSpriteFrame('weikaiqi_1');
            }else {
                spriteNode.getComponent(cc.Sprite).spriteFrame = this._butldAssest.getSpriteFrame('weikaiqi_2');
            }

        }else {
            cc.loader.loadRes(path,cc.SpriteAtlat,function (err,res) {
                if(!err){
                    this._butldAssest = res;
                    if(window.GL.PlayerManager.stationData.lv == 1){
                        spriteNode.getComponent(cc.Sprite).spriteFrame = this._butldAssest.getSpriteFrame('weikaiqi_1');
                    }else {
                        spriteNode.getComponent(cc.Sprite).spriteFrame = this._butldAssest.getSpriteFrame('weikaiqi_2');
                    }
                }
            }.bind(this) );
        }
    },
};

module.exports = LoadAssestManager;