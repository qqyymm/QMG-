//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
  },
  //设置全局变量存储图片路径、五官定位API返回值等
  globalData:{
    flag: null,
    pickurl:null,
    picpath:null,
    height:null,
    width:null,
    mouth:null,
    lefteyebrow:null,
    righteyebrow:null
    }
})
