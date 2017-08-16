/**
 * Created by leo on 2017/1/12.
 */

var Ajax_accessTicket='';
var hmp_website_Ip='';
function Ajax_json(json ,change_Ip) {
    function createparam(param) {
        var appid = "BAS5-520100-0001";
        var appkey = "02e45ae192526ce470d8352e7403134a92526ce470d8352e";
        var b = new Base64();
        var sign = encrypt_string(appkey, hex_md5(b.encode(appid + JSON.stringify(param))));
        if(hmp_website_Ip!='') {
            Storage.set('login.hmp_website_Ip', hmp_website_Ip);
        }
        hmp_website_Ip =hmp_website_Ip!=''?hmp_website_Ip: Storage.get('login.hmp_website_Ip');

        console.log(hmp_website_Ip);
        //执行改变ip
        change_Ip(hmp_website_Ip);
        if(Ajax_accessTicket!='') {
            Storage.set('login.accessticket', Ajax_accessTicket);
        }
        var accessTicket =Ajax_accessTicket!=''?Ajax_accessTicket: Storage.get('login.accessticket');
        // var accessTicket ='be40901c52ce4a168d6398d29a57f6f6';
        console.log('accessTicket'+accessTicket)
        var version = "2.0";
        var req = {
            "body": param,
            "head": {
                "sign": sign,
                "accessTicket": accessTicket,
                "appid": appid,
                "version": version
            }
        }
        return req;
    };
    var param = createparam(json.parameters);
    $.ajax({
        url: json.url,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        type: "post",
        data: {"data": JSON.stringify(param)},
        success: function (data) {
            if (data.head.rtnCode == '000000') {
                json.success(data);
            } else {
               if(json.error){
                   json.error(data);
               }else{
                   alert(data);
               }
            }
        }
    });
}

