// pages/coupon-detail/index.js
const app = getApp()
import API from "../../utils/api.js";
import Tool from "../../utils/tool.js";
import Alert from '../../utils/alert/alert.js';
import drawQrcode from '../../utils/weapp-qrcode.js'

const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;

// 300rpx 在6s上为 150px
const qrcode_w = 300 / rate;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {

    },
    isSelfCoupon: false,
    param: {
      agreementId: '',
      id: '',
    },
    myparam: {
      id: '',
    }
  },
  getCode() {
  
    var param = {
      agreementId: this.data.param.agreementId,
      openId: app.globalData.openId,
      personCode: app.globalData.code,
      hotelId: this.data.info.benefitStoresVos[0].id+'',
      activityTitle: this.data.info.activityTitle
    }
    Tool.request({
      url: API.getCode,
      data: {
        ...param
      }
    }).then((res) => {
      Alert('已领取，请进入我的优惠券查看，或下拉微信顶部最近使用的小程序找‘得嘞优惠’重新进入。', () => {
        wx.navigateTo({
          url: '../my-coupon/Coupon',
        })
      });
    }, (res) => {
      Alert(res.rtnMsg, () => {

      });
    })
  },
  getMydetail() {
    Tool.request({
      url: API.myDetail,
      data: {
        ...this.data.myparam
      }
    }).then((res => {

      drawQrcode({
        width: qrcode_w,
        height: qrcode_w,
        canvasId: 'canvas',
        text: res.qrCodeAddress
      });
      for (var x of  res.benefitStoresVos) {
        x.distance = Tool.translateKm(x.distance);
      }
      this.setData({
        info: res,
      });
      wx.hideLoading()
    }))
  },
  getDetail() {
    Tool.request({
      url: API.copponDetail,
      data: {
        ...this.data.param
      }
    }).then((res => {
      for (var x of  res.benefitStoresVos) {
        x.distance = Tool.translateKm(x.distance);
      }
      this.setData({
        info: res,
      });
      wx.hideLoading()
    }))
  },
  mapgo() {
    wx.openLocation({
      latitude: Number(this.data.info.benefitStoresVos[0].latitude),
      longitude: Number(this.data.info.benefitStoresVos[0].longitude),
      scale: 18
    })
  },
  callphone() {
    wx.makePhoneCall({
      phoneNumber: this.data.info.phone //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    wx.showLoading({
      mask: true
    })
    let sign = options.ismycoupon ? true : false;
    this.setData({
      isSelfCoupon: sign
    });
    if (sign) {
      this.data.myparam = {
        id: options.id + '',
        latitude: app.globalData.latitude,
        longitude: app.globalData.longitude,
      }
      this.getMydetail()
    } else {
      this.data.param = {
        agreementId: options.agreementid + '',
        id: options.id + '',
        latitude: app.globalData.latitude,
        longitude: app.globalData.longitude,
      }
      this.getDetail();
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})