//app.js
App({
  globalData: {
    userInfo: null,
    hasLogin : false,
    myInfo:{
    id:"一叶知秋",
    grade:"高三",
    bookType:"人教版",
    motto:"书山有路勤为径",
    userImageSrc:"",
    School:"华中科技大学"}
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.login({
      success: res => {
        wx.request({
          url: 'http:192.168.2.100:8080/user/login',
          data:{
            code:res.code
          },
          success:res=>
        {
          //网络请求发送成功
          if(res.statusCode=200)
          {
            //登录成功
            this.globalData.hasLogin=true;
            //解析token
            console.log(res.data.token)
          }
        }
        })
      }
    })
  },
  
})