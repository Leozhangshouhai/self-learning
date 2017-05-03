/**
 * Created by leo on 2017/3/20.
 */


function getUserTicketClick() {
   try {
       WebViewJavascriptBridge.callHandler('getUserTicket', null, function(response) {
           Ajax_accessTicket=JSON.parse(response).userTicket;
           console.log(response);
       })    ;
       WebViewJavascriptBridge.callHandler('getServiceHost', null, function(response) {
           hmp_website_Ip=JSON.parse(response).serviceHost;
           console.log(response);
           console.log(hmp_website_Ip);
       })

    }catch(e){
             var s=e;
   }


}
$(function () {
setTimeout(getUserTicketClick,800)
});
//
