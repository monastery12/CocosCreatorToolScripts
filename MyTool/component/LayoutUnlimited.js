// import {ShaderType} from "../shader/ShaderManager";
//
// const TYPE = cc.Enum({
//     horizontal:1,
//     vertical:2,
//     gird:3,
// })
//
// cc.Class({
//     extends: cc.Component,
//
//     properties: {
//
//         top:0,
//         bottom:0,
//         left:0,
//         right:0,
//         spacingX:0,
//         spacingY:0,
//         maxNum:10,
//
//         itemPrefab:cc.Prefab,
//     },
//
//     start () {
//
//     },
//
//     init(arrayData){
//
//         this._length = arrayData.length;                //item 长度
//         this._arrayData = arrayData;
//
//         let type = 1;
//         switch (type) {
//             case TYPE.horizontal:   this.initHorizontal();  break;
//             case TYPE.vertical:     this.initVertical();    break;
//             case TYPE.gird:         this.initGird();        break;
//         }
//     },
//
//     //水平布局
//     initHorizontal(){
//
//     },
//
//     //垂直布局
//     initVertical(){
//         this.node.width = this.itemPrefab.node.width + this.left + this.right ;             //容器宽度
//         this.node.height = this.itemPrefab.node.height * this._length + this.top + this.bottom + this.spacingY * (this._length - 1) ;
//
//         for(let i = 0 ; i < this._length && i < this.max ; i++ ){
//             let itemPrefab = null;
//             if(this.node.children[i]){
//                 itemPrefab = this.node.children[i];
//             }else {
//                 itemPrefab = cc.instantiate(this.itemPrefab);
//                 itemPrefab.parent = this.node;
//             }
//
//             //设置item位置
//             let height = this.top + this.itemPrefab.height *(i);
//             itemPrefab.setPosition(0,height);
//
//             //初始化item内容
//             // itemPrefab.getComponent(" ").init( this._arrayData[i] );
//         }
//     },
//
//     initGird(){
//
//     },
//
// });
