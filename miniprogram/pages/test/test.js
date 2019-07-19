// miniprogram/pages/test/test.js
const app = getApp();

const recorder = wx.getRecorderManager();

const file = wx.getFileSystemManager();

var that; 

Page({

  data: {

    serectkey: 'cy5xgEah6QfEf5yd3PgwrY3MTL3cx84n',

    secret_id: 'AKIDQgGagZeRN4c4GErj9MNBD0XrwoQtiKFu',

    imageABase64: '', //base64的文件


  },
  onLoad: function (options) {

    that = this;

  },
  
  // 上传图片
  doUpload: function () {
    // 从相册或拍照选择图片
    that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        getApp().globalData.picpath = res.tempFilePaths[0];
        console.log(getApp().globalData.picpath)
        //base64数据格式转换
        var fs = wx.getFileSystemManager();
        fs.readFile({
          filePath: res.tempFilePaths[0].toString(),
          encoding: 'base64',
          success(res) {
            that.setData({
              imageABase64: res.data
            })
            //console.log(that.data.imageABase64)
            that.submit();
          }
        })
        
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片至云存储
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success:function(res){
            console.log('[上传文件] 成功：', res)
            //that.getTempFileURL(res.fileID)                  
            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            /*wx.saveFile({
              tempFilePath: filePath,
              success(res) {
                getApp().globalData.picpath = res.savedFilePath;
                console.log(getApp().globalData.picpath)
              }
            })  */
            //跳转至画布页面
            wx.navigateTo({
              url: '../canvas/canvas'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
        

      },
      fail: e => {
        console.error(e)
      },
      
    })
  },
  /*getTempFileURL: function (fid) {
    wx.cloud.getTempFileURL({
      fileList: [fid],
      success: res => {
        // fileList 是一个有如下结构的对象数组
        // [{
        //    fileID: 'cloud://xxx.png', // 文件 ID
        //    tempFileURL: '', // 临时文件网络链接
        //    maxAge: 120 * 60 * 1000, // 有效期
        // }]
        console.log(res.fileList)
        that.setData({imageABase64:res.fileList[0].tempFileURL}),
        getApp().globalData.pickurl = res.fileList[0].tempFileURL
        that.submit()
      },
      fail: console.error
    })
  },*/

  //五官定位API调用
  submit() {
    

    let serectkey = that.data.serectkey;

    let param = {

      Action: 'AnalyzeFace',

      Version: '2018-03-01',

      Image: that.data.imageABase64,

      Timestamp: parseInt(new Date().getTime() / 1000),

      Nonce: parseInt(new Date().getTime() / 1000),

      SecretId: that.data.secret_id,
      
    };

    //把参数按键值大小排序并拼接成字符串

    let data = ksort(param);

    let arr = [];

    for (var x in data) {

      data[x] = encodeURI(data[x]);

      arr.push(x + '=' + data[x]);

    }

    let str = arr.join('&');

    //签名生成

    let sign = 'POSTiai.tencentcloudapi.com/?' + str;
    sign = b64_hmac_sha1(serectkey, sign);
    data['Signature'] = sign;
    console.log("输出签名")
    console.log(sign);
    console.log(data);

    //友好的提示
    wx.showLoading({

      title: '发送中...',

    })

    console.log("签名发送中")

    wx.request({

      url: 'https://iai.tencentcloudapi.com/ ',

      data: data,

      header: {

        'content-type': 'application/x-www-form-urlencoded'

      },

      method: 'post',

      success: function (e) {
        console.log(e)
        console.log(e.data.Response.ImageHeight)
        console.log(e.data.Response.ImageWidth)
        console.log(e.data.Response.FaceShapeSet[0].LeftEyeBrow)
        console.log(e.data.Response.FaceShapeSet[0].RightEyeBrow)
        getApp().globalData.mouth = e.data.Response.FaceShapeSet[0].Mouth
        getApp().globalData.lefteyebrow = e.data.Response.FaceShapeSet[0].LeftEyeBrow
        getApp().globalData.righteyebrow = e.data.Response.FaceShapeSet[0].RightEyeBrow
        getApp().globalData.height = e.data.Response.ImageHeight
        getApp().globalData.width = e.data.Response.ImageWidth
      },

      complete() { wx.hideLoading(); }

    })
  },
  

})

//对象按键值排序方法

function ksort(obj) {

  let temp = 'Action';

  let k_arr = [];

  for (var x in obj) {

    k_arr.push(x);

  }

  k_arr.sort();

  let res = {};

  for (let i = 0; i < k_arr.length; i++) {

    let k = k_arr[i];

    res[k] = obj[k];

  }

  return res;

}


//加密函数

function b64_hmac_sha1(k, d, _p, _z) {

  // heavily optimized and compressed version of http://pajhome.org.uk/crypt/md5/sha1.js 


  // _p = b64pad, _z = character size; not used here but I left them available just in case

  if (!_p) { _p = '='; } if (!_z) { _z = 8; } function _f(t, b, c, d) { if (t < 20) { return (b & c) | ((~b) & d); } if (t < 40) { return b ^ c ^ d; } if (t < 60) { return (b & c) | (b & d) | (c & d); } return b ^ c ^ d; } function _k(t) { return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514; } function _s(x, y) { var l = (x & 0xFFFF) + (y & 0xFFFF), m = (x >> 16) + (y >> 16) + (l >> 16); return (m << 16) | (l & 0xFFFF); } function _r(n, c) { return (n << c) | (n >>> (32 - c)); } function _c(x, l) { x[l >> 5] |= 0x80 << (24 - l % 32); x[((l + 64 >> 9) << 4) + 15] = l; var w = [80], a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, e = -1009589776; for (var i = 0; i < x.length; i += 16) { var o = a, p = b, q = c, r = d, s = e; for (var j = 0; j < 80; j++) { if (j < 16) { w[j] = x[i + j]; } else { w[j] = _r(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1); } var t = _s(_s(_r(a, 5), _f(j, b, c, d)), _s(_s(e, w[j]), _k(j))); e = d; d = c; c = _r(b, 30); b = a; a = t; } a = _s(a, o); b = _s(b, p); c = _s(c, q); d = _s(d, r); e = _s(e, s); } return [a, b, c, d, e]; } function _b(s) { var b = [], m = (1 << _z) - 1; for (var i = 0; i < s.length * _z; i += _z) { b[i >> 5] |= (s.charCodeAt(i / 8) & m) << (32 - _z - i % 32); } return b; } function _h(k, d) { var b = _b(k); if (b.length > 16) { b = _c(b, k.length * _z); } var p = [16], o = [16]; for (var i = 0; i < 16; i++) { p[i] = b[i] ^ 0x36363636; o[i] = b[i] ^ 0x5C5C5C5C; } var h = _c(p.concat(_b(d)), 512 + d.length * _z); return _c(o.concat(h), 512 + 160); } function _n(b) { var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = ''; for (var i = 0; i < b.length * 4; i += 3) { var r = (((b[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((b[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((b[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF); for (var j = 0; j < 4; j++) { if (i * 8 + j * 6 > b.length * 32) { s += _p; } else { s += t.charAt((r >> 6 * (3 - j)) & 0x3F); } } } return s; } function _x(k, d) { return _n(_h(k, d)); } return _x(k, d);
}
