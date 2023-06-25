// components/CartItem/CartItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 遍历数组
    cartList: {
      type: Array,
      value: []
    },
    // 单个选项的checkbox是否禁用
    isclickright: {
      type: Boolean,
      value: false
    },
    // 是否显示单个选项的checkbox，同时控制：右边展示数量（可操作）或展示数量（不可操作）
    isShowCheckbox: {
      type: Boolean,
      value: true
    },
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