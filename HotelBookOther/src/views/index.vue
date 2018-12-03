/**
* Created by zengh on 2017/10/31.
*/

<template>
  <div class="index-con">
    <div class="fixeds" v-show="!bgshow"></div>
    <div class="hotel-top">
      <div class="banner">
        <mt-swipe :auto="3000">
          <mt-swipe-item v-for="(dod,indexs) in allRestJson.picPath" :key="indexs">
            <div class="banner_img" :style="`background: url('${dod}') no-repeat center/cover ;`"></div>
            <!--<img class="banner" :src="dod" alt="">-->
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
    <!--日历选择-->
    <div class="calendar" @click="showDatepickerFu">
      <span class="startDate" v-show="startDateok" :class="{topfex:topfix}">入住 </span>
      <span class="endDate" v-show="endDateok">离店</span>
      <span class="daynum">{{dpkr9.daynum}}天</span>
      <span class="startDateNum">{{DatePicker["check-in"].split(" ")[0]}}</span>
      <span class="endDateNum">{{DatePicker["check-out"].split(" ")[0]}}</span>
      <span class="startDateWeek">{{DatePicker["check-in"].split(" ")[1]}}</span>
      <span class="endDateWeek">{{DatePicker["check-out"].split(" ")[1]}}</span>
      <HotelDatePicker :i18n="DatePicker" :ref="DatePicker.datePickerId" :datePickerId="DatePicker.datePickerId" format="MM-DD" @checkOutChanged='chooseDatePickerS' @hideDatepicker='hideopenDateF' @close="closePicker" @checkInChanged='chooseDatePickerF'>
      </HotelDatePicker>
    </div>
    <div class="showCalendar-box" v-show="showCalendarbox" @click="hideCalendarbox">
      <div>
        <div class="check-type">入住</div>
        <div :class="curCheck === 0 ? 'isCheckType': ''">{{dpkr9.startDate}}</div>
      </div>
      <div>
        <div class="check-type">离店</div>
        <div :class="curCheck === 1 ? 'isCheckType': ''">{{dpkr9.endDate}}</div>
      </div>
    </div>
    <div class="hotel-info">
      <div class="info-txt">
        <div class="hotel-neme-con">
          <span class="hotel-neme">{{allRestJson.name}}</span>
          <div class="xiangqin"  @click="showDetail">
            <span>详情</span>
            <span>
            <img class="imgicon" src="../assets/img/new/icon_entergray.png" alt="">
          </span>
           </div>
        </div>
        <div @click="goMap">
          <img class="icon-img" src="../assets/img/new/icon_location.png" alt=""> {{allRestJson.address}}
        </div>
        <div class="tel">
          <img class="icon-img icon-tel" src="../assets/img/new/icon_tel.png" alt="">
          <a :href="'tel:'+ allRestJson.phone">{{allRestJson.phone}}</a>
        </div>
        <div class="xieyi" @click="xieyiClick">
          协议客户登录
          <img src="../assets/img/new/icon_enter.png">
        </div>
      </div>

    </div>

    <!--房型-->
    <div class="house-type">
      <div class="inner">
        <div :class="curSelec == true? 'checkedtype': '' " @click.stop="toDayRoom">全日房</div>
        <div :class="curSelec == true? '': 'checkedtype' " @click.stop="toHourRoom">钟点房</div>
      </div>
    </div>

    <!--房型列表-->
    <div class="home-list">
      <div v-show="curSelec">
        <div v-for="(list,index) in allRestJson.roomList">
          <homeList :homedata='list' :datePicker='nowDate' :beginDate="beginDate" :endDate="endDate" :clockRoom="false" :clear="cleartype" :curSelec="curSelec" :key="index" :show="showoffer"></homeList>
        </div>
      </div>
      <div v-show="!curSelec">
        <div v-for="(list, index) in allRestJson.clockRoomList">
          <homeList :homedata='list' :datePicker='nowDate' :beginDate="beginDate" :endDate="endDate" :clockRoom="true" :clear="cleartype" :curSelec="curSelec" :key="index" :show="showoffer"></homeList>
        </div>
      </div>
    </div>
    <!--验证用户信息-->
    <checkInfo @getHotelDetail="getHotelDetail"></checkInfo>
    <!--弹出层-->
    <ShowMsg v-bind:dialogCreate="dialogCreate" v-on:closeDiaLog="closeDiaLog">
      <div class="hotel-detail-info">
        <div class="detail-box">
          <div class="scale">
            <div>房间数量：{{scale.scale}}间</div>
            <div>服务范围：{{scale.rangk}}</div>
          </div>
          <div class="detail-title" v-text='hotleEqument.title'></div>
          <div class="hotle-base">
            <div v-for='dd in hotleEqument.content'>{{dd.title}}: {{dd.content}}</div>
          </div>
          <div class="detail-title" v-text='hotlePolicy.title'>酒店政策</div>
          <div class="hotel-policy">
            <ul>
              <li v-for="(li,index) in hotlePolicy.content" :key="index">
                <div class="policy-name">{{ li.title}}</div>
                <div class="policy-content">{{li.content}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ShowMsg>
  </div>
</template>
<script>
import Vue from "vue";
import fly from "../assets/js/linyer";
// import calendar from '../components/calendar.vue'
import homeList from "../components/homeList.vue";
import checkInfo from "../components/check-info.vue";
import wechat from "../assets/js/weChat";
import VueAMap from "vue-amap";
import HotelDatePicker from "vue-hotel-datepicker";
import { Swipe, SwipeItem, Toast, Indicator } from "mint-ui";
import { lazyAMapApiLoaderInstance } from "vue-amap";
import fecha from "fecha";
import ShowMsg from "../components/showMsg";
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

Vue.nextTick(() => {
  fecha.i18n = {
    dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    dayNames: [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ],
    monthNamesShort: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12"
    ],
    monthNames: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月"
    ],
    amPm: ["上午", "下午"],
    // D is the day of the month, function returns something like...  3rd or 11th
    DoFn: function(D) {
      return (
        D +
        ["th", "st", "nd", "rd"][
          D % 10 > 3 ? 0 : ((D - D % 10 !== 10) * D) % 10
        ]
      );
    }
  };
});
export default {
  data() {
    return {
      curCheck: 0,
      showCalendarbox: false,
      dialogCreate: false,
      moreImg: "",
      isShowDetail: false,
      scale: {
        scale: "",
        rangk: ""
      },
      curSelec: true, //当前为全日房

      /* 全日房列表 */

      roomList: [],

      DatePicker: {
        selected: "Your stay:",
        night: "Night",
        nights: "Nights",
        datePickerId: "datePickerId01",
        dayNames: [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        ],
        "check-in": fecha.format(new Date(new Date().getTime()), "MM-DD dddd"),
        "check-out": fecha.format(
          new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
          "MM-DD dddd"
        ),
        "day-names": [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        ],
        "week-names": [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        ],
        "month-names": [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ]
      },
      dpkr9: {
        value: "",
        startDate: fecha.format(new Date(new Date().getTime()), "MM-DD dddd"),
        endDate: fecha.format(
          new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
          "MM-DD dddd"
        ),
        startDateS: fecha.format(new Date(new Date().getTime()), "YYYY-MM-DD"),
        endDateS: fecha.format(
          new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
          "YYYY-MM-DD"
        ),
        daynum: ""
      },

      /* 钟点房列表 */
      clockRoomList: [],
      // 酒店政策
      hotlePolicy: {
        title: "",
        content: [
          {
            title: "",
            content: ""
          }
        ]
      },

      // 酒店设施
      hotleEqument: {},
      allRestJson: {
        picPath: [],
        grade: ""
      },
      watchDate: {
        login: new Date().getTime().toString(),
        logout: (new Date().getTime() + 86400000).toString()
      },
      oldDate: {
        oldTimeS: "",
        oldTimeE: ""
      },
      nowDate: {
        login: "",
        logout: ""
      },
      nextData: {
        jData: "",
        mData: ""
      },
      AccessTicket: "",
      accessToken: "",
      hotelId: "",
      timer: 60,
      getCodeBtn: true,
      phone: "", //手机号
      code: "", //验证码
      show: false, //是否显示验证框
      //地图测试
      zoom: 12,
      center: [121.5173285, 31.21615044],
      position: [121.5273285, 31.21515044],
      appId: "",
      showoffer: false,
      beginDate: "",
      endDate: "",
      cleartype: false,
      startDateok: true,
      endDateok: true,
      dateRange: "",
      weekdays: "",
      weekdayy: "",
      topfix: false,
      closela: false,
      isOpen: !1,
      bgshow: false
    };
  },

  watch: {},
  created() {
    this.datecon();
    window.sessionStorage.setItem("type", "1"); // 默认全日房
    //this.mapInit()
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
    window.sessionStorage.setItem("userappId", "oTlsPv9cssFDbXw3xaA6UCKZYwBA");
    this.position = window.sessionStorage.getItem("positions");
    if (this.nowDate.login) {
    } else {
      this.nowDate.login = new Date().getTime().toString();
    }
    if (this.nowDate.logout) {
    } else {
      this.nowDate.logout = (new Date().getTime() + 86400000).toString();
    }
    /*======临时====*/

    // window.sessionStorage.setItem('hotelBookAccessTicket','922c545e7a58474e8f7e48ad924fa5aa')

    // this.getHotelDetail();

    // window.localStorage.setItem('hotelId','11227')

    // window.localStorage.setItem('wxappid','wxf98412fbeb02232b')
  },

  computed: {},

  methods: {
    xieyiClick(){
      window.location.href = `${window.location.origin}/wechat/agreementBookOther/#/?hotelId=${this.hotelId}&appId=${this.appId}`
    },
    closePicker() {},
    hideCalendarbox() {
      this.showCalendarbox = false;
      this.curCheck = 0;
      this.$refs[this.DatePicker.datePickerId].hideDatepicker();
      this.$refs[this.DatePicker.datePickerId].clearSelection();
    },
    showDatepickerFu() {
      this.showCalendarbox = true;
    },
    closeDiaLog(data) {
      this.dialogCreate = data;
    },

    datecon() {
      var time1 = Date.parse(this.dpkr9.endDateS) / 1000;
      var time2 = Date.parse(this.dpkr9.startDateS) / 1000;
      this.dpkr9.daynum = time1 - time2;
      return (this.dpkr9.daynum = this.dpkr9.daynum / (3600 * 24));
    },
    clear() {
      this.cleartype = !this.cleartype;
    },
    chooseDatePickerF(e) {
      if (e == null) {
      } else {
        this.dpkr9.startDate = fecha.format(
          new Date(new Date(e).getTime()),
          "MM-DD dddd"
        );
        this.oldDate.oldTimeS = new Date(e).getTime().toString();
        this.nextData.jData = this.dpkr9.startDate;
        this.dpkr9.startDateQ = fecha.format(
          new Date(new Date(e).getTime()),
          "YYYY-MM-DD"
        );
        this.curCheck = 1;
        this.watchDate.login = new Date(e).getTime().toString();
      }
    },
    chooseDatePickerS(e) {
      //  this.closela=true;
      //  this.topfix=true;
      if (e == null) {
      } else {
        this.dpkr9.endDate = fecha.format(
          new Date(new Date(e).getTime()),
          "MM-DD dddd"
        );
        this.oldDate.oldTimeE = new Date(e).getTime().toString();
        window.localStorage.setItem("startDate", this.dpkr9.startDate);
        window.localStorage.setItem("endDate", this.dpkr9.endDate);
        this.nextData.mData = this.dpkr9.endDate;
        this.dpkr9.endDateQ = fecha.format(
          new Date(new Date(e).getTime()),
          "YYYY-MM-DD"
        );
        this.dpkr9.daynum =
          (Date.parse(this.dpkr9.endDateQ) / 1000 -
            Date.parse(this.dpkr9.startDateQ) / 1000) /
          (3600 * 24);
        this.watchDate.logout = new Date(e).getTime().toString();
        //  this.watchDate.login = this.oldDate.oldTimeS
        const _this = this;
        //  var self=this;
        _this.DatePicker["check-in"] = this.dpkr9.startDate;
        _this.DatePicker["check-out"] = this.dpkr9.endDate;
        _this.nowDate.login = _this.oldDate.oldTimeS;
        _this.nowDate.logout = _this.oldDate.oldTimeE;
        this.showCalendarbox = false;
        this.curCheck = 0;
        _this.getHotelDetail(_this.watchDate);
      }
    },
    hideopenDateF(t) {
      const _this = this;
      _this.DatePicker["check-in"] = _this.DatePicker["check-in"];
      _this.DatePicker["check-out"] = _this.DatePicker["check-out"];

      _this.getHotelDetail(_this.nowDate);
    },
    getHotelDetail(
      datetime = {
        login: new Date().getTime().toString(),

        logout: (new Date().getTime() + 86400000).toString()
      }
    ) {
      this.bgshow = true;
      const _this = this;

      this.AccessTicket = window.sessionStorage.getItem(
        "hotelBookAccessTicket"
      );

      //   默认今日和明天

      this.beginDate = datetime.login;
      this.endDate = datetime.logout;
      fly.codeAxios({
        url: this.$api.HOTEL.detail,
        data: {
          beginDate: datetime.login,
          endDate: datetime.logout,
          type: "1",
          hotelId: this.hotelId
        },
        accessTicket: this.AccessTicket,
        success: data => {
          if (data.data.head.rtnCode == "000000") {
            let getjson = data.data.body;
            this.hotlePolicy = getjson.attachments[1] || "";
            this.hotleEqument = getjson.attachments[0] || "";
            this.scale.scale = getjson.scala;
            this.allRestJson = getjson; //全赋值
            // if(this.allRestJson.name.length>=12){
            //   this.allRestJson.name=this.allRestJson.name.substr(0,12)
            // }
            this.roomList = getjson.roomList; //列表
            //console.log(getjson.typeByService);
            //console.log(getjson)
            this.scale.rangk = getjson.typeByService;
            this.center = [
              parseFloat(getjson.lon) - 0.02,
              parseFloat(getjson.lat) + 0.006
            ];
            this.position = [parseFloat(getjson.lon), parseFloat(getjson.lat)];
            window.sessionStorage.setItem("positions", this.position);
            const seshotelInfo = {
              name: getjson.name,
              pic: getjson.picPath[0]
            };
            window.sessionStorage.setItem(
              "seshotelInfo",
              JSON.stringify(seshotelInfo)
            );
          }
        },
        error: data => {
          console.log(data);
        }
      });
    },

    showDetail() {
      this.dialogCreate = true;
      // this.isShowDetail = !this.isShowDetail;
      //
      // if (this.isShowDetail == false) {
      //     this.moreImg = "";
      // } else {
      //     this.moreImg = "rotatepic";
      // }
    },

    toDayRoom() {
      this.curSelec = true;

      window.sessionStorage.setItem("type", "1"); //全日房
    },

    toHourRoom() {
      window.sessionStorage.setItem("type", "4"); //钟点房

      this.curSelec = false;
    },
    goMap() {
      window.location.href = `http://m.amap.com/navigation/index/daddr=${
        this.position[0]
      }%2C${this.position[1]}%2C${this.allRestJson.name}`;
    }
  },

  components: {
    HotelDatePicker,
    homeList,
    checkInfo,
    ShowMsg
  },

  mounted() {}
};
</script>


