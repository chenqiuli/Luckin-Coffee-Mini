// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    hotList: [],
    token: "",
    nickName: ""
  },

  fetchPersonalInfo() {
    // 获取个人信息
    wx.request({
      url: 'http://www.kangliuyong.com:10002/findMy',
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token')
      },
      success: res => {
        const {
          code,
          result
        } = res.data ?? {};
        if (code === "A001") {
          this.setData({
            nickName: result[0].nickName
          })
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载，只会执行一次
   */
  onLoad(options) {
    // 登录后设置token
    this.setData({
      token: wx.getStorageSync('token')
    });

    // 轮播图
    wx.request({
      url: 'http://www.kangliuyong.com:10002/banner',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
      },
      success: res => {
        // console.log(res)
        const {
          statusCode,
          data
        } = res ?? {};
        if (statusCode === 200) {
          this.setData({
            bannerList: data.result
          })
        }
      }
    })
    // 热卖推荐
    wx.request({
      url: 'http://www.kangliuyong.com:10002/typeProducts',
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        key: 'isHot',
        value: 1
      },
      success: res => {
        // console.log(res)
        this.setData({
          hotList: res.data.result
        })
      }
    });

    this.fetchPersonalInfo();
  },

  handleInput() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  handleLogin() {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示，每次页面切换都会执行
   */
  onShow() {
    // 登录后设置token
    this.setData({
      token: wx.getStorageSync('token')
    });
    this.fetchPersonalInfo();
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