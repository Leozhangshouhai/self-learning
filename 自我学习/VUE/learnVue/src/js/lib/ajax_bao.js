/**
 * Created by leo on 2017/1/12.
 */

var Ajax_accessTicket='';
var hmp_website_Ip='';

function Ajax_json(json) {
    function createparam(param) {
        var appid = "BAS5-520100-0001";
        var sign = '02e45ae192526ce470d8352e7403134a92526ce470d8352e';
        var req = {
            "body": param,
            "head": {
                'siteid ':'520100',
                "sign": sign,
                "appid": appid,
                "version": '2.0',
                'appversion':'1.0.0'
            }
        }
        return req;
    };
    var param = createparam(json.parameters);
    $.ajax({
        url: json.url,
        // contentType: "application/x-www-form-urlencoded; charset=utf-8",
        type: "post",
        data: param,
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

