// pages/modifyInfo.js

import {Toast} from "../../miniprogram_npm/vant-weapp/toast/toast"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showDialog:false,
    dialogTitle:"",
    inputValue:"",
    myInfo:{
      id:"一叶知秋",
      grade:"高三",
      bookType:"人教版",
      motto:"操千曲而后晓声，观千剑而后识器",
      userImageSrc:"",
      School:"清华大学"
    },

  },

  showDialog:function(e)
  {
    var selected=e.target.id
    this.setData({
      showDialog:true,
      dialogTitle:selected
    })
  },
  closeDialog:function()
  {
    this.setData(
      {
        showDialog:false,
        dialogTitle:"",
        inputValue:""
      }
    )
  },
  bindInput:function(e)
  {
    var inputValue=e.detail.valude
    this.setData({
      inputValue:inputValue
    })
  },

  changeGrade:function(e)
  {
    wx.setStorage({
      data: this.data.inputValue,
      key: '年级',
      success:res=>
      {
        Toast.success("更改成功")
      }
    })
    

    
  },
  changeBookType:function(e){


  },
changeInfo:function(e)
{
  if(this.data.dialogTitle="年级")
  {
    this.changeGrade()
  }
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