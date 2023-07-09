// pages/settlement/settlement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    show: false,
    areaList: [],
    checkedIndex: 0, // Popup弹窗：初始化是默认那个index
    defaultArea: {} // 页面上方：选择地址区域默认地址展示
  },

  fetchAreaList() {
    // 获取地址信息
    wx.request({
      url: 'http://www.kangliuyong.com:10002/findAddress',
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token')
      },
      success: res => {
        this.setData({
          areaList: res.data.result,
        }, () => {
          // 获取完地址列表后设checkedIndex为默认地址
          const {
            id
          } = this.data.areaList.find(item => item.isDefault === 1);
          this.setData({
            checkedIndex: id
          }, () => {
            this.setDefaultArea();
          });
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取订单信息
    wx.request({
      url: 'http://www.kangliuyong.com:10002/commitShopcart',
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
        // 这个入参有问题，接口没提供查询订单页面所有的信息。
        // 接口没有提供，我在购物车页面点击提交订单后，把商品sid存到localStorage内，取到这里查询。
        sids: JSON.stringify(wx.getStorageSync('submit_sids'))
      },
      success: res => {
        console.log(res, '=-=')
        if (res.data.code === 50000) {
          this.setData({
            orderList: res.data.result
          });
        }
      }
    });
    // 初始化请求一次
    this.fetchAreaList();
  },

  setDefaultArea() {
    // 默认展示在选择地址区域的地址
    const defaultArea = this.data.areaList.find(item => item.id === this.data.checkedIndex);
    this.setData({
      defaultArea
    });
  },

  onChange(e) {
    const id = e.target.dataset.id;
    this.setData({
      checkedIndex: id,
      show: false
    }, () => {
      this.setDefaultArea();
    });
  },

  onClickLeft() {
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },

  handleClick() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  handleAddArea() {
    wx.navigateTo({
      url: '/pages/addarea/addarea',
    });
  },

  handleSettle() {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/pay',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
        sids: JSON.stringify(wx.getStorageSync('submit_sids')),
        phone: this.data.defaultArea.tel,
        address: `${this.data.defaultArea.province}${this.data.defaultArea.city}${this.data.defaultArea.county}${this.data.defaultArea.addressDetail}`,
        receiver: this.data.defaultArea.name,
      },
      success: res => {
        console.log(res)
        if (res.data.code === 60000) {
          wx.showToast({
            title: res.data.msg
          });
          wx.navigateTo({
            url: '/pages/orderment/orderment',
          });
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
    this.fetchAreaList();
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