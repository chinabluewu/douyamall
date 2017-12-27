
var util = require('../../util/util.js')

Page({
  data: {

    shopNewsList:[],
    newsImgsList:[],
    
    favNewsList:[],
    favNewsImgsList:[],
    zanTagList: [false, false, false, false, false, false, false, false, false, false,],

    category: [
      { name: '商家新鲜事', id: 'guowei' },
      { name: '收藏的商家', id: 'shucai' }
      
    ],

    curIndex: 0,

    toView: 'guowei',

    newsImgs: 
    { "1":"https://si.geilicdn.com/vshop255110351-1439733513542-54830-s1.jpg", "0": "https://si.geilicdn.com/vshop255110351-1439733504058-45927-s1.jpg", "2": "https://si.geilicdn.com/vshop255110351-1439733512192-42774-s1.jpg"},

    imgUrls: [
      // '/image/a1.jpg',
      // '/image/a2.jpg',
      // '/image/a3.jpg'
      'http://img.betterguitars.com/douyamall/shops/a1.jpg',
      'http://img.betterguitars.com/douyamall/shops/a2.jpg',
      'http://img.betterguitars.com/douyamall/shops/a3.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    //var shopId = options.shopId
    var self = this;
    var city = 'sz' //需要读取定位信息

    wx.request({
      // url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
      url: 'https://www.betterguitars.com/getShopNewsList?city=' + city,
      success(res) {
        var newsImgsList = []
        console.log(res.data)
        var len=res.data.length

        var shopNewsList = res.data
        
        
        console.log(res.data[0].newsImgs)

        for(var i=0;i<len;i++){
          newsImgsList.push(JSON.parse(res.data[i].newsImgs))
          var dateStr = res.data[i].creatTime
          var str = util.getDateDiff(dateStr);
          //console.log('str=',str)
          shopNewsList[i]['dateDiff'] = str

        }
        console.log(newsImgsList[0]["0"])
        
        self.setData({
          //detail : res.data.result
          shopNewsList:shopNewsList,
          newsImgsList:newsImgsList
        })

      }   
    })
  },

  //开启分享功能
  onShareAppMessage:function(res){

  },

  zanOrNot:function(e){
     var self = this
     console.log(e.target.id) 
     var index = e.target.id
     var zanTagList = self.data.zanTagList
     zanTagList[index] = !zanTagList[index]

     self.setData({
       zanTagList:zanTagList
     })

  },    

  onPullDownRefresh: function () {
     
    var self = this;
    var city = 'sz' //需要读取定位信息

    wx.request({
      // url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
      url: 'https://www.betterguitars.com/getShopNewsList?city=' + city,
      success(res) {
        var newsImgsList = []
        console.log(res.data)
        var len = res.data.length
        var shopNewsList = res.data

        console.log(res.data[0].newsImgs)

        for (var i = 0; i < len; i++) {
          newsImgsList.push(JSON.parse(res.data[i].newsImgs))

          var dateStr = res.data[i].creatTime
          var str = util.getDateDiff(dateStr);
          //console.log('str=',str)
          shopNewsList[i]['dateDiff'] = str
        }
        console.log(newsImgsList[0]["0"])

        self.setData({
          //detail : res.data.result
          shopNewsList: shopNewsList,
          newsImgsList: newsImgsList
        })
       
        setTimeout(function () {
          wx.stopPullDownRefresh()
        }, 500)

      }
    })

  },

  switchTab(e) {
    this.setData({
      toView: e.target.dataset.id,
      curIndex: e.target.dataset.index
    })
    //console.log('toView,curIndex =', this.data.toView, this.data.curIndex)
  },


 newsImgsIndex:function(e){
   var self = this
   console.log('index=',e.target.id)
  //  wx.previewImage({
  //    current: '',
  //    urls: self.data.newsImgsList[e.target.id]
  //  })

 },

  newsImgZoom:function(e){
    var self = this
    console.log('i=',e.target.id)
    var position = e.target.id.split(':')
    var urls = self.data.newsImgsList[position[0]]
    var currentUrl = urls[position[1]]
    // console.log(urls)
    // console.log(currentUrl)

    var urlsArr = []

    for (var key in urls) {
      urlsArr.push(urls[key])
    }


    wx.previewImage({
      current:currentUrl,
      urls:urlsArr
    })
  },

})