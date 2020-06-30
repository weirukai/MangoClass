// pages/modifyInfo.js

import Toast from "../../miniprogram_npm/vant-weapp/toast/toast"
var myAPP=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userImageSrcPath:null,
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

  changeImg:function(){
        var that =this
       wx.chooseImage({
        count: 1, // 默认9 
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
        success: function (res) {
        that.setData({
          userImageSrcPath:res.tempFilePaths
        })
        var token=null
        wx.getStorage({
          key: 'token',
          success:res=>
         {
            token=res.data
          }
        })
        wx.showLoading({
          title: '正在上传',
        })
          wx.uploadFile({
            filePath: that.data.userImageSrcPath[0],
            name: 'filename',
            url: myAPP.globalData.host+'/user/imageFileUpload',
            header:{
              'Authorization':token
            },
            success:res=> {
              if(res.statusCode==200&&res.data.code==200){
                //成功后的回调函数
                wx.hideLoading({
                  complete: (res) => {
                    //需要更新个人信息
                    that.refreshMyInfo()
                  },
                })
              }
             },
          })
        }
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
  }else if(this.data.dialogTitle=="学校"){
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

        url: myAPP.globalData.host+'/user/changeNickName',
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
         complete:res=>
         {
           that.closeDialog()
           that.setData({
             inputValue:""
           })
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
        url: myAPP.globalData.host+'/user/changeMotto',
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
           that.setData({
            inputValue:""
          })
         }
      })
},

changeShool:function(){
  var token
  var that =this
  wx.getStorage({
  key: 'token',
  success:res=>{
    token = res.data
  }
})
wx.request({
    url: myAPP.globalData.host+'/user/changeSchool',
    header:{
          'content-type': 'application/json' ,
          'Authorization': token
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
           that.setData({
            inputValue:""
          })
         }
      })
},





refreshMyInfo:function()
{
  //跟新教材版本和年级
  wx.showLoading({
    title: '正在加载',
  })
  var grade=this.data.myInfo.grade
  var bookType=this.data.myInfo.bookTypeS
  var nickName='myInfo.id'
  var motto='myInfo.motto'
  var school='myInfo.School'
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
    url: myAPP.globalData.host+'/user/getUserAllInfo',
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
        if(jsonObj.data.imageUrl==null||jsonObj.data.imageUrl=='')
        {
          that.setData({
            [userImageSrc]:myAPP.globalData.userInfo.avatarUrl
          })
        }
        else{
          that.setData({
            [userImageSrc]:myAPP.globalData.host+'/user/getUserImage/'+jsonObj.data.id
          })
        }
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
  wx.hideLoading({
    complete: (res) => {},
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