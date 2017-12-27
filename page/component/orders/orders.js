// page/component/orders/orders.js
var app = getApp()
Page({
  data:{
    address:{},
    hasAddress: false,
    total:0,
    orders:[],
    // orders:[
    //     {id:1,title:'新鲜芹菜 半斤',image:'/image/s5.png',num:4,price:0.01},
    //     {id:2,title:'素米 500g',image:'/image/s6.png',num:1,price:0.03}
    //   ]
  },

  onReady() {
  
    let carts = app.globalData.carts
    let orders = []                 
    //let total = 0;
    for (let i = 0; i < carts.length; i++) {         
      if (carts[i].selected) {                    
        //total += carts[i].num * carts[i].price;
        orders.push(carts[i])
      }
    }
    this.setData({                                
      orders: orders
      
    });
    


    this.getTotalPrice();
  },
  
  onShow:function(){
    const self = this;
    wx.getStorage({
      key:'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total
    })
  },

  toPay() {
    wx.showModal({
      title: '提示',
      content: '支付系统暂未开通，敬请期待',
      complete() {
        // wx.switchTab({
        //   url: '/page/component/user/user'
        // })
      }
    })
  }
})