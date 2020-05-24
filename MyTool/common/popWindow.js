
var popWindow = {

    windowList:[],                               //存储弹窗信息
    stop:false,

    /**
     * 打开弹窗，调用pushData
     * @param obj
     */
    pushData:function (obj) {
        this.windowList.push(obj);               //push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度
    },

    /**
     *自动调用
     */
    popData:function () {

        if(this.windowList.length > 0){
            let obj = this.windowList[0];
            this.stop = true;
            obj.call(obj.callBackFunc,obj.target);
        }
    },

    /**
     *弹窗关闭需要调用的方法
     */
    shiftData:function(){
        this.windowList.shift();                 //shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值
        this.stop = false;
    },

    //开启弹窗管理
    beginPopWindowManagr:function () {
        setInterval(function () {
            if(!this.stop){
                this.popData();
            }
        }.bind(this),1000)
    }

}

module.exports = popWindow