<style lang="scss">
@import "../assets/css/index";
.xieyi {
  position: absolute;
  color: #06182f;
  font-size: 0.24rem;
  top: 1.8rem;
  right: 0.5rem;
}
.xieyi img {
  display: inline-block;
  width: 0.12rem;
  vertical-align: bottom;
}
.calendar {
  height: 2.4rem;
  background: #06182f;
  height: 2rem;
  width: 6.63rem;
  margin: -1rem auto 0 auto;
  border-radius: 0.1rem;
  // margin-top: -2.4rem;
}
.fixeds {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 99;
}

.datepicker__clear-button,
.datepicker__close-button {
  color: #092347 !important;
  width: 40px !important;
  height: 40px !important;
  padding-top: 10px !important;
}
.datepicker__month-day--selected,
.datepicker__month-day--first-day-selected,
.datepicker__month-day--last-day-selected {
  background-color: #092347 !important;
}
.datepicker__dummy-wrapper--is-active {
  .datepicker__dummy-input {
    // display: none;
  }
}

.datepicker__dummy-wrapper--no-border.datepicker__dummy-wrapper {
  margin: 0 !important;
}

.datepicker__dummy-wrapper {
  border: 0 !important;
}

.datepicker__month-day--selected,
.datepicker__month-day--first-day-selected,
.datepicker__month-day--last-day-selected {
  background-color: #092347 !important;
  color: #ffffff !important;
  box-shadow: 0 0 0 0 !important;
}

