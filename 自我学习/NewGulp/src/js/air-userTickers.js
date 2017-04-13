/**
 * Created by leo on 2017/3/20.
 */

function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
setupWebViewJavascriptBridge(function(bridge) {});
function getUserTicketClick() {
    WebViewJavascriptBridge.callHandler('getUserTicket', null, function(response) {
        // alert(response);
        console.log('tickets');
        console.log(response);
        // document.getElementById("returnValue").value = response;
        Ajax_accessTicket=JSON.parse(response).userTicket;
    })
}
getUserTicketClick();
