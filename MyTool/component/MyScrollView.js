var MyScrollView = cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.Node,
        itemsArr: [cc.Prefab],
        Vertical: false,
        //间距
        gap_x: 0,
        gap_y: 0,
    },
    onLoad()
    {
        this._init = false;
        this._right = true;
        this._bRight = true;
    },
    onEnable()
    {
        if(this._init)
        {
            // this.autoScroll(0);
            // this.autoScroll(150);
        }
    },
    //初始化
    init()
    {
        if(this._init)
            return;
        this._init = true;
        this.scrView = this.scrollView.getComponent(cc.ScrollView);
        this.content = this.scrView.content;
        this.height = this.content.height;
        this.width = this.content.width;
        this.node_pools = new Map();
        //存储item的map
        this.item_templates = new Map();
        this.itemsArr.forEach((tpl, index) => {
            tpl.data.active = false;
            this.item_templates.set(index, tpl.data);
        });
        //scrollView监听事件
        this.scrollView.on('scrolling', this.on_scrolling, this);
        this.scrollView.on('scroll-ended', this.on_ended, this);
    },
    autoScroll()
    {
        let t = 150;
        let v1 = this.scrView.getScrollOffset();
        let v2 = this.scrView.getMaxScrollOffset();
        let p = (v2.x - Math.abs(v1.x)) / v2.x;
        this.scrView.isAutoScrolling = false;
        if(this._bRight)
        {
            this.scrView.scrollToRight(t * p)
        }
        else
        {
            this.scrView.scrollToLeft(t * (1-p))
        }
    },
    on_ended()
    {
        let v1 = this.scrView.getScrollOffset();
        let v2 = this.scrView.getMaxScrollOffset();
        if(this._bRight)
        {
            //当前是往右滚动
            if((Math.abs(v1.x)+ 5) >= v2.x)
            {
                this._bRight = false;
            }
        }
        else
        {
            // 往左滚动
            if((Math.abs(v1.x)) <= 5)
            {
                this._bRight = true;
            }
        }
        this.autoScroll()

    },

    //滑动中回调
    on_scrolling()
    {
        if (!this.items || !this.items.length)
        {
            return;
        }
        //垂直滚动
        if (this.Vertical)
        {
            let posy = this.content.y;
            if (posy < 0) {
                posy = 0;
            }
            if (posy > this.content.height - this.height) {
                posy = this.content.height - this.height;
            }
            let start = 0;
            let stop = this.items.length - 1;
            let viewport_start = -posy;
            let viewport_stop = viewport_start - this.height;
            while (this.items[start].y - this.items[start].height > viewport_start)
            {
                start++;
            }
            while (this.items[stop].y < viewport_stop) {
                stop--;
            }
            if (start != this.start_index && stop != this.stop_index) 
            {
                this.start_index = start;
                this.stop_index = stop;
                this.render_items();
            }
        }
        else
        { //水平滚动
            let posx = this.content.x;
            if (posx > 0) {
                posx = 0;
            }
            if (posx < this.width - this.content.width)
            {
                posx = this.width - this.content.width;
            }
            let start = 0;
            let stop = this.items.length - 1;
            let viewport_start = -posx;
            let viewport_stop = viewport_start + this.width;
            while (this.items[start].x + this.items[start].width < viewport_start)
            {
                start++;
            }
            while (this.items[stop].x > viewport_stop)
            {
                stop--;
            }
            if (start != this.start_index && stop != this.stop_index) {
                this.start_index = start;
                this.stop_index = stop;
                this.render_items();
            }
        }

    },

    //生成node
    spawn_node(key)
    {
        let node;
        let pools = this.node_pools.get(key);
        if (pools && pools.length > 0) 
        {
            node = pools.pop();
        } 
        else
        {
            node = cc.instantiate(this.item_templates.get(key));
            node.active = true;
        }
        node.parent = this.content;
        return node;
    },
    //回收item
    recycle_item(item)
    {
        if (item.node && cc.isValid(item.node)) 
        {
            let pools = this.node_pools.get(item.data.key);
            if (!pools)
            {
                pools = [];
                this.node_pools.set(item.data.key, pools);
            }
            pools.push(item.node);
            // if (this.recycle_cb) {
            //     this.recycle_cb.call(item.node, item.data.key);
            // }
            item.node.removeFromParent(false);
            item.node = null;
        }
    },
    //清除items
    clear_items()
        {
        if (this.items) 
        {
            this.items.forEach((item) => 
            {
                this.recycle_item(item);
            });
        }
    },
    //渲染items
    render_items() 
    {
        let item;
        for (let i = 0; i < this.start_index; i++) 
        {
            item = this.items[i];
            if (item.node) 
            {
                this.recycle_item(item);
            }
        }
        for (let i = this.items.length - 1; i > this.stop_index; i--) 
        {
            item = this.items[i];
            if (item.node) 
            {
                this.recycle_item(item);
            }
        }
        for (let i = this.start_index; i <= this.stop_index + 1; i++)
            {
            if (!this.items[i]) 
            {
                return

            }
            item = this.items[i];
            if (!item.node)
            {
                item.node = this.spawn_node(item.data.key);
                this.item_setter(item.node, item.data);
            }
            item.node.setPosition(item.x, item.y);
        }
    },
    //赋值item
    pack_item(index, data) 
    {
        let node = this.spawn_node(data.key);
        //let [width, height] = this.item_setter(node, data);
        let width = node.width;
        let height = node.height;
        let item = {
            x: 0,
            y: 0,
            width: width,
            height: height,
            data: data,
            node: node
        };
        this.recycle_item(item);
        return item;
    },
    //item具体赋值      data {key:xx,data:xx}
    item_setter(item, data) 
    {
        item.getComponent("LiveRoomItem").init(data.data);

    },
    item_size(item)
    {
        let com = item.getComponent(cc.Component)
        com.init(data);
        return [item.width, item.height];
    },
    //布局items
    layout_items(start) 
    {
        if (this.items.length <= 0) 
        {
            return;
        }
        let start_pos = 0;
        if (start > 0) {
            let prev_item = this.items[start - 1];
            if (this.Vertical)
            {
                start_pos = prev_item.y - prev_item.height - this.gap_y;
            } else {
                start_pos = prev_item.x + prev_item.width + this.gap_x;
            }
        }
        for (let index = start, stop = this.items.length; index < stop; index++) 
        {
            let item = this.items[index];
            if (this.Vertical) 
            {
                item.x = 0;
                item.y = start_pos;
                start_pos -= item.height + this.gap_y;
            } 
            else 
            {
                item.y = 0;
                item.x = start_pos;
                start_pos += item.width + this.gap_x;
            }
        }
    },
    //调整content
    resize_content() {
        if (this.items.length <= 0) {
            this.content.width = 0;
            this.content.height = 0;
            return;
        }
        let last_item = this.items[this.items.length - 1];
        if (this.Vertical) {
            this.content.height = Math.max(this.height, last_item.height - last_item.y);
        } else {
            this.content.width = Math.max(this.width, last_item.x + last_item.width);
        }
    },
    //设置数据
    set_data(datas)
        {
        this.clear_items();
        this.items = [];
        datas.forEach((data, index) => {
            let item = this.pack_item(index, data);
            this.items.push(item);
        });
        this.layout_items(0);
        this.resize_content();
        this.start_index = -1;
        this.stop_index = -1;
        if (this.Vertical) {
            this.content.y = 0;
        } else {
            this.content.x = 0;
        }
        if (this.items.length > 0) {
            this.on_scrolling();
        }
    },
    //插入数据
    insert_data(index, datas) {
        if (datas.length == 0) {
            // console.log("没有要添加的数据");
            return;
        }
        if (!this.items) {
            this.items = [];
        }
        if (index < 0 || index > this.items.length) {
            console.log("无效的index", index);
            return;
        }
        let is_append = index == this.items.length;
        let items = [];
        datas.forEach((data, index) => {
            let item = this.pack_item(index, data);
            items.push(item);
        });
        this.items.splice(index, 0, ...items);
        this.layout_items(index);
        this.resize_content();
        this.start_index = -1;
        this.stop_index = -1;
        this.on_scrolling();
    },
    //追加数据
    append_data(datas) {
        if (!this.items) {
            this.items = [];
        }
        this.insert_data(this.items.length, datas);
    },
    //滑动到底
    scroll_to_end() {
        if (this.Vertical) {
            this.scrView.getComponent(cc.ScrollView).scrollToBottom(2);
        } else {
            this.scrView.getComponent(cc.ScrollView).scrollToRight(2);
        }
    },
    //销毁
    destroy_items() {
        this.clear_items();
        this.node_pools.forEach((pools, key) => 
        {
            pools.forEach((node) => {
                node.destroy();
            });
        });
        this.node_pools = null;
        this.items = null;
        if (cc.isValid(this.scrollview)) {
            this.scrollview.off("scrolling", this.on_scrolling, this);
            // this.scrollview.node.off("scroll-to-bottom", this.on_scroll_to_end, this);
            // this.scrollview.node.off("scroll-to-right", this.on_scroll_to_end, this);
        }
    },
});
module.exports = MyScrollView