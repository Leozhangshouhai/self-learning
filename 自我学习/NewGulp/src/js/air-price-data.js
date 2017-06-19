///**
// * Created by leo on 2017/2/23.
// */
$(function () {
    air_price.type = ZSH_Extent.getPostUrl('type');
    air_price.sign = ZSH_Extent.getPostUrl('sign');
    fun.judge_go_And_back();

});
var fun = {
    judge_go_And_back: function () {
        var contral_sign = (air_price.type == 1 && air_price.sign == 2);
        air_price.air_json = Storage.get('json_plane');
        if (contral_sign) {
            air_price.all_plane = Storage.get('json_plane_back');
            air_price.plane_go_index=Storage.get('json_plane_go_index');
            $('.header-chufa').html(air_price.air_json.ecity);
            $('.header-daoda').html(air_price.air_json.scity + "(返程)")
            var timearr = air_price.air_json.date_back.split('-');
        } else {
            $('#popup').fadeIn(200);
            $('.header-chufa').html(air_price.air_json.scity);
            $('.header-daoda').html(air_price.air_json.ecity + "(去程)");
            var timearr = air_price.air_json.date.split('-');
        }
        // 日历初始化
        json.year = Number(timearr[0]);
        json.month = Number(timearr[1]);
        json.day = Number(timearr[2]);
        json.weekday = air_price.air_json.weekday;
        export_fun.init();
        //********
        if (contral_sign) {
            //******************
            var  temp_arr=air_price.bubbling_order(air_price.all_plane.secondFlightList,'speed');//默认时长排序
            $($('#fixed .fixed-choose-detail')[2]).html(temp_arr[temp_arr.length-1].timediff);
            temp_arr=air_price.bubbling_order(air_price.all_plane.secondFlightList,'time');//默认起飞时间排序
            $($('#fixed .fixed-choose-detail')[1]).html(temp_arr[temp_arr.length-1].takeOffTime);
             temp_arr=air_price.bubbling_order(air_price.all_plane.secondFlightList,'price');//默认价格排序
            air_price.date_bind(temp_arr);
            $($('#fixed .fixed-choose-detail')[0]).html(temp_arr[temp_arr.length-1].cabinSeatList[0].cabinSeatPrice);
            $('#container').show(200);
            $('#fixed').show(200);
            page.change_click();
        } else {
            if (air_price.air_json.type == 2) {
                air_price.get_planeInfo.parameters.type = '2';
                air_price.get_planeInfo.parameters.scity = air_price.air_json.scity_3;
                air_price.get_planeInfo.parameters.ecity = air_price.air_json.ecity_3;
                air_price.get_planeInfo.parameters.date = air_price.air_json.date;
                air_price.get_planeInfo.parameters.date_back = air_price.air_json.date_back;
            } else if (air_price.air_json.type == 1) {
                air_price.get_planeInfo.parameters.type = '1';
                air_price.get_planeInfo.parameters.scity = air_price.air_json.scity_3;
                air_price.get_planeInfo.parameters.ecity = air_price.air_json.ecity_3;
                air_price.get_planeInfo.parameters.date = air_price.air_json.date;
            }
            Ajax_json(air_price.get_planeInfo,change_Ip);
        }

    }
}
//  页面日期初始外部函数调用
var export_fun = {
    init: function () {
        calendar.init(json);
        page.time_show();
    }
}

