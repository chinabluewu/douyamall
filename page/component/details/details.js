// page/component/details/details.js
var app = getApp()

Page({
  data:{
    itemId:'',
    imgJson:'',
    itemInfo:'',
    interval: 3000,
    duration: 800,
    carts:[],

    goods: {
      id: 1,
      //image: '/image/goods1.png',
      image:'https://si.geilicdn.com/vshop255110351-1439733504058-45927-s1.jpg',
      
    },
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false
  },


 //分享宝贝详情页
  onShareAppMessage: function (res) {

  },
  
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var itemId = options.itemId
    var self = this;
    wx.request({
      // url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
      url: 'https://www.betterguitars.com/itemInfo?itemId=' + itemId,
      success(res) {
        console.log(res.data)
        console.log(res.data.result)

        self.setData({
          //detail : res.data.result
          itemInfo: res.data,
          imgJson: JSON.parse(res.data.imgs),
          itemId: itemId
        })
      }
    });


  },




  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },

  addToCart() {
    var carts = app.globalData.carts
    var len = carts.length

    const self = this;
    const num = self.data.num;
    let total = self.data.totalNum;
    let itemInfo = self.data.itemInfo

    var newCart = {}

   // { id: 1, title:'新鲜芹菜 半斤', image:'/image/s5.png', num:4, price:0.01, selected:true },
    newCart['id']=itemInfo.itemId
    newCart['title'] = itemInfo.title
    newCart['image'] = itemInfo.coverImg

    newCart['num'] = num+total
    newCart['price'] = itemInfo.price
    newCart['selected'] = true

    

    carts.splice(len, 0, newCart);

    self.setData({
      carts: carts
    });

    console.log('carts=',carts)

    wx.setStorage({
      key: 'carts',
      data: carts,
    })
    app.globalData.carts = carts

    wx.getStorage({
      key: 'carts',
      success: function(res) {
         console.log('carts = ',carts)

      },
    })

    self.setData({
      show: true
    })

    

    setTimeout( function() {
      self.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        })
      }, 200)
    }, 300)

  },



  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }
 
})