
var GLFunc = {

    gLog(str){
        console.log(`**************************${str}`);
    },

    //提示
    messageTip(str){
        window.GL.MessageCenter.emit(window.GL.EventDef._msg_msgTip,str);
    },

    //随机数
    randomInt(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    },

    //限制字符串长度
    stringLimit(orgStr, limit) {
        if (orgStr.length > limit) {
            return orgStr.slice(0, limit) + "...";
        } else {
            return orgStr;
        }
    },

    //检查环境
    debugMode(){

        if(cc.sys.browserType !== cc.sys.BROWSER_TYPE_WECHAT_GAME){
            return true;
        }else{
            return false;
        }
    },

    //获取周几
    getWeekDay(){
        let week = new Date().getDay();
        if(week == 0){
            return 7;
        }else{
            return week;
        }
    },

    //获取新的一天
    //判断新的一天
    isNewDay(){
        let date = new Date();
        let year    = date.getFullYear();
        let monty   = date.getMonth();
        let day     = date.getDate();



        let lastYear    = window.GL.PlayerManager.lastDay.year;
        let lastMonty   = window.GL.PlayerManager.lastDay.monty;
        let lastDay     = window.GL.PlayerManager.lastDay.day;

        if(year > lastYear){
            return true;
        }
        if(year == lastYear ){
            if(monty >lastMonty){
                return true;
            }
        }
        if(year == lastYear && monty == lastMonty){
            if(day > lastDay){
                return true;
            }
        }

        return false;
    },

    //获取比例
    getBili(num_1,num_2){
        if(num_1 < 0 ){
            num_1 = 0;
        }
        let bili = ( num_1 / num_2 > 1 ? 1 : num_1/num_2 );
        return bili;
    },

    //获取百分比
    getPercentNum(num_1,num_2){
        let bili = ( num_1 / num_2 > 1 ? 1 : num_1/num_2 );
        let percentNum = `${ Math.trunc(bili*100) }%`;
        return percentNum;
    },

    getPercentNum2(num){
        num = Math.trunc(num *100);
        let percentNum = `${Math.trunc(num)}%`;
        return percentNum;
    },

    /**
     * 01:02:03
     *时间参数 秒
     */
    showTime(time){

        if(time <= 0){
            return '00:00:00';
        }

        let h = Math.trunc(time / 3600 ) ;
        let m = Math.trunc((time - (3600*h))/ 60 );
        let s = Math.trunc(time - (h*3600+m*60) );

        if(h<10){
            h = `0${h}`;
        }
        if(m<10){
            m = `0${m}`;
        }
        if(s < 10){
            s = `0${s}`;
        }
        return  `${h}:${m}:${s}`;
    },

    showTime2(time){
        if(time <= 0){
            return '00:00:00';
        }

        let h = Math.trunc(time / 3600 ) ;
        let m = Math.trunc((time - (3600*h))/ 60 );
        let s = Math.trunc(time - (h*3600+m*60) );

        if(h<10){
            h = `0${h}`;
        }
        if(m<10){
            m = `0${m}`;
        }
        if(s < 10){
            s = `0${s}`;
        }
        return  `${m}:${s}`;
    },

    showTime3(time){
        if(time <= 0){
            return '0';
        }

        let h = Math.trunc(time / 3600 ) ;
        let m = Math.trunc((time - (3600*h))/ 60 );
        let s = Math.trunc(time - (h*3600+m*60) );

        if(h<10){
            h = `${h}`;
        }
        if(m<10){
            m = `${m}`;
        }
        if(s < 10){
            s = `0${s}`;
        }
        return  `${h}小时${m}分钟`;
    },

    //str结构 '1_1';
    getRandomByNum_num(str){
        let numMin = '';
        let numMax = '';
        let temp = '';
        for(let i = 0 ;i<str.length; i++ ) {
            if(str[i] != '_'){
                temp = temp+str[i];
            }else {
                numMin = parseInt(temp);
                temp = '';
            }
        }

        numMax = parseInt(temp);

        return  this.randomInt(numMin,numMax);
    },

    cutPoint(num,pointNum){
        let mulNum = Math.pow(10,pointNum);
        num = Math.trunc( num * mulNum ) / mulNum;
        return num;
    },

    //获取str数组
    getStr_StrArr(str){

        let strItemArr = [];
        let strTemp = '';

        for(let i = 0 ; i < str.length ; i++ ){
            if(str[i] != '_'){
                strTemp += str[i];
            }else{
                strItemArr.push(strTemp);
                strTemp = '';
            }
        }

        strItemArr.push(strTemp);

        return strItemArr;
    },

    //取余
    getRemainder(divisor,dividend){
        let divNum = Math.trunc(divisor / dividend) ;
        let remainderNum = divisor - (divNum*dividend);
        return remainderNum;
    },

    //截取小数点
    truncPoint(target,num){

        let mulNum = Math.pow(10,num);
        target = Math.trunc(target*mulNum);         //整数了

        target = target / mulNum;                      //保留了num个小数点

        return target;
    },

    checkPosInNode(pos,rectNode){
        let width = rectNode.width;
        let height = rectNode.height;

        if(pos.x >= -width/2 && pos.x <= width/2 && pos.y >= -height/2 && pos.y <= height/2){
            return true;
        }else {
            return false;
        }
    }
}

module.exports = GLFunc