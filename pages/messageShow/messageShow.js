// pages/messageShow/messageShow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId:null,
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
    



    
  },

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