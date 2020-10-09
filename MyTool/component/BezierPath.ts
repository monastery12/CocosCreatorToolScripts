/**
 * 贝塞尔曲线
 */

export let BezierPath = {

    /**
     * 获取二阶贝塞尔曲线坐标
     * @param time
     * @param p0
     * @param p1
     * @param p2
     */
    getSecondBezierPos(time,p0,p1,p2){
        time = time < 0 ? 0:time;
        time = time > 1 ? 1:time;
        let tempP0 = { x:(1 - time)*(1 - time) * p0.x , y:(1 - time)*(1 - time) * p0.y };
        let tempP1 = { x:2 * time * (1 - time) * p1.x , y:2 * time * (1 - time) * p1.y };
        let tempP2 = { x:time * time * p2.x ,           y:time * time * p2.x };
        let xx = tempP0.x + tempP1.x + tempP2.x;
        let yy = tempP0.y + tempP1.y + tempP2.y;
        return  {x:xx , y:yy};
    }

}