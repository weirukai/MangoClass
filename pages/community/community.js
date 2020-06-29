// pages/community.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   message:[

  {
    id:0,
    Text:'我先看一下《颈椎病康复指南》再给大家说怎么实现的这两个功能，毕竟只是一个新手，解决这种复杂点的问题（相对而言），还是需要花费大量时间的，这篇文章花了两天的时间才实现的功能，现在就记录一下使用springboot怎么实现文件上传下载的。',
    date:"2020-0620",
    imageSrc:[
     "/images/messageTest.png",
     "/images/messageTest2.png"
   ],
   master:{
     masterId:0,
     masterNickName:"小王",
     masterSchool:"华中科技大学",
     masterImageSrc:"",
   }
  },
   {
    Text:'sdadsadsadsd',
    imageSrc:[
      "/images/messageTest.png",
      "/images/messageTest2.png"
    ]},

  ]
},


toEditPost:function()
{
wx.navigateTo({
  url: '/pages/editPost/editPost',
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    return {
      title: '弹出分享时显示的分享标题',
      desc: '分享页面的内容',
      path: '/page/user?id=123' // 路径，传递参数到指定页面。
     }
  },
 
})