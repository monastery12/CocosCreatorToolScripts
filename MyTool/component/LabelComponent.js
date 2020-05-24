

cc.Class({
    extends: cc.Label,

    properties: {

        fixCount:7,
    },

    start () {
        this._string = this.string;
        this.freshUI();
    },

    setString(str){
        this._string = str;
        this.freshUI();
    },

    freshUI(){
        let text = this._string;

        this.string = '';
        let lineCount =  this.fixCount;

        let count = 0
        for(let i = 0 ; i< text.length; i++){

            if( count == lineCount){
                this.string = this.string + '\n';
                count = 0;
            }

            this.string += text[i];
            count ++;
        }

    },

});
