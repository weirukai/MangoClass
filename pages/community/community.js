// pages/community.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

testfun:function()
{

wx.request({
  url: 'http://192.168.2.100:8080/test',
  data:{
    username:"wei",
    password:123
  },
  method:'POST',
  header: {
    'content-type': 'application/json' // 默认值
  },
})

},

loginTest:function()

{
  wx.login({
    complete: (res) => {},
    fail: (res) => {},
    success: (res) => {
      wx.request({
        url: 'http://192.168.2.100:8080/user/login',
        data:{
          code:res.code,
          username:"weirukai",
          roles:"common_user"
        },
        method:'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success:res=>
        {
          console.log(res.data)
        }
      })
    },
    timeout: 0,
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

  }
})