<template>
 <div class="bg">
  <div class="useinfo">
   <div class="handimg">
    <img src="" alt="">
   </div>
   <div class="useName"></div>
  </div>
  <div class="tabType">
   <div class="fellow">

   </div>
   <div class="order">
<input type="date">
   </div>
   <div class="agree">

   </div>
  </div>
 </div>
</template>
<script>
import Vue from "vue";
import fly from "../assets/js/linyer";
import wechat from "../assets/js/weChat";
import { Toast, Indicator } from "mint-ui";
// Vue.use(VueAMap);
export default {
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    getwxloction: function() {
      //  alert( window.location.href.split("?")[0])
      var _self = this;
      fly.AjaxB({
        data: {
          url: window.location.href.split("#")[0],
          hotelid: wechat.getUrlStr("hotelId")
        },
        url: _self.URL + _self.api.WPS_CONFIG,
        success: function(res) {
          var ObjData = res.body.share;
          if (res.head.rtnCode == "000000") {
            wx.config({
              debug: false,
              appId: ObjData.appid,
              timestamp: ObjData.timestamp,
              nonceStr: ObjData.nonceStr,
              signature: ObjData.signature,
              jsApiList: ["checkJsApi", "getLocation"]
            });
          }
        },
        error: function(err) {
          console.log(err);
        }
      });
    },
    openwxlocation: function() {
      var _self = this;
      wx.getLocation({
        type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function(res) {
          // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          // var speed = res.speed; // 速度，以米/每秒计
          // var accuracy = res.accuracy; // 位置精度
          _self.myList.config.latitude = res.latitude;
          _self.myList.config.longitude = res.longitude;
          _self.getCouponList(_self.myList);
        },
        fail: function(res) {
          alert(res);
          // _self.getCouponList(_self.myList);
          //alert('获取位置失败');
        },
        cancel: function(res) {
          alert(res);
          // _self.getCouponList(_self.myList);
          //alert('用户拒绝授权获取地理位置');
        },
        error: function(res) {
          alert(res);
        }
      });
    }
  }
};
</script>


<style lang="scss">
</style>