var air_price = {
    air_json: '',//存储上一个页面传过来的信息，（日期，城市，机场3字码）
    type: '',
    all_plane: {},
    // 数据排序  
    order_by_price: function (firstPrice, secondPrice) {

        if (parseFloat(firstPrice) >= parseFloat(secondPrice)) {
            return true;
        } else {
            return false;
        }
    },
    order_by_time: function (startTime, endTime) {
        //"23:00" 开始时间大于结束时间，true；
        var start_time = startTime.substring(0, 2) * 60 * 60 + startTime.substring(3, 5) * 60;
        var end_time = endTime.substring(0, 2) * 60 * 60 + endTime.substring(3, 5) * 60;
        if (start_time >= end_time) {
            return true;
        } else {
            return false;
        }
    },
    order_by_speed: function (firstTimeLong, secondTimeLong) {
        // 第一时间大于第二时间，返回TRUE，or false
        var first_s = firstTimeLong.split('小时');
        var second_s = secondTimeLong.split('小时');
        var first_time = parseInt(first_s[0]) * 60 + parseInt(first_s[1]);
        var second_time = parseInt(second_s[0]) * 60 + parseInt(second_s[1]);
        if (first_time >= second_time) {
            return true;
        } else {
            return false;
        }
    },
    //冒泡算法
    bubbling_order: function (data,sign) {
        var i, j, temp;
        var arr=data;
        if(sign=='price'){
            for (i = 0; i < arr.length; i++) {
                if(i==arr.length-1){
                    break;
                }
                for (j = i + 1; j < arr.length; j++) {
                    if (air_price.order_by_price(arr[i].cabinSeatList[0].cabinSeatPrice,arr[j].cabinSeatList[0].cabinSeatPrice)) {
                    } else {
                        temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
        }else if(sign=='time'){
            for (i = 0; i < arr.length; i++) {
                if(i==arr.length-1){
                    break;
                }
                for (j = i + 1; j < arr.length; j++) {
                    if (air_price.order_by_time(arr[i].takeOffTime,arr[j].takeOffTime)) {

                    } else {
                        temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
        }else if(sign=='speed'){
            for (i = 0; i < arr.length; i++) {
                if(i==arr.length-1){
                    break;
                }
                for (j = i + 1; j < arr.length; j++) {
                    if (air_price.order_by_speed(arr[i].timediff,arr[j].timediff)) {

                    } else {
                        temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;

                    }
                }
            }
        }
       return arr;

    },
    date_bind: function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].cabinSeatList.length > 0) {
                var src = data[i].airLogo;
                var $demo = $("<dd class='airtickets-show-dd'><div class='airtickets-show-dd-box'>" +
                "<p class='airtickets-show-dd-name'>" + data[i].airName +"&nbsp;&nbsp;"+ data[i].airCode+ data[i].flightNo+"</p>" +
                "<div class='airtickets-show-dd-logo'>" +
                "<img src=" + src + " alt='航空logo'/></div>" +
                "<div class='airtickets-show-dd-star'>" +
                "<span class='airtickets-show-dd-star-time'>" + data[i].takeOffTime + "</span>" +
                "<p class='airtickets-show-dd-start-add'>" + data[i].originCityName + data[i].terminal.substring(0, 2) + "</p></div>" +
                "<div class='airtickets-show-dd-timelong'><p class='airtickets-show-dd-time-long'>" + data[i].timediff + "</p></div>" +
                "<div class='airtickets-show-dd-end'><span class='airtickets-show-dd-star-time'>" + data[i].arriveOffTime + "</span>" +
                "<p class='airtickets-show-dd-start-add'>" + data[i].arriveCityName + data[i].terminal.substring(3, 5) + "</p></div>" +
                "<div class='airtickets-show-dd-price'><span class='airtickets-show-dd-price-money'>" + data[i].cabinSeatList[0].cabinSeatPrice + "</span>" +
                "<p class='airtickets-show-dd-price-sort'>" + data[i].cabinSeatList[0].cabinSeatGrade + "</p></div></div>" +
                "</dd>");
                var $demo_dl = $('<dl class="airtickets-show-dd-detail"></dl>');
                for (var j = 0; j < data[i].cabinSeatList.length; j++) {
                    var demo_dl_dd = ' <dd class="airtickets-show-dd-detail-dd" j='+j+' i='+i+ '>' +
                        '<p class="airtickets-show-dd-detail-dd-sort">' + data[i].cabinSeatList[j].cabinSeatGrade + '</p>' +
                        '<p class="airtickets-show-dd-detail-dd-money">' + data[i].cabinSeatList[j].cabinSeatPrice + '</p>' +
                        '<p class="airtickets-show-dd-detail-dd-rest">' + data[i].cabinSeatList[j].taxPrice + '(机建费)</p>' +
                        '</dd>';
                    $demo_dl.append(demo_dl_dd);
                }
                $demo.append($demo_dl);
            }
            $('#airtickets-show-dl').prepend($demo);
        }
        //    点击事件绑定
   page.binding_click();


    },
    // 去除无座位的数据
    delete_arr_null:function(data_arr,sign){
        var arr= data_arr.body.flightlist.responseData.flightData.firstFlightList;
        for(var i=0;i<arr.length;i++){
           if(arr[i].cabinSeatList.length===0){
               arr.splice(i,1);
               i--;
           }
        }
        if(sign=='2'){
            var arr_back= data_arr.body.flightlist.responseData.flightData.secondFlightList;
            for(var j=0;j<arr_back.length;j++){
                if(arr_back[j].cabinSeatList.length===0){
                    arr_back.splice(j,1);
                    j--;
                }
            }
        }
    },

    // 获取航班信息
    get_planeInfo: {
        url: 'http://118.178.225.32/hmp_website/yiplain/getplainlist.json',
        parameters: {},
        success: function (data) {
            console.log('航班信息');
            console.log(data.body.flightlist.responseData);
            if (data.head.rtnCode === '000000'&&data.body.flightlist.responseData!=null&&data.body.flightlist.responseData.flightData.firstFlightList?data.body.flightlist.responseData.flightData.firstFlightList.length>0:false) {
                air_price.delete_arr_null(data);
                air_price.all_plane.firstFlightList = data.body.flightlist.responseData.flightData.firstFlightList;
                if (data.body.type == '2') {
                    air_price.delete_arr_null(data,'2');
                    air_price.all_plane.secondFlightList = data.body.flightlist.responseData.flightData.secondFlightList;
                }
                var  temp_arr=air_price.bubbling_order(air_price.all_plane.firstFlightList,'speed');//默认时长排序
                $($('#fixed .fixed-choose-detail')[2]).html(temp_arr[temp_arr.length-1].timediff);
                temp_arr=air_price.bubbling_order(air_price.all_plane.firstFlightList,'time');//默认起飞时间排序
                $($('#fixed .fixed-choose-detail')[1]).html(temp_arr[temp_arr.length-1].takeOffTime);
                temp_arr=air_price.bubbling_order(air_price.all_plane.firstFlightList,'price');//默认价格排序
                air_price.date_bind(temp_arr);
                $($('#fixed .fixed-choose-detail')[0]).html(temp_arr[temp_arr.length-1].cabinSeatList[0].cabinSeatPrice);
                page.change_click();
                $('#popup').fadeOut(200);
                $('#container').show(200);
                $('#fixed').show(200);
                // 数据渲染
            } else {
              if($('#popup')){
                  $('#popup').hide();
              }
                ZSH_Extent.createLoading('未查寻到相应航班','error');
            }
        },
        error:function(data){
            ZSH_Extent.createLoading('未查寻到相应航班','error');
        }
    }
};
function change_Ip(hmp_website_Ip) {
    // air_price.get_planeInfo.url=hmp_website_Ip+'hmp_website/yiplain/getplainlist.json';

}




