// pages/Myself/Myself.js
const myAPP=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    haslogin:false,
    showStudyPlan:false,
    showPhoneDialog:false,
    canIUse:wx.canIUse('button.open-type.getUserInfo'),
    //模拟一个myInfo
    myInfo:{
    },
    studyStatus:[
      {name:"课程",
       value:'0'},
       {name:"时长",
       value:'0'},
      {name:"积分",
      value:'0'},
      {name:"余额",
      value:'0'}
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
    data: {
      fileList: [],
    },
    postContentName:'',//上传的课程名称
    postContentType:'',//上传的课程类型
    postContentDes:'', //上传的课程描述
    videoUrl:'',
    changePlan:true,
    inputTime:'',
    inputPlan:'',
    inputTxt:''

  },
  changePlan:function(){
     this.setData({
      changePlan:false
     })
  },
  inputTime:function(e){
     this.setData({
       inputTime:e.detail.value
     })
     console.log(this.data.inputTime)
  },
  inputPlan:function(e){
    this.setData({
       inputPlan:e.detail.value
      })
      console.log(this.data.inputkPlan)
  },
  inputSure:function(){
    if(this.data.inputkPlan==''||this.data.inputTime==''){
      return
    }else{
    this.setData({
      showStudyPlan:true,
      changePlan:true
    })
    this.data.studyPlan.push({
      desc:this.data.inputTime,
      text:this.data.inputPlan
    })
    this.setData({
      studyPlan:this.data.studyPlan,
      inputTxt:''
    })
  }
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
  showPhoneDialog:function(e)
  {
    var selected=e.target.id
    this.setData({
      showPhoneDialog:true,
    })
  },
  closePhoneDialog:function()
  {
    this.setData(
      {
        showPhoneDialog:false,
      }
    )
  },

  gotoModifyInfo:function()
  {
    if(!myAPP.globalData.hasLogin )
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
     if(myAPP.globalData.haslogin){
         console.log("已经登陆")
         return 
     }
      else
      {
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
             
              wx.getUserInfo({
                success: res => {  
                  // 可以将 res 发送给后台解码出 openId
                  myAPP.globalData.userInfo = res.userInfo
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  myAPP.globalData.haslogin=true
                  this.setData({
                    haslogin:myAPP.globalData.haslogin=true
                  })
                  if (myAPP.userInfoReadyCallback) {
                    myAPP.userInfoReadyCallback(res)
                  }
                }
              })
              wx.login({
                success(res){
                  //发送给后台进行一个解析，并且返回相应的用户的其他的数据
                  var that=this
                  wx.request({
                    url: myAPP.globalData.host+'/user/login',
                    data:{
                      code:res.code,
                      roles:"common_user",
                      nickName:myAPP.globalData.userInfo.nickName
                    },
                    method:'POST',
                    header: {
                      'content-type': 'application/json' // 默认值
                    },
                    success:res=>
                    {
                      if(res.statusCode==200)
                      {
                        myAPP.globalData.haslogin=true
                        console.log(res.data)
                        var jsonstr=JSON.stringify(res.data)
                        var jsonObj=JSON.parse(jsonstr)
                        var token=jsonObj.data.token
                        wx.setStorage({
                          data: token,
                          key: 'token',
                        })
                        // that.setData({
                        //   haslogin:myAPP.globalData.haslogin
                        // })
                      }
                    }
                  })
                },
              })
            }
          }
        })
        //获取用户的信息
      }
   },
   /**
    * 向服务器拉取全部的用户信息
    * **/
   getUserAllInfo:function()
  {   
      var token
      var that =this
      wx.getStorage({
      key: 'token',
      success:res=>{
        token = res.data
      }
    })
    wx.showLoading({
      title: '正在加载',
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
          var body=JSON.parse(jsonStr)
          myAPP.globalData.myInfo.id=((body.data.nickname==""||body.data.nickname==null)?myAPP.globalData.userInfo.nickName:body.data.nickname)
          myAPP.globalData.myInfo.School=(body.data.school==null)?"":body.data.school
          myAPP.globalData.myInfo.motto  = (body.data.signature==null)?"":body.data.signature
          if(body.data.imageUrl==null||body.data.imageUrl=='')
          {
            myAPP.globalData.myInfo.userImageSrc=myAPP.globalData.userInfo.avatarUrl
          }else{
            myAPP.globalData.myInfo.userImageSrc=myAPP.globalData.host+'/user/getUserImage/'+body.data.id+'/'+Math.floor(Math.random()*100)
          }
          that.setData({
            myInfo:myAPP.globalData.myInfo
          })
          console.log(myAPP.globalData.myInfo.motto)
          that.setData({
            studyStatus:[ 
              {name:"课程",value:(body.data.classNum==null)?"0":body.data.classNum},
              {name:"时长",value:(body.data.studyTime==null)?0:body.data.studyTime},
              {name:"积分",value:(body.data.integral==null)?0:body.data.integral},
              {name:"余额",value:(body.data.balance==null)?0:body.data.balance}
          ]
          })
          console.log(that.data.studyStatus)
        }
      },
      complete:res=>
      {
        that.updateInfo(that)
        wx.hideLoading({
          complete: (res) => {},
        })
      }
    })
  },
  /**
   * 更新页面信息
   */
  updateInfo:function(e){
    //此处更新缓存中内容，还未成功取出，怀疑是和回调函数等号有关
    wx.getStorage({
      key: 'grade',
      success:res=>{
        myAPP.globalData.myInfo.grade = res.data
      }
    })
    wx.getStorage({
      key: 'bookType',
      success:res=>{
        myAPP.globalData.myInfo.bookType = res.data
      }
    })
      e.setData({myInfo:myAPP.globalData.myInfo})
  },