.datepicker__wrapper {
  height: 2.4rem !important;
  background: none !important;
}

.datepicker__dummy-input:first-child {
  background: none !important;
}
.datepicker__dummy-wrapper--is-active {
  .datepicker__dummy-input {
    /*color: #333!important;
            padding: 0 0 0 1rem !important;
            margin-top: -.3rem;*/
  }
}
.datepicker__dummy-input {
  overflow: visible;
  text-align: left !important;
  text-indent: 0px !important;
  /*margin-top: 10px !important;*/
  padding: 18px 0 0 1rem !important;
  color: #fff !important;
  height: 100px !important;
  /*line-height: 50px !important;*/
  width: 50% !important;
  z-index: 33 !important;
  font-size: 0 !important;
  // margin-top: 10px !important;
}

.datepicker__week-row {
  border-bottom: 10px solid #fff !important;
  top: 75px !important;
  z-index: 22 !important;
}

.datepicker__dummy-input--is-active::-webkit-input-placeholder {
  color: #092347 !important;
}

.amap-logo img {
  display: none;
}

.amap-copyright {
  font-size: 0;

  opacity: 0;
}

.startDate,
.endDate {
  position: absolute;
  top: 0.4rem;
  padding-left: 1rem;
  /*z-index: 2;*/
  width: 50%;
  font-size: 0.24rem;
  color: #fff;
}
.endDate {
  left: 50%;
}

