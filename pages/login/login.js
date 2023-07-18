// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: "",
    isShow: false
  },

  onClose() {
    this.setData({
      isShow: false
    })
  },

  handleHome() {
    // 跳转tabbar页面
    if (!wx.getStorageSync('token')) {
      wx.showToast({
        title: '请先进行登录',
        icon: 'error'
      })
    } else {
      wx.switchTab({
        url: "/pages/home/home",
      });
    }
  },

  handleLogin() {
    if (!this.data.phone.length || !this.data.password.length) {
      wx.showToast({
        title: '请输入~',
        icon: 'error',
      })
    } else {
      wx.request({
        url: 'http://www.kangliuyong.com:10002/login',
        method: 'POST',
        data: {
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          password: this.data.password,
          phone: this.data.phone,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: res => {
          // console.log(res)
          if (res.data.code === 201) {
            wx.showToast({
              title: res.data.msg,
              icon: 'error'
            })
          } else if (res.data.code === 202) {
            wx.showToast({
              title: res.data.msg,
              icon: 'error'
            })
          } else if (res.data.code === 200) {
            wx.showToast({
              title: res.data.msg,
              icon: 'success'
            });
            wx.setStorageSync('token', res.data.token);
            wx.switchTab({
              url: '/pages/home/home',
            });
            // // 在当前页面获取上一个页面，然后调用上一个页面的更新函数去刷新页面
            // let pages = getCurrentPages();
            // let prePages = pages[pages.length - 2]; //获取上一个页面的对象
            // prePages.fetchPersonalInfo(); //调用上一个页面里的更新函数
          } else {
            wx.showToast({
              title: '未知错误',
              icon: 'error'
            })
          }
        }
      })
    }
  },

  handleRegister() {
    this.setData({
      isShow: true
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})