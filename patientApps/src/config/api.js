import axios from "axios";
import DES from "./3DES";
import MD5 from "./md5";
import Base64 from "./base64";
import qs from 'qs'
import {Toast} from 'vue-ydui/dist/lib.rem/dialog'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;'
//x-www-form-urlencoded
const fly = {
  AxiosGet:function(){
    let obj = arguments[0];
    let params = new URLSearchParams()
    let body = obj.data ? obj.data : {};
    for (var key in body) {
      params.append(key, body[key])
    }
    axios.get(obj.url,params)
      .then(function (res) {
        if (typeof obj.success == 'function')
          obj.success(res)
      }).catch(function (err) {
      if (typeof obj.error == 'function')
        obj.error(err)
      //alert("sss")
    });
  },
  AxiosC:function(){
    let obj = arguments[0];
    let params = new URLSearchParams()
    let body = obj.data ? obj.data : {};
    for (var key in body) {
      params.append(key, body[key])
    }
    axios.post(obj.url,params)
      .then(function (res) {
        if (typeof obj.success == 'function')
          obj.success(res)
      }).catch(function (err) {
      if (typeof obj.error == 'function')
        obj.error(err)
      //alert("sss")
    });
  },
  Axios: function () {
    let obj = arguments[0];
    let body = obj.data ? obj.data : {};
    axios.post(obj.url, qs.stringify(body))
      .then(function (res) {
        if (typeof obj.success == 'function')
          obj.success(res)
      }).catch(function (err) {
      if (typeof obj.error == 'function')
        obj.error(err)
    });
  },
  codeAxios: function () {
    let obj = arguments[0];
    const appid = "BAS5-520100-0001";
    const appkey = "02e45ae192526ce470d8352e7403134a92526ce470d8352e";
    const version = "2.0";
    let body = obj.data ? obj.data : {};
    let accessTicket = obj.accessTicket? obj.accessTicket : ''
    let sign = DES.encrypt_string(appkey, MD5.hex_md5((new Base64()).encode(appid + JSON.stringify(body))));
    let req = {
      "body": body,
      "head": {
        "sign": sign,
        "appid": appid,
        "version": version,
        // "accessTicket": '25fbbb6631f2417bb19a8024d251fba9'
        "accessTicket": accessTicket,
        "appversion":'2.3.7'
      }
    };
    let data = {
      data : JSON.stringify(req)
    }
    axios.post(obj.url, qs.stringify(data))
      .then(function (res) {
        if (typeof obj.success == 'function')
          if(res.data.head.rtnCode === '999999'){
            Toast({
              mes: res.data.head.rtnMsg,
              timeout: 1500,
              icon: 'success'
            });
          }else{
            obj.success(res.data.body)
          }

      }).catch(function (err) {
      if (typeof obj.error == 'function')
        obj.error(err)
      //alert("sss")
    });
  },
  encode: function (str) {
    /**
     * 封装的编码简单加密
     */
    return (new Base64()).encode(str);
  },
  decode: function (str) {
    /**
     * 封装的编码简单解密
     */
    return (new Base64()).decode(str);
  },
  math_random: function (Min, Max) {
    /**
     * 获取随机数
     * @type {number}
     */
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
  },
  getTimer: function () {
    /**
     * 获取时间戳  秒级
     */
    return parseInt((new Date()).getTime() / 1000);
  },
  getNowDate: function () {
    /**
     * 获取当前时间
     */
    let now = new Date();
    return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  },
  countDown: function (start) {
    /**
     * 计算时间差   xx天xx小时xx分xx秒
     */
    let startTime = new Date(start);
    let diff = startTime - (new Date());
    let result;
    if (diff >= 0) {
      let ss = parseInt(diff / 1000); // 秒
      let mm = 0; // 分
      let hh = 0; // 小时
      let dd = 0; //天
      if (ss > 60) {
        mm = parseInt(ss / 60);
        ss = parseInt(ss % 60);
        if (mm > 60) {
          hh = parseInt(mm / 60);
          mm = parseInt(mm % 60);
          if (hh > 24) {
            dd = parseInt(hh / 24);
            hh = parseInt(hh % 24);
          }
        }
      }
      result = "" + parseInt(ss) + "秒";
      if (mm > 0) {
        result = "" + parseInt(mm) + "分" + result;
      }
      if (hh > 0) {
        result = "" + parseInt(hh) + "小时" + result;
      }
      if (dd > 0) {
        result = "" + parseInt(dd) + "天" + result;
      }
    } else {
      result = 0;
    }
    return result;
  },
  timeDiff: function (login,logout) {
    /**
     *    时间差
     */
    let out = new Date(logout);
    let inT = new Date(login);
    //let dateNum = (new Date()) - old;
    let dateNum =  out - inT;

    let days = dateNum / 1000 / 60 / 60 / 24;
    return Math.floor(days);
  },
  formatTime: function (s) {
    /**
     * 格式化时间戳 秒级
     */
    let dt = new Date(s * 1);
    let date = [
      [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('-') ].join(' ').replace(/(?=\b\d\b)/g, '0');
    return date;
  },
  formatTimeT: function (s) {
    /**
     * 格式化时间戳 秒级
     */
    let dt = new Date(s * 1);
    let date = [
      [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('-'), [dt.getHours(), dt.getMinutes()].join(':')
    ].join(' ').replace(/(?=\b\d\b)/g, '0');


    return date;
  },
  format_Day: function (day) {
    /**
     * 格式化0000-00-00格式的时间
     */
    let arr = day.split("-");
    return arr[0] + "年" + arr[1] + "月" + arr[2] + "日";
  },

  formatDay: function (day) {
    let arr = day.split("-");
    return arr[0] + "年" + arr[1] + "月" + arr[2].split(" ")[0] + "日 " +arr[2].split(" ")[1] ;
  },
  formatDate: function (day) {
    /**
     * 格式化yyyy年MM月dd日 hh:mm:ss 格式的时间
     */
    let dt = new Date(day);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset()); // 修正时区偏移
    let date = dt.toISOString().slice(0, -5).replace(/[T]/g, ' ');
    return date;
  },
  isDate: function (datastr) {
    /**
     * 判断是否是时间格式
     */
    let result = datestr.match(/((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/);
    if (result == null) {
      return false;
    }
    return true;
  },
  isEmpty: function (str) {
    /**
     * 判断是否为空
     */
    if (str == null || typeof str == "undefined" || str.trim() == "") {
      return true;
    } else {
      return false;
    }
  },
  splitStr: function (str, len) {
    /**
     * 截取字符串
     */
    let temp;
    let icount = 0;
    let patrn = /[^\x00-\xff]/;
    let strre = "";
    for (let i = 0; i < str.length; i++) {
      if (icount < len - 1) {
        temp = str.substr(i, 1);
        if (patrn.exec(temp) == null) {
          icount = icount + 1;
        } else {
          icount = icount + 2;
        }
        strre += temp;
      } else {
        break
      }
    }
    return strre + "...";
  },
  splitByStr: function( str ){
    var strs = [];
    strs = str.split(',');
    if(strs[0] == ''){
      return []
    }
    return strs
  },
  getHost: function (url) {
    /**
     * 获取域名
     * @param {Object} url
     */
    let host = "null";
    if (typeof url == "undefined" || null == url) {
      url = window.location.href;
    }
    const regex = /^\w+\:\/\/([^\/]*).*/;
    let match = url.match(regex);
    if (typeof match != "undefined" && null != match) {
      host = match[1];
    }
    return host;
  },
  getUrlStr: function (name) {
    /**
     * 获取地址栏参数
     */
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  getParam: function (str, name) {
    /**
     * 获取字符串中参数
     */
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = str.substr(0).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  },
  toPercent: function (data) {
    /**
     * 小数转百分比
     * @type {number}
     */
    let strData = parseFloat(data) * 100;
    return strData.toString() + "%";
  },
  strTrim: function (str, is_global) {
    /**
     * 清除字符串中空格
     * params is_global == "g" 则字符串内的空格都清除掉
     */
    let result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g")
      result = result.replace(/\s/g, "");
    return result;
  },
  localStore: function (key, data, expires) {
    /**
     * 基于本地存储的缓存模块
     *
     * @param {String} key 键名
     * @param {any} data 数据
     * @param {Number} expires 有效期(秒), 0永久
     * @returns {any}
     *
     * 使用例子：
     * localStore('aaa', { a: 1 }); // 永久存储
     * localStore('bbb', { b: 2 }, 3); // 存储3秒
     */
    const localStorage = window.localStorage;
    // 不兼容返回空
    if (!localStorage) {
      return undefined;
    }
    let now = +new Date(); // 当前时间戳
    // 有值则存储数据
    if (data) {
      let storeData = {
        data: data,
        expires: 0 // 有效期
      };
      if (expires) {
        storeData.expires = now + expires * 1000; // 到期时间戳
      }
      // 无法存入情况
      try {
        return localStorage.setItem(key, JSON.stringify(storeData));
      } catch (er) {
        // 不做处理统一返回
      }
    } else {
      // 获取数据
      try {
        let storeData = JSON.parse(localStorage.getItem(key));
        if (storeData.expires === 0 || now <= storeData.expires) {
          return storeData.data;
        }
        return localStorage.removeItem(key); // 清理过期数据
      } catch (er) {
        // 不做处理统一返回
      }
    }
    return undefined;
  },
  is_weixin : function(){
    /**
     * 判断是否为微信端
     */
    var ua = navigator.userAgent.toLowerCase()
    if ( ua.match(/MicroMessenger/i) == 'micromessenger' ) {
      return true
    } else {
      return false
    }
  },
  is_alipay : function(){
    /**
     * 判断是否为支付宝端
     */
    var ua = navigator.userAgent.toLowerCase()
    if ( ua.match(/AlipayClient/i) == 'alipayclient' ) {
      return true
    } else {
      return false
    }
  },
  isEmail: function(str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
  },
  toDecimal: function(value){
    value = Math.round(parseFloat(value) * 10) / 10;
    return value;
  },
  boxheight : function(){
    /**
     * 设置为全屏高度
     */
    var winHeight=0;
    if (window.innerHeight)
      winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
      winHeight = document.body.clientHeight;
    //通过Document对body进行检测，获取浏览器可视化高度
    if (document.documentElement && document.documentElement.clientHeight)
      winHeight = document.documentElement.clientHeight;
    //alert(winH)
    return winHeight
  },
};

/**
 * 是否是手机号码
 */
String.prototype.isMobile = function () {
  const reg = /^(13|14|15|18|17)[0-9]{9}$/;
  return reg.test(this);
};
/**
 * 对普通数组排序
 */
Array.prototype.sorting = function () {
  return this.sort(function (a, b) {
    return a - b;
  });
};
/*
 * 是否是有效的身份证(中国)
 */
export default fly;
