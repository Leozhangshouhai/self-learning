/**
 * Created by leo on 2017/3/19.
 */



function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
            callback(WebViewJavascriptBridge)
        }, false)
    }
}

connectWebViewJavascriptBridge(function(bridge) {
    var uniqueId = 1;
    function log(message, data) {
        var log = document.getElementById('log')
        var el = document.createElement('div')
        el.className = 'logLine'
        el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
        if (log.children.length) { log.insertBefore(el, log.children[0]) }
        else { log.appendChild(el) }
    }
    bridge.init(function(message, responseCallback) {
        log('JS got a message', message)
        var data = { 'Javascript Responds':'Wee!' }
        log('JS responding with', data)
        responseCallback(data);
    });

    bridge.callHandler('getUserTicket', null, function(response) {
        alert(response);
        log('getUserTicket', response)
    });

    var getUserTicket = document.getElementById('buttons').appendChild(document.createElement('button'))
    getUserTicket.innerHTML = 'getUserTicket'
    getUserTicket.onclick = function(e) {
        e.preventDefault();
        bridge.callHandler('getUserTicket', null, function(response) {
            alert(response);
            log('getUserTicket', response)
        })

    }


    var getPhoneButton = document.getElementById('buttons').appendChild(document.createElement('button'))
    getPhoneButton.innerHTML = 'reBookPlane'
    getPhoneButton.onclick = function(e) {
        e.preventDefault()
        bridge.callHandler('reBookPlane',
            null,
            function(response) {
                alert(response);
                log('reBookPlane', response)
            })
    }


    var showExceptionWechat = document.getElementById('buttons').appendChild(document.createElement('button'))
    showExceptionWechat.innerHTML = 'wechat'
    showExceptionWechat.onclick = function(e) {
        e.preventDefault()


    }

    var showExceptionAlipay = document.getElementById('buttons').appendChild(document.createElement('button'))
    showExceptionAlipay.innerHTML = 'alipay'
    document.getElementById('choose-btn').onclick = function(e) {
        e.preventDefault();
        console.log(121121);
        bridge.callHandler('payPlaneTicket', {'orderNo':'0114889839531150342','payChannel':'01'},function(response) {
            alert(response);
            log('callback', response)
        })
    }
});
