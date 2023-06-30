// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    isclickright: false, // 是否点击了编辑
    allChecked: false, // 全选
    totalCount: 0, // 总和
    isLogin: false
  },

  onClickLeft() {
    wx.navigateBack();
  },

  onClickRight() {
    this.setData({
      isclickright: !this.data.isclickright
    });
  },

  // + / - 操作
  handleCountChange(event) {
    // 修改数量，修改整个list，setData重新render
    // console.log("监听到了子组件", event.detail);
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
    });
    this.totalCount();
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
    });
  },

  // 单个选中
  handleCheckedChange(event) {
    const {
      sid,
      checked
    } = event.detail;
    this.setData({
      cartList: this.data.cartList.map(item => {
        if (item.sid === sid) {
          item.checked = checked;
        }
        return item;
      })
    });
    // 联动全选
    const checkedLen = this.data.cartList.filter(item => item.checked).length;
    this.setData({
      allChecked: checkedLen === this.data.cartList.length ? true : false
    });
    this.totalCount();
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
        console.log(res.data.result, '=-=')
        this.setData({
          cartList: res.data.result?.map(item => {
            return {
              ...item,
              // 全部加上checked=false
              checked: false
            }
          })
        })
      }
    });
  },

  // 删除购物车
  delCartList(sids) {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/deleteShopcart',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
        sids
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
    });
  },

  // 求和
  totalCount() {
    let total = 0;
    this.data.cartList.filter(item => {
      if (item.checked) {
        total += item.count * Number(item.price)
      }
      return total;
    });
    this.setData({
      totalCount: total.toFixed(2)
    });
  },

  // 单个删除
  handleSingleDel(event) {
    this.delCartList(event.detail);
  },

  // 批量删除
  handleAllDelete() {
    const sids = []
    this.data.cartList.filter(item => {
      if (item.checked) {
        sids.push(item.sid);
      }
    })
    this.delCartList(JSON.stringify(sids))
  },

  // 全选
  handleAllChange(event) {
    this.setData({
      cartList: this.data.cartList.map(item => {
        return {
          ...item,
          checked: event.detail
        }
      }),
      allChecked: event.detail,
    });
    this.totalCount();
  },

  handleLogin() {
    wx.redirectTo({
      url: '/pages/login/login',
    });
  },

  // 提交订单
  handleSubmit() {
    const sids = [];
    this.data.cartList.forEach(item => {
      if (item.checked) {
        sids.push(item.sid)
      }
    });
    if (!sids.length) {
      wx.showToast({
        title: '请先选择商品',
        icon: 'error'
      });
      return;
    }
    wx.request({
      url: 'http://www.kangliuyong.com:10002/commitShopcart',
      method: 'GET',
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
        sids
      },
      success: res => {
        console.log(res)
        if (res.data.code === 50000) {
          wx.showToast({
            title: "提交订单成功"
          });
          wx.navigateTo({
            url: '/pages/settlement/settlement',
          });
          // 存储提交订单的商品的sid进缓存，提交订单页面传进接口入参
          const local_sids = wx.getStorageSync('submit_sids');
          wx.setStorageSync('submit_sids', Array.from(new Set([...local_sids, ...sids])));
        }
      }
    })
  },

  judgeIsLogin(){
    this.setData({
      isLogin: wx.getStorageSync('token') ? true : false
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.judgeIsLogin();
    this.fetchCartList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.judgeIsLogin();
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
    this.setData({
      totalCount: 0
    });
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