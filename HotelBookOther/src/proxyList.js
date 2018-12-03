/**
 * Created by zengh on 2017/10/15.
 */
// const URL = 'http://192.168.0.200';
//const URL = "http://dev.abcbooking.cn:8000";
//  const URL = "https://uat.abcbooking.cn:82";
const URL = "http://wx.abcbooking.cn";
const proxyConfig = {
    proxyList: {
        '/hmp_website': {
            target: URL,
            changeOrigin: true
        }
    }
};

module.exports = proxyConfig;
