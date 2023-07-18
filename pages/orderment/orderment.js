// pages/orderment/orderment.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    orderList: []
  },

  handleReceive(event) {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/receive',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
        oid: event.detail
      },
      success: res => {
        if (res.data.code === 80000) {
          wx.showToast({
            title: res.data.msg,
          });
          this.fetchOrderList();
        }
      }
    });
  },

  handleDelOrder(event) {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/removeOrder',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
        oid: event.detail
      },
      success: res => {
        if (res.data.code === 90000) {
          wx.showToast({
            title: res.data.msg,
          });
          this.fetchOrderList();
        }
      }
    });
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
    // 在当前页面获取上一个页面，然后调用上一个页面的更新函数去刷新页面
    let pages = getCurrentPages();
    let prePages = pages[pages.length - 2]; //获取上一个页面的对象
    prePages.fetchInfo(); //调用上一个页面里的更新函数
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
        // console.log(Object.entries(oidGroup), 'oidGroup')


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