// pages/messageShow/messageShow.js
var myApp=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    showInput:false,
    postId:null,
    inputBottom:0,
    inputValue:'',
    masterName:'',
    masterSchool:'',
    masterImageSrc:'',
    content:'',
    commentsNum:'',
    likesNum:'',
    joinTime:'',
    postImages:[],
    postComments:[],
    inputTxt:''
  },

  /******向后台获取post****/

  requestForPost:function()
  {
    var that=this
    wx.request({
      url:  myApp.globalData.host+'/post/getPostById',
      header:{
        'content-type': 'application/json', // 默认值
      },
      method:'POST',
      data:{
        postId:that.data.postId
      },
      success:res=>{
        if(res.statusCode==200){
          var jsonstr=JSON.stringify(res.data)
          var jsonObj=JSON.parse(jsonstr)
          that.setData({
            masterName:jsonObj.data.masterNickName=='',
            masterSchool:jsonObj.data.masterSchool,
            masterImageSrc:myApp.globalData.host+'/user/getUserImage/'+jsonObj.data.postData.masterId+'/'+Math.floor(Math.random()*100),
            content:jsonObj.data.postData.content,
            commentsNum:jsonObj.data.postData.commentsNum,
            likesNum:jsonObj.data.postData.likesNum,
            joinTime:jsonObj.data.postData.joinTime.split("T")[0],
          })
          var images=[]
          for (let index = 0; index < jsonObj.data.postImages.length; index++) {
            const image = jsonObj.data.postImages[index];
            images.push(myApp.globalData.host+'/post/getPostImage/'+image.id)
          }
          that.setData({
            postImages:images
          })
        }
      }
    })  
  },

  focused:function(e)
  {
    
    this.setData({
      inputBottom:e.detail.height,
      showInput:true
    })
  },
  blured:function()
  {
    this.setData({
      showInput:false
    })
  },
getInputValue:function(e)
{
  this.setData({
      inputValue:e.detail.value
  })
},


  requestForAllPostComments:function(){
    var that=this
    wx.request({
      url:  myApp.globalData.host+'/post/getAllPostComments',
      header:{
        'content-type': 'application/json', // 默认值
      },
      method:'POST',
      data:{
        postId:that.data.postId
      },
      success:res=>{
        if(res.statusCode==200){
          var jsonstr=JSON.stringify(res.data)
          var jsonObj=JSON.parse(jsonstr)
          if(jsonObj.data==null)
          {return}
          {
            var comment=null
            var comments=[]
            for (let index = 0; index < jsonObj.data.length; index++) {
              const element = jsonObj.data[index];
             var comment={
                nickName:(element.nickName==null||element.nickName=='')?'匿名用户':element.nickName,
                joinTime:element.postComment.joinTime.split("T")[0],
                content:element.postComment.content,
                imageSrc:myApp.globalData.host+'/user/getUserImage/'+element.postComment.userId+'/'+Math.floor(Math.random()*100),
              }
              comments.push(comment)
            }
            that.setData({
              postComments:comments
            })
          }
          
        }
      }
    })
  },


  doComment:function()
{
  if(this.data.inputValue=='')
  {return}else{
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
    wx.showLoading({
      title: '正在发送',
    })
    wx.request({
      url: myApp.globalData.host+'/post/doPostComment',
      method:"POST",
      header:{
        'content-type': 'application/json', // 默认值
        'Authorization':token
      },
      data:{
        postId:that.data.postId,
        content:that.data.inputValue
      },
      success:res=>
      {
        if(res.statusCode==200&&res.data.code==200)
        {
          that.requestForAllPostComments()
          wx.hideLoading({
            complete: (res) => {
              this.setData({
                inputValue:'',
                inputTxt:''
              })
              wx.showToast({
                title: '发送成功',
              })
            },
          })
        }
      }
    })
  }
  else{
wx.showModal({
  title:"请先登录",
  showCancel:false,
  success:res=>
  {
    if(res.confirm)
    {
      wx.navigateTo({
        url: '/pages/Myself/Myself',
      })
    }
  }
})
  }}
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      postId:options.id
    })
    console.log("onload")
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
    this.requestForPost()
    this.requestForAllPostComments()
    console.log("onshow")
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
  }
})