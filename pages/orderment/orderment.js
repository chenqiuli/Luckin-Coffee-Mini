// pages/orderment/orderment.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    orderList: []
  },

  onChange(event) {
    this.setData({
      active: event.detail.index
    }, () => {
      this.fetchOrderList();
    });
  },

  onClickLeft() {
    wx.navigateBack();
  },

  fetchOrderList() {
    // 待办：wx.request封装前加loading
    wx.request({
      url: 'http://www.kangliuyong.com:10002/findOrder',
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
        // 其中 status 值为 0, 1, 2 ==> 0: 全部，1: 进行中，2: 已完成
        status: this.data.active 
      },
      success: (res) => {
        // console.log(res.data.result)
        // 根据oid订单编号分组
        const oidGroup = res.data.result.reduce((result, item) => {
          // 根据 category 字段进行分组
          const key = item.oid;
          // 如果 result 中不存在该分类，则创建一个空数组
          if (!result[key]) {
            result[key] = [];
          }
          // 将当前项添加到对应的分类数组中
          result[key].push(item);
          return result;
        }, {});
        console.log(Object.entries(oidGroup), 'oidGroup')


        this.setData({
          orderList: Object.entries(oidGroup)
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchOrderList();
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