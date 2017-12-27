// page/component/list/list.js
Page({
  data:{
    shopInfo:'',
    shopId:'',
    imgJson:'',
    itemList:'',
    imgUrls: [
      'https://si.geilicdn.com/vshop255110351-1455854722813-82356-s1.jpg',
      'https://si.geilicdn.com/vshop255110351-1439733512192-42774-s1.jpg',
      //'https://si.geilicdn.com/vshop255110351-1439733504058-45927-s1.jpg',
      'https://si.geilicdn.com/vshop255110351-1472229974682-64FC8-s1.jpg'
    ],

    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,

  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var shopId = options.shopId
    var self = this;
    wx.request({
      // url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
      url: 'https://www.betterguitars.com/shopInfo?shopId=' + shopId,
      success(res) {
        console.log(res.data)
        console.log(res.data.result)
        
        self.setData({
          //detail : res.data.result
          shopInfo: res.data,
          imgJson: JSON.parse(res.data.shopBanners),
          shopId:shopId
        })

        wx.request({
          url: 'https://www.betterguitars.com/getItemList?shopId=' + shopId,

          success: function (res) {
            console.log(res.data)

            self.setData({
              itemList: res.data

            })

            // setTimeout(function () {
            //   wx.stopPullDownRefresh()
            // }, 500)

          }
        })

      }
    });


  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  onPullDownRefresh:function(){
    var self = this;
    wx.request({
      // url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
      url: 'https://www.betterguitars.com/shopInfo?shopId=' + self.data.shopId,
      success(res) {
        console.log(res.data)
        console.log(res.data.result)
        self.setData({
          //detail : res.data.result
          imgJson: JSON.parse(res.data.shopBanners),
          shopInfo: res.data
        })
        
		
		wx.request({
          url: 'https://www.betterguitars.com/getItemList?shopId=' + shopId,

          success: function (res) {
            console.log(res.data)

            self.setData({
              itemList: res.data

            })
			
			setTimeout(function(){
              wx.stopPullDownRefresh()
             },500)

            // setTimeout(function () {
            //   wx.stopPullDownRefresh()
            // }, 500)

          }
        })
        
      }
    });

  }



})