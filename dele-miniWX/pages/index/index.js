//index.js
//获取应用实例
const app = getApp()
import API from "../../utils/api.js";
import Tool from "../../utils/tool.js";
import Alert from '../../utils/alert/alert.js';
Page({
  data: {
    showModal: true,
    isCanMore: true,
    param: {
      pageIndex: '0',
      pageSize: '3',
      latitude: app.globalData.latitude ,
      longitude: app.globalData.longitude,
      personCode: '',

    },
    ticket_list: [

    ],
    hasUserInfo: false,
    view_list: [{
        src: '/static/icon/icon_food.png',
        name: '美食海鲜',
        gameId: ''
      },
      {
        src: '/static/icon/icon_room.png',
        name: '酒店客房',
        gameId: ''
      },
      {
        src: '/static/icon/icon_sight.png',
        name: '周边景点',
        gameId: ''
      },
      {
        src: '/static/icon/icon_airticket.png',
        name: '机票旅游',
        gameId: ''
      },
      {
        src: '/static/icon/icon_travel.png',
        name: '自助游',
        gameId: ''
      },
      {
        src: '/static/icon/icon_music.png',
        name: '休闲娱乐',
        gameId: ''
      },
    ]
  },
  //事件处理函数
  kindSearch(e){
  console.log(e);
    let id = e.currentTarget.dataset.id;
    this.data.param=Object.assign(this.data.param,{
      typeId:id+'',
      pageIndex:'0'
    });
    this.getList(1);
  },
  getList(i) {
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    Tool.request({
      url: API.couponList,
      data: {
        ...this.data.param
      }
    }).then((res) => {
      console.log(res);
      wx.hideLoading()
      wx.stopPullDownRefresh();
      let pn = this.data.param.pageIndex * 1 + 1;
      if (res.benefitAgreementVos.length < this.data.param.pageSize) {
        this.setData({
          isCanMore: false,
        })
      }
      let arr = this.data.ticket_list || [];
      if(i=='1'){
        this.setData({
          'param.pageIndex': pn + '',
          view_list: res.allBenefitType,
          ticket_list: res.benefitAgreementVos
        })
      }else{
        arr = new Array().concat(arr, res.benefitAgreementVos);
        this.setData({
          'param.pageIndex': pn + '',
          view_list: res.allBenefitType,
          ticket_list: arr
        })
      }
      
   
    }, (res) => {
      Alert(res.rtnMsg, () => {
        this.setData({
          showModal: true
        })
      });
    })
  },

  getCodeVal(e) {
    this.data.param.personCode = e.detail;
    app.globalData.code = e.detail;
    this.getList(1);
  },
  onReachBottom(e) {
    if (this.data.isCanMore) {
      this.getList();
    }
  },
  getPermission: function (obj) {
    var _t = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
       
        _t.data.param.latitude = res.latitude
        _t.data.param.longitude = res.longitude
        app.globalData.accuracy = res.accuracy
        app.globalData.latitude = res.latitude+''
        app.globalData.longitude = res.longitude+''
      }
    })
  },
  onLoad: function() {
    this.getPermission();
  },

})