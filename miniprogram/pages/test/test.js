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
    // 选择图片
    that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        
        getApp().globalData.picpath = res.tempFilePaths[0];
        
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success:function(res){
            console.log('[上传文件] 成功：', res)
            that.getTempFileURL(res.fileID)                  
            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

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
      }
    })
  },
  getTempFileURL: function (fid) {
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
  },

  //语音识别

  submit() {
    

    let serectkey = that.data.serectkey;

    let param = {

      Action: 'AnalyzeFace',

      Version: '2018-03-01',

      Url: that.data.imageABase64,

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
        // console.log(e)
        console.log(e.data.Response.ImageHeight)
        console.log(e.data.Response.ImageWidth)
        console.log(e.data.Response.FaceShapeSet[0].Mouth)
        getApp().globalData.mouth = e.data.Response.FaceShapeSet[0].Mouth
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
function base64_encode(str) { // 编码，配合encodeURIComponent使用
  var c1, c2, c3;
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var i = 0, len = str.length, strin = '';
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      strin += base64EncodeChars.charAt(c1 >> 2);
      strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
      strin += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      strin += base64EncodeChars.charAt(c1 >> 2);
      strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      strin += base64EncodeChars.charAt((c2 & 0xF) << 2);
      strin += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    strin += base64EncodeChars.charAt(c1 >> 2);
    strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    strin += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    strin += base64EncodeChars.charAt(c3 & 0x3F)
  }
  return strin
}

