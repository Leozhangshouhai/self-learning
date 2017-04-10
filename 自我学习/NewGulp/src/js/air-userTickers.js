/**
 * Created by leo on 2017/3/20.
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
        //var log = document.getElementById('log')
        //var el = document.createElement('div')
        //el.className = 'logLine'
        //el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
        //if (log.children.length) { log.insertBefore(el, log.children[0]) }
        //else { log.appendChild(el) }
    }
    bridge.init(function(message, responseCallback) {
        log('JS got a message', message)
        var data = { 'Javascript Responds':'Wee!' }
        log('JS responding with', data)
        responseCallback(data);
    });

    bridge.callHandler('getUserTicket', null, function(response) {
        //alert(response);
        log('getUserTicket', response)
        console.log(JSON.parse(response));
        Ajax_accessTicket=JSON.parse(response).userTicket;
    });


});