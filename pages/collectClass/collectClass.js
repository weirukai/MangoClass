// pages/collectClass/collectClass.js
var myApp=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    collectClassNum:0,
    myClass:[]
  },
  requestForCollectedClasses:function()
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
    wx.request({
      url: myApp.globalData.host+'/user/getUserCollectedClasses',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization':token
      },
      method:'POST',
      success:res=>
      {
        if(res.statusCode==200&&res.data.code==200)
        {
          var jsonStr=JSON.stringify(res.data)
          var jsonObj=JSON.parse(jsonStr)
          var tempClasses=[]
          if(jsonObj.data==null)
          {return}
          let index=0
          for ( index = 0; index < jsonObj.data.length; index++) {
            var classItem={
              'ImagePath':myApp.globalData.host+'/class/getClassImage/'+jsonObj.data[index].id,
              'title':jsonObj.data[index].name,
              'origin':jsonObj.data[index].origin,
              'date':jsonObj.data[index].joinTime.split("T")[0]
            }
            tempClasses.push(classItem)
          }
          that.setData({
            myClass:tempClasses,
            collectClassNum:index
          })
        }
      }
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
    this.requestForCollectedClasses()
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