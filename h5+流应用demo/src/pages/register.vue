<template>
  <div class="register">
    <div class="logo">
      <img src="../assets/img/version-4.0/register-9.png" alt="">
    </div>
    <div class="tips">
        每日在APP内签到领取0.005ETH
    </div>
    <div class="box">
      <p class="title">注册</p>
      <div class="box-list">
          <!-- <img class="dd-left-img" src="../assets/img/new-img/regist-0.png" alt=""> -->
          <input type="text" class="wname" placeholder="请输入账号，且不小于6个字符" v-model="info.username">
      </div>
      <div class="box-list">
          <input type="password"  v-model="info.password" placeholder="请设置登录密码">
      </div>
      <div class="box-list">
        
          <!-- <img class="dd-left-img" src="../assets/img/new-img/regist-1.png" alt=""> -->
          <input type="password"  v-model="info.password_confirm" placeholder="请再次确认登录密码">
      </div>
      <div class="agree">
        <div class="radio">
          <div class="mui-radio">
            <input name="radio1" checked value="1" type="radio">
          </div>
        </div>
        我已阅读并认同
        <span @click="go_next('/agreement')">《ETHtoken服务协议》</span>
      </div>
      <div class="friend-info">
        您的好友
        <span>{{info.invited_code}}</span>正在邀请你
      </div>
    </div>
    <div class="btn">
      <button @click="submit" class="common-btn-style">
        立即加入
      </button>
    </div>
    <div class="download">
      <span href="" @click="down">我先下载试试</span>
    </div>
    <!-- <img class="whole-img" src="../assets/img/version-4.0/v2_prl5qh.png" alt=""> -->

    <div id="demo-popup"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    Toast,
    Field,
    Button
  } from 'mint-ui';
  Vue.component(Toast.name, Toast);
  Vue.component(Field.name, Field);
  Vue.component(Button.name, Button);
  import {
    CONFIRM
  } from '../assets/js/tools.js';
  import api from '../assets/js/api.js';
  import config from '../assets/js/config.js';
  import MD5 from "../assets/js/md5.js";
  import fly from '../assets/js/linyer.js';
  export default {
    name: "register",
    data() {
      return {
        info: {
          username: '',
          password: '',
          password_confirm: '',
          invited_code: '',
          tn_code: '',
        },
        downUrl: 'https://www.ethtoken.plus/',
        myCaptcha: '',
        extra: ['tn_code']
      }
    },

    created() {
      this.info.invited_code = this.$route.query.invited_code;
    },
    methods: {
      down() {
        var ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          this.MessageBox({
            title: '提示',
            message: '请点击右上角浏览器打开下载',
          });
        } else {
          if (window.plus) {
            var w = plus.webview.create(this.downUrl, 'up_id', {
              width: '100%',
              height: '100%',
              backButtonAutoControl: 'close'
            });
            w.show();

          } else {
            window.location.href = this.downUrl;
          }

        }

      },
      check() {
        for (var x in this.info) {
          if (this.info[x] == '' && !(this.extra.indexOf(x) > -1)) {
            this.Toast(config.ERRORS[x])
            return false;
          }
        }
        if (this.info.password != this.info.password_confirm) {
          this.Toast(config.ERRORS['1002'])
          return false;
        }
        if (!this.info.username.minLength(6)) {
          this.Toast('账户名长度至少6位');
          return false;
        }
        if (!this.info.password.minLength(6)) {
          this.Toast('密码长度至少6位');
          return false;
        }
        return true;
      },
      go_next(path) {
        this.$router.push(path)
      },
      submit() {
        if (!this.check()) {
          return false;
        }
        this.ge_regist();
        // this.myCaptcha.show();
      },
      ge_regist() {
        console.log(this.info);
        let _t = this;
        this.$Axios({
          url: api.register,
          param: {
            username: this.info.username,
            // pay_passwd:  MD5.hex_md5(this.info.pay_password),
            // pay_passwd_confirm:  MD5.hex_md5(this.info.pay_password_confirm),
            passwd: MD5.hex_md5(this.info.password),
            passwd_confirm: MD5.hex_md5(this.info.password_confirm),
            invite_code: this.info.invited_code,
            tn_code: this.info.tn_code,
          },
          success(res) {

            CONFIRM({
              msg: `${res.msg},前去下载`,
            }).then(res => {
              window.location.href = "//www.ethtoken.one/"
            })
          },
          error(res) {
            _t.Toast({
              message: res.msg,
              position: 'top',
              duration: 3000
            });
          }
        })
      },
      postData() {
        if (!this.info.name || this.info.name.length < 6) {
          alert("请输入账号，且不小于6个字符");
          return
        } else if (!this.info.pwd) {
          alert("请设置登录密码");
          return
        } else if (this.info.pwd != this.info.confirmPwd) {
          alert("确认密码错误");
          return
        } else if (this.info.code.length < 4) {
          alert("验证码输入错误");
          return
        } else if (!this.info.agreement) {
          alert("请阅读ETHtoken服务协议并同意");
          return
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/common";
  .register {
    background: url("../assets/img/version-4.0/v2_prl5qh.png") no-repeat scroll left top;
    color: #fff;
    background-size: cover;
    height: auto;
    position: relative;
    min-height: 100%;
    .logo {
      padding-top: 33px;
      text-align: center;
      img {
        width: auto;
        height:100px;
      }
    }
    .whole-img{
      position: absolute;
      width: 100%;
      height: auto;
      left: 0;
      top: 0;
    z-index: -1;
    }
    .register-init {
      font-size: 17px;
      font-style: oblique;
      color: #fff;
      margin-top: 20px;
      text-align: center;
    }
  }

  .brand {
    margin-top: 140px;
    height: 20px;
    color: rgba(242, 180, 87, 1);
    font-size: 14px;
    text-align: center;
    font-family: PingFangSC-regular;
  }

  .box {
    margin: 21px;
    line-height: 20px;
    border-radius: 10px;
    padding: 0 17px;
    text-align: center;
    background-color: #fff;
    border: 1px solid rgba(187, 187, 187, 1);
    .title {
      margin-top: 20px;
      color: rgba(16, 16, 16, 1);
      font-size: 14px;
      text-align: left;
      font-family: PingFangSC-regular;
    }
    .box-list {
      border-radius: 7px;
       margin-top: 10px;
       position: relative;
      border: 1px solid rgba(187, 187, 187, 1);
      input {
        width:100%;
          color: rgba(150, 150, 151, 1);
          font-size: 12px;
          text-align: left;
          height: 44px;
          line-height:44px;
          font-family: PingFangSC-regular;
          margin: 0;
        }
      .right {
        float: right;
        margin-right: 20px;
        margin-top: 10px;
        img {
          width: 86px;
          height: 33px;
        }
      }
    }
    .agree {
      margin-top: 16px;
      color: #707070;
      text-align: left;
      a {
        text-decoration: underline;
        color: #707070;
      }
      .radio {
        height: 30px;
        width: 30px;
        display: inline-block;
        vertical-align: middle;

        .mui-radio>input[type=radio] {
          width: 14px;
          right: 5px;
          height: 14px;
          &:checked:before {
            color: rgba(86, 119, 252, 1);
          }
          &:before {
            font-size: 16px; //color: rgba(86,119,252,1);
          }
        }
      }

    }
    .friend-info {

      width: 100%;
      text-align: center;
      color: rgba(88, 136, 252, 1);
      font-size: 13px;
      margin-top: 8px;
      font-family: PingFangSC-regular;
      margin-bottom: 28px;
      span {
        color: #f2b457;
      }
    }
    

  }
  .btn {
      margin-top: 15px;
      text-align: center;

      button {
        color: #571EEB;
        font-size: 14px;
        font-family: PingFangSC-regular;
        background-color: white;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0);
        box-shadow: 0px 2px 2px 0px rgba(170, 170, 170, 1);
      }
    }
    .tips{
color: rgba(255, 255, 255, 1);
font-size: 16px;
text-align: center;
font-family: PingFangSC-regular;

      margin-top: 15px;
    }
  .download {
    text-align: center;
    margin-top: 19px;
    padding-bottom: 90px;
    span{
      height: 20px;
      text-decoration: underline;
      color: #C8DAF7;
      font-size: 14px;
      font-family: PingFangSC-regular;
    }
   
  }
</style>