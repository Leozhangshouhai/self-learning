/**
* Created  on 2018/3/24.
*/

<template>
    <div class="check-info " v-if="show">
        <div class="check-box animated" :class="showWay">
            <div class="title">手机验证</div>
            <div class="input-box">
                <input type="number" placeholder="输入手机号" v-model="phone">
            </div>
            <div class="input-box code-box">
                <input type="number" placeholder="输入验证码" v-model="code">
                <div class="send-code" @click="sendCode">
                    {{getCodeBtn? '发送验证码': timer+'s后再试' }}
                </div>
            </div>
            <div class="confirm" @click="bindUser">确认</div>
        </div>
    </div>
</template>
<script>
import fly from "../assets/js/linyer";
import wechat from "../assets/js/weChat";
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      show: false,
      AccessTicket: "",
      hotelId: "",
      accessToken: "",
      AccessTicket: "",
      appId: "",
      timer: 60,
      getCodeBtn: true,
      phone: "",
      code: "",
      showWay: "zoomIn"
    };
  },
  created() {
    if (
      wechat.getUrlStr("hotelId") !== null &&
      wechat.getUrlStr("hotelId") !== undefined &&
      wechat.getUrlStr("hotelId") !== "" &&
      wechat.getUrlStr("appId") !== null &&
      wechat.getUrlStr("appId") !== undefined &&
      wechat.getUrlStr("appId") !== ""
    ) {
      this.hotelId = wechat.getUrlStr("hotelId");
      this.appId = wechat.getUrlStr("appId");
      window.localStorage.setItem("hotelId", this.hotelId);
      window.localStorage.setItem("wxappid", this.appId);
    } else {
      this.appId = window.localStorage.getItem("wxappid");
      this.hotelId = window.localStorage.getItem("hotelId");
    }
    this.code = wechat.getUrlStr("code");
    //this.appId = window.localStorage.getItem('wxappid')
    //this.hotelId = window.localStorage.getItem('hotelId')
    this.checkInfo();
  },
  computed: {},
  methods: {
    checkInfo() {
      //判断用户是否绑定公众号
      //let code = wechat.getUrlStr("code");
      const promise = new Promise((resolve, reject) => {
        fly.codeAxios({
          url: this.$api.HOTEL.iswxapproved,
          data: {
            hotelid: this.hotelId
          },
          success: res => {
            if (res.data.head.rtnCode === "000000") {
              let getJson = res.data.body;
              //console.log(getJson)
              resolve(getJson);
            }
          }
        });
      });
      promise.then(res => {
        if (res) {
          window.localStorage.setItem("canOlinePay", "canOlinePay");
          this.checkIsbind({ code: this.code });
        } else {
          let isAccessTicket = window.localStorage.getItem("isAccessTicket");
          window.localStorage.setItem("canOlinePay", "contOlinePay");
          isAccessTicket = isAccessTicket ? isAccessTicket : "";
          this.isBindFun({ accessTicket: isAccessTicket });
        }
      });
    },
    isBindFun(parma) {
      Indicator.open("Loading...");
      const promise = new Promise((resolve, reject) => {
        let reqData = { hotelid: this.hotelId };
        reqData = Object.assign({}, reqData, parma);
        fly.codeAxios({
          url: this.$api.HOTEL.isbind,
          data: reqData,
          success: res => {
            Indicator.close();
            if (res.data.head.rtnCode === "000000") {
              let getJson = res.data.body;
              resolve(getJson);
            } else {
              Toast(res.data.head.rtnMsg);
            }
          },
          error: err => {
            Indicator.close();
          }
        });
      });
      promise.then(val => {
        console.log(val.status);
        this.accessToken = val.accessToken;
        this.openid = val.openid;
        window.localStorage.setItem("openid", this.openid);
        if (val.status === "0") {
          //用户未绑定  显示绑定框
          // this.show = true;
          this.accessToken = val.accessToken;
          this.openid = val.openid;
          window.sessionStorage.setItem("bindopen", "1");
          this.$emit("getHotelDetail");
        } else if (val.status === "1") {
          //获取openId
          Toast("微信授权错误，请重试！");
        } else if (val.status === "3") {  
          window.sessionStorage.setItem("bindopen", "2");
          this.AccessTicket = val.accessTicket;
          window.sessionStorage.setItem(
            "hotelBookAccessTicket",
            this.AccessTicket
          );
          window.localStorage.setItem("isAccessTicket", this.AccessTicket);
          //window.location.href = window.location.origin + window.location.pathname + '#/index'
          this.$emit("getHotelDetail");
          //获取openId
          // Toast('微信授权错误，请重试！')
        } else {
          //status == '3'  已绑定 获取accessTicket
          this.AccessTicket = val.accessTicket;
          // window.sessionStorage.setItem(
          //   "hotelBookAccessTicket",
          //   this.AccessTicket
          // );
          window.localStorage.setItem("isAccessTicket", this.AccessTicket);
          //window.location.href = window.location.origin + window.location.pathname + '#/index'
          this.$emit("getHotelDetail");
        }
      });
    },
    checkIsbind(parma) {
      this.AccessTicket = window.sessionStorage.getItem(
        "hotelBookAccessTicket"
      );
      // window.sessionStorage.setItem("bindopen", "2")
      // let bindopen=window.sessionStorage.getItem("bindopen")
      if (!this.AccessTicket) {
        if (!this.code) {
          wechat.getCode(this.appId);
          //                        wechat.getCode('wxa33b79d5d341ebc7');
        } else {
          this.isBindFun(parma);
        }
      } else {
        //用户登录过  存有AccessTicket 载获取酒店信息
        this.$emit("getHotelDetail");
      }
    },
    // sendCode() {
    //   //发送短信
    //   if (this.getCodeBtn) {
    //     if (this.phone.length != 11) {
    //       Toast("手机号位数不对！");
    //     } else {
    //       this.getCodeBtn = false;
    //       let countDown = setInterval(() => {
    //         this.timer -= 1;
    //         if (this.timer < 1) {
    //           window.clearInterval(countDown);
    //           this.getCodeBtn = true;
    //           this.timer = 60;
    //         }
    //       }, 1000);
    //       fly.codeAxios({
    //         url: this.$api.HOTEL.sendsms,
    //         data: {
    //           mobile: this.phone,
    //           smsparam: "code",
    //           businesstype: "thirdpartlogin001"
    //         },
    //         success: res => {
    //           Indicator.close();
    //           if (res.data.head.rtnCode === "000000") {
    //             //成功
    //           } else {
    //             Toast({
    //               message: "短信发送失败，请重试！"
    //             });
    //           }
    //         },
    //         error: err => {
    //           Indicator.close();
    //           Toast({
    //             message: "获取信息失败，请重试！",
    //             position: "top",
    //             duration: 3000
    //           });
    //         }
    //       });
    //     }
    //   }
    // },
    // bindUser() {
    //   //用户绑定微信号
    //   if (this.phone.length != 11) {
    //     Toast("手机号位数不对！");
    //     return;
    //   }
    //   if (this.code.length != 6) {
    //     Toast("验证码位数不对！");
    //     return;
    //   }
    //   Indicator.open("Loading...");
    //   const promise = new Promise((resolve, reject) => {
    //     fly.codeAxios({
    //       url: this.$api.HOTEL.bindaccount,
    //       data: {
    //         mobile: this.phone,
    //         code: this.code,
    //         accessToken: this.accessToken,
    //         businesstype: "thirdpartlogin001",
    //         openid: this.openid,
    //         hotelid: this.hotelId
    //       },
    //       success: res => {
    //         Indicator.close();
    //         if (res.data.head.rtnCode === "000000") {
    //           //成功
    //           resolve(res.data);
    //         } else {
    //           Toast(res.data.head.rtnMsg);
    //         }
    //       },
    //       error: err => {
    //         Indicator.close();
    //       }
    //     });
    //   });
    //   promise.then(val => {
    //     //绑定成功后在查询酒店详情
    //     this.show = false;
    //     this.AccessTicket = val.body;
    //     window.sessionStorage.setItem(
    //       "hotelBookAccessTicket",
    //       this.AccessTicket
    //     );
    //     window.localStorage.setItem("isAccessTicket", this.AccessTicket);
    //     //window.location.href = window.location.origin + window.location.pathname + '#/index'
    //     setTimeout(() => {
    //       this.show = false;
    //       this.showWay = "zoomOut";
    //     }, 700);
    //     this.$emit("getHotelDetail");
    //   });
    // }
  }
};
</script>


