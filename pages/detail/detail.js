// pages/detail/detail.js
import Toast from '@vant/weapp/toast/toast';
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
        console.log(res.data.result[0])
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

  handleBack() {
    wx.navigateBack();
  },



  // 未登录也可以加入购物车
  handleCart() {
    if (wx.getStorageSync('detailPid') === this.data.detailInfo.pid) {
      let rule = `${wx.getStorageSync('temActive')}/${wx.getStorageSync('sugarActive')}/${wx.getStorageSync('creamActive')}`;
      if (rule[rule.length - 1] === '/') rule = rule.slice(0, rule.length - 1) // 去除最后一个/
      if (rule[0] === '/') rule = rule.slice(1) // 去除第一个/
      console.log(rule)
      wx.request({
        url: 'http://www.kangliuyong.com:10002/addShopcart',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        method: 'POST',
        data: {
          pid: this.data.detailInfo.pid,
          count: this.data.count,
          rule,
          tokenString: wx.getStorageSync('token'),
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
        },
        success: res => {
          console.log(res)
          Toast.success('商品已加入购物车');
          wx.switchTab({
            url: '/pages/cart/cart',
          });
        }
      })
    } else {
      Toast.fail('请先选择商品属性');
    }
  },

  handleMinus() {
    if (this.data.count <= 1) {
      Toast.fail('宝贝数量最少为1哦~');
      return;
    }
    this.setData({
      count: this.data.count - 1
    })
  },

  handleAdd() {
    if (this.data.count >= 5) {
      Toast.fail('宝贝数量最多为5哦~');
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
   * 生命周期函数--监听页面卸载，组件离开就会执行
   */
  onUnload() {
    wx.removeStorageSync('detailPid');
    wx.removeStorageSync('temActive');
    wx.removeStorageSync('sugarActive');
    wx.removeStorageSync('creamActive');
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