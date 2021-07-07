var myApp=getApp()
Page({
  data: {
  postId:null,
  img_url: [],
  content:''
  },
  onLoad: function (options) {
  },
  input:function(e){
  this.setData({
   content:e.detail.value
  })
  },
  chooseimage:function(){
  var that = this;
  wx.chooseImage({
   count: 9, // 默认9 
   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
   success: function (res) {
   if (res.tempFilePaths.length>0){
    //图如果满了9张，不显示加图
    if (res.tempFilePaths.length == 3){
    that.setData({
     hideAdd:1
    })
    }else{
    that.setData({
     hideAdd: 0
    })
    }
    //把每次选择的图push进数组
    let img_url = that.data.img_url;
    for (let i = 0; i < res.tempFilePaths.length; i++) {
    img_url.push(res.tempFilePaths[i])
    }
    that.setData({
    img_url: img_url
    })
   }
   }
  }) 
  },

  //发布按钮事件
  send:function(){
  var that = this;
  wx.showLoading({
   title: '上传中',
  })

  that.contentRequest()
  },


  contentRequest:function()
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
      url: myApp.globalData.host+'/post/doPost',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization':token
      },
      method:'POST',
      data: {
      content: that.data.content
      },
      success:res=>
      {
        if(res.statusCode==200&&res.data.code==200)
        {
        var jsonStr=JSON.stringify(res.data)
        var jsonObj=JSON.parse(jsonStr)
        that.setData({
          postId:jsonObj.data.postId
        })
        console.log(jsonObj.data.postId)
        that.img_upload()
        }
      }
     })
  },

  //图片上传
  img_upload: function () {
  let that = this;
  let img_url = that.data.img_url;
  let img_url_ok = [];
  var complete=0
  //由于图片只能一张一张地上传，所以用循环
  if(that.data.postId==null)
  {return}
  for (let i = 0; i < img_url.length; i++) {
   wx.uploadFile({
   //路径填你上传图片方法的地址
   url:myApp.globalData.host+'/post/fileUpload' ,
   filePath: img_url[i],
   name: 'filename',
   formData: {
    'user': 'test',
    'postId':that.data.postId
   },
   success:res=> {
     if(res.statusCode==200&&res.data.code==200)
     {
       complete=complete+1
     }
    },
   fail: function (res) {
    console.log('上传失败')
   }
   })
  }  
    wx.hideLoading()
    wx.showModal({
    title: '提交成功',
    showCancel: false,
    success:res=> {
     if (res.confirm) {
     wx.navigateTo({
      url: '/pages/community/community',
     })
     }
    }
    })
  } 
 })