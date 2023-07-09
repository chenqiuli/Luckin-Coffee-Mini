// components/ListItem/ListItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    isDel: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleDetail(e) {
      const pid = e.target.dataset.pid;
      // console.log(pid);
      wx.navigateTo({
        url: `/pages/detail/detail?pid=${pid}`,
      })
    },
    handleDel(e) {
      const pid = e.target.dataset.pid;
      this.triggerEvent("DelEvent", pid);
    }
  }
})