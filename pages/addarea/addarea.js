// pages/addarea/addarea.js
import {
  addressList
} from '../../utils/address';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList: addressList,
    show: false,
    // 接口入参
    isDefault: false, // 0: 非默认地址, 1: 默认地址
    mainarea: "",
    areaCode: "",
    name: "",
    tel: "",
    addressDetail: "",
    postalCode: "",
    // 编辑传过来的参数
    type: 'add',
    aid: ""
  },

  onClickLeft() {
    wx.navigateBack();
  },

  onClick() {
    this.setData({
      show: true,
    });
  },

  onClose() {
    this.setData({
      show: false,
    });
  },

  onChange({
    detail
  }) {
    // 需要手动对 checked 状态进行更新
    this.setData({
      isDefault: detail
    });
  },

  onConfirm(e) {
    // console.log(e.detail)
    const nameArr = e.detail.values.map(item => item.name);
    this.setData({
      mainarea: nameArr.join(","),
      show: false,
      areaCode: e.detail.values[e.detail.values.length - 1].code
    })
  },

  handleChange(e) {
    const key = e.target.dataset.key;
    // console.log(key, e);
    const phoneReg = /^1[3456789]\d{9}$/;
    if (key === 'tel' && !phoneReg.test(e.detail)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'error'
      });
      return;
    }
    this.setData({
      [key]: e.detail
    });
  },

  handleSave() {
    if (!this.data.name || !this.data.tel || !this.data.mainarea || !this.data.addressDetail) {
      wx.showToast({
        title: '请输入信息',
        icon: 'error'
      })
      return;
    }
    wx.request({
      url: 'http://www.kangliuyong.com:10002/addAddress',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
        name: this.data.name,
        tel: this.data.tel,
        province: this.data.mainarea.split(",")[0],
        city: this.data.mainarea.split(",")[1],
        county: this.data.mainarea.split(",")[2],
        addressDetail: this.data.addressDetail,
        areaCode: this.data.areaCode, // 区的编码
        postalCode: this.data.postalCode,
        isDefault: this.data.isDefault ? 1 : 0
      },
      success: res => {
        console.log(res, "哈哈哈")
        if (res.data.code === 9000) {
          wx.showToast({
            title: res.data.msg,
          });
          wx.navigateTo({
            url: '/pages/areamanagement/areamanagement',
          });
        }
      }
    })
  },

  handleDel() {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/deleteAddress',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token'),
        aid: this.data.aid
      },
      success: res => {
        // console.log(res, "哈哈哈")
        if (res.data.code === 10000) {
          wx.showToast({
            title: res.data.msg,
          });
          // wx.navigateTo 跳转回去的页面才会
          wx.navigateTo({
            url: '/pages/areamanagement/areamanagement',
          });
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const type = options.type;
    const aid = options.aid;
    this.setData({
      type,
      aid
    });
    // 编辑回显
    if (type === 'edit') {
      wx.request({
        url: 'http://www.kangliuyong.com:10002/findAddressByAid',
        method: 'GET',
        data: {
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          tokenString: wx.getStorageSync('token'),
          aid
        },
        success: res => {
          console.log(res, "哈哈哈edit")
          const {
            name,
            tel,
            addressDetail,
            postalCode,
            province,
            city,
            county,
            areaCode,
            isDefault
          } = res.data.result[0] ?? {};
          this.setData({
            name,
            tel,
            mainarea: `${province},${city},${county}`,
            areaCode,
            addressDetail,
            postalCode,
            isDefault: isDefault === 1 ? true : false
          });
        }
      });
    }
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