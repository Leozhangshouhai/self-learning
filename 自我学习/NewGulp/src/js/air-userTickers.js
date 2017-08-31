/**
 * Created by leo on 2017/3/20.
 */


function getUserTicketClick() {
       WebViewJavascriptBridge.callHandler('getUserTicket', null, function(response) {
           Ajax_accessTicket=JSON.parse(response).userTicket;
           Storage.set('login.accessticket', Ajax_accessTicket);
       });
       WebViewJavascriptBridge.callHandler('getServiceHost', null, function(response) {
           hmp_website_Ip=JSON.parse(response).serviceHost;
           console.log(response);
           console.log(hmp_website_Ip);
       });
}
setTimeout(function () {
    getUserTicketClick();
},600);








