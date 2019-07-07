// miniprogram/pages/canvas/canvas.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  onLoad: function (options) {
    var that = this;
    that.sys();
    that.bginfo();
  },
  sys: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowW: res.windowWidth,
          windowH: res.windowHeight
        })
      },
    })
  },
  bginfo: function () {
    var that = this;
    var canvas = wx.createCanvasContext('canvas');
   // var url1 = getApp().globalData.pickurl.toString();
    that.canvasdraw(canvas);
   /* wx.downloadFile({
      url: url1,//注意公众平台是否配置相应的域名     
      success: function (res) {
        that.setData({
          canvasimgbg: res.tempFilePath
        })
        console.log(getApp().globalData.pickurl),
        that.canvasdraw(canvas);
      }
    })*/
  },
  canvasdraw: function (canvas) {
    var that = this;
    var windowW = that.data.windowW;
    var windowH = that.data.windowH;
    var picW = getApp().globalData.width;
    var picH = getApp().globalData.height;
    var canvasimgbg = getApp().globalData.picpath;
    var p = getApp().globalData.mouth;
   // var canvasimg1 = that.data.chooseimg;
    canvas.drawImage(canvasimgbg, 0, 0, picW, picH);
    canvas.draw(true, setTimeout(function () {
      that.daochu()
    }, 1000));
    // canvas.draw();
  },
    red: function (canvas) {
    var that = this;
    var windowW = that.data.windowW;
    var windowH = that.data.windowH;
    var picW = getApp().globalData.width;
    var picH = getApp().globalData.height;
    var canvasimgbg = getApp().globalData.picpath;
    var p = getApp().globalData.mouth
   // canvas.drawImage(canvasimgbg, 0, 0, picW, picH);
    canvas.moveTo(p[0].X, p[0].Y)
    canvas.lineTo(p[1].X, p[1].Y)
    canvas.lineTo(p[2].X, p[2].Y)
    canvas.lineTo(p[3].X, p[3].Y)
    canvas.lineTo(p[4].X, p[4].Y)
    canvas.lineTo(p[5].X, p[5].Y)
    canvas.lineTo(p[6].X, p[6].Y)
    canvas.lineTo(p[16].X, p[16].Y)
    canvas.lineTo(p[15].X, p[15].Y)
    canvas.lineTo(p[14].X, p[14].Y)
    canvas.lineTo(p[13].X, p[13].Y)
    canvas.lineTo(p[12].X, p[12].Y)
    canvas.setFillStyle('red')
    canvas.fill()
    canvas.beginPath()
    canvas.moveTo(p[6].X, p[6].Y)
    canvas.lineTo(p[7].X, p[7].Y)
    canvas.lineTo(p[8].X, p[8].Y)
    canvas.lineTo(p[9].X, p[9].Y)
    canvas.lineTo(p[10].X, p[10].Y)
    canvas.lineTo(p[11].X, p[11].Y)
    canvas.lineTo(p[0].X, p[0].Y)
    canvas.lineTo(p[21].X, p[21].Y)
    canvas.lineTo(p[20].X, p[20].Y)
    canvas.lineTo(p[19].X, p[19].Y)
    canvas.lineTo(p[18].X, p[18].Y)
    canvas.lineTo(p[17].X, p[17].Y)
    canvas.setFillStyle('red')
    canvas.fill()
    canvas.draw(true, setTimeout(function () {
      that.daochu()
    }, 1000));
    // canvas.draw();
  },
  pink: function (canvas) {
    var that = this;
    var windowW = that.data.windowW;
    var windowH = that.data.windowH;
    var picW = getApp().globalData.width;
    var picH = getApp().globalData.height;
    var canvasimgbg = getApp().globalData.picpath;
    var p = getApp().globalData.mouth
    // canvas.drawImage(canvasimgbg, 0, 0, picW, picH);
    canvas.moveTo(p[0].X, p[0].Y)
    canvas.lineTo(p[1].X, p[1].Y)
    canvas.lineTo(p[2].X, p[2].Y)
    canvas.lineTo(p[3].X, p[3].Y)
    canvas.lineTo(p[4].X, p[4].Y)
    canvas.lineTo(p[5].X, p[5].Y)
    canvas.lineTo(p[6].X, p[6].Y)
    canvas.lineTo(p[16].X, p[16].Y)
    canvas.lineTo(p[15].X, p[15].Y)
    canvas.lineTo(p[14].X, p[14].Y)
    canvas.lineTo(p[13].X, p[13].Y)
    canvas.lineTo(p[12].X, p[12].Y)
    canvas.setFillStyle('#CF18A2')
    canvas.fill()
    canvas.beginPath()
    canvas.moveTo(p[6].X, p[6].Y)
    canvas.lineTo(p[7].X, p[7].Y)
    canvas.lineTo(p[8].X, p[8].Y)
    canvas.lineTo(p[9].X, p[9].Y)
    canvas.lineTo(p[10].X, p[10].Y)
    canvas.lineTo(p[11].X, p[11].Y)
    canvas.lineTo(p[0].X, p[0].Y)
    canvas.lineTo(p[21].X, p[21].Y)
    canvas.lineTo(p[20].X, p[20].Y)
    canvas.lineTo(p[19].X, p[19].Y)
    canvas.lineTo(p[18].X, p[18].Y)
    canvas.lineTo(p[17].X, p[17].Y)
    canvas.setFillStyle('#CF18A2')
    canvas.fill()
    canvas.draw(true, setTimeout(function () {
      that.daochu()
    }, 1000));
    // canvas.draw();
  },
  daochu: function () {
    console.log('a');
    var that = this;
    var windowW = getApp().globalData.width;
    var windowH = getApp().globalData.height;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: windowW,
      height: windowH,
      destWidth: windowW,
      destHeight: windowH,
      canvasId: 'canvas',
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
          }
        })
       /* wx.previewImage({
          urls: [res.tempFilePath],
        })*/
      }
    })
  },
     drawred: function () {
      var that = this;
      var canvas = wx.createCanvasContext('canvas');
      that.red(canvas)
    },
    drawpink: function () {
    var that = this;
    var canvas = wx.createCanvasContext('canvas');
    that.pink(canvas)
  }
 /* chooseImage: function () {
    var that = this;
    var canvas = wx.createCanvasContext('canvas');
    wx.chooseImage({
      success: function (res) {
        that.setData({
          chooseimg: res.tempFilePaths[0]
        })
        that.canvasdraw(canvas);
      },
    })
  }*/
})