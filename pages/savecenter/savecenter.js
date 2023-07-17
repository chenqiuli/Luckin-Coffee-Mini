// pages/savecenter/savecenter.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPwd: false,
    showZhuxiao: false,
    showLogout: false,
    password: "",
    oldPassword: ""
  },

  // changePassword(event) {
  //   console.log(event);
  //   this.setData({
  //     [event.target.dataset.key]: event.detail
  //   });
  // },

  handleUpdatePwd() {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/updatePassword',
      method: 'POST',
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
        password: this.data.password,
        oldPassword: this.data.oldPassword,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: res => {
        // console.log(res)
        if (res.data.code === 'E003') {
          wx.showToast({
            title: res.data.msg,
            icon: 'error'
          });
        }
      }
    })
  },

  handleEditPwd() {
    this.setData({
      showPwd: !this.data.showPwd
    });
  },

  handleZhuXiao() {
    this.setData({
      showZhuxiao: !this.data.showZhuxiao
    });
  },


  handleSureZhuxiao() {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/destroyAccount',
      method: 'POST',
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: res => {
        if(res.data.code === 'G001') {
          wx.showToast({
            title: res.data.msg,
          });
          wx.removeStorageSync('token');
        }
      }
    })
  },

  handleLogout() {
    this.setData({
      showLogout: !this.data.showLogout
    });
  },

  handleSureLogout() {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/logout',
      method: 'POST',
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: res => {
        if(res.data.code === 'F001') {
          wx.showToast({
            title: res.data.msg,
          });
          wx.removeStorageSync('token');
          wx.redirectTo({
            url: '/pages/login/login',
          });
        }
      }
    })
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