
var myApp=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchClasses:[],
    inputValue:'',
    value:'',
    className:'',
    searchNotFound:true
  },
//点击每个课程的事件
  toClassShow:function(e)
  {
    wx.navigateTo({
      url: '/pages/classShow/classShow?id='+e.currentTarget.dataset.id
    })
  },
//请求搜索的内容 还未完成 ：来源页面输入框中的内容获取  完成后加入onload
  searchRequest:function(){
    var that=this
        wx.request({
          url:myApp.globalData.host+'/class/searchClass',
          method:'POST',
          header:{
            'content-type': 'application/json'
          },
          data:{
             className:that.data.className
          },
          success:res=>{
            if(res.statusCode==200){
              var tempClasses=[]
              var jsonStr=JSON.stringify(res.data)
              var jsonObj=JSON.parse(jsonStr)
              var tempClasses=[]
              if(jsonObj.data==null)
              {
             
                return}
              for( var index=0 ,max=jsonObj.data.length;index<max;index++)
              {
                var seniorClass=jsonObj.data[index]
                var classItem={
                  ImagePath:myApp.globalData.host+"/class/getClassImage/"+seniorClass.id,
                  title:seniorClass.name,
                  origin:seniorClass.origin,
                  id:seniorClass.id,
                  date:seniorClass.joinTime.split("T")[0]
                }
                tempClasses.push(classItem)
            }
            that.setData({
              searchNotFound:false,
              searchClasses:tempClasses
            })
            }
          }
        })
  },
  //获取本页面输入框内容
  bindinput:function(e){
    this.setData({
      className:e.detail.value,
      
    })
  },
  //在本页面再次搜索事件
  toSearch:function(){
    console.log(121)
     if(this.data.className==''){
       return
     }else{
     //这个地方填写再次点击搜索后的事件
     this.searchRequest()
      this.setData({
        className:'',
        value:''
      })
     }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       var temp = options.searchClass
       this.setData({
         className:temp,
         value:temp
       })
       this.searchRequest()
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

})