// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: [],
    value: ""
  },

  handleSearch(evt) {
    // console.log(evt.detail)
    this.setData({
      value: evt.detail
    })
    if (evt.detail.length) {
      wx.request({
        url: 'http://www.kangliuyong.com:10002/search',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: {
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          name: evt.detail
        },
        success: res => {
          // console.log(res, '-=-')
          if (res.data.result.length / 2 === 0) {
            this.setData({
              searchList: res.data.result
            })
          } else {
            this.setData({
              searchList: [...res.data.result, {}]
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '搜索内容为空',
      })
    }
  },

  handleCancel() {
    this.setData({
      searchList: [],
      value: ""
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