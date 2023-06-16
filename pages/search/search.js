// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: [],
    value: "", // 搜索框值
    recordList: []
  },

  saveRecord() {
    const arr = [];
    const searchRecord = wx.getStorageSync('searchRecord');
    if (searchRecord.length) {
      searchRecord?.forEach(item => {
        if (!arr.includes(item)) {
          arr.push(item)
        }
      });
      this.setData({
        recordList: arr
      });
    } else {
      this.setData({
        recordList: []
      });
    }
  },

  fetchSearchList(name) {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/search',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        name
      },
      success: res => {
        if (res.data.result.length / 2 === 0) {
          this.setData({
            searchList: res.data.result
          })
        } else {
          this.setData({
            searchList: [...res.data.result, {}]
          })
        }
      }
    });
  },

  handleSearch(evt) {
    this.setData({
      value: evt.detail,
    });
    if (evt.detail.length) {
      this.fetchSearchList(evt.detail);
      // 存储搜索记录
      const searchRecord = [evt.detail, ...wx.getStorageSync('searchRecord')]
      wx.setStorageSync('searchRecord', searchRecord);
      // 搜索完就展示搜索记录
      this.saveRecord();
    } else {
      wx.showToast({
        title: '搜索内容为空',
      });
    }
  },

  handleChange(evt) {
    if (!evt.detail.length) {
      this.setData({
        searchList: [],
      });
    }
  },

  handleCancel() {
    this.setData({
      searchList: [],
      value: ""
    });
  },

  handleClear() {
    wx.removeStorageSync('searchRecord');
    this.setData({
      value: ""
    });
    this.saveRecord();
    this.fetchSearchList();
  },

  handleClose(evt) {
    const item = evt.target.dataset.item;
    const searchRecord = wx.getStorageSync('searchRecord')?.filter(ele => ele !== item);
    wx.setStorageSync('searchRecord', searchRecord);
    this.saveRecord();

    if (item === this.data.value) {
      this.setData({
        value: ""
      });
      this.fetchSearchList();
    }
  },

  handleChoose(evt) {
    const item = evt.target.dataset.item;
    this.fetchSearchList(item);
    this.setData({
      value: item
    });
  },

  handleClick() {
    wx.navigateBack();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.saveRecord();
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