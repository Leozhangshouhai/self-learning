/**
* Created  on 2018/2/26.
*/

<template>
  <div class="creatrOrder">
    <div class="home-info">
      <div class="img-box">
        <img :src="orderInfo.picPath" alt="">
      </div>
      <div class="order-info">
        <div class="info-txt">{{`${formatDay(login)}-${formatDay(logout)} | ${days}晚`}}</div>
        <div class="info-txt">{{orderInfo.bedSituation?orderInfo.bedSituation: '大床'}} | {{breakfastType(orderInfo.breakfastNum)}} </div>
        <div class="price">{{Math.floor(price)}}元</div>
      </div>
    </div>
    <!--房间数量-->
    <div class="home-count-box">
      <div class="txt">房间数</div>
      <div class="count">
        <img :src="minusImg" alt="" @click="minuscount">
        <span>{{roomCount}}间</span>
        <img src="../assets/img/add.png" alt="" @click="addcount">
      </div>
    </div>
    <!--入住信息-->
    <div class="check-in-info">
      <ul>
        <li v-for="(item,index ) in personList">
          <div>
            <div>入住人</div>
            <div class="input-box">
              <input type="text" placeholder="姓氏" v-model="item.familyName">
              <input type="text" placeholder="名字" v-model="item.lastName">
              <img :src="index == 0 ? minusPerson : canMinusPerson " alt="" @click="minusPersonFun(index)">
            </div>
          </div>
          <div>
            <div>手机号</div>
            <div class="input-box ">
              <input class="areaCode" type="text" placeholder="区号" value="+86" readonly>
              <input class="tel-input" type="text" placeholder="手机号" v-model="item.tel" maxlength="11">
              <img src="../assets/img/add.png" alt="" @click="addPerson">
            </div>
          </div>

        </li>
      </ul>
    </div>

    <div class="check-in-info repad" v-show="bindok">
      <div class="bindtext">请输入手机号进行绑定</div>
      <ul>
        <li>
          <div>
            <div>手机号</div>
            <div class="input-box ">
              <input class="areaCode" type="text" placeholder="区号" value="+86" readonly>
              <input class="tel-input" type="text" placeholder="手机号" v-model="phone" maxlength="11">
              <!-- <img src="../assets/img/delete1.png" alt=""> -->
            </div>
          </div>
          <div v-show="yanzhengma">
            <div>验证码</div>
            <div class="input-box ">
              <input class="tel-input" type="text" placeholder="验证码" v-model="code" maxlength="6">
              <input class="areaCode bindcode" style="font-size:.24rem;" type="text" placeholder="验证码" :value="getCodeBtn? '发送验证码': timer+'s后再试'" @click="sendCode" readonly>
              <!-- <img src="../assets/img/delete1.png" alt=""> -->
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--要求-->
    <div class="need com-box">
      <div class="left">特别要求</div>
      <div class="right">
        <textarea maxlength="50" v-model="specialComment"></textarea>
      </div>
    </div>
    <!--发票-->
    <div class="invoice com-box">
      <div class="left">发票</div>
      <div class="right">
        <div>{{invoice&&invoice.email?'普通发票' : '是否需要发票'}}</div>
        <div>
          <img @click="toInvoice" src="../assets/img/more2.png" alt="">
        </div>
      </div>
    </div>
    <!--优惠券-->
    <div class="invoice com-box" v-if="couponstatus & paytab === '01'">
      <div class="left">优惠券</div>
      <div class="right">
        <div class="discountInfo">
          {{discountName ? discountName : '请选择优惠券'}}
        </div>
        <div class="handleBox">
          <img @click="removeDiscoun" :src='discountName ? canMinusPerson : minusPerson' alt="" class="discountNull">
          <img @click="todiscount" src="../assets/img/more2.png" alt="">
        </div>
      </div>
    </div>
    <!--去支付-->
    <div class="to-pay com-box">
      <div class="left">总价:</div>
      <div class="right">
        <div class="total">{{totalMoney}}元</div>
        <div class="to-pay-box">
          <div class="pay-btn" @click="bindUser" v-if="false">{{paytab==='01'? '去支付': '提交订单'}}</div>
          <div class="pay-btn" @click="bindUser">提交订单</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import fly from "../assets/js/linyer";
