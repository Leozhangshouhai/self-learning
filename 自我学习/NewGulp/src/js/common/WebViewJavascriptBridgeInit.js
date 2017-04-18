/**
 * Created by leo on 2017/4/18.
 */
function setupWebViewJavascriptBridge(callback) {
    if(ZSH_Extent.judgeAndroid()){
        //                    *******************Android初始化
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                callback(WebViewJavascriptBridge)
            }, false)
        }
    }else if(ZSH_Extent.judegeIOs()){
        //*********************ios 初始化
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }


}

setupWebViewJavascriptBridge(function(bridge) {
    if(ZSH_Extent.judgeAndroid()){
        bridge.init(function(message, responseCallback) {
            var data = { 'Javascript Responds':'Wee!' }
            responseCallback(data)
        })
    }
});
function getUserTicketClick() {
    WebViewJavascriptBridge.callHandler('getUserTicket', null, function(response) {
        alert(response);
        console.log(response);
        document.getElementById("returnValue").value = response;
    })
}
function colseAndReloadListClick() {
    WebViewJavascriptBridge.callHandler('colseAndReloadList', null, function(response) {
        alert(response);
        document.getElementById("returnValue").value = response;
    });
}

function openNativeOrderListClick() {
    WebViewJavascriptBridge.callHandler('openNativeOrderList', null, function(response) {
        alert(response);
        document.getElementById("returnValue").value = response;
    });
}

function reBookPlaneClick() {
    WebViewJavascriptBridge.callHandler('reBookPlane',
        null,
        function(response) {
            alert(response);
            document.getElementById("returnValue").value = response;
        });
}

function WechatClick() {
    WebViewJavascriptBridge.callHandler('payPlaneTicket', {'orderNo':'JP2017032414231490336634340395','payChannel':'02'},function(response) {
        alert(response);
        document.getElementById("returnValue").value = response;
    });
}

function alipayClick() {
    WebViewJavascriptBridge.callHandler('payPlaneTicket', {'orderNo':'JP2017032414231490336634340395','payChannel':'01'},function(response) {
        alert(response);
        document.getElementById("returnValue").value = response;
    });
}
