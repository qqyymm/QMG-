//index.js
const app = getApp()

Page({
  data: {
    //顶部轮播图
    imgUrls: [
      'http://a4.qpic.cn/psb?/V136F3DD2uyzps/dY8O49.pHhEE00bI4DlVOyfA.LxXgMM8b9fYR9IFZnk!/m/dL8AAAAAAAAAnull&bo=OATqAgAAAAARB.Q!&rf=photolist&t=5',
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3788120283,1737193813&fm=26&gp=0.jpg',
      'http://img5.imgtn.bdimg.com/it/u=4036503320,4279499347&fm=26&gp=0.jpg',
      'http://a4.qpic.cn/psb?/V136F3DD2uyzps/vm4LIeUX8V29E5ezk9yV*4FG8QVHTJdRNlfPfYHAGes!/m/dL8AAAAAAAAAnull&bo=OAT8AgAAAAARB*I!&rf=photolist&t=5',
      'http://img5.imgtn.bdimg.com/it/u=1730513351,1887985872&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=850624696,3411801648&fm=26&gp=0.jpg'
    ],
    //第二部分数据数组
    contentImgUrls1: [{
      title: 'MAC',
      url: 'http://a4.qpic.cn/psb?/V136F3DD2uyzps/U2KJP6tJVOZfqo27NAJAEZ13lFf81PeVQc7unwOTmT0!/m/dMMAAAAAAAAAnull&bo=igIUAgAAAAARB64!&rf=photolist&t=5'
    }],
    contentImgUrls2: [{
      title: 'Lancom',
      url: 'http://a1.qpic.cn/psb?/V136F3DD2uyzps/YXxJIwNcSX*OtFsSCST7n*GAOqvvYqkvjsw8pNFYDpc!/m/dDQBAAAAAAAAnull&bo=AwGyAAAAAAARB4A!&rf=photolist&t=5'
    }],
    contentImgUrls3: [{
      title: 'Tom Ford',
      url: 'http://a3.qpic.cn/psb?/V136F3DD2uyzps/PEvknM6xggfrWQ8B8hUiA4wozQlnU*ZFDcUktVMEiNw!/m/dL4AAAAAAAAAnull&bo=EARYAgAAAAARB34!&rf=photolist&t=5'
    }],
    contentImgUrls4: [
      {
        title: '植村秀',
        url: 'http://a3.qpic.cn/psb?/V136F3DD2uyzps/Zuk3HYGWqJlNgnYKg*8iMHh4lE2QaA6B7DuoPCHgMjU!/m/dLYAAAAAAAAAnull&bo=0AE5AQAAAAARB9k!&rf=photolist&t=5'
      }
    ],
    //死三部分数据
    HotImgUrls1: [
      {
        //头像地址,文字标题,文字内容,图片地址
        head: 'http://a4.qpic.cn/psb?/V136F3DD2uyzps/YVj.aEckJNYIkKuUTTR4yx5cGHGpH1h4dUMDcPKtHtE!/m/dIMAAAAAAAAAnull&bo=AAIAAgAAAAARBzA!&rf=photolist&t=5',
        title: '防晒霜怎么选',
        content: '运动暴晒？干皮党？油皮？敏感肌？为不同肤质的您提供最好的推荐',
        url: 'http://a3.qpic.cn/psb?/V136F3DD2uyzps/1CYUH7UpmIyYcD0KRSnwiUR0tJYKuTh*Ma4A5cfXPYI!/m/dLYAAAAAAAAAnull&bo=OASYAgAAAAARB5Y!&rf=photolist&t=5'
      }
    ],
    HotImgUrls2: [{
      head: 'http://a3.qpic.cn/psb?/V136F3DD2uyzps/nEtm0W98jCtcIiNiltjnPDuBWx8clAIIWwKEhpRYYXc!/m/dFIBAAAAAAAAnull&bo=*wH*AQAAAAARBzA!&rf=photolist&t=5',
      title: '你真的会卸妆吗',
      content: '混油敏感肌的自我修养',
      url: 'http://a4.qpic.cn/psb?/V136F3DD2uyzps/2IUiDg4Yu*vxbvowi*R98syaAlC6*lIxyGsO72rNfig!/m/dMMAAAAAAAAAnull&bo=WAJgAQAAAAARBws!&rf=photolist&t=5'
    }
    ],
    HotImgUrls3: [
      {
        //头像地址,文字标题,文字内容,图片地址
        head: 'http://a3.qpic.cn/psb?/V136F3DD2uyzps/vOhbxg34w4bjP8Tt00F6SSrCGBhWfcYIhO8wZ0WU9nU!/m/dLYAAAAAAAAAnull&bo=*gEAAgAAAAARB80!&rf=photolist&t=5',
        title: '空瓶推荐！清爽控油',
        content: '夏天就喜欢他们。',
        url: 'http://a3.qpic.cn/psb?/V136F3DD2uyzps/nLU019Y*1oK0NEw31DEHzKvm8tPVvLfCCqE6IxmO4gI!/m/dDYBAAAAAAAAnull&bo=OASZAgAAAAARB5c!&rf=photolist&t=5'
      }
    ],
    HotImgUrls4: [{
      head: 'http://a1.qpic.cn/psb?/V136F3DD2uyzps/cUG9E0TCtcgBf*aLEK3IJneSg51L9BTHSIBF7Un8YV4!/m/dLgAAAAAAAAAnull&bo=7gLuAgAAAAARBzA!&rf=photolist&t=5',
      title: '来一支阿玛尼吧',
      content: '阿玛尼必入十根！',
      url: 'http://a4.qpic.cn/psb?/V136F3DD2uyzps/8EIHpuH55vl5ubrOuQwHsoCbLrs98j3CYfrP75w92.Q!/m/dL8AAAAAAAAAnull&bo=OARKAwAAAAARB0U!&rf=photolist&t=5'
    }
    ],
    indicatorDots: true, //显示面板显示点
    autoplay: true,  //自动切换
    interval: 5000,  //切换时间
    duration: 1000  //动画时长
  },


})
