// pages/web/taobao/taobao.js
Page({
  data: {
    showImg: '', //详情页显示图片；
    //下面是先进行存储的不同产品数据；
    productsList: ['http://a3.qpic.cn/psb?/V136F3DD2uyzps/hIeRjkinZC91fT1Hb6295jpxBS2cGe0hOmTzvnk7YAU!/m/dLYAAAAAAAAAnull&bo=FgNFEhYDRRIRBzA!&rf=photolist&t=5', 
      'http://a1.qpic.cn/psb?/V136F3DD2uyzps/k8a375f2yDNLCMp3LRCxW.9gKkHgWHWJOxhCja6wkoA!/m/dLgAAAAAAAAAnull&bo=FgM4IQAAAAARBzw!&rf=photolist&t=5', 
      'http://a4.qpic.cn/psb?/V136F3DD2uyzps/1r2HK9YwTgVaXxZzinGM*R6MoE22oOhoUxmoHOQ0f2w!/m/dFMBAAAAAAAAnull&bo=FgPuEwAAAAARB9g!&rf=photolist&t=5',
      'http://a3.qpic.cn/psb?/V136F3DD2uyzps/I8VwQnctTDX1xfs5n0XpfXaUHqiMmpJxKiQq9OlaGhQ!/m/dL4AAAAAAAAAnull&bo=FgMdJAAAAAARBxw!&rf=photolist&t=5',
      'http://a3.qpic.cn/psb?/V136F3DD2uyzps/cwEWRRd0KanuMyRDwO9IJVlmI9pe2vfzhmgUbSzLxx0!/m/dL4AAAAAAAAAnull&bo=gAIKDTgEARYRCZA!&rf=photolist&t=5', 
      'http://a1.qpic.cn/psb?/V136F3DD2uyzps/ckQV3wyVGQeI9b4tLXGjxXIf2nTkWgDgftf8RC.BfU4!/m/dFQBAAAAAAAAnull&bo=gAJuLzgEClARCZs!&rf=photolist&t=5', 
      'http://a3.qpic.cn/psb?/V136F3DD2uyzps/YqaQnZQJLwAxp0u3GDEVmBBsSd4znyneraY2.qEcPXc!/m/dLYAAAAAAAAAnull&bo=gAKPPzgEQmsRCRk!&rf=photolist&t=5', 
      'http://a4.qpic.cn/psb?/V136F3DD2uyzps/bqc2HDRyzA1NVAciCpKVuqjbJnSGxIplPxdia6Ne.x8!/m/dFMBAAAAAAAAnull&bo=gAJrFzgEhScRCV4!&rf=photolist&t=5'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var goodsId = options.goodsId;
    this.setData({
      //页面数据传递
      showImg: this.data.productsList[goodsId],
    });
  }
})