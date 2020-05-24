

var NotEnough = {

    //xx不足
    ShowNotEnough(father,item,showTime,showHeight){

        let itemNode = cc.instantiate(item);
        itemNode.setParent(father);
        itemNode.setPosition(0,0);

        let moveTime = showTime || 1;
        let moveHeight = showHeight || 30;

        let action = cc.spawn( cc.moveBy(moveTime,cc.v2(0,moveHeight) ) , cc.fadeOut(moveTime)  );

        itemNode.runAction(action);

        setTimeout(function () {

            itemNode.destroy();             //销毁

        }.bind(this) , moveTime*1000);
    },
}

module.exports = NotEnough;