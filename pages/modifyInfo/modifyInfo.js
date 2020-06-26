// pages/modifyInfo.js

import Toast from "../../miniprogram_npm/vant-weapp/toast/toast"
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
    var inputValuetemp=e.detail.value
    this.setData({
      inputValue:inputValuetemp
    })
  },
  changeGrade:function(e)
  {
    var that=this
    wx.setStorage({
      data: this.data.inputValue,
      key: 'grade',
      success:res=>
      {
        that.closeDialog()
        wx.showToast({
          title: '成功',
        })
        var gradePath='myInfo.grade'
       wx.getStorage({
         key: 'grade',
         success:res=>{
           this.setData({
             [gradePath]:res.data
           })
         }
       })
      }
    })
  },
  changeBookType:function(e){
    var that=this
    wx.setStorage({
      data: this.data.inputValue,
      key: 'bookType',
      success:res=>
      {
        that.closeDialog()
        wx.showToast({
          title: '成功',
        })
        var bookTypePath='myInfo.bookType'
        wx.getStorage({
          key: 'bookType',
          success:res=>{
            this.setData({
              [bookTypePath]:res.data
            })
          }
        })
      }
    })
  },

/*更改信息的点击响应，然后再调用各个信息的具体更改事件，最后刷新*/
changeInfo:function(e)
{
  if(this.data.dialogTitle=="年级")
  {
    this.changeGrade()
  }
  else if(this.data.dialogTitle=="教材版本")
  {
    this.changeBookType()
  }else if(this.data.dialogTitle=="昵称"){
     this.changeNickName()
  }else if(this.data.dialogTitle=="学习格言"){
     this.changeMotto()
  }else if(this.data.dialogTitle=="学习格言"){
     this.changeShool()
  }
//更改最后应该刷新页面
},

changeNickName:function(e){
  var token
  var that =this
  wx.getStorage({
  key: 'token',
  success:res=>{
    that.token = res.data
  }
})
      wx.request({
        url: 'http://192.168.0.106:8080/user/changeNickName',
         header:{
          'content-type': 'application/json' ,
          'Authorization': this.token
         },
         method:'POST',
         data:{
            'nickName':that.data.inputValue
         },
         success:res=>{
             if(res.statusCode==200){
               that.closeDialog()
             }
         }
      })
      
},
changeMotto:function(e){
  var token
  var that =this
  wx.getStorage({
  key: 'token',
  success:res=>{
    that.token = res.data
  }
})
      wx.request({
        url: 'http://192.168.0.106:8080/user/changeMotto',
         header:{
          'content-type': 'application/json' ,
          'Authorization': this.token
         },
         method:'POST',
         data:{
            'motto':that.data.inputValue
         },
         success:res=>{
             if(res.statusCode==200){
               that.closeDialog()
             }
         }
      })
},

changeShool:function(){
  var token
  var that =this
  wx.getStorage({
  key: 'token',
  success:res=>{
    that.token = res.data
  }
})
      wx.request({
        url: 'http://192.168.0.106:8080/user/changeSchool',
         header:{
          'content-type': 'application/json' ,
          'Authorization': this.token
         },
         method:'POST',
         data:{
            'school':that.data.inputValue
         },
         success:res=>{
             if(res.statusCode==200){
               that.closeDialog()
             }
         }
      })
},
refreshMyInfo:function()
{
  //跟新教材版本和年级
  var grade=this.data.myInfo.grade
  var bookType=this.data.myInfo.bookType
  var gradePath='myInfo.grade'
  var bookTypePath='myInfo.bookType'
  wx.getStorage({
    key: 'grade',
    success:res=>{
      grade=res.data
    }
  })
  wx.getStorage({
    key: 'bookType',
    success:res=>
    {
      bookType=res.data
    }
  })
  this.setData({
    [bookTypePath]:bookType,
    [gradePath]:grade
  })
  //跟新其他的信息，需要网络请求

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.refreshMyInfo()
    
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