// components/CartItem/CartItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartList: {
      type: Array,
      value: []
    },
    isclickright: {
      type: Boolean,
      value: false
    }

  },



  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    handleChangeCount(event) {
      const sid = event.target.dataset.sid;
      const count = event.target.dataset.count;
      const type = event.target.dataset.type;
      if (type === 'minus' && count <= 1) {
        wx.showToast({
          title: '宝贝最少为1',
        });
        return;
      }

      this.triggerEvent("CountChange", {
        sid,
        count: type === 'minus' ? count - 1 : count + 1,
      });
    },

    handelDel(event) {
      const sid = event.target.dataset.sid;
      // 在父组件中删除完重新调用查询购物车接口
      this.triggerEvent("DelCartList", JSON.stringify([sid]));
    },

    handleChange(event) {
      console.log(event)
      const sid = event.target.dataset.sid;
      this.triggerEvent("CheckedChange", {
        sid,
        checked: event.detail
      })
    }

  }
})