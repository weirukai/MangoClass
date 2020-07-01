// pages/classShow/classShow.js
var myApp=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classId:null,
    commentInput:null,
    videoSrc:null,
    className :'',//课程名称
    classOrigin :'',
    classType :'',
    likes_num :0,
    watch_num :0,
    comments_num :0,
    description : '',
    joinTime:null,
    comments:[],
    inputTxt:''
  },
/**根据课程id拉取对应得评论*/
getClassComments:function()
{
  var that=this
  wx.request({
    url: myApp.globalData.host+'/class/getClassComments',
    header:{
      'content-type': 'application/json' // 默认值
    },
    method:"POST",
    data:{
      'classID':that.data.classId
    },
    success:res=>
    {
      if(res.statusCode==200)
      {
        var jsonStr=JSON.stringify(res.data)
        var jsonObj=JSON.parse(jsonStr)
        var commentsResp=[]
        if(jsonObj.data==null)
         {
            that.setData({
          comments:commentsResp
        })
      return;
    }
        for (let index = 0; index < jsonObj.data.length; index++) {
          var comment={
            'nickName': (jsonObj.data[index].nickName=='')?'匿名用户':jsonObj.data[index].nickName,
            'content': jsonObj.data[index].classComments.content,
            'date': jsonObj.data[index].classComments.joinTime.split("T")[0],
            'masterImageSrc':myApp.globalData.host+'/user/getUserImage/'+ jsonObj.data[index].classComments.userId
          }
          commentsResp.push(comment)
        }
        that.setData({
          comments:commentsResp
        })
      }
    }
  })
},

getInputValue:function(e)
{
  var inputValuetemp=e.detail.value
  this.setData({
    commentInput:inputValuetemp
  })
},
doComment:function()
{
  //首先判断用户是否登录
  var that=this
  var token=null
  wx.getStorage({
    key: 'token',
    success:res=>
    {
      token=res.data
    }
  })
  if(myApp.globalData.hasLogin)
  {
    if(this.data.commentInput!=''&&this.data.commentInput!=null)
    {
      wx.request({
        url: myApp.globalData.host+'/class/doComments',
        method:'POST',
        header:{
          'content-type': 'application/json' ,
          'Authorization': token
        },
        data:{
          'content':that.data.commentInput,
          'classID':that.data.classId
        },
        success:res=>
        {
          if(res.statusCode==200)
          {
            //刷新评论
            that.setData({
              commentInput:'',
              inputTxt:''
            })
            that.getClassComments()
          }

        }
      })
    }
  }
  else{
    //请先登录
  }
},

/**
 * 请求获取课程信息
 */
  getClassInfo:function(){
    var that=this
    wx.request({
      url: myApp.globalData.host+'/class/getClassInfo',
      header:{
        'content-type': 'application/json'
      },
      method:'POST',
      data:{
        'classID':that.data.classId
      },
      success:res=>
      {
        if(res.statusCode==200){
          //解析返回的数据
          var jsonStr=JSON.stringify(res.data)
          var body=JSON.parse(jsonStr)
          if(body.data==null)
          {
            //获取到的课程信息为空，做出相应的处理
            return
          }
          else{
            this.setData({
              className :body.data.name,
              classType:body.data.classType,
              classOrigin:body.data.origin,
              likes_num:body.data.likesNum,
              watch_num:body.data.watchNum,
              description:(body.data.description==null)?'暂无介绍':body.data.description,
              comments_num:body.data.commentsNum,
          })
          }
        }
      }
    })
  },
doCollectClass:function()
{
  var that=this
  var token=null
  wx.getStorage({
    key: 'token',
    success:res=>
    {
      token=res.data
    }
  })
if(myApp.globalData.hasLogin)
  {

    wx.request({
      url: myApp.globalData.host+'/class/collectClass',
      header:{
        'content-type': 'applicatiaon/json',
        'Authorization':token
      },
      method:"POST",
      data:{
        'classID':that.data.classId
      },
      success:res=>
      {
        if(res.statusCode==200&&res.data.code==200)
        {
          //提示成功
          wx.showToast({
            title: '已成功收藏',
          })
          console.log('成功收藏')
        }
      }
    }) 
  }else{
    //轻提示，提示用户请先登录*****************待做****/
    wx.showToast({
      title: '请先登录',
    })
  }

},

shareClick:function()
{
  this.onShareAppMessage()
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(
      {
        classId:options.id,
        videoSrc:myApp.globalData.host+'/class/getPlayResource/'+options.id
      }
    )
    //确定是能够识别到那个页面传进来的
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getClassComments()
    this.getClassInfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '弹出分享时显示的分享标题',
      desc: '分享页面的内容',
      path: '/page/classShow' // 路径，传递参数到指定页面。
     }

  }
})