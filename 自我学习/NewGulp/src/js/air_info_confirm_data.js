/**
 * Created by leo on 2017/3/3.
 */
$(function () {
    air_info_confirm.plane_json = Storage.get('json_plane_order_personInfo');
    page.init();


});
//数据以及数据交互
var air_info_confirm = {
    create_order: {
        url: 'http://118.178.225.32/hmp_website/yiplain/getpolicyandcreateorder.json',
        parameters: {
            //type: '2',
            //scity: 'CTU',
            //ecity: 'HGH',
            //date: '2017-03-10',
            //firstAirco: 'EU',
            //firstFlightNo: '2205',
            //firstAirCabin: 'E',
            //firstFlightStartTime: "07:05",
            //firstFlightEndTime: "11:05",
            //firstTerminal: "T2,--",
            //firstcabinPrice: "850.0",
            //firstfuelPrice: '0.0',
            //firsttaxPrice: "50.0",
            //passengersarr: '我货|1|510125198305080916|15838316742|1988-08-06|0|1|0|',
            //contactCellPhone: '13558821507',
            //contactName: '里请',
            //secondAirco: "GJ",
            //secondFlightNo: "8777",
            //secondAirCabin: "V",
            //secondFlightStartTime: "16:45",
            //secondFlightEndTime: "21:15",
            //secondTerminal: "T3,T2",
            //secondcabinPrice: "850.0",
            //secondfuelPrice: "0.0",
            //secondtaxPrice: "50.0",
            //date_back: "2017-03-12"
        },
        success: function (data) {
            console.log(data);
            popup.loading_dis();
            if(data.head.rtnCode=='000000'){
                Storage.set('air-pay-data',data);
                self.location.href='../pages/air-pay.html';
            }else{
              ZSH_Extent.createLoading('订单创建失败，请确保信息正确');
              $('#popup').hide();
            }

        },
        error:function(data){
            ZSH_Extent.createLoading('订单创建失败，请确保信息正确');
            $('#popup').hide();

        }
    }
};
var page = {
    init: function () {
        this.data_bind();
        this.radio_click();
        this.add_infoBox();
        this.get_fee();
        this.regular_verify();
        this.check_submit();
        this.submit_click();
    },
    regular_express: {
        phone: function (s) {
            var str = s;
            var reg = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
            if (reg.test(str)) {
                return true;
            } else {
                return false;
            }
        },
        idCard: function (idcard, type) {
            var reg, reg1;
            var tag;
            //  type==3  返回TRUE  则是不验证军官证
            if(type==3){
                return true;
            }
            switch (type) {
                case '1':
                    reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
                    tag = reg.test(idcard);
                    break;
                case '2':
                    reg = /^[a-zA-Z]{5,17}$/;
                    reg1 = /^[a-zA-Z0-9]{5,17}$/;
                    tag = (reg.test(idcard) || reg1.test(idcard));
                    break;
                case '3':
                    reg = /南字第(\d{8})号|北字第(\d{8})号|沈字第(\d{8})号|兰字第(\d{8})号|成字第(\d{8})号|济字第(\d{8})号|广字第(\d{8})号|海字第(\d{8})号|空字第(\d{8})号|参字第(\d{8})号|政字第(\d{8})号|后字第(\d{8})号|装字第(\d{8})号/
                    idcard = idcard.replace(/(^\s*)|(\s*$)/g, "");
                    tag = reg.test(idcard);
                    break;
                case '4':
                    reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
                    tag = reg.test(idcard);
                    break;
                default :
                    break;
            }

            if (reg.test(idcard) === false) {
                return false;
            }
            return true;
        },
        name: function (name) {
            var reg_C = /^[\u4e00-\u9fa5 ]{2,20}$/;
            var reg_E = /^[a-z\/ ]{2,20}$/i;
            if (reg_C.test(name) == true || reg_E.test(name) == true) {
                return true;
            }
            return false;
        }
    },
    submit_click: function () {
        // 去程费用计算
        $('.air-make-sure-box').on('click', function () {
            var type = '1';
            var passenger_info_arr = person_info_change_string();
            //解析身份信息--字符串
            function person_info_change_string() {
                var str = '';
                var $father = $('#text-box-idCard-box');
                for (var i = 0; i < $father.find('li').length; i++) {
                    var $son = $($father.find('li')[i]);
                    var passenger_name = $son.find('.passenger-name').find('.info_content_input').val(),//姓名
                        card_kind = $son.find('.card-kind option:selected').attr('data-type'),//证件类别
                        passenger_code = $son.find('.passenger-code').find('.info_content_input').val(),//证件号码
                        passenger_phone = $son.find('.passenger-phone').find('.info_content_input').val(),//电话
                        birthday = '',
                        sex_kind = $son.find('.sex-kind option:selected').attr('data-type'),//性别
                        accident = $('.text-box-baoxian-img').first().attr('choose') == 'false' ? '0' : '1',//是否购买意外险
                        delay = $('.text-box-baoxian-img').last().attr('choose') == 'false' ? '0' : '1';//是否购买延误险
                    if (card_kind == '1') {
                        //    为身份证的情况
                        if (passenger_code.length == '18') {
                            //18位号码时情况
                            birthday = passenger_code.substr(6, 4) + '-' + passenger_code.substr(10, 2) + '-' + passenger_code.substr(12, 2);
                        } else {
                            //    15位号码时情况
                            birthday = '19' + passenger_code.substr(6, 2) + '-' + passenger_code.substr(8, 2) + '-' + passenger_code.substr(10, 2);

                        }
                    } else {
                        var birthday_arr = $son.find('.info_content_input_birthday').find('input');
                        var month = $(birthday_arr[1]).val().length == 2 ? $(birthday_arr[1]).val() : ('0' + $(birthday_arr[1]).val());
                        var day = $(birthday_arr[2]).val().length == 2 ? $(birthday_arr[2]).val() : ('0' + $(birthday_arr[2]).val());
                        birthday = $(birthday_arr[0]).val() + '-' + month + '-' + day;
                    }
                    str += passenger_name + '|' + card_kind + '|' + passenger_code + "|" + passenger_phone + "|" + birthday + '|' + sex_kind + '|' + delay + '|' + accident + '|';
                    if (i != $father.find('li').length - 1) {
                        str += ',';
                    }
                }
                return str;
            }
            //去程参数声明
            air_info_confirm.create_order.parameters = {
                type: type,
                scity: air_info_confirm.plane_json.go.plane_info.originCode,
                ecity: air_info_confirm.plane_json.go.plane_info.arriveCode,
                date: air_info_confirm.plane_json.go.plane_info.takeOffDate,
                firstAirco: air_info_confirm.plane_json.go.plane_info.airCode,
                firstFlightNo: air_info_confirm.plane_json.go.plane_info.flightNo,
                firstAirCabin: air_info_confirm.plane_json.go.plane_info.cabinSeatList.cabinSeatCode,
                firstFlightStartTime: air_info_confirm.plane_json.go.plane_info.takeOffTime,
                firstFlightEndTime: air_info_confirm.plane_json.go.plane_info.arriveOffTime,
                firstTerminal: air_info_confirm.plane_json.go.plane_info.terminal,
                firstcabinPrice: air_info_confirm.plane_json.go.plane_info.cabinSeatList.cabinSeatPrice,
                firstfuelPrice: air_info_confirm.plane_json.go.plane_info.cabinSeatList.fuelPrice,
                firsttaxPrice: air_info_confirm.plane_json.go.plane_info.cabinSeatList.taxPrice,
                passengersarr: passenger_info_arr,
                contactCellPhone: $('#contact-phone').find('.info_content_input').val(),
                contactName: $('#contact-name').find('.info_content_input').val()
            };
            // 往返程则增加返程数据;
            if (air_info_confirm.plane_json.back) {
                air_info_confirm.create_order.parameters.type = '2';
                air_info_confirm.create_order.parameters.secondAirco = air_info_confirm.plane_json.back.plane_info.airCode;
                air_info_confirm.create_order.parameters.secondFlightNo = air_info_confirm.plane_json.back.plane_info.flightNo;
                air_info_confirm.create_order.parameters.secondAirCabin = air_info_confirm.plane_json.back.plane_info.cabinSeatList.cabinSeatCode;
                air_info_confirm.create_order.parameters.secondFlightStartTime = air_info_confirm.plane_json.back.plane_info.takeOffTime;
                air_info_confirm.create_order.parameters.secondFlightEndTime = air_info_confirm.plane_json.back.plane_info.arriveOffTime;
                air_info_confirm.create_order.parameters.secondTerminal = air_info_confirm.plane_json.back.plane_info.terminal;
                air_info_confirm.create_order.parameters.secondcabinPrice = air_info_confirm.plane_json.back.plane_info.cabinSeatList.cabinSeatPrice;
                air_info_confirm.create_order.parameters.secondfuelPrice = air_info_confirm.plane_json.back.plane_info.cabinSeatList.fuelPrice;
                air_info_confirm.create_order.parameters.secondtaxPrice = air_info_confirm.plane_json.back.plane_info.cabinSeatList.taxPrice;
                air_info_confirm.create_order.parameters.date_back = air_info_confirm.plane_json.back.plane_info.takeOffDate;
            }
            console.log(air_info_confirm.create_order);
            popup.loading_show();
            Ajax_json(air_info_confirm.create_order);
        })

    },
    check_textNull:function(){
      var s=  $.makeArray($('.text-box-one')).every(function(e){
          if($(e).hasClass('passenger-birthday')){
              return true;
          }
          return $(e).find('input').val()!=''
        });
  return s;
    },
    check_submit: function () {
        var $arr = $('.info_content_error');
        for (var i = 0; i < $arr.length; i++) {
            if ($($arr[i]).css('display') != 'none') {

                break;
            }
            if (i == $arr.length - 1) {
                return true
            }
        }

        return false;


    },
    regular_verify: function () {
        $('.info_content_input').on('blur', function () {
            if ($(this).attr('name') == 'conName') {
                if (page.regular_express.name($(this).val())) {
                    $(this).siblings('.info_content_error').css('display', 'none');
                } else {
                    $(this).siblings('.info_content_error').css('display', 'inline');
                }
            } else if ($(this).attr('name') == 'phone') {
                if (page.regular_express.phone($(this).val())) {
                    $(this).siblings('.info_content_error').css('display', 'none');
                } else {
                    $(this).siblings('.info_content_error').css('display', 'inline');

                }
            } else if ($(this).attr('name') == 'idCard') {
                if (page.regular_express.idCard($(this).val(), $(this).parents('.passenger-code').prev('.id-card').find('.card-kind option:selected').attr('data-type'))) {
                    $(this).siblings('.info_content_error').css('display', 'none');
                } else {
                    $(this).siblings('.info_content_error').css('display', 'inline');


                }
            }
            // 是否禁用提交按钮

            if (page.check_submit()&& page.check_textNull()) {
                $('.air-make-sure-box').css({
                    'background': '#0077DB',
                    'color': 'white'
                }).attr('disabled', false);
            } else {
                $('.air-make-sure-box').css({
                    'background': '#e6e6e6',
                    'color': '#646464'
                }).attr('disabled', true);
            }

        });
        $('.info_content_input_birthday').find('input').on('blur', function () {
            var _this = this;
            if (!judge(_this)) {
                $('.info_content_input_birthday').next('.info_content_error').show();
            } else {
                var inputarr = $('.info_content_input_birthday').find('input');
                if ($(inputarr[0]).attr('verify') == '1' && $(inputarr[1]).attr('verify') == '1' && $(inputarr[2]).attr('verify') == '1') {
                    $('.info_content_input_birthday').next('.info_content_error').hide();
                }
            }

            function judge(_this) {
                if ($(_this).attr('name') == 'year') {
                    if (Number($(_this).val()) >= 1900 && Number($(_this).val()) <= 2000) {
                        $(_this).attr('verify', '1');
                        return true;
                    } else {
                        $(_this).attr('verify', '0');
                        return false;
                    }

                } else if ($(_this).attr('name') == 'month') {
                    if ($(_this).val() >= 1 && $(_this).val() <= 12) {
                        $(_this).attr('verify', '1');
                        return true;
                    } else {
                        $(_this).attr('verify', '0');
                        return false;
                    }

                } else if ($(_this).attr('name') == 'day') {
                    if ($(_this).val() >= 1 && $(_this).val() <= 31) {
                        $(_this).attr('verify', '1');
                        return true;
                    } else {
                        $(_this).attr('verify', '0');
                        return false;
                    }

                }
            }
        })
    },
    get_fee: function () {
        var json_accident = {
            url: 'http://118.178.225.32/hmp_website/yiplain/getinsuranceprice.json',
            parameters: {
                type: '20'
            },
            success: function (data) {
                $($('.text-box-baoxian').find('.text-box-baoxian-money')[0]).html(data.body);
            }
        };
        var json_delay = {
            url: 'http://118.178.225.32/hmp_website/yiplain/getinsuranceprice.json',
            parameters: {
                type: '21'
            },
            success: function (data) {
                $($('.text-box-baoxian').find('.text-box-baoxian-money')[1]).html(data.body);
            }
        };
        Ajax_json(json_accident);
        Ajax_json(json_delay);
    },
    data_bind: function () {
        $('.header-chufa').html(air_info_confirm.plane_json.go.city);
        $('.header-daoda').html(air_info_confirm.plane_json.go.ecity);
        var $go_contentBox_dd = $('#go_contentBox_dd');
        $go_contentBox_dd.find('.go_contentBox_dd_date').html(air_info_confirm.plane_json.go.data.split('-')[1] + '月' + air_info_confirm.plane_json.go.data.split('-')[2] + '日')
        $go_contentBox_dd.find('.go_contentBox_dd_time').html(air_info_confirm.plane_json.go.plane_info.takeOffTime);
        $go_contentBox_dd.find('.go_contentBox_dd_money').html(air_info_confirm.plane_json.go.plane_info_seat.cabinSeatPrice);
        $('.air-info-otherfree-content-money').html(Number(air_info_confirm.plane_json.go.plane_info_seat.taxPrice) + Number(air_info_confirm.plane_json.go.plane_info_seat.fuelPrice));
        if (air_info_confirm.plane_json.back) {
            var $back_contentBox_dd = $('#back_contentBox_dd');
            $back_contentBox_dd.fadeIn(100);
            $back_contentBox_dd.find('.go_contentBox_dd_date').html(air_info_confirm.plane_json.back.data.split('-')[1] + '月' + air_info_confirm.plane_json.back.data.split('-')[2] + '日')
            $back_contentBox_dd.find('.go_contentBox_dd_time').html(air_info_confirm.plane_json.back.plane_info.takeOffTime);
            $back_contentBox_dd.find('.go_contentBox_dd_money').html(air_info_confirm.plane_json.back.plane_info_seat.cabinSeatPrice);
            var fee = Number(air_info_confirm.plane_json.go.plane_info_seat.taxPrice) + Number(air_info_confirm.plane_json.go.plane_info_seat.fuelPrice) +
                Number(air_info_confirm.plane_json.back.plane_info_seat.taxPrice) + Number(air_info_confirm.plane_json.back.plane_info_seat.fuelPrice)
            $('.air-info-otherfree-content-money').html(fee);
        }
    },
    radio_click: function () {
        //单选按钮点击切换事件
        $('.text-box-baoxian-img,.air-info-otherfree-agreement-left-img').on('click', function () {
            if ($(this).attr('choose') == 'true') {
                $(this).attr('src', '../img/air/air-info-3.png').attr('choose', 'false');
            } else {
                $(this).attr('src', '../img/air/air-info-2.png').attr('choose', 'true');
            }
        })
    },
    add_infoBox: function () {
        $('.text-box-idCard-add').on('click', function () {
            var fee = $('.air-info-otherfree-content').find('.air-info-otherfree-content-money').first().html(),
                fee_ave = parseInt(fee / $('#text-box-idCard-box').find('li').length);
            $('.air-info-otherfree-content').find('.air-info-otherfree-content-money').first().html(Number(fee) + fee_ave);
            add();

        });
        $('.text-box-idCard-reduce').on('click', function () {
            var fee = $('.air-info-otherfree-content').find('.air-info-otherfree-content-money').first().html(),
                fee_ave = parseInt(fee / $('#text-box-idCard-box').find('li').length);
            $('.air-info-otherfree-content').find('.air-info-otherfree-content-money').first().html(Number(fee) - fee_ave);
            $(this).parents('.text-box-idCard').remove();
        });
        function add() {
            var $li = $('<li class="text-box-idCard">' +
            '<div class="text-box-one passenger-name">' +
            '<span class="info_content_left">乘机人</span>' +
            '<input class="info_content_input" name="conName" type="text" value="" placeholder="乘机人姓名"/>' +
            '<span class="info_content_error">*输入有误,请重新输入</span>' +
            '</div>' +
            '<div class="text-box-one passenger-sex">' +
            '<span class="info_content_left">性别</span>' +
            '<span class="info_content_input id-kind">' +
            '<select  class="info_content_input_select sex-kind">' +
            '<option value="" class="info_content_input_select_option" data-type="0">男</option>' +
            '<option value="" class="info_content_input_select_option" data-type="1">女</option>' +
            '</select>' +
            '</span>' +
            '</div>' +
            '<div class="text-box-one id-card">' +
            '<span class="info_content_left">证件类型</span>' +
            '<span class="info_content_input id-kind">' +
            '<select name=""  class="info_content_input_select card-kind">' +
            '<option value="" class="info_content_input_select_option" data-type="1">身份证</option>' +
            '<option value="" class="info_content_input_select_option" data-type="2">护照</option>' +
            '<option value="" class="info_content_input_select_option" data-type="3">军官证</option>' +
            '<option value="" class="info_content_input_select_option" data-type="4">驾驶证</option>' +
            '</select></span>' +
            '</div>' +
            '<div class="text-box-one passenger-code">' +
            '<span class="info_content_left">证件号码</span>' +
            '<input class="info_content_input" type="text" name="idCard" value="" placeholder="必须和乘机人一致"/>' +
            '<span class="info_content_error">*输入有误,请重新输入</span>' +
            '</div>' +
            '<div class="text-box-one passenger-birthday">' +
            '<span class="info_content_left">出生日期</span>' +
            '<span class="info_content_input  info_content_input_birthday">' +
            '<input type="text" value="" placeholder="年" name="year"/>/<input type="text" placeholder="月" name="month"/>' +
            '/<input type="text" placeholder="日" name="day"/>' +
            '</span>' +
            '<span class="info_content_error">*输入有误,请重新输入</span>' +
            '</div>' +
            '<div class="text-box-one  passenger-phone">' +
            '<span class="info_content_left">手机号码</span>' +
            '<input class="info_content_input" name="phone" type="text" value="" placeholder="请输入手机号码"/>' +
            '<span class="info_content_error">*输入有误,请重新输入</span>' +
            '</div>' +
            '<div class="text-box-idCard-addAndreduce">' +
            '<img src="../img/air/air-info-add.png" alt="加号" class="text-box-idCard-add"/>' +
            '<img src="../img/air/air-info-reduce.png" alt="减号" class="text-box-idCard-reduce"/>' +
            '</div>' +
            '</li>');

            $('#text-box-idCard-box').prepend($li);
            //移除焦点事件
            $('.info_content_input').off('blur');
            $('.card-kind').off('change');
            //**********************增加 失去焦点事件，
            page.regular_verify();
            birthday_show();

            $li.find('.text-box-idCard-add').on('click', function () {
                var fee = $('.air-info-otherfree-content').find('.air-info-otherfree-content-money').first().html(),
                    fee_ave = parseInt(fee / $('#text-box-idCard-box').find('li').length);
                $('.air-info-otherfree-content').find('.air-info-otherfree-content-money').first().html(Number(fee) + fee_ave);
                add();
            });
            $li.find('.text-box-idCard-reduce').on('click', function () {
                var fee = $('.air-info-otherfree-content').find('.air-info-otherfree-content-money').first().html(),
                    fee_ave = parseInt(fee / $('#text-box-idCard-box').find('li').length);
                $('.air-info-otherfree-content').find('.air-info-otherfree-content-money').first().html(Number(fee) - fee_ave);
                $(this).parents('.text-box-idCard').remove();

            });
        }

        function birthday_show() {
            $('.card-kind').change(function () {
                if ($(this).find('option:selected').attr('data-type') == '1') {
                    $(this).parents('.id-card').siblings('.passenger-birthday').find('.info_content_error').hide();
                    $(this).parents('.id-card').siblings('.passenger-birthday').hide().find('input').val('');
                } else {
                    $(this).parents('.id-card').siblings('.passenger-birthday').show();
                }
            })
        }

        //  初始化增加出生日的事件
        birthday_show();
    }
}

var popup={
    loading_show:function(){
   $('#popup').fadeIn(300);

    },
    loading_dis:function(){
        $('#popup').fadeOut(300);
    }
};
