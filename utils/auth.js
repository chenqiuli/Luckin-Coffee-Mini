const isAuth = () => {
  return wx.getStorageSync('token') ? true : false
}

export {
  isAuth
}