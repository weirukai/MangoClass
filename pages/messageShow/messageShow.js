// pages/messageShow/messageShow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    showInput:false,
    postId:null,
    inputBottom:0,
=======
    postId:null,
>>>>>>> zhang
    message:[{
      id:0,
      Text:'dwdwdewfewfewfewfewfewfewfewfefewfefewf',
      date:'2020-06-28',
      imageSrc:[
        "/images/messageTest.png",
        "/images/messageTest2.png"
      ],
      master:{
        masterID:0,
        masterNickName:'小王',
        masterSchool:'',
        masterImgSrc:''
   
      }
     },
     ]
  },


  /******向后台获取post****/

  requestForPost:function()
  {
<<<<<<< HEAD
    



    
  },


  focused:function(e)
  {
    
    this.setData({
      inputBottom:e.detail.height,
      showInput:true
    })
  },
  blur:function()
  {
    this.setData({
      showInput:false
    })
  },
=======
    wx.request({
      url:  myAPP.globalData.host+'/post/getAllPost',
      header:{
        'content-type': 'application/json', // 默认值
      },
      method:'POST',
      data:{
        postId:this.data.postId
      },
      success:res=>{
        if(res.statusCode==200){
          var jsonstr=JSON.stringify(res.data)
          var jsonObj=JSON.parse(jsonstr)
          
        }
      }
    })
    
  },
  requestForAllPostComments:function(){
    wx.request({
      url:  myAPP.globalData.host+'/post/getAllPostComment',
      header:{
        'content-type': 'application/json', // 默认值
      },
      method:'POST',
      data:{
        postId:this.data,postId
      },
      success:res=>{
        if(res.statusCode==200){
          var jsonstr=JSON.stringify(res.data)
          var jsonObj=JSON.parse(jsonstr)
          
        }
      }
    })
  },

>>>>>>> zhang
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      postId:options.id
    })
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