import { Toast, Indicator } from "mint-ui";

export default {
  data() {
    return {
      btnFlag: false,
      roomCount: 1,
      price: 99,
      totalMoney: "",
      minusImg: require("../assets/img/delete1.png"),
      minusPerson: require("../assets/img/delete1.png"),
      canMinusPerson: require("../assets/img/delete.png"),
      personList: [
        {
          familyName: fly.localStore("lastfamilyName") || "",
          lastName: fly.localStore("lastlastName") || "",
          tel: fly.localStore("lastTel") || ""
        }
      ],
      personObj: {
        familyName: "",
        lastName: "",
        tel: ""
      },
      orderInfo: "",
      needInvoice: "false", //是否需要发票
      specialComment: "",
      hotelId: "",
      useMobiles: "",
      useNames: "",
      type: "1",
      paytab: "",
      AccessTicket: "",
      datePickerTime: {},
      login: "",
      logout: "",
      days: "",
      discountId: "",
      discountName: "",
      invoice: "",
      phone: "",
      code: "",
      yanzhengma: true,
      timer: 60,
      getCodeBtn: true,
      bindok: false,
      getCodeBtn: true,
      openid: "",
      couponstatus: false //是否可用优惠券
    };
  },
  watch: {
    roomCount: function(newCount, oldCount) {
      this.totalMoney = Math.floor(newCount * this.price);
      window.sessionStorage.setItem("totalmoney", this.totalMoney);
      this.checkCoupons();
    },
    bindcall: function(news, olds) {
      //   if (news.length == 11) {
      //     this.yanzhengma = true;
      //   } else if (news.length < 11) {
      //     this.yanzhengma = false;
      //   } else {
      //   }
    }
  },
  created() {
    this.initData(); //初始化数据
    this.checkCoupons();
    this.openid = window.localStorage.getItem("openid");
    if (window.sessionStorage.getItem("bindopen") == 2) {
      this.bindok = false;
    } else {
      this.bindok = true;
    }
  },
  computed: {},
  methods: {
    initData() {
      this.AccessTicket = window.sessionStorage.getItem(
        "hotelBookAccessTicket"
      );
      this.type = window.sessionStorage.getItem("type");
      this.datePickerTime = JSON.parse(
        window.sessionStorage.getItem("datePickerTime")
      );
      this.paytab = window.sessionStorage.getItem("paytab");
      this.orderInfo = JSON.parse(window.sessionStorage.getItem("homeInfo"));
      this.price = window.sessionStorage.getItem("price");
      this.hotelId = window.localStorage.getItem("hotelId");
      this.login = fly.formatTime(this.datePickerTime.login);
      this.logout = fly.formatTime(this.datePickerTime.logout);
      this.days = fly.timeDiff(this.login, this.logout);
      this.totalMoney = Math.floor(this.price);
      this.discountId = window.sessionStorage.getItem("discountId")
        ? window.sessionStorage.getItem("discountId")
        : "";
      this.discountName = window.sessionStorage.getItem("discountName")
        ? window.sessionStorage.getItem("discountName")
        : "";
      this.invoice = JSON.parse(window.sessionStorage.getItem("invoice"));
      let sessionPersonList = JSON.parse(
        window.sessionStorage.getItem("personList")
      );
      if (sessionPersonList && sessionPersonList.length !== 0) {
        this.personList = sessionPersonList;
      }
      window.sessionStorage.setItem("totalmoney", this.totalMoney);
      let roomCount = window.sessionStorage.getItem("roomCount");
      if (roomCount) {
        this.roomCount = parseInt(roomCount);
        this.couponstatus = true;
      }
      if (this.roomCount > 1) {
        this.minusImg = require("../assets/img/delete.png");
      }
    },
    async checkCoupons() {
      let parma = {
        beginDate: this.datePickerTime.login,
        endDate: this.datePickerTime.logout,
        hotelid: this.hotelId,
        money: this.totalMoney,
        type: "1"
      };
      const promies = new Promise((resolve, reject) => {
        fly.codeAxios({
          data: parma,
          url: this.$api.HOTEL.checkCoupons,
          accessTicket: this.AccessTicket,
          success: data => {
            if (data.data.head.rtnCode == "000000") {
              let getjson = data.data.body;
              resolve(getjson);
            }
          }
        });
      });
      promies.then(res => {
        this.couponstatus = res.couponstatus;
        window.sessionStorage.setItem("roomCount", this.roomCount);
      });
    },
    toPay() {
      this.createdPersonInfos();
      if (this.btnFlag) {
        return;
      }
      this.btnFlag = true;
      setTimeout(() => {
        this.btnFlag = false;
      }, 4000);
      if (this.canCreate()) {
        let parma = {};
        parma = {
          arrivalTag: "1", //写死
          serviceCnts: "", //写死
          serviceIds: "",
          beginDate: this.datePickerTime.login,
          endDate: this.datePickerTime.logout,
          hotelId: this.hotelId,
          paytab: this.paytab,
          roomCount: `${this.roomCount}`,
          roomId: `${this.orderInfo.id}`,
          specialComment: this.specialComment,
          type: this.type,
          useMobiles: this.useMobiles,
          useNames: this.useNames,
          useBounty: "false",
          orderFrom: "01"
        };
        let invoice = this.invoice;
        if (invoice && invoice.email) {
          //需要发票
          this.needInvoice = "true";
          parma = Object.assign(
            {},
            { invoice: invoice, needInvoice: this.needInvoice },
            parma
          );
        } else {
          parma = Object.assign({}, { needInvoice: this.needInvoice }, parma);
        }
        if (this.discountId) {
          parma = Object.assign({}, { couponid: `${this.discountId}` }, parma);
        }

        Indicator.open("加载中...");

        const promies = new Promise((resolve, reject) => {
          fly.codeAxios({
            url: this.$api.HOTEL.add,
            data: parma,
            accessTicket: this.AccessTicket,
            success: data => {
              Indicator.close();
              if (data.data.head.rtnCode == "000000") {
                let getjson = data.data.body;
                resolve(getjson);
                //console.log(getjson)
              } else {
                Toast(data.data.head.rtnMsg);
              }
            },
            error: data => {
              Indicator.close();
            }
          });
        });
        promies
          .then(res => {
            window.sessionStorage.setItem("orderInfo", JSON.stringify(res));
            if (this.paytab !== "01") {
              //到店付
              this.$router.push("/payBack?use=true");
            } else {
              this.$router.push("/payment");
            }
          })
          .catch(error => {
            console.log(error);
          });
        //this.$router.push({path: '/payBack'})
      }
    },
    canCreate() {
      fly.localStore("lastTel", this.personList[0].tel);
      for (let i = 0; i < this.personList.length; i++) {
        if (
          this.ValidateNmae(this.personList[i].lastName) &&
          this.ValidatePhone(this.personList[i].tel)
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    createdPersonInfos() {
      this.useMobiles = "";
      this.useNames = "";
      fly.localStore("lastlastName", this.personList[0].lastName);
      fly.localStore("lastfamilyName", this.personList[0].familyName);
      for (let i = 0; i < this.personList.length; i++) {
        if (i === this.personList.length - 1) {
          this.useNames += `${this.personList[i].familyName +
            this.personList[i].lastName}`;
          this.useMobiles += `${this.personList[i].tel}`;
        } else {
          this.useNames += `${this.personList[i].familyName +
            this.personList[i].lastName}|`;
          this.useMobiles += `${this.personList[i].tel}|`;
        }
      }
    },
    sendCode() {
      //发送短信
      if (this.getCodeBtn) {
        if (this.phone.length != 11) {
          Toast("手机号位数不对！");
        } else {
          this.getCodeBtn = false;
          let countDown = setInterval(() => {
            this.timer -= 1;
            if (this.timer < 1) {
              window.clearInterval(countDown);
              this.getCodeBtn = true;
              this.timer = 60;
            }
          }, 1000);
          fly.codeAxios({
            url: this.$api.HOTEL.sendsms,
            data: {
              mobile: this.phone,
              smsparam: "code",
              businesstype: "thirdpartlogin001"
            },
            success: res => {
              Indicator.close();
              if (res.data.head.rtnCode === "000000") {
                //成功
              } else {
                Toast({
                  message: "短信发送失败，请重试！"
                });
              }
            },
            error: err => {
              Indicator.close();
              Toast({
                message: "获取信息失败，请重试！",
                position: "top",
                duration: 3000
              });
            }
          });
        }
      }
    },
    removeDiscoun() {
      if (this.discountName) {
        window.sessionStorage.removeItem("discountName");
        window.sessionStorage.removeItem("personList");
        this.discountName = "";
        this.discountId = "";
      }
      //this.discountInfo = JSON.parse(window.sessionStorage.getItem('discountInfo'))
    },
    ValidateNmae(val) {
      if (val === "") {
        Toast("名字不能为空！");
        return false;
      } else {
        return true;
      }
    },
    ValidatePhone(val) {
      if (val === "") {
        Toast("请输入入住人手机号！");
        return false;
      }

      if (val.length !== 11) {
        Toast("入住人手机号位数不对！");
        return false;
      } else {
        return true;
      }
    },
    toInvoice() {
      window.sessionStorage.setItem(
        "personList",
        JSON.stringify(this.personList)
      );
      this.$router.push({ path: "/invoice" });
    },
    todiscount() {
      window.sessionStorage.setItem(
        "personList",
        JSON.stringify(this.personList)
      );
      this.$router.push({ path: "/discount?use=true" });
    },
    addcount() {
      this.roomCount += 1;
      this.minusImg = require("../assets/img/delete.png");
    },
    minuscount() {
      this.roomCount -= 1;
      if (this.roomCount <= 1) {
        this.roomCount = 1;
        this.minusImg = require("../assets/img/delete1.png");
      }
    },
    addPerson() {
      this.personList.push(this.personObj);
      this.personObj = {
        familyName: "",
        lastName: "",
        tel: ""
      };
    },
    minusPersonFun(index) {
      if (index != 0) {
        this.personList.splice(index, 1);
      }
    },
    formatDay(val) {
      let arr = val.split("-");
      return arr[1] + "月" + arr[2] + "日";
    },
    bindUser() {
      if (window.sessionStorage.getItem("bindopen") == 2) {
        this.toPay();
      } else {
        //用户绑定微信号
        if (this.phone.length != 11) {
          Toast("用户手机号位数不对！");
          return;
        }
        if (this.phone.length == 0) {
          Toast("请输入用户手机号！");
          return;
        }
        if (this.code.length != 6) {
          Toast("验证码位数不对！");
          return;
        }
        Indicator.open("Loading...");
        const promise = new Promise((resolve, reject) => {
          fly.codeAxios({
            url: this.$api.HOTEL.bindaccount,
            data: {
              mobile: this.phone,
              code: this.code,
              accessToken: this.accessToken,
              businesstype: "thirdpartlogin001",
              openid: this.openid,
              hotelid: this.hotelId
            },
            success: res => {
              Indicator.close();
              if (res.data.head.rtnCode === "000000") {
                //成功
                resolve(res.data);
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
          //绑定成功后在查询酒店详情
          window.sessionStorage.setItem("bindopen", "2");
          this.AccessTicket = val.body;
          window.sessionStorage.setItem(
            "hotelBookAccessTicket",
            this.AccessTicket
          );
          window.localStorage.setItem("isAccessTicket", this.AccessTicket);
          this.toPay();
          //window.location.href = window.location.origin + window.location.pathname + '#/index'
        });
      }
    },
    breakfastType: function(type) {
      switch (type) {
        case 1:
          return "单早";
        case 2:
          return "双早";
        case type >= 3:
          return "多早";
        default:
          return "无早";
      }
    }
  }
};
</script>


<style lang="scss">
.repad {
  padding: 0 0 0 0.56rem !important;
}
.bindtext {
  font-size: 0.3rem;
  height: 0.4rem;
  text-align: left;
  color: #bbbbbb;
}
.bindcode {
  padding: 0 !important;
  text-align: center !important;
}
@import "../assets/css/createOrder";
</style>
