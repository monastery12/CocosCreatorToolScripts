
var ConfigModel = require("ConfigModel");

let PlayerInfo = function(){

    //声音
    this.music = true;

    //音效
    this.effect = true;

    //省
    this.province = -1;
    //市
    this.city = -1;

    this.level = 1;

    //金币
    this.coin = 0;

    //砖石
    this.diamond = 0;

    //红包
    this.cash = 0;

    //四种碎片
    this.fragment = [0,0,0,0];      //

    //题型
    this.questionTypes = 0;

    //活跃值
    this.live = 10;

    //分数
    this.score = 100;

    //分数
    this.score = 100;

    //当前关卡
    this.lv = 1;

    //上次登陆时间秒
    this.lastTime = 0;

    //礼物时间
    this.giftTime = ConfigModel.giftTime;

    this.redPackTime = ConfigModel.redPackTime;

    //上次登陆时间 天
    this.lastDay = {"year":0,"monty":0,"day":0};

    //sign七天登陆
    this.signData = [false,false,false,false,false,false,false];

    this.skinsData = [true];

    this.skinsChoose = 0;

};

var PlayerManager = {
    _data: new PlayerInfo(),

    saveLastTime(){
        this._data.lastTime =  (new Date()).getTime()/1000 ;  //保存上次登陆时间 单位：秒
    },

    freshTime(){
        let now = (new Date()).getTime()/1000 ;//秒
        let last = this._data.lastTime;

        if(last == 0){      //说明是第一次进入
            return ;
        }

        this._data.giftTime = this._data.giftTime - (now - last) ;
        this._data.redPackTime = this._data.redPackTime - (now - last);

        let isNewDay = GL.GLFunc.isNewDay();
        if(isNewDay){
            this._data.score += ConfigModel.everyDayReward;
            this._data.score = this._data.score > 100 ? 100 : this._data.score;
        }
    },

    saveLastDay(){
        let date = new Date();
        let year    = date.getFullYear();
        let monty   = date.getMonth();
        let day     = date.getDate();

        this._data.lastDay.year     = year;
        this._data.lastDay.monty    = monty;
        this._data.lastDay.day      = day;
    },

    set music(val){
        this._data.music = val;
    },
    get music(){
        return this._data.music;
    },

    set effect(val){
        this._data.effect = val;
    },
    get effect(){
        return this._data.effect;
    },
    set coin(val){
        if(val >= 50){
            this._data.coin = 49;
        }else {
            this._data.coin = val;
        }
        this._data.coin = val;
        GL.MessageCenter.emit(GL.EventDef._msg_fresh_coin);
    },
    get coin(){
        return this._data.coin;
    },

    set lv(val){
        this._data.lv = val;
    },
    get lv(){
        return this._data.lv;
    },

    set live(val){
        this._data.live = val;
    },
    get live(){
        return this._data.live;
    },

    set fragment(val){

        if(!val || !val.length || val.length <= 0){
            return ;
        }

        //保证这里不会超出
        for(let i = 0 ; i < val.length ; i++){

            let temp = val[i] >= ConfigModel.fragmentMax ? ConfigModel.fragmentMax-1 : val[i];

            this._data.fragment[i] = temp;
        }
        window.GL.MessageCenter.emit(GL.EventDef._msg_cash_change);
    },
    get fragment(){
        return this._data.fragment;
    },

    set cash(val){

        if(this._data.cash >= ConfigModel.cashMax){

            this._data.cash = ConfigModel.cashMax - 0.01;

        }else {

            this._data.cash = val;
        }
        window.GL.MessageCenter.emit(GL.EventDef._msg_cash_change);

    },
    get cash(){

        if(this._data.cash > ConfigModel.cashMax ){

            return window.GL.GLFunc.truncPoint( ConfigModel.cashMax - 0.01 , 2);

        }else {

            return window.GL.GLFunc.truncPoint( this._data.cash,2 );
        }
    },

    set giftTime(val){

        if(val <= 0 ){
            this._data.giftTime = 0;
        }else {
            this._data.giftTime = val;
        }

    },
    get giftTime(){
        return  this._data.giftTime;
    },

    set redPackTime(val){
        this._data.redPackTime = val;
    },
    get redPackTime(){
        return this._data.redPackTime;
    },

    set questionTypes(val){
        this._data.questionTypes = val;
    },
    get questionTypes(){
        return this._data.questionTypes;
    },
    set score(val){

        if(val <= 0){
            this._data.score = 0;
        }else if(val >= 100){
            this._data.score = 100;
        }else {
            this._data.score = val;
        }

    },
    get score(){
        return this._data.score;
    },
    set lastDay(val){
        this._data.lastDay = val;
    },
    get lastDay(){
        return this._data.lastDay
    },

    set level(val){
        this._data.level = val;
    },
    get level(){
        return this._data.level;
    },
    set diamond(val){
        this._data.diamond = val;
        GL.MessageCenter.emit(GL.EventDef._msg_fresh_coin);
    },
    get diamond(){
        return this._data.diamond;
    },
    set signData(val){
        this._data.signData = val;
    },
    get signData(){
        return this._data.signData;
    },
    set skinsData(val){
        this._data.skinsData = val;
    },
    get skinsData(){
        return this._data.skinsData;
    },
    set skinsChoose(val){
        this._data.skinsChoose = val;
    },
    get skinsChoose(){
        return this._data.skinsChoose;
    }

};


module.exports = PlayerManager;

