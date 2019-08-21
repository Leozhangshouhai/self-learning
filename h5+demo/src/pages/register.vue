<template>
  <div class="register">
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
   function openFeedback(){
     console.log(99999);
   }
  export default {
    name: "register",
    data() {
      return {

      }
    },

    created() {
     
      CONFIRM({
        msg: '再按一次返回键退出<br>点此可&nbsp;<span style="border-bottom:1px solid #fff" onclick="(function(){console.log(9999)})()">反馈意见</span>',
        showCancelBtn: true,
        enbtnTextArr:['取消',"确认"]
      }).then(res => {
        console.log(res);
      })
    },
    methods: {
      openFeedback(){
    console.log(123)
        
      },
      down(url) {
        this.Indicator.open('正在前往...');
        plus.runtime.openURL(url, function () {
          this.Indicator.close();

        })
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
        height: 100px;
      }
    }
    .whole-img {
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
        width: 100%;
        color: rgba(150, 150, 151, 1);
        font-size: 12px;
        text-align: left;
        height: 44px;
        line-height: 44px;
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

  .tips {
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
    span {
      height: 20px;
      text-decoration: underline;
      color: #C8DAF7;
      font-size: 14px;
      font-family: PingFangSC-regular;
    }

  }
</style>