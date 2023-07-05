// components/ButtonCom/ButtonCom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: ""
    },
    color: {
      type: String,
      value: ""
    },
    isShow: {
      type: Boolean,
      value: true
    },
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
    handleClick() {
      this.triggerEvent("ButtonEvent");
    }
  }
})