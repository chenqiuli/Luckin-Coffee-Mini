// pages/collectment/collectment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList: []
  },

  fetchCollectList() {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/findAllLike',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token')
      },
      success: res => {
        // console.log(res)
        if (res.data.code === 2000) {
          this.setData({
            collectList: res.data.result
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchCollectList();
  },

  onClickLeft() {
    wx.navigateBack();
  },

  handleDel(event) {
    console.log(event.detail);
    wx.request({
      url: 'http://www.kangliuyong.com:10002/notlike',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
        pid: event.detail
      },
      success: res => {
        if (res.data.code === 900) {
          wx.showToast({
            title: "商品已取消收藏"
          });
          this.fetchCollectList();
        }
      }
    });
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