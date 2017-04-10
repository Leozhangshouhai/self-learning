/**
 * Created by leo on 2017/1/12.
 */

    /*
var json = {
    url: 'http://118.178.225.32/hmp_website/yiplain/getairportlist.json',
    parameters: {
        'keywords': encodeURI("上海")
    },
    success: function (data) {
        console.log('come in');
        console.log(data);
    }
}
*/
var Ajax_accessTicket='';

function Ajax_json(json) {
    function createparam(param) {
        var appid = "BAS5-520100-0001";
        var appkey = "02e45ae192526ce470d8352e7403134a92526ce470d8352e";
        var b = new Base64();
        var sign = encrypt_string(appkey, hex_md5(b.encode(appid + JSON.stringify(param))));
        //var accessTicket = 'e37d0eb3f2ad47fab58ab698a1e77ef5';
        if(Ajax_accessTicket!='') {
            Storage.set('login.accessticket', Ajax_accessTicket);
        }
        var accessTicket =Ajax_accessTicket!=''?Ajax_accessTicket: Storage.get('login.accessticket');
        //var accessTicket ='JP2017032209001490144417606339';
console.log(accessTicket);
            //Storage.get('login.accessticket');
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

