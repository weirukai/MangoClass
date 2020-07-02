//index.js
//获取应用实例
//搜索课程，查看课程推荐，课程排行等等功能
var myApp = getApp()
Page({
  data: {
    searchValue:'',
    inputValue:'',
    tabActiveName:0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    postClasses:[],
    SwiperUrls:['https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
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

    RecommendedClasses:[],
    signin:true,
    searchValue:''
  },
  inputSearch:function(e)
  {
 this.setData({
  inputValue:e.detail.value
})
  },

  toSearch:function()
  {
    if(this.data.inputValue==''){
      return
    }else{
    wx.navigateTo({
      url: '/pages/search/list?searchClass='+this.data.inputValue
    })
    this.setData({
      searchValue:''
    })
  }

  },



  toClassShow:function(e)
  {
    wx.navigateTo({
      url: '/pages/classShow/classShow?id='+e.currentTarget.dataset.id
    })
  },
/**
 * 获取封面循环的海报课程Id
 */
requestForPostId:function(){
  var that = this
  wx.request({
    url: myApp.globalData.host+'/class/getSwiperClass',//请求的地址
    header:{
      'content-type': 'application/json'
    },
    success:res=>{
      if(res.statusCode==200){
        var tempClasses=[]
        var jsonStr=JSON.stringify(res.data)
        var jsonObj=JSON.parse(jsonStr)
        if(jsonObj==null)
        {
          return
        }
        for(var index =0,max =jsonObj.data.length;index<max;index++){
          var tempClass = jsonObj.data[index]
          var classItem={
            ImagePath:myApp.globalData.host+"/class/getClassImage/"+tempClass.id,
            id:tempClass.id
          }
          tempClasses.push(classItem)
        }
        that.setData({
          postClasses:tempClasses
        })
      }
    }
  })
},
  /**获取推荐视频的请求*/
  requestForRecommendClass:function()
  {

    var that=this
    var token
    wx.getStorage({
      key: 'token',
      success:res=>
      {
        token=res.data
      }
    })
    wx.request({
      url: myApp.globalData.host+'/class/getRecommendClasses',
      header: {
          'content-type': 'application/json', // 默认值
          'Authorization':token
        },
      method:"GET",
      success:res=>{
        if(res.statusCode==200)
        {
          var tempClasses=[]
          var jsonStr=JSON.stringify(res.data)
          var jsonObj=JSON.parse(jsonStr)
          if(jsonObj.data==null)
          {return}
          for( var index=0 ,max=jsonObj.data.length;index<max;index++)
          {
            var seniorClass=jsonObj.data[index]
            var classItem={
              ImagePath:myApp.globalData.host+"/class/getClassImage/"+seniorClass.id,
              title:seniorClass.name,
              origin:seniorClass.origin,
              id:seniorClass.id,
              date:seniorClass.joinTime.split("T")[0]
            }
            tempClasses.push(classItem)
        }
        }
        that.setData({
          RecommendedClasses:tempClasses
        })
      },
      complete:res=>
      {
      }
    })

  },

  signin:function(){
    if(myApp.globalData.hasLogin)
    {
      this.setData({
        signin:false
      })
      this.sendSign()
    }
    else{
      wx.showModal({
        title: '请先登录',
        showCancel: false,
        success:res=> {
         if (res.confirm) {
         wx.navigateTo({
          url: '/pages/Myself/Myself',
         })
         }
        }
        })
    } 
  },
  sendSign(){
    var that=this
    var token=null
    wx.getStorage({
      key: 'token',
      success:res=>
      {
        token=res.data
      }
    })
    wx.request({
      url:myApp.globalData.host+'/user/userCheckIn',
      header: {
        'content-type': 'application/json' ,// 默认值
        'Authorization':token
      },
      data:{
      //签到成功后的发送数据 还没写
      },
       method:"POST",
       success:res=>
       {
        wx.showToast({
          title: '签到成功',
        })

       }
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
          if(jsonObj.data==null)
          {return}
          for( var index=0 ,max=jsonObj.data.length;index<max;index++)
          {
            var seniorClass=jsonObj.data[index]
            var classItem={
              ImagePath:myApp.globalData.host+"/class/getClassImage/"+seniorClass.id,
              title:seniorClass.name,
              origin:seniorClass.origin,
              id:seniorClass.id,
              date:seniorClass.joinTime.split("T")[0]
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
  var that=this
  wx.request({
    url: myApp.globalData.host+'/class/getJuniorClasses',
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
        if(jsonObj.data==null)
          {return}
        for( var index=0 ,max=jsonObj.data.length;index<max;index++)
        {
          var seniorClass=jsonObj.data[index]
          var classItem={
            ImagePath:myApp.globalData.host+"/class/getClassImage/"+seniorClass.id,
            title:seniorClass.name,
            origin:seniorClass.origin,
            id:seniorClass.id,
            date:seniorClass.joinTime.split("T")[0]
          }
          tempClasses.push(classItem)
      }
      }
      that.setData({
        juniorClasses:tempClasses
      })
    },
    complete:res=>
    {
    }
  })
},
/**van-tabs的切换点击事件**/
clickForSwitchClass:function(title)
{
  //这里实际上有一点浪费网络资源
  this.requestForJuniorClasses()
  this.requestForRecommendClass()
  this.requestForSeniorClass()
},
refreshAllClasses:function()
{
  wx.showLoading({
    title: '正在加载',
  })
  //跟新课程
  this.requestForRecommendClass()
  this.requestForSeniorClass()
  this.requestForJuniorClasses()
  wx.hideLoading({
    complete: (res) => {},
  })
},

onLoad: function () {

  this.requestForPostId()

  },
  onShow:function()
  {
    this.refreshAllClasses()
  },

})
