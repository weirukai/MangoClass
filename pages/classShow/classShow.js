// pages/classShow/classShow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classId:null,
    comments:[
      {
        id:"熊大",
        masterImageSrc:"http://img5.imgtn.bdimg.com/it/u=1951682926,1045257043&fm=26&gp=0.jpg",
        content:"这个课程稚得推荐，非常好看的一个课程",
        date:"2020-06-10",
      },
      {
        id:"熊二",
        masterImageSrc:"http://img5.imgtn.bdimg.com/it/u=3426116655,1196736030&fm=26&gp=0.jpg",
        content:"课程不错，推荐一波",
        date:"2019-08-10",
      },
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(
      {
        classId:options.id
      }
    )
    console.log(this.data.classId)
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