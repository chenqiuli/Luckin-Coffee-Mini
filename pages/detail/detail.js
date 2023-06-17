// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailInfo: {},
    count: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options.pid)
    wx.request({
      url: 'http://www.kangliuyong.com:10002/productDetail',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        pid: options.pid, // 
      },
      success: res => {
        console.log(res.data.result[0].sugar)
        const {
          tem,
          sugar,
          cream
        } = res.data.result[0] ?? {};
        this.setData({
          detailInfo: {
            ...res.data.result[0],
            tem: tem.length ? tem.split("/") : [],
            sugar: sugar.length ? sugar.split("/") : [],
            cream: cream.length ? cream.split("/") : [],
          }
        });
      }
    });
  },



  handleCart() {
    let rule = `${wx.getStorageSync('temActive')}/${wx.getStorageSync('sugarActive')}/${wx.getStorageSync('creamActive')}`;
    if (rule[rule.length - 1] === '/') rule = rule.slice(0, rule.length - 1) // 去除最后一个/
    if (rule[0] === '/') rule = rule.slice(1) // 去除第一个/
    console.log(rule)
    wx.request({
      url: 'http://www.kangliuyong.com:10002/addShopcart',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        pid: this.data.detailInfo.pid,
        count: this.data.count,
        rule,
        tokenString: wx.getStorageSync('token'),
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
      },
      success: res => {
        console.log(res)
      }
    })
  },

  handleMinus() {
    if (this.data.count <= 1) {
      return;
    }
    this.setData({
      count: this.data.count - 1
    })
  },

  handleAdd() {
    if (this.data.count >= 5) {
      return;
    }
    this.setData({
      count: this.data.count + 1
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