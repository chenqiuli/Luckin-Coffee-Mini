// components/TagCom/TagCom.js
Component({
  /**
   * 组件的属性列表，访问properties数据this.data.xx
   */
  properties: {
    desc: {
      type: String,
      value: ""
    },
    list: {
      type: Array,
      value: []
    },
    tag: {
      type: String,
      value: ""
    },
    // 留好默认高亮哪个元素，目前接口没有，
    active: {
      type: String,
      value: ""
    }
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行 
      console.log(this.properties.list[0], '-')
      // 回显Storage内的饮料选项
      this.setData({
        temActive: wx.getStorageSync('temActive'),
        sugarActive: wx.getStorageSync('sugarActive'),
        creamActive: wx.getStorageSync('creamActive'),
      });
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    temActive: "",
    sugarActive: "",
    creamActive: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {

    handleTap(event) {
      // console.log(event.target.dataset.name)  
      let key;
      if (this.data.tag === 'tem') {
        key = 'temActive'
      } else if (this.data.tag === 'sugar') {
        key = 'sugarActive'
      } else {
        key = 'creamActive'
      }
      const value = this.data[key] === event.target.dataset.name ? "" : event.target.dataset.name;
      this.setData({
        [key]: value,
      });
      // 存入缓存，加入购物车需要入参用
      wx.setStorageSync(key, value);
    },
  }


})