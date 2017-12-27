Page({
    data: {
        // category: [
        //     {name:'果味',id:'guowei'},
        //     {name:'蔬菜',id:'shucai'},
        //     {name:'炒货',id:'chaohuo'},
        //     {name:'点心',id:'dianxin'},
        //     {name:'粗茶',id:'cucha'},
        //     {name:'淡饭',id:'danfan'}
        // ],

        category: [
          { name: '水果蔬菜', id: 'guowei' },
          { name: '餐饮美食', id: 'shucai' },
          { name: '运动健身', id: 'chaohuo' },
          { name: '酒店旅行', id: 'dianxin' },
          { name: '教育培训', id: 'cucha' },
          { name: '休闲娱乐', id: 'danfan' },
          { name: '医药养生', id: 'yyys' },
          { name: '生活服务', id: 'shfw' },
        ],

        detail:[],
        
        isScroll: true, 
        curIndex: 0,
        
        toView: 'guowei'
    },
    onReady(){
        var self = this;
        wx.request({
           // url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
          url: 'https://www.betterguitars.com/cate-detail',
            success(res){
                console.log(res.data)
                console.log(res.data.result)
                self.setData({
                    //detail : res.data.result
                    detail : res.data
                })
            }
        });
       

        // self.setData({
        //             //detail : res.data.result
        //             detail : data
        //         })


        
    },
    switchTab(e){
        this.setData({
            toView : e.target.dataset.id,
            curIndex : e.target.dataset.index
        })
        console.log('toView,curIndex =',this.data.toView,this.data.curIndex)
    }
    
})