.daynum {
  position: absolute;
  top: 0.9rem;
  left: 50%;
  margin-left: -0.5rem;
  z-index: 2;
  border-radius: 0.1rem;
  color: #fff;
  font-size: 0.28rem;
  width: 1rem;
  border: 0.01rem solid #fff;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
}

.calendar {
  position: relative;
}

.next--mobile {
  display: none;
}
.weekdays {
  position: absolute;
  top: 33px;
  z-index: 2;
  left: 1.9rem;
  /* left: 1.8rem; */
  font-size: 0.35rem;
  /* text-align: left !important; */
  /* text-indent: 90px !important; */
  /* margin-top: 10px !important; */
  /* height: 75px !important; */
  /* padding: 35px 0px 0px 0px !important; */
  color: #000000 !important;
}

.weekdayy {
  position: absolute;
  top: 33px;
  z-index: 2;
  right: 0.8rem;
  /* left: 1.8rem; */
  font-size: 0.35rem;
  /* text-align: left !important; */
  /* text-indent: 90px !important; */
  /* margin-top: 10px !important; */
  /* height: 75px !important; */
  /* padding: 35px 0px 0px 0px !important; */
  color: #000000 !important;
}
.imgicon{
    width: .12rem;
    display: inline-block;
}
                  
.xiangqin{
  display: inline-block;
}

