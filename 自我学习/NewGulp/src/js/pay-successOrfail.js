/**
 * Created by leo on 2017/3/28.
 */
/*
 * sign&&type
 * 1---单程，成功，
 * 2---往返，失败*/
var MoniJson = {
    sign: 1,
    type: 1,
    plane_info: {}
};
var page = {

    init: function () {
        MoniJson.plane_info = Storage.get('json_plane_order_personInfo');
        MoniJson.pay_info = Storage.get('air-pay-data');
        this.getUrl();
        this.show();
        this.bing_click();
    },
    getUrl: function () {
        MoniJson.sign = ZSH_Extent.getPostUrl('sign');
        MoniJson.type = ZSH_Extent.getPostUrl('type');
    },
    show: function () {
        //  单程 往返
        if (MoniJson.sign == 1) {
            $('#back-info').css('visibility', 'hidden');


        } else if (MoniJson.sign == 2) {
            $('#back-info').css('visibility', 'visible');

        }
        // 成功--失败
        if (MoniJson.type == 1) {
            $('.bg-green').css('visibility', 'hidden')
            $('.content-sign-title').html('支付成功');

            $('.content-sign-img').attr('src', '../img/air/pay-success.png');

        } else if (MoniJson.type == 2) {
            $('.bg-green').css('visibility', 'visible')
            $('.content-sign-title').html('支付失败');
            $('.content-sign-img').attr('src', '../img/air/pay-fail.png');
        }
        //      从程序上确认是往返还是单程
        if(MoniJson.plane_info.go){
            var $go = $('#go-info');
            var stirng = MoniJson.plane_info.go.data.split('-')[1] * 1 + '月' + MoniJson.plane_info.go.data.split('-')[2] * 1 + '日';
            $go.find('.content-date').html(stirng);
            $go.find('.content-time').html(MoniJson.plane_info.go.plane_info.takeOffTime);
            $go.find('.content-logo').attr('src', MoniJson.plane_info.go.plane_info.airLogo);
            $go.find('.content-airname').html(MoniJson.plane_info.go.plane_info.airName);
            $go.find('.content-num').html(MoniJson.plane_info.go.plane_info.airCode + MoniJson.plane_info.go.plane_info.flightNo);
        }
        if (MoniJson.plane_info.back) {
            var $back = $('#back-info');
            stirng = MoniJson.plane_info.back.data.split('-')[1] * 1 + '月' + MoniJson.plane_info.back.data.split('-')[2] * 1 + '日';
            $back.find('.content-date').html(stirng);
            $back.find('.content-time').html(MoniJson.plane_info.back.plane_info.takeOffTime);
            $back.find('.content-logo').attr('src', MoniJson.plane_info.back.plane_info.airLogo);
            $back.find('.content-airname').html(MoniJson.plane_info.back.plane_info.airName);
            $back.find('.content-num').html(MoniJson.plane_info.back.plane_info.airCode + MoniJson.plane_info.back.plane_info.flightNo);
        }
    },
    bing_click:function(){
        $('.bg-green').on('click',function(){
            $('#popup-pay').fadeIn(100);
        });
        $('.air-pay-box-title').find('img').on('click',function(){
            $('#popup-pay').fadeOut(100);
        });
        connectWebViewJavascriptBridge(function(bridge) {
            var uniqueId = 1;
            function log(message, data) {
                var log = document.getElementById('log');
                var el = document.createElement('div');
                el.className = 'logLine';
                el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
                if (log.children.length) { log.insertBefore(el, log.children[0]) }
                else { log.appendChild(el) }
            }
            setupWebViewJavascriptBridge(function(bridge) {});

            document.getElementById('return-index').onclick = function(e) {
                e.preventDefault();
                WebViewJavascriptBridge.callHandler('reBookPlane',
                    null,
                    function(response) {

                    });
                //page.clear_storage();
            };
            document.getElementById('my-order').onclick = function(e) {
                e.preventDefault();
                WebViewJavascriptBridge.callHandler('openNativeOrderList', null, function(response) {

                });
                //page.clear_storage();
            };
            document.getElementById('AliPay').onclick = function(e) {
                e.preventDefault();
                var orderNo= Storage.get('orderNo');
                WebViewJavascriptBridge.callHandler('payPlaneTicket', {'orderNo':orderNo,'payChannel':'01'},function(response) {
                    if(response.info==0){
                        self.location.href='../pages/air-successOrfail.html?sign='+MoniJson.sign+'&&type=1'
                    }else{
                        self.location.href='../pages/air-successOrfail.html?sign='+MoniJson.sign+'&&type=2'
                    }
                });
            };
            document.getElementById('wechat').onclick = function(e) {
                e.preventDefault();
                var orderNo= Storage.get('orderNo');
                WebViewJavascriptBridge.callHandler('payPlaneTicket', {'orderNo':orderNo,'payChannel':'02'},function(response) {
                    // alert(response);
                    if(response.info==0){
                        self.location.href='../pages/air-successOrfail.html?sign='+MoniJson.sign+'&&type=1'
                    }else{
                        self.location.href='../pages/air-successOrfail.html?sign='+MoniJson.sign+'&&type=2'
                    }
                });
            }
        });
    },
    clear_storage:function(){
        Storage.remove('json_plane_order_personInfo');
        Storage.remove('air-pay-data');
        Storage.remove('json_plane_back');
        Storage.remove('json_plane_go_index');
        Storage.remove('json_plane');
    }

};
$(function () {
    page.init();
});
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
};
