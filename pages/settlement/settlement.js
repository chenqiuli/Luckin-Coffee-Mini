// pages/settlement/settlement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/commitShopcart',
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
        // 这个入参有问题，接口没提供查询订单页面所有的信息。
        // 接口若没提供，我在购物车页面点击提交订单后，把商品sid存到localStorage内，取到这里查询。
        sids: JSON.stringify(["_s1687683648380","_s1687662466999"])
      },
      success: res => {
        console.log(res, '=-=')
        if (res.data.code === 50000) {
          this.setData({
            orderList: res.data.result
          });
        }
      }
    })
  },

  onClickLeft() {
    wx.navigateBack();
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