<template>
 <div class="bg-fellow">
  <div class="tab">
   <div class="tableft box activebox">
    <img class="" src="../assets/img/icon_gray1.png" alt="">填写信息</div>
   <div class="tabrigth box">
    <span>2</span>完成申请</div>
  </div>
  <div class="info" hidden>
   <div class="infoadd">
    <mt-field label="姓名" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="性别" placeholder="请输入邮箱" v-model="sex"></mt-field>
    <mt-field label="生日" placeholder="请输入生日" type="tel" v-model="birthday"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    <mt-field label="验证码" placeholder="请输入密码" type="password" v-model="rtnCode"></mt-field>
    <div class="maskborder"></div>
   </div>
  </div>
  <div class="lastInfo">
   <img src="../assets/img/icon_finish.png" alt=""> 您已完成申请
  </div>
  <div class="submint">购买</div>
  <div class="back">完成</div>
  <!-- <mt-datetime-picker type="date" ref="picker" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm" :startDate="startDate">
  </mt-datetime-picker> -->
 </div>
</template>
<script>
import Vue from "vue";
import fly from "../assets/js/linyer";
import wechat from "../assets/js/weChat";
import { Toast, Indicator, DatetimePicker, Field } from "mint-ui";
Vue.component(Field.name, Field);
export default {
  data() {
    return {
      dateTime: "",
      startDate: new Date(),
      username: "",
      sex: "",
      birthday: "",
      phone: "",
      rtnCode: ""
    };
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
.bg-fellow {
  background-color: rgb(46, 46, 46);
  font-size: 0.13rem;
  color: #ffffff;
  padding: 0.4rem;
}
img {
  display: inline-block;
}
.box img {
  width: 0.33rem;
  height: 0.33rem;
  vertical-align: sub;
  margin-right: 0.1rem;
}
.tab {
  width: 100%;
  display: -webkit-flex; /*在webkit内核的浏览器上使用要加前缀*/
  display: flex;
  border-radius: 0.1rem;
  font-weight: 600;
}
.box {
  flex: 1;
  height: 0.9rem;
  border: 1px solid #404040;
  line-height: 0.9rem;
  text-align: center;
}
.tableft {
  border-radius: 10px 0 0 10px;
}
.tabrigth {
  border-radius: 0 10px 10px 0;
}
.activebox {
  background-color: #404040;
  color: #c29f6e;
  font-size: 0.28rem;
}
.box span {
  display: inline-block;
  width: 0.33rem;
  height: 0.33rem;
  color: #404040;
  background-color: #878787;
  text-align: center;
  line-height: 0.33rem;
  border-radius: 50%;
  margin-right: 0.1rem;
}
.info {
  position: relative;
  margin-top: 0.32rem;
  background-color: #404040;
  border-radius: 10px;
  // height: 4.78rem;
  // overflow: hidden;
}
.infoadd {
  padding: 0.1rem;
}
.mint-cell {
  background-color: #404040;
}
// .mint-cell-wrapper {
//   border-bottom: 1px solid #404040;
// }
// .mint-cell-wrapper:nth-last-child(1) {
//   border-bottom: 1px solid #404040;
// }
.mint-cell-wrapper {
  background-image: -webkit-linear-gradient(
    top,
    #404040,
    #404040 50%,
    transparent 50%
  );
  background-image: linear-gradient(
    180deg,
    #404040,
    #404040 50%,
    transparent 50%
  );
  border-bottom: 1px solid #878787;
}
.mint-cell:last-child {
  background-image: -webkit-linear-gradient(
    bottom,
    #404040,
    #404040 50%,
    transparent 50%
  );
  border-bottom: 1px solid #404040 !important;
  background-image: linear-gradient(
    0deg,
    #404040,
    #404040 50%,
    transparent 50%
  );
}
.mint-cell-wrapper:last-child {
  border-bottom: 1px solid #404040 !important;
}
input {
  vertical-align: middle;
  border: 0;
  background-color: #404040;
  text-align: right;
  color: #c29f6e;
}
input[type="date"] {
  color: #b9b3b3 !important;
  padding-left: 2rem;
}
.maskborder {
  position: absolute;
  width: 97%;
  height: 5px;
  background-color: #404040;
  /* padding: .1rem; */
  margin-top: -0.1rem;
}
.submint {
  width: 100%;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  font-size: 0.26rem;
  margin-top: 0.3rem;
  background-color: #c29f6e;
  border-radius: 6px;
}
.back {
  width: 100%;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  font-size: 0.26rem;
  margin-top: 0.3rem;
  background-color: #c29f6e;
  border-radius: 6px;
}
.lastInfo {
  height: 4rem;
  text-align: center;
  line-height: 2.9rem;
  font-size: 0.28rem;
}
.lastInfo img {
  width: 0.81rem;
  height: 0.81rem;
  margin-right: 0.1rem;
}
</style>
