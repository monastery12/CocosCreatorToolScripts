
/**
 * { 
 *   unit: 12345,
 *   time: 8,
 * }                        //表示12345 后面 八个0
 * 
 */

 const FENGE = 999999999999;
 const QIAN = 1000;
 const THREE = 3;

 const positive_len = 2;            //正数用2+1位数表示

 const DANWEI = ["",'K','M','B','T','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                'aa','bb','cc','dd','ee','ff','gg','hh','ii','jj','kk','ll','mm','nn','oo','pp','qq','rr','ss','tt','uu','vv','ww','xx','yy','zz',
                'AAA','BBB','CCC','DDD','EEE','FFF','GGG','HHH','III','JJJ','KKK','LLL','MMM','NNN','OOO','PPP','QQQ','RRR','SSS','TTT','UUU','VVV','WWW','XXX','YYY','ZZZ',
                'AAAA','BBBB','CCCC','DDDD','EEEE','FFFF','GGGG','HHhH','IIII','JJJJ','KKKK','LLLL','MMMM','NNNN','OOOO','PPPP','QQQQ','RRRR','SSSS','TTTT','UUUU','VVVV','WWWW','XXXX','YYYY','ZZZZ',
                'AAAAA','BBBBB','CCCCC','DDDDD','EEEEE','FFFFF','GGGGG','HHHhH','IIIII','JJJJJ','KKKKK','LLLLL','MMMMM','NNNNN','OOOOO','PPPPP','QQQQQ','RRRRR','SSSSS','TTTTT','UUUUU','VVVVV','WWWWW','XXXXX','YYYYY','ZZZZZ'] ;

 var BigNum = {

     //显示
     Show:function( ob ){

         return this.Show2(ob);

        if(!ob){
            return 0;
        }

        var obj = {unit:ob.unit , time:ob.time };

        if(obj.unit == 0){
            return 0;
        }

        //显示,根据time的个数，选择就保留多少位
        this.TruncPoint(obj);

        var dw1 = 0;
        var dw2 = parseInt( obj.time / THREE );      
        var yu = obj.time % THREE ;                  

        var qian = 1;
        var qian2 = 1;
        var div1 = obj.unit  ;
        
        while( div1 >= QIAN ){
            dw1 ++;
            qian *= QIAN;
            div1 = obj.unit / qian;
        }
        div1 =  Math.floor( div1*100 ) / 100 ;                      //保留两位小数
        while( yu > 0 ){
            div1 *= 10;
            yu -- ;
        }
        while( div1 >= QIAN ){
            dw1 ++;
            qian2 *= QIAN;
            div1 = div1 / qian2;
        }
        div1 = Math.floor( div1*100 ) / 100 ;                      

        if( (dw1 + dw2) < 1){
            div1 = parseInt(div1);
        }

        var str = div1.toString() + DANWEI[ (dw1 + dw2 ) ];
        return str;      
    },


     Show2:function(ob){
         if(!ob){
             return 0;
         }

         var obj ;
         if(typeof ob == "number"){
              obj = {unit:ob , time:0 };
         }else {
              obj = {unit:ob.unit , time:ob.time };
         }


         if(obj.unit == 0){
             return 0;
         }

         //首先确定好有多少个零
         let unit_zero_count = 0;
         while(obj.unit > 10){
             obj.unit /= 10;
             unit_zero_count ++;
         }

         let all_zero_count = unit_zero_count + obj.time;

         // for(let i = 0 ;i < positive_len ; i++ ){
         //     if( all_zero_count > 0 ){
         //         obj.unit *= 10;
         //         all_zero_count --;
         //     }
         // }

         if(all_zero_count <= 4 ){
            while(obj.unit < 99 && all_zero_count > 0){
                obj.unit *= 10;
                all_zero_count --;
            }
         }else{
             while(obj.unit < 1 && all_zero_count > 0){
                obj.unit *= 10;
                all_zero_count --;
             }
         }

         let danwei = Math.trunc( all_zero_count / THREE );         //
         let sub_zero_count = all_zero_count - THREE * danwei;         //剩余0个数

         obj.unit *= (Math.pow(10,sub_zero_count) );


         //截取小数
         obj.unit = Math.floor( obj.unit*100 ) / 100 ;

         return `${obj.unit}${DANWEI[danwei]}`
     },

    //转换
    changeToObj:function(u,t){
        return { unit: u , time: t }
    },

    //加
    Add:function(aa,bb){

        // if(aa.time == null || bb.time == null || aa.unit == null || bb.unit == null ){
        //     return ;
        // }

        if(typeof aa == "number" && typeof bb == "number"){
            return aa+bb;
        }

        if(typeof aa.unit == "number" && aa.unit == 0 ){
            return {"unit":bb.unit , "time":bb.time };
        }

        if(bb.unit == 0 ){
            return {"unit":aa.unit , "time":aa.time };
        }

        if(typeof bb == "number"){
            bb = {"unit":bb,"time":0};
        }

        var obj = {unit:0,time:0};
        var a = { unit:aa.unit , time : aa.time };
        var b = { unit:bb.unit , time : bb.time };

        var mul_num = 1;
        if( a.time >= b.time ){

            if(a.time > b.time){
                return this.Add(bb,aa);
            }

            var sub_time = a.time - b.time ;

            while( sub_time > 0 ){                      //同化单位
                mul_num *= 10;
                sub_time --;
            }
  
            b.unit = b.unit / mul_num;
            if( (a.unit + b.unit) <= FENGE ){
                obj.unit = a.unit + b.unit ;
                obj.time = a.time;
            }else{
                obj.unit =  (a.unit + b.unit) / 10  ;
                obj.time = a.time + 1 ;
            }
        }
        else{
            var sub_time = b.time - a.time ;
            while( sub_time > 0 ){                      
                mul_num *= 10;
                sub_time --;
            }

            a.unit = a.unit / mul_num;
            if( (a.unit + b.unit) <= FENGE ){
                obj.unit = a.unit + b.unit ;
                obj.time = b.time;
            }else{
                obj.unit =  (a.unit + b.unit) / 10  ;
                obj.time = b.time + 1 ;
            }
        }

        let baoliu = 2;
        for(let i = 0 ; i<obj.time ; i++){
            baoliu *= 10;
        }

        //obj.unit =  Math.floor(obj.unit * baoliu) / baoliu   // 输出结果为 保留两位有效数字

        return obj;
    },

    //减
    Sub:function(aa,bb){
        // if(aa.time == null || bb.time == null || aa.unit == null || bb.unit == null ){
        //     return ;
        // }

        if(bb == 0){
            return aa;
        }

        if(bb.unit == 0 && bb.time == 0 ){
            return aa;
        }

        var obj = {unit:0,time:0};
        var a = { unit:aa.unit , time : aa.time };
        var b = { unit:bb.unit , time : bb.time };
        var mul_num = 1;

        if( a.time >= b.time ){
            var sub_time = a.time - b.time ;

            while( sub_time > 0 ){                      //同化单位
                mul_num *= 10;
                sub_time --;
            }
  
            b.unit = b.unit / mul_num ;
            obj.unit = a.unit  - b.unit ;
            obj.time = a.time;
        }
        else{
            var sub_time = b.time - a.time ;

            while( sub_time > 0 ){                      
                mul_num *= 10;
                sub_time --;
            }
  
            a.unit = a.unit/mul_num ;
            obj.unit = a.unit  - b.unit ;
            obj.time = b.time;
        }

        return obj;
    },

    //乘
    Mul:function(aa,bb){

        let styleNum = typeof bb;
        if(styleNum == "number"){
            return this.MulNum(aa,bb);
        }

        var obj = {unit:0,time:0};
        var a = { unit:aa.unit , time : aa.time };
        var b = { unit:bb.unit , time : bb.time };

        if( a.unit*b.unit  <=  FENGE ){
            obj.unit = a.unit*b.unit;
            obj.time = a.time + b.time ;
        }else{

            obj.unit = (a.unit*b.unit)/10 ;//Math.round((a.unit*b.unit)/10);
            obj.time = a.time + b.time + 1;
        }

        return obj;
    },

    MulNum:function(aa,num ){

        if(num == 0){
            return {"unit":0,"time":0};
        }

        if(aa.time == null ||  aa.unit == null  ){
            return ;
        }
        var obj = {unit:0,time:0};
        var a = { unit:aa.unit , time : aa.time };

        if( a.unit*num  <=  FENGE ){
            obj.unit = a.unit*num;
            obj.time = a.time  ;
        }else{
            num /= 10;
            var cishu = 1;
            while( num*a.unit > FENGE ){
                num /= 10;
                cishu ++;
            }

            obj.unit = (a.unit*num) ;//Math.round((a.unit*num));
            obj.time = a.time + cishu; 
        }

        return obj;
    },

    //除
    Div:function(aa,bb){
        // if(aa.time == null || bb.time == null || aa.unit == null || bb.unit == null ){
        //     return ;
        // }
        if(typeof bb == "number"){
            bb = {"unit":bb,"time":0};
        }

        var obj = {unit:0,time:0};
        var a = { unit:aa.unit , time : aa.time };
        var b = { unit:bb.unit , time : bb.time };

        var sub_time = a.time - b.time ; 
        var div_unit = a.unit / b.unit ; //Math.round( a.unit / b.unit  );

        while(sub_time  < 0 ){
            sub_time ++;
            div_unit /= 10;

        }
        obj.unit = div_unit //parseInt( div_unit );
        obj.time = sub_time; 

        return obj ;
    },

    //比较a,b   a>b 返回 true  ，反之 false 
    ChargeBig:function(a,b){
        var sub_obj =   this.Sub(a,b);
        return this.JudgeZhen(sub_obj);
    }, 

    JudgeZhen:function(obj){
        return obj.unit >= 0 ? true : false;
    },

    Fenshu:function(obj){

        while (obj.time > 0 && obj.unit < 1){
            obj.unit = obj.unit*10;
            obj.time --;
        }

        var sang = 1;
        while(obj.time < 0)
        {
            obj.time ++;
            sang *= 10;
        }


        return obj.unit / sang ;
    },


     TruncPoint(obj){
        let time = obj.time;
        let basisNum = 1;

        while( time > 0){
            basisNum *= 10;
            time -= 1;
        }

        while(obj.time > 0 && obj.unit < 0){
            obj.unit *= 10;
            obj.time -=1;
        }

        obj.unit = Math.trunc(obj.unit * basisNum)/basisNum;

     },

     GetInt(ob){
        let obj = {};
        obj.unit = ob.unit;
        obj.time = ob.time;


         while (obj.time > 0 && ( obj.unit - Math.trunc(obj.unit) >0 ) ){
             obj.unit *= 10;
             obj.time --;
         }
         obj.unit = Math.ceil(obj.unit);                    //向上取整

         return obj;
     },

     //向下取整
     GetFloorInt(ob){
         let obj = {};
         obj.unit = ob.unit;
         obj.time = ob.time;


         while (obj.time > 0 && ( obj.unit - Math.trunc(obj.unit) >0 ) ){
             obj.unit *= 10;
             obj.time --;
         }
         obj.unit = Math.floor(obj.unit);                    //向上取整

         return obj;
     },
 };

 module.exports = BigNum;