<style lang="scss" scoped>
.check-info {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 111;
}
.check-box {
  z-index: 222;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 6.5rem;
  height: 4rem;
  transform: translateX(-50%) translateY(-50%);
  background: #ffffff;
  border-radius: 0.16rem;
  font-family: PingFangSC-Medium;
  padding: 0.4rem 0.54rem 0 0.6rem;
  > .title {
    width: 100%;
    text-align: center;
    color: #3c3c3c;
    font-size: 0.36rem;
    line-height: 0.5rem;
  }
  > .input-box {
    width: 100%;
    padding: 0.44rem 0 0.12rem 0.2rem;
    border-bottom: 0.01rem solid #cccccc;
    > input {
      &::-webkit-input-placeholder {
        color: #cccccc;
      }
      font-size: 0.3rem;
      line-height: 0.42rem;
      border: 0;
      outline: 0;
      color: #3c3c3c;
    }
  }
  > .code-box {
    width: 3.22rem;
    position: relative;
    > .send-code {
      position: absolute;
      text-align: center;
      top: 0.19rem;
      left: 3.32rem;
      height: 0.76rem;
      width: 1.92rem;
      line-height: 0.76rem;
      color: #666666;
      border: 0.01rem solid #3c3c3c;
      border-radius: 0.08rem;
    }
  }
  > .confirm {
    width: 100%;
    text-align: center;
    padding-top: 0.32rem;
    font-size: 0.36rem;
    color: #3c3c3c;
    line-height: 0.5rem;
  }
}

.animated {
  -webkit-animation-duration: 0.7s;
  animation-duration: 0.7s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes zoomIn {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

.zoomIn {
  -webkit-animation-name: zoomIn;
  animation-name: zoomIn;
}
@-webkit-keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  to {
    opacity: 0;
  }
}

@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  to {
    opacity: 0;
  }
}

.zoomOut {
  -webkit-animation-name: zoomOut;
  animation-name: zoomOut;
}
</style>
