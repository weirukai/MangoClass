// pages/modifyInfo.js

import Toast from "../../miniprogram_npm/vant-weapp/toast/toast"
var myAPP=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showDialog:false,
    dialogTitle:"",
    inputValue:"",
    myInfo:{
      id:"",
      grade:"",
      bookType:"",
      motto:"",
      userImageSrc:"",
      School:""
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

        url: 'http://192.168.2.100:8080/user/changeNickName',
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
              wx.showToast({
                title: '成功',
              })
             }
         },
         finally:res=>
         {
           that.closeDialog()
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
        url: 'http://192.168.2.100:8080/user/changeMotto',
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
              wx.showToast({
                title: '成功',
              })
             }
         },
         complete:res=>
         {
           that.closeDialog()
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
    url: 'http://192.168.2.100:8080/user/changeSchool',
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
              wx.showToast({
                title: '成功',
              })
             }
         },
         complete:res=>
         {
           that.closeDialog()
         }
      })
},
refreshMyInfo:function()
{
  //跟新教材版本和年级
  var grade=this.data.myInfo.grade
  var bookType=this.data.myInfo.bookType
  var nickName='myInfo.id'
  var motto='myInfo.motto'
  var school='myInfo.school'
  var userImageSrc="myInfo.userImageSrc"
  var gradePath='myInfo.grade'
  var bookTypePath='myInfo.bookType'
  var token
  var that=this
  wx.getStorage({
    key: 'token',
    success:res=>
    {
      token=res.data
    }
  })
  
  wx.request({
    url: 'http://192.168.2.100:8080/user/getUserAllInfo',
    header: {
      'content-type': 'application/json', // 默认值
      'Authorization':token
    },
    success:res=>
    {
      //获取成功
      if(res.statusCode==200)
      {
        var jsonStr=JSON.stringify(res.data)
        var jsonObj=JSON.parse(jsonStr)
        that.setData({
          [nickName]:jsonObj.data.nickname==""?myAPP.globalData.userInfo.nickName:jsonObj.data.nickname,
          [motto]:jsonObj.data.signature==null?'':jsonObj.data.signature,
          [school]:jsonObj.data.school==null?'':jsonObj.data.school,
          //注意头像信息需要额外进行申请，目前后台还没有处理头像的逻辑
        })
      }
    },
    failed:res=>{

    },
    complete:res=>
    {

    }
    
  })
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
    [gradePath]:grade,
    [bookTypePath]:bookType,
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
    this.refreshMyInfo()
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
    this.refreshMyInfo()
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