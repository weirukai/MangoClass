//index.js
//获取应用实例
//搜索课程，查看课程推荐，课程排行等等功能
var myApp = getApp()
Page({
  data: {
    tabActiveName:0,
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
    seniorClasses:[],
    juniorClasses:[],
    RecommendedClasses:[
      // {
      //   ImagePath:"http://edu-image.nosdn.127.net/9F990399C7DDB0F19396B0E0D5872923.png?imageView&thumbnail=510y288&quality=100",
      //   title:"大学体育（二）",
      //   origin:"华中科技大学",
      //   length:18,
      //   hasLearn:9,
      //   id:1234
      // },
    ]
  },
  toClassShow:function(e)
  {
    wx.navigateTo({
      url: '/pages/classShow/classShow?id='+e.currentTarget.dataset.id
    })
  },

  /**获取推荐视频的请求*/
  requestForRecommendClass:function()
  {
    //
    wx.request({
      url: myApp.globalData.host+'/class/getRecommendClasses',
    })

  },
  /*获取高中课程的请求*/
  requestForSeniorClass:function()
  {
    var that=this
    wx.request({
      url: myApp.globalData.host+'/class/getSeniorClasses',
      header: {
          'content-type': 'application/json' // 默认值
        },
      method:"GET",
      success:res=>{
        if(res.statusCode==200)
        {
          var tempClasses=[]
          var jsonStr=JSON.stringify(res.data)
          var jsonObj=JSON.parse(jsonStr)
          for( var index=0 ,max=jsonObj.data.length;index<max;index++)
          {
            var seniorClass=jsonObj.data[index]
            var classItem={
              ImagePath:myApp.globalData.host+"/getClassImage/"+seniorClass.id,
              title:seniorClass.name,
              origin:seniorClass.origin,
              id:seniorClass.id
            }
            tempClasses.push(classItem)
        }
        }
        console.log(tempClasses)
        that.setData({
          seniorClasses:tempClasses
        })
      },
      complete:res=>
      {
      }
    })
  },
/**获取初中课程的请求*/
requestForJuniorClasses:function(){

},


/**van-tabs的切换点击事件**/
clickForSwitchClass:function(title)
{
  this.requestForJuniorClasses()
  this.requestForRecommendClass()
  this.requestForSeniorClass()
},




  onLoad: function () {

  },
  onShow()
  {

  },
})
