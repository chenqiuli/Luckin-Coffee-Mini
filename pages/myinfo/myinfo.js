// pages/myinfo/myinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },



  hanldeTap() {

  },

  onClickLeft() {
    wx.switchTab({
      url: '/pages/mine/mine',
    });
  },

  fetchPersonalInfo() {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/findAccountInfo',
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token')
      },
      success: res => {
        console.log(res, '=-=')
        this.setData({
          info: res.data.result[0]
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchPersonalInfo();
  },

  onChangeName(e) {
    // console.log(e.detail)
    wx.request({
      url: 'http://www.kangliuyong.com:10002/updateNickName',
      method: 'POST',
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
        nickName: e.detail,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: res => {
        if (res.data.code === 'C001') {
          wx.showToast({
            title: res.data.msg,
          });
          this.fetchPersonalInfo();
          // 在当前页面获取上一个页面，然后调用上一个页面的更新函数去刷新页面
          let pages = getCurrentPages();
          let prePages = pages[pages.length - 2]; //获取上一个页面的对象
          prePages.fetchInfo(); //调用上一个页面里的更新函数
        }
      }
    })
  },

  onChangeDesc(e) {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/updateDesc',
      method: 'POST',
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
        desc: e.detail,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: res => {
        if (res.data.code === 'D001') {
          wx.showToast({
            title: res.data.msg,
          });
          this.fetchPersonalInfo();
          // 在当前页面获取上一个页面，然后调用上一个页面的更新函数去刷新页面
          let pages = getCurrentPages();
          let prePages = pages[pages.length - 2]; //获取上一个页面的对象
          prePages.fetchInfo(); //调用上一个页面里的更新函数
        }
      }
    })
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