inputClassName:function(e){
  this.setData({
    postContentName:e.detail.value
   })
   console.log("上传的课程名称"+this.data.postContentName)//最后注释掉
},
inputClassDes:function(e){
  this.setData({
    postContentDes:e.detail.value
  })
  console.log("上传的课程描述"+this.data.postContentDes)//最后注释掉
},

chooseVideo:function(){
  var that = this;
   wx.chooseVideo({
    compressed:false,
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
    success: function (res) {
      that.setData({
      videoUrl: res.tempFilePath
      })
    }
   })
},
/**
 * 上传课程的发送函数
 */
send:function(){
  if(that.data.postContentName==''||that.data.postContentDes==''){
    return
  }else{
  this.contentRequest()
  }
},

contentRequest:function(){
  var that=this
  var token=null
  wx.getStorage({
    key: 'token',
    success:res=>
    {
      token=res.data
    }
  })
  //显示在上传中
  wx.showLoading({
    title: '上传中',
   })

  wx.request({
    url: myAPP.globalData.host+'/class/addClass',//这里待填
    header: {
      'content-type': 'application/json', // 默认值
      'Authorization':token
    },
    method:'POST',
      data: {
     name:that.data.postContentName,
     classType:that.data.postContentType,
     description:that.data.postContentDes
      },
      success:res=>{
        if(res.statusCode==200&&res.data.code==200)
        {
          //上传成功后的处理
          var jsonStr=JSON.stringify(res.data)
          var jsonObj=JSON.parse(jsonStr)
          var classId=jsonObj.data.classId
          that.uploadVideo(classId)
        }
      }
  })
},


uploadVideo:function(classId){
  let that = this;
    wx.uploadFile({
    //路径填你上传视频方法的地址
    url:myAPP.globalData.host+'/class/fileUpload',
    filePath: that.data.videoUrl,
    name: 'filename',
    formData: {
    'classId':classId
    },
    success:res=>
    {
    wx.hideLoading()
    wx.showModal({
    title: '提交成功',
    showCancel: false,
    success:res=> {
     if (res.confirm) {
     wx.navigateTo({
      url: '/pages/Myself/Myself',
     })
     }
    }
    })
    }
  })
},


















  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**用户登录*/

    console.log("onload")
    this.setData({haslogin:myAPP.globalData.hasLogin})
    this.setData({myInfo:myAPP.globalData.myInfo})
    if(myAPP.globalData.userInfo)
    {
      //说明其app.js中已经获得登陆了。。。。错了
      //myAPP.globalData.haslogin=true
      this.setData({
        haslogin:myAPP.globalData.haslogin
      })
      // var userImageSrc='myInfo.userImageSrc'
      // this.setData({
      //   [userImageSrc]:myAPP.globalData.userInfo.avatarUrl
      // })
      //可以拉取所有的学生信息
    }else  if(this.data.canIUse){
      // myAPP.userInfoReadyCallback= res=>{
      //   // var userImageSrc='myInfo.userImageSrc'
      //   myAPP.globalData.haslogin=true
      //   this.setData({
      //     // [userImageSrc]:myAPP.globalData.userInfo.avatarUrl,
      //     haslogin: myAPP.globalData.haslogin
      //   })
      // }
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onready")

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUserAllInfo()
    console.log("onshow")

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
    if(this.data.radio==1){
      this.setData({
        postContentType:'junior'
      })
      //console.log(this.data.postContentType)
    }else if(this.data.radio==2){
      this.setData({
        postContentType:'senoir'
      })
      //console.log(this.data.postContentType)
    }

  },
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: myAPP.globalData.host+'/post/fileUpload', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'name',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
    });
  },
})