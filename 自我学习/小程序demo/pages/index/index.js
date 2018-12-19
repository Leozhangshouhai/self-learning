0//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../demo/demo'
    })
  },
  onLoad: function () {
    function Memento() {
      this.storage = {};
    }
    Memento.prototype.saveState =  (key, obj)=> {
      console.log(this)
      this.storage[key] = JSON.stringify(obj);
    }
    Memento.prototype.restoreState = function (key) {
      var output = {};
      if (this.storage.hasOwnProperty(key)) {
        output = JSON.parse(this.storage[key]);
      }
      return output;
    }
    var memento = new Memento(), user = { name: 'leo', age: 23 };
    memento.saveState('user', user);
    console.log(memento.storage['user']);
    user = {
      name: 'CD-leo', age: '18', weight: '80kg'
    };
    console.log(user);
    user = memento.restoreState('user');
    console.log(memento.storage['user']);
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
