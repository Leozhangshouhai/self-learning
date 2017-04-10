/**
 * Created by Dendy.
 *
 * @author Dendy
 * @date 2015/12/10
 */
(function ($, W) {
    // ~ 变量声明区 =====================================================================================================



    var joinBtn = $('#join-btn');
    var area = $('#area').val();
    var modal = $('#modal div');

    // js sdk过期时间，秒
    var jsSdkTimeout = 60 * 60 * 24;

    // ~ 对象定义区 =====================================================================================================

    // ~ 事件注册相关操作 ================================================================================================

    // 参与按钮点击
    //setTimeout(function () {
    //    joinBtn.click(function () {
    //        _checkHasJoin(_checkSubscribe);
    //    });
    //}, 1000);

    // ~ 功能方法定义 ====================================================================================================

    // 检查是否参与了活动


    function _wechatConfig(o) {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: o.appid, // 必填，公众号的唯一标识
            timestamp: o.timestamp, // 必填，生成签名的时间戳
            nonceStr: o.nonceStr, // 必填，生成签名的随机串
            signature: o.sign,// 必填，签名，见附录1
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                //'onMenuShareQQ',
                //'onMenuShareWeibo',
                //'onMenuShareQZone',
                //'startRecord',
                //'stopRecord',
                //'onVoiceRecordEnd',
                //'playVoice',
                //'pauseVoice',
                //'stopVoice',
                //'onVoicePlayEnd',
                //'uploadVoice',
                //'downloadVoice',
                //'chooseImage',
                //'previewImage',
                //'uploadImage',
                //'downloadImage',
                //'translateVoice',
                //'getNetworkType',
                //'openLocation',
                //'getLocation',
                //'hideOptionMenu',
                //'showOptionMenu',
                //'hideMenuItems',
                //'showMenuItems',
                //'hideAllNonBaseMenuItem',
                //'showAllNonBaseMenuItem',
                //'closeWindow',
                //'scanQRCode',
                //'chooseWXPay',
                //'openProductSpecificView',
                //'addCard',
                //'chooseCard',
                //'openCard'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }

    function _getWechatJsSdkInfo(callback) {
        var s = W.Storage.get(W.location.href + "_" + area);
        debug && s && alert(s.nonceStr);
        // 仅调用一次
        //if (s != 'undefined' && s) {
            //callback(s);
        //} else {
            var appid = test ? 'wx7e80e8f93543a5c8' : (area == 'cq' ? 'wxf0d295c06cddb229' : 'wx51d39f3f6422da8d');
            ajaxJsonCall('/wechat/service/WeChat.getJsSdkInfo.json', {
                url: W.location.href.split('#')[0],
                appid: appid
            }, function (data) {
                if (data.rtnCode === "000000") {
                    var o = data.responseData;
                    W.Storage.set(W.location.href + "_" + area, o, jsSdkTimeout);
                    callback(o);
                } else {
                    W.Storage.remove(W.location.href + "_" + area);
                }
            }, false);
        //}
    }

    // ~ 业务逻辑入口 ====================================================================================================

    _getWechatJsSdkInfo(_wechatConfig);
})(window.jQuery, window);

wx.checkJsApi({
    jsApiList: [
        'getLocation',
        'onMenuShareTimeline',
        'onMenuShareAppMessage'
    ],
    success: function (res) {
        //alert(JSON.stringify(res));
    }
});

//var url = "www.zaichengdu.com" + app_path;
var url = curDomain;
function _shareAppMessage() {
    // 页面加载后设置微信分享给朋友的内容
    wx.onMenuShareAppMessage({
        title: '圣诞老人送礼啦，现金红包人人领！', // 分享标题
        desc: '“圣诞夺包”35000份礼包等你拆！', // 分享描述
        link: encodeURI(curDomain + '/christmas/service/ChristmasSockOnline.home.do?area=cd'),//encodeURI(window.location.href.replace('&from=ad', '')), // 分享链接
        imgUrl: url + '/public/christmas/img/shorejoin.jpg', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            //Message.toast.success("分享成功！").appear();
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            //alert('cancel');
        }
    });
}

function _shareTimeline() {
    // 设置分享到朋友圈的内容
    wx.onMenuShareTimeline({
        title: '圣诞老人送礼啦，现金红包人人领！', // 分享标题
        link: encodeURI(curDomain + '/christmas/service/ChristmasSockOnline.home.do?area=cd'),//encodeURI(window.location.href.replace('&from=ad', '')), // 分享链接
        imgUrl: url + '/public/christmas/img/shorejoin.jpg', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            Message.toast.success("分享成功！").appear();
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            //alert('cancel');
        }
    });
}

wx.ready(function () {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    //alert('success');
    _shareAppMessage();
    _shareTimeline();
});

wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    //alert('error');
});

function clearCache() {
    var b = localStorage.clear();
    alert(b);
}

function showCache() {
    var i = 0;
    var s = '';
    while (true) {
        var key = localStorage.key(i++);
        if (key == undefined) break;
        var v = localStorage.getItem(key);
        s += key + ' = ' + v + '\r\n\r\n';
    }
    alert(s);
}