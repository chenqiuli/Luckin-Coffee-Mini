// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    isclickright: false
  },

  onClickLeft() {
    wx.navigateBack();
  },

  onClickRight() {
    if (!this.data.isclickright) {
      // 编辑-完成  做到这里
      this.setData({
        isclickright: true
      });
    } else {
      // 完成-编辑
      this.setData({
        isclickright: false
      });
    }
  },

  handleParent(event) {
    // 修改数量，修改整个list，setData重新render
    console.log("监听到了子组件", event.detail);
    const {
      sid,
      count
    } = event.detail;
    const newList = this.data.cartList.map(item => {
      if (item.sid === sid) {
        item.count = count;
      }
      return item
    })
    this.setData({
      cartList: newList
    })
    // 修改购物车数量接口
    wx.request({
      url: 'http://www.kangliuyong.com:10002/modifyShopcartCount',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
        sid,
        count
      },
      success: res => {
        // console.log(res)
        if (res.data.code === 6000) {
          wx.showToast({
            title: res.data.msg
          })
        }
      }
    })

  },

  // 获取购物车列表
  fetchCartList() {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/findAllShopcart',
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token')
      },
      success: res => {
        this.setData({
          cartList: res.data.result
        })
      }
    })
  },

  // 删除购物车
  delCartList(event) {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/deleteShopcart',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
        sids: event.detail
      },
      success: res => {
        // console.log(res)
        if (res.data.code === 7000) {
          wx.showToast({
            title: res.data.msg
          });
          this.fetchCartList();
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log("onLoad")
    this.fetchCartList();
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
    // console.log("onShow");
    this.fetchCartList();
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