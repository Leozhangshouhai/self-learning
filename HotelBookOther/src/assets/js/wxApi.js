/**
 * Created by zengh on 2017/11/30.
 */

import wx from 'weixin-js-sdk';
import fly from './linyer'

const wxApi = {
    /**
     * [isweixin 判断是否微信浏览器]
     */
    isweixin () {
        const ua = window.navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true
        } else {
            return false
        }
    },
    /**
     * [wxRegister 微信Api初始化]
     * @param  {Function} callback [ready回调函数]
     */
    chooseWXPay (ObjData) {
        /*WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                timeStamp: ObjData.timeStamp, // 支付签名时间戳，
                nonceStr: ObjData.nonceStr, // 支付签名随机串，不长于 32 位
                package: ObjData.package, // 统一支付接口返回的prepay_id参数值，
                signType: ObjData.signType, // 签名方式，
                paySign: ObjData.sign, // 支付签名
                appId: ObjData.appId
            },
            function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    window.location.href = window.location.origin + window.location.pathname+ '#/orderList'
                }
            }
        );*/
        let data = {
            url : window.location.href.split("#")[0],
            hotelid: window.localStorage.getItem('hotelId')
        }
        fly.Axios({
            data: data,
            url: '/hmp_website/weChatShare/signatureglobal',
            success: (res) =>{
                if(res.data.head.rtnCode == '000000'){
                    let data = res.data.body.share;
                    wx.config({
                        debug: false, // 开启调试模式
                        appId: data.appid, // 必填，公众号的唯一标识
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.nonceStr, // 必填，生成签名的随机串
                        signature: data.signature, // 必填，签名，见附录1
                        jsApiList: [
                            'chooseWXPay'//支付
                        ]
                    })
                    wx.ready((res) => {
                        // 如果需要定制ready回调方法
                        wx.chooseWXPay({
                            timestamp: ObjData.timeStamp,
                            nonceStr: ObjData.nonceStr,
                            package: ObjData.package,
                            signType: ObjData.signType,
                            paySign: ObjData.sign,
                            success: function(res) {
                                // 支付成功后的回调函数
                                if(res.errMsg == "chooseWXPay:ok") {
                                    window.location.href = window.location.origin + window.location.pathname+ '#/payBack'
                                } else {
                                    alert(res);
                                }
                            },
                            cancel: function(res) {
                                //支付取消
                            },
                            error: function(res) {

                            }
                        });
                    });
                }
            }
        })

    },

}
export default wxApi
