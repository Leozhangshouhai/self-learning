// pages/Coupon/Coupon.js
const app = getApp()
import API from "../../utils/api.js";
import Tool from "../../utils/tool.js";
import Alert from '../../utils/alert/alert.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param: {
      pageIndex: '0',
      pageSize: '6',
      },
      Total:'',
    isCanMore:true,
    ticket_list: [
  
    ]
  },
  getList(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    Tool.request({
      url: API.myList,
      data: {
        ...this.data.param
      }
    }).then(res => {
      wx.hideLoading()
      wx.stopPullDownRefresh();
      let arr = this.data.ticket_list || [];
      arr = new Array().concat(arr, res.aaData);
      if (arr.length == res.iTotalRecords){
        this.setData({
          isCanMore: false,
        })
      }
      this.setData({
        ticket_list: arr
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.param=Object.assign(this.data.param,{
      latitude: app.globalData.latitude+'',
      longitude: app.globalData.longitude+'',
      openid: app.globalData.openId,
    });
    this.getList();
   
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
    if (this.data.isCanMore) {
      this.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})