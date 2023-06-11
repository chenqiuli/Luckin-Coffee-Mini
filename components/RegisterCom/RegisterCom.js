// components/RegisterCom/RegisterCom.js
Component({
  /**
   * 组件的属性列表，接收来自父组件的props
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    phone: "",
    password: "",
    nickName: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClose() {
      // 调用父组件的方法，不需要传值，如需要传值，第二个参数传递
      this.triggerEvent("CloseEvent");
    },

    handleSure() {
      wx.request({
        url: 'http://www.kangliuyong.com:10002/register',
        method: 'POST',
        data: {
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          nickName: this.data.nickName,
          phone: this.data.phone,
          password: this.data.password
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: res => {
          // console.log(res) 
          const {
            data: {
              msg,
              code
            }
          } = res ?? {};
          if (code === 100) {
            wx.showToast({
              title: msg,
              icon: 'success'
            });
            this.triggerEvent("CloseEvent");
          } else {
            wx.showToast({
              title: msg,
              icon: 'error'
            });
          }
        }
      })
    }
  }
})