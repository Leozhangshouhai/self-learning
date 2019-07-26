import DES from "./3DES";
import MD5 from "./md5";
import Base64 from "./base64";

let tool = {
  // request 函数请求
  request(obj) {
    obj = Object.assign({
      type: 'POST',
      param: {}
    }, obj);
    const appid = "BAS5-520100-0001";
    const appkey = "02e45ae192526ce470d8352e7403134a92526ce470d8352e";
    const version = "2.0";
    let body = obj.data ? obj.data : {};
    let accessTicket = obj.accessTicket ? obj.accessTicket : ''
    let sign = DES.encrypt_string(appkey, MD5.hex_md5((new Base64()).encode(appid + JSON.stringify(body))));
    let req = {
      "body": body,
      "head": {
        "sign": sign,
        "appid": appid,
        "version": version,
        "accessTicket": accessTicket,
        "appversion": '2.3.7'
      }
    };
    return new Promise((resolve, reject) => {
      wx.request({
        url: obj.url, //请求接口的url
        method: obj.type, //请求方式
        data: { data: JSON.stringify(req)}, //请求参数
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
        },
        success: res => {
          wx.setStorageSync('throttle_canRun', true);
          if (res.data.head.rtnCode == '000000') {
            obj.success && obj.success(res);
            resolve(res.data.body);
          } else {
            wx.hideLoading();
            reject(res.data.head);
            obj.fail && obj.fail(res);
          }
        },
        complete: res => {
          wx.hideLoading();
        },
        fail: res => {
          obj.fail && obj.fail(res);
          wx.setStorageSync('throttle_canRun', true);
        }
      });
    })
  },
  translateKm(num){
    let d = (num / 1000).toFixed(2);
    return `${d}Km`
  },
  _canRun: true,
  _canRunLocal: true,
  // 仅对有网络请求的节流有效。 gapTime无实际意义，以实际接口返回时间为准
  throttle(fn, gapTime = 1000) {
    if (!tool._canRun) {
      return false;
    }
    tool._canRun = false;
    fn();
    let time = 0;
    wx.setStorageSync('throttle_canRun', false);
    var s = setInterval(() => {
      var _canRun = wx.getStorageSync('throttle_canRun') || false;
      if (_canRun) {
        tool._canRun = true;
        clearTimeout(s);
      }
    }, 100);
  },
  //  对非网络函数进行节流
  throttleLocal(fn, gapTime = 1000) {
    if (!tool._canRunLocal) {
      return false;
    }
    tool._canRunLocal = false;
    fn();
    var s = setTimeout(() => {
      tool._canRunLocal = true;
      clearTimeout(s);
    }, gapTime);
  },
};
module.exports = tool;