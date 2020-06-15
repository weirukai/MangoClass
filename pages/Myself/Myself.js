// pages/Myself/Myself.js
const myAPP=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasLogin:false,//判断用户是否登录，登录后请修改
    showStudyPlan:false,
    canIUse:wx.canIUse('button.open-type.getUserInfo'),
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
  gotoModifyInfo:function()
  {
    if(!this.data.hasLogin )
    {
      //提示用户登录toast轻提示
    }else{
      wx.navigateTo({
        url: '/pages/modifyInfo/modifyInfo',
      })
    }
  },
  /***
   * 用户点击登录
  */
   loginNow:function(e){
     if(this.data.hasLogin)
       return
      else
      {
        wx.login({
          success(res){
            //发送给后台进行一个解析，并且返回相应的用户的其他的数据
            wx.request({
              url: 'url',
            })
          },
        })
        //获取用户的信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  myAPP.globalData.userInfo = res.userInfo
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (myAPP.userInfoReadyCallback) {
                    myAPP.userInfoReadyCallback(res)
                  }
                }
              })
            }
          }
        })
      }
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**用户登录*/
    if(myAPP.globalData.userInfo)
    {
      this.setData({
        hasLogin:true
      })
      var userImageSrc='myInfo.userImageSrc'
      this.setData({
        [userImageSrc]:myAPP.globalData.userInfo.avatarUrl
      })
      //可以拉取所有的学生信息
    }else  if(this.data.canIUse){
      myAPP.userInfoReadyCallback= res=>{
        var userImageSrc='myInfo.userImageSrc'
        this.setData({
          [userImageSrc]:myAPP.globalData.userInfo.avatarUrl,
          hasLogin:true
        })
      }
    }
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