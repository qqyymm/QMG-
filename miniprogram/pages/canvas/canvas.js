// miniprogram/pages/canvas/canvas.js
Page({
  //页面底部产品栏相关数据
  data: {
    windowW: '',
    windowH: '',
    showImg1: '',
    showImg2: '',
    showImg3: '',
    showImg4: '',
    showImg5: '',
    productsList: ['https://res.yslbeautycn.com/resources/2019/4/8/15547105141463762_1000X1000.jpg?version=20190626000830091 ','https://res.yslbeautycn.com/resources/2018/5/24/15271551886164825_1000X1000.jpg?version=20190626000830091 ',
'https://res.yslbeautycn.com/resources/2018/7/24/15324014433735856_1000X1000.jpg?version=20190626000830091 ',
'https://res.yslbeautycn.com/resources/2019/6/13/15603958296978425_1000X1000.jpg?version=20190626000830091 ',
'https://res.yslbeautycn.com/resources/2018/6/27/15300704942073876_1000X1000.jpg?version=20190626000830091 '
    ],
    eyebrow:
      ['https://www.shuuemura.com.cn/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-shubeauty-master-catalog/default/dwa01eae49/images/MakeUp/01-25/SHU00016/F2275700U_02.jpg?sw=490&sh=490&sm=fit ',
      'https://www.shuuemura.com.cn/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-shubeauty-master-catalog/default/dw4c768a06/images/MakeUp/01-25/SHU00016/F2275500U_02.jpg?sw=490&sh=490&sm=fit ',
      'https://www.shuuemura.com.cn/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-shubeauty-master-catalog/default/dw25074231/images/MakeUp/01-25/SHU00016/F2275300U_02.jpg?sw=490&sh=490&sm=fit ',
      'https://www.shuuemura.com.cn/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-shubeauty-master-catalog/default/dw950d4c63/images/MakeUp/01-25/SHU00016/F6878200U_02.jpg?sw=300&sh=300&sm=fit ']

  },
  onLoad: function (options) {
    var that = this;
    //美妆界面数据初始化
    getApp().globalData.flag=1
    this.setData({

      showImg1: this.data.productsList[0],
      showImg2: this.data.productsList[1],
      showImg3: this.data.productsList[2],
      showImg4: this.data.productsList[3],
      showImg5: this.data.productsList[4]
    });
    //初始化获取屏幕长宽，初始化显示画布为所选图片
    that.sys();
    that.bginfo();
  },
  //系统信息获取函数
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
  //画布初始化函数
  bginfo: function () {
    var that = this;
    var canvas = wx.createCanvasContext('canvas',that);
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
  //画布图片绘入
  canvasdraw: function (canvas) {
    var that = this;
    var windowW = that.data.windowW;
    var windowH = that.data.windowH;
    var picW = getApp().globalData.width;
    //使图片适应屏幕大小
    var picH = getApp().globalData.height*windowW/picW; 
    var canvasimgbg = getApp().globalData.picpath;
    var p = getApp().globalData.mouth;
    canvas.drawImage(canvasimgbg, 0, 0, windowW, picH);
    canvas.draw(true, setTimeout(function () {
      that.daochu()
    }, 1000));
    // canvas.draw();
  },
  //嘴唇上色函数
    drawcolor: function (canvas,color) {
    var that = this;
    var windowW = that.data.windowW;
    var windowH = that.data.windowH;
    var picW = getApp().globalData.width;
    var picH = getApp().globalData.height;
    //获取唇部定位点
    var p = getApp().globalData.mouth 
    canvas.moveTo(p[0].X*windowW/picW, p[0].Y*windowW/picW)
    canvas.lineTo(p[1].X*windowW/picW, p[1].Y*windowW/picW)
    canvas.lineTo(p[2].X*windowW/picW, p[2].Y*windowW/picW)
    canvas.lineTo(p[3].X*windowW/picW, p[3].Y*windowW/picW)
    canvas.lineTo(p[14].X*windowW/picW, p[14].Y*windowW/picW)
    canvas.lineTo(p[13].X*windowW/picW, p[13].Y*windowW/picW)
    canvas.lineTo(p[12].X*windowW/picW, p[12].Y*windowW/picW)
    var grd5 = canvas.createLinearGradient(p[13].X*windowW/picW, p[13].Y*windowW/picW, p[2].X*windowW/picW, p[3].Y*windowW/picW);
    grd5.addColorStop(0, color);
    grd5.addColorStop(1, '#dd6583');
    canvas.setFillStyle(grd5);
    canvas.fill();
    canvas.draw(true, setTimeout(function () {
      that.daochu()
    }, 1000));
    canvas.moveTo(p[3].X*windowW/picW, p[3].Y*windowW/picW)
    canvas.lineTo(p[4].X*windowW/picW, p[4].Y*windowW/picW)
    canvas.lineTo(p[5].X*windowW/picW, p[5].Y*windowW/picW)
    canvas.lineTo(p[6].X*windowW/picW, p[6].Y*windowW/picW)
    canvas.lineTo(p[16].X*windowW/picW, p[16].Y*windowW/picW)
    canvas.lineTo(p[15].X*windowW/picW, p[15].Y*windowW/picW)
    canvas.lineTo(p[14].X*windowW/picW, p[14].Y*windowW/picW)
    var grd1 = canvas.createLinearGradient(p[15].X*windowW/picW, p[15].Y*windowW/picW, p[4].X*windowW/picW, p[3].Y*windowW/picW);
    grd1.addColorStop(0, color);
    grd1.addColorStop(1, '#dd6583');
    canvas.setFillStyle(grd1);
    canvas.fill();
    canvas.draw(true, setTimeout(function () {
      that.daochu()
    }, 1000));
    canvas.moveTo(p[6].X*windowW/picW, p[6].Y*windowW/picW)
    canvas.lineTo(p[7].X*windowW/picW, p[7].Y*windowW/picW)
    canvas.lineTo(p[8].X*windowW/picW, p[8].Y*windowW/picW)
    canvas.lineTo(p[9].X*windowW/picW, p[9].Y*windowW/picW)
    canvas.lineTo(p[10].X*windowW/picW, p[10].Y*windowW/picW)
    canvas.lineTo(p[11].X*windowW/picW, p[11].Y*windowW/picW)
    canvas.lineTo(p[0].X*windowW/picW, p[0].Y*windowW/picW)
    canvas.lineTo(p[21].X*windowW/picW, p[21].Y*windowW/picW)
    canvas.lineTo(p[20].X*windowW/picW, p[20].Y*windowW/picW)
    canvas.lineTo(p[19].X*windowW/picW, p[19].Y*windowW/picW)
    canvas.lineTo(p[18].X*windowW/picW, p[18].Y*windowW/picW)
    canvas.lineTo(p[17].X*windowW/picW, p[17].Y*windowW/picW)
    canvas.setFillStyle(color)
    canvas.fill()
    canvas.draw(true, setTimeout(function () {
      that.daochu()
    }, 1000));
    // canvas.draw();
  },
  //眉毛上色函数
  drawcolor2: function (canvas,color) {
    var that = this;
    var windowW = that.data.windowW;
    var windowH = that.data.windowH;
    var picW = getApp().globalData.width;
    var picH = getApp().globalData.height;
    //获取全局左右眉毛轮廓定位点
    var p = getApp().globalData.lefteyebrow;
    var q=  getApp().globalData.righteyebrow;
    canvas.moveTo(p[3].X*windowW/picW, p[3].Y*windowW/picW)
    canvas.lineTo(p[4].X*windowW/picW, p[4].Y*windowW/picW)
    canvas.lineTo(p[5].X*windowW/picW, p[5].Y*windowW/picW)
    var grd2 = canvas.createLinearGradient(p[3].X * windowW / picW, p[3].Y * windowW / picW, p[4].X * windowW / picW, p[4].Y * windowW / picW);
    grd2.addColorStop(0, color);
    grd2.addColorStop(1, '#cc9966');
    canvas.setFillStyle(grd2);
    canvas.fill();
    canvas.draw(true, setTimeout(function () {
      that.daochu()
    }, 1000));
    canvas.moveTo(q[3].X * windowW / picW, q[3].Y * windowW / picW)
    canvas.lineTo(q[4].X * windowW / picW, q[4].Y * windowW / picW)
    canvas.lineTo(q[5].X * windowW / picW, q[5].Y * windowW / picW)
    var grd4 = canvas.createLinearGradient(q[3].X * windowW / picW, q[3].Y * windowW / picW, q[4].X * windowW / picW, q[4].Y * windowW / picW);
    grd4.addColorStop(0, color);
    grd4.addColorStop(1, '#cc9966');
    canvas.setFillStyle(grd4);
    canvas.fill();
    canvas.draw(true, setTimeout(function () {
      that.daochu()
    }, 1000));
    canvas.moveTo(p[0].X*windowW/picW, p[0].Y*windowW/picW)
    canvas.lineTo(p[1].X*windowW/picW, p[1].Y*windowW/picW)
    //canvas.moveTo(p[1].X*windowW/picW, p[1].Y*windowW/picW)
    canvas.lineTo(p[2].X*windowW/picW, p[2].Y*windowW/picW)
    canvas.lineTo(p[3].X*windowW/picW, p[3].Y*windowW/picW)
    //canvas.lineTo(p[4].X*windowW/picW, p[4].Y*windowW/picW)
    canvas.lineTo(p[5].X*windowW/picW, p[5].Y*windowW/picW)
    canvas.lineTo(p[6].X*windowW/picW, p[6].Y*windowW/picW)
    canvas.lineTo(p[7].X*windowW/picW, p[7].Y*windowW/picW)
    canvas.setFillStyle(color)
    canvas.fill()
    canvas.beginPath()
    canvas.moveTo(q[0].X*windowW/picW, q[0].Y*windowW/picW)
    canvas.lineTo(q[1].X*windowW/picW, q[1].Y*windowW/picW)
    //canvas.moveTo(q[1].X*windowW/picW, q[1].Y*windowW/picW)
    canvas.lineTo(q[2].X*windowW/picW, q[2].Y*windowW/picW)
    canvas.lineTo(q[3].X*windowW/picW, q[3].Y*windowW/picW)
    //canvas.lineTo(q[4].X*windowW/picW, q[4].Y*windowW/picW)
    canvas.lineTo(q[5].X*windowW/picW, q[5].Y*windowW/picW)
    canvas.lineTo(q[6].X*windowW/picW, q[6].Y*windowW/picW)
    canvas.lineTo(q[7].X*windowW/picW, q[7].Y*windowW/picW)
    canvas.setFillStyle(color)
    canvas.fill()
    canvas.draw(true, setTimeout(function () {
      that.daochu()
    }, 1000));
    // canvas.draw();
  },
  //图片导出函数
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
      /*wx.saveImageToPhotosAlbum({
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
  //根据所点击组件触发相应颜色和部位的填色函数
  draw1: function () {
    var that = this;
    var canvas = wx.createCanvasContext('canvas');
    var flag = getApp().globalData.flag
    getApp().globalData.item = 1
    if (flag == 1)
      that.drawcolor(canvas, '#e84564')
    else if (flag == 2)
      that.drawcolor2(canvas, '#68492c')
  },
  draw2: function () {
    var that = this;
    var canvas = wx.createCanvasContext('canvas');
    var flag = getApp().globalData.flag
    getApp().globalData.item = 2
    if (flag == 1)
      that.drawcolor(canvas, '#e83323')
    else if (flag == 2)
      that.drawcolor2(canvas, '#302c2d')
  },
  draw3: function () {
    var that = this;
    var canvas = wx.createCanvasContext('canvas');
    var flag = getApp().globalData.flag
    getApp().globalData.item = 3
    if (flag == 1)
      that.drawcolor(canvas, '#e37069')
    else if (flag == 2)
      that.drawcolor2(canvas, '#513528')
  },
  draw4: function () {
    var that = this;
    var canvas = wx.createCanvasContext('canvas');
    var flag = getApp().globalData.flag
    getApp().globalData.item = 4
    if (flag == 1)
      that.drawcolor(canvas, '#ec3e25')
    else if (flag == 2)
      that.drawcolor2(canvas, '#845445')
  },
  draw5: function () {
    var that = this;
    var canvas = wx.createCanvasContext('canvas');
    var flag = getApp().globalData.flag
    getApp().globalData.item = 5
    if (flag == 1)
      that.drawcolor(canvas, '#9d2934')
  },
  //产品种类选择
  lipstik: function (options) {
    //var goodsId = options.goodsId;
    getApp().globalData.flag = 1,
      this.setData({
        showImg1: this.data.productsList[0],
        showImg2: this.data.productsList[1],
        showImg3: this.data.productsList[2],
        showImg4: this.data.productsList[3],
        showImg5: this.data.productsList[4]
      });
  },
  eyebrow: function (options) {
    //var goodsId = options.goodsId;
    getApp().globalData.flag = 2,
      this.setData({
        showImg1: this.data.eyebrow[0],
        showImg2: this.data.eyebrow[1],
        showImg3: this.data.eyebrow[2],
        showImg4: this.data.eyebrow[3]
      });
  },
  //淘口令复制函数
  setCopyData: function (text) {
    wx.setClipboardData({
      data: text,
      success: function (res) {
        wx.showModal({
          content: '淘口令复制成功',
        })
      }
    })
  },
  copyTBL: function (e) {
    var that = this;
    var flag = getApp().globalData.flag
    var item = getApp().globalData.item
    if (flag == 1 && item == 1)
      that.setCopyData('￥e77DY6hN9Ba￥')
    else if (flag == 1 && item == 2)
      that.setCopyData('￥E5CRY6hkjx1￥')
    else if (flag == 1 && item == 3)
      that.setCopyData('￥E5CRY6hkjx1￥')
    else if (flag == 1 && item == 4)
      that.setCopyData('￥Si9yY6hmPyU￥')
    else if (flag == 1 && item == 5)
      that.setCopyData('￥5A3DY6hnUQg￥')
    else if (flag == 2 && item == 1)
      that.setCopyData('$Go4wY6hIUUo$')
    else if (flag == 2 && item == 2)
      that.setCopyData('$Go4wY6hIUUo$')
    else if (flag == 2 && item == 3)
      that.setCopyData('$Go4wY6hIUUo$')
    else if (flag == 2 && item == 4)
      that.setCopyData('$Go4wY6hIUUo$')
  }
})