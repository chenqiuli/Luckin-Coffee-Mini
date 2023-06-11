// pages/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
      text: '热卖'
    }], // 左侧面板的list数据
    mainActiveIndex: 0, // 左侧面板选中的索引
    activeId: null,
    content: [],
    // 获取商品详情接口入参
    obj: {
      key: 'isHot',
      value: 1
    },
  },

  handleFocus() {
    wx.navigateTo({
      url: '/pages/search/search',
    });
  },

  // 根据商品类型获取商品
  loadContentData() {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/typeProducts',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        ...this.data.obj
      },
      success: res => {
        // console.log(res, '-=-')
        this.setData({
          content: res.data.result
        });
      }
    })
  },

  onClickNav({
    detail = {}
  }) {
    const {
      type
    } = this.data.items.find((item, index) => index === detail.index);
    if (detail.index === 0) {
      this.setData({
        obj: {
          key: 'isHot',
          value: 1
        },
      })
    } else {
      this.setData({
        mainActiveIndex: detail.index,
        obj: {
          key: 'type',
          value: type
        }
      });
    }
    this.loadContentData();
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取商品类型
    wx.request({
      url: 'http://www.kangliuyong.com:10002/type',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
      },
      success: res => {
        const leftList = res.data?.result?.map(item => {
          return {
            text: item.typeDesc, // 文字：拿铁
            type: item.type // 英文：类型
          }
        })
        this.setData({
          items: [...this.data.items, ...leftList]
        });
      }
    })

    // 获取特卖数据
    this.loadContentData();
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