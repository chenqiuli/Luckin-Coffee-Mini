// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
  },

  fetchInfo() {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/findMy',
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: wx.getStorageSync('token')
      },
      success: res => {
        // console.log(res)
        const {
          code,
          result
        } = res.data ?? {};
        if (code === "A001") {
          this.setData({
            info: result[0]
          })
        } else if (code === 700) {
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }
      }
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取个人信息
    this.fetchInfo();
  },

  handleChooseBg() {
    wx.chooseImage({
      success: res => {
        // console.log(res)
        // 获取文件资源管理器的方法
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0],
          encoding: 'base64',
          success: res2 => {
            // console.log( res2.data)
            wx.getStorage({
              key: "token",
              success: res => {
                if (res2.data != null) {
                  wx.request({
                    url: 'http://www.kangliuyong.com:10002/updateUserBg',
                    method: 'POST',
                    data: {
                      appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
                      tokenString: res.data,
                      imgType: 'jpg',
                      serverBase64Img: res2.data
                    },
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    },
                    success: () => {
                      this.onLoad();
                    }
                  })
                }
              }
            })
          }
        })
      }
    });
  },

  handleChooseUser() {
    wx.chooseImage({
      success: res => {
        // console.log(res)
        // 获取文件资源管理器的方法
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0],
          encoding: 'base64',
          success: res2 => {
            // console.log( res2.data)
            wx.getStorage({
              key: "token",
              success: res => {
                if (res2.data != null) {
                  wx.request({
                    url: 'http://www.kangliuyong.com:10002/updateAvatar',
                    method: 'POST',
                    data: {
                      appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
                      tokenString: res.data,
                      imgType: 'jpg',
                      serverBase64Img: res2.data
                    },
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    },
                    success: () => {
                      this.onLoad();
                    }
                  })
                }
              }
            })
          }
        })
      }
    });
  },

  handleInfo() {
    wx.navigateTo({
      url: '/pages/myinfo/myinfo',
    });
  },

  handleArea() {
    wx.navigateTo({
      url: "/pages/areamanagement/areamanagement",
    })
  },

  handleOrder() {
    wx.navigateTo({
      url: "/pages/orderment/orderment",
    })
  },

  handleCollect() {
    wx.navigateTo({
      url: "/pages/collectment/collectment"
    })
  },

  handleSave() {
    wx.navigateTo({
      url: "/pages/savecenter/savecenter"
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