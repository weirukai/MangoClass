//index.js
//获取应用实例
//搜索课程，查看课程推荐，课程排行等等功能
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    testSwiperUrls:['https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
    'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
    'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'], //循环轮播的课程的地址
    interval: 5000,
    duration: 1000,
    indicatorDots: true,
    indicatorColor: "#ffffff",
    activecolor:"#00c758",
    autoplay: true,
    myClass:[
      {
        ImagePath:"http://edu-image.nosdn.127.net/9F990399C7DDB0F19396B0E0D5872923.png?imageView&thumbnail=510y288&quality=100",
        title:"大学体育（二）",
        origin:"华中科技大学",
        length:18,
        hasLearn:9,
        id:1234
      },
      {
        ImagePath:"http://edu-image.nosdn.127.net/43BBDC4553C3CDE714C01755B5050CAF.jpg?imageView&thumbnail=510y288&quality=100",
        title:"操作系统原理",
        origin:"华中科技大学",
        length:18,
        hasLearn:9,
        id:2345
      },
      {
        ImagePath:"http://edu-image.nosdn.127.net/8D3B8E93CE2B6A73BD1454FEA9E0C290.png?imageView&thumbnail=510y288&quality=100",
        title:"数字电路与逻辑设计",
        origin:"华中科技大学",
        length:18,
        hasLearn:9,
        id:1213
      },
      {
        ImagePath:"http://edu-image.nosdn.127.net/5A6CD2B488E9A1EF5D969D2A02673517.jpg?imageView&thumbnail=510y288&quality=100",
        title:"大学体育",
        origin:"华中科技大学",
        length:18,
        hasLearn:9,
        id:1433
      },
      {
        ImagePath:"http://edu-image.nosdn.127.net/B83E6EA37EFEFF83775BA11BA020FAD4.jpg?imageView&thumbnail=510y288&quality=100",
        title:"工程制图（五）",
        origin:"华中科技大学",
        length:18,
        hasLearn:9,
        id:1542
      }
    ]
  },

  toClassShow:function(e)
  {

    wx.navigateTo({
      url: '/pages/classShow/classShow?id='+e.currentTarget.dataset.id
    })

  },




  //事件处理函数
  /*bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    /*var that=this
    wx.request({
      url:'http://111.173.220.16:8080/Login_war_exploded/getString',
      success(res){
        console.log(res.data)
        console.log(1)
         that.setData(
           {motto: res.data}
         )
      },
      fail(res)
      {
        console.log(12)
      },
      finally(res){
        console.log(11)
      }
    })
    
   
  },*/

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