// .weekdayy {
//     position: absolute;
//     top: .7rem;
//     z-index: 2;
//     right: 1rem;
//     font-size: .28rem;
// }

::-webkit-input-placeholder {
  /* WebKit browsers */

  color: #000000;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */

  color: #000000;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */

  color: #000000;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */

  color: #000000;
}

// .datepicker__input{
//      color: #ffffff !important;
// }
//    input{
//        color: #ffffff !important;
//        opacity: 1 !important;
//  outline: none !important;
// }
//   input:focus{
//             outline: none !important;
//         }
.datepicker__clear-button {
  display: none;
}

.bost {
  width: 1px !important;
  height: 1px !important;
}

.dianwo {
  width: 50px;
  height: 50px;
  background-color: red;
}

.topfex {
  position: fixed;
  top: 0.21rem;
  z-index: 3;
  width: 50%;
  text-align: center;
  font-size: 0.28rem;
  color: #666666;
}

.closelas {
  position: fixed;
  top: 0.21rem;
  z-index: 999;
  width: 1rem;
  height: 1rem;
  background-color: red;
  top: 0;
}

.closefrs {
  position: absolute;
  width: 5rem;
  height: 1rem;
  background-color: pink;
  z-index: 666;
  top: 2rem;
}

// .demoleft {
//     position: fixed;
//     z-index: 3;
//     top: 0;
//     width: 50%;
//     height: 35px;
//     line-height: 35px;
//     text-align: center;
//     animation: myfirst 0.5s;
//     -webkit-animation: myfirst 0.5s; /* Safari and Chrome */
// }

// .demoright {
//     position: fixed;
//     z-index: 3;
//     top: 0;
//     width: 50%;
//     height: 35px;
//     left: 50%;
//     line-height: 35px;
//     text-align: center;
//     animation: myfirst 0.5s;
//     -webkit-animation: myfirst 0.5s; /* Safari and Chrome */
// }

@-webkit-keyframes myfirst /* Safari and Chrome */ {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes myfirst /* Safari and Chrome */ {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
