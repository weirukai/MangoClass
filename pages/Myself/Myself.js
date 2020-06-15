// pages/Myself/Myself.js
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasLogin:true,//判断用户是否登录，登录后请修改
    showStudyPlan:false,
    //模拟一个myInfo
    myInfo:{
      id:"一叶知秋",
      grade:"高三",
      bookType:"人教版",
      motto:"书山有路勤为径",
      userImageSrc:"",
      School:"华中科技大学"
    },
    studyStatus:[
      {name:"课程",
       value:3},
       {name:"时长",
       value:3},
      {name:"积分",
      value:3},
      {name:"余额",
      value:3}
    ],
    studyPlan:[
      {
        text:"洗脸",
        desc:"5:30"
      },
      {
        desc:"7:30",
        text:"看报纸"
      },
      {
        desc:"8:30",
        text:"看电视"
      },
      {
        desc:"12:00",
        text:"吃中饭"
      }
    ],
    show: false,
    radio: '1',
    
  },
  showStudyPlan:function()
  {
    //处理让学习计划显示出来的函数
    this.setData({
      showStudyPlan:true
    })
  },
  closeStudyPlan:function()
  {
    this.setData({
      showStudyPlan:false
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
   //重新请求本页所有的下那关数据

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

  },
  
  onTapShow() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  }


})