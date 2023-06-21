// components/TagCom/TagCom.js
Component({
  /**
   * 组件的属性列表，访问properties数据this.properties.xx，数组访问不了，需要监听
   */
  properties: {
    desc: {
      type: String,
      value: ""
    },
    list: {
      type: Array,
      value: [],
      observer: 'onListChange'
    },
    tag: {
      type: String,
      value: ""
    },
    // 留好默认高亮哪个元素，目前接口没有，
    active: {
      type: String,
      value: ""
    },
    pid: {
      type: String,
      value: ""
    },
  },

  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行 
    

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
      // console.log(value, 'value')
      // 存入缓存，加入购物车需要入参用
      wx.setStorageSync(key, value);
      wx.setStorageSync('detailPid', this.properties.pid)
    },

    // 监听list的变化
    // onListChange(newVal, oldVal) {
    //   console.log('监听的变化呀')
    //   // 回显Storage内的饮料选项
    //   this.setData({
    //     temActive: newVal[0],
    //     sugarActive: newVal[0],
    //     creamActive: newVal[0],
    //   });
    // }
  }


})