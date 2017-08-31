/**
 * Created by leo on 2017/3/3.
 */
$(function () {
  air_info_confirm.plane_json = Storage.get('json_plane_order_personInfo');
  page.init();
  $('#container').css('visibility', 'visible');
});
//数据以及数据交互
var air_info_confirm = {
  create_order: {
    url: 'http://118.178.225.32//hmp_website/yiplain/getpolicyandcreateorder.json',
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
      //date_back: "2017-03-12"，
      // needInvoince:'',
      // invoinceaddress:'',
      // invoincename:'',
      // invoincephone:''
    },
    success: function (data) {
      console.log(data);
      popup.loading_dis();
      if (data.head.rtnCode == '000000') {
        Storage.set('air-pay-data', data);
        Storage.remove('PassengerData');
        page.Storage_last_info(); //  存储最后一次联系人
        self.location.href = '../pages/air-pay.html';
      } else {
        ZSH_Extent.createLoading(data.head.rtnMsg);
        $('#popup').hide();
      }

    },
    error: function (data) {
      console.log(data);
      ZSH_Extent.createLoading('订单创建失败，请确保信息正确');
      $('#popup').hide();

    }
  },
  json_accident: {},
  json_delay: {},
  get_initaddress: {
    url: 'http://118.178.225.32//hmp_website/user/getdefaultaddress.json',
    parameters: {},
    success: function (data) {
      console.log('获取订单成功');
      console.log(data);
      if (data.head.rtnCode === '000000') {
        var success = data.body.address;
        $('.postBoxMiddle-add').html(success.province + success.city + success.area + success.address);
        $('.postBoxMiddle-name-name').html(success.name);
        $('.postBoxMiddle-name-phone').html(success.phone);
        $('.postBoxRight-money').html('￥' + data.body.price);
        //回填联系人消息

      } else {
        //  其他情况
      }
    },
    error: function (error) {
      console.log(error);
      // 业务异常

    }
  }
};
var page = {
  init: function () {
    this.radio_click();
    this.add_infoBox();
    this.get_fee();
    this.regular_verify();
    this.check_submit();
    this.submit_click();
    this.editAddressClick();
    this.judge_special();
    Ajax_json(air_info_confirm.get_initaddress, change_Ip);
    this.check_createBtn();
    this.last_one_person();
    this.a_store();
    this.auto_set_info();
    this.data_bind();
  },
  common_fun: {
    error_input_check: function () {
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
    },
    error_birthday_check: function () {
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
    },
    dynamic_check: function (string) {
      var $errors = $('.info_content_error');
      $errors.each(function (index, e) {
        if ($(e).css('display') != 'none') {
          var string = $(e).parent().find('.info_content_input').attr('name');
          console.log($(e).parent().find('.info_content_input').attr('name'));
          var val = $(e).parent().find('.info_content_input').val();
          switch (string) {
            case 'conName':
              if (page.regular_express.name(val)) {
                $(e).css('display', 'none');
              }
              break;
            case 'phone':
              if (page.regular_express.phone(val)) {
                $(e).css('display', 'none');
              }
              break;
            case 'idCard':
              var type = $(e).parent().prev('.id-card').find('.card-kind option:selected').attr('data-type')
              if (page.regular_express.idCard(val, type)) {
                $(e).css('display', 'none');
              }
              break;
            default:
              break;

          }
        }
      });

    }
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
      if (type == 3) {
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
        case '4':
          reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
          tag = reg.test(idcard);
          break;
        case '5':
          tag = true;
          break;
        default :
          break;
      }

      if ( tag === false) {
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
        contactName: $('#contact-name').find('.info_content_input').val(),
        needInvoince: $('.content-dd-right-img-2').attr('index'),
        invoinceaddress: $('.postBoxMiddle-add').html(),
        invoincename: $('.postBoxMiddle-name-name').html(),
        invoincephone: $('.postBoxMiddle-name-phone').html()
      };
      // 往返程则增加返程数据;
      if (air_info_confirm.plane_json.hasOwnProperty("back") === true) {
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
      Ajax_json(air_info_confirm.create_order, change_Ip);
    })
  },
  check_textNull: function () {
    var s = $.makeArray($('.text-box-one')).every(function (e) {
      if ($(e).hasClass('passenger-birthday')) {
        return true;
      }
      return $(e).find('input').val() != ''
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
    $('.info_content_input').on('blur', this.common_fun.error_input_check);
    $('.info_content_input_birthday').find('input').on('blur', this.common_fun.error_birthday_check)
  },
  get_fee: function () {
    air_info_confirm.json_accident = {
      url: 'http://118.178.225.32/hmp_website/yiplain/getinsuranceprice.json',
      parameters: {
        type: '20'
      },
      success: function (data) {
        $($('.text-box-baoxian').find('.text-box-baoxian-money')[0]).html(data.body);
      }
    };
    air_info_confirm.json_delay = {
      url: 'http://118.178.225.32/hmp_website/yiplain/getinsuranceprice.json',
      parameters: {
        type: '21'
      },
      success: function (data) {
        $($('.text-box-baoxian').find('.text-box-baoxian-money')[1]).html(data.body);
      }
    };
    Ajax_json(air_info_confirm.json_accident, change_Ip);
    Ajax_json(air_info_confirm.json_delay, change_Ip);
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
    });
    $('.content-dd-right-img-2').on('click', function () {
      var index = $('.content-dd-right-img-2').attr('index');
      if (index === '1') {
        $('#baoxiao').show();
        $('.content-dd-right-img-2').attr('src', '../img/air/addNewAddress-03.png').attr('index', '0');
      } else {
        $('.content-dd-right-img-2').attr('src', '../img/air/addNewAddress-02.png').attr('index', '1');
        $('#baoxiao').hide();
      }
    });
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
        '<option value="" class="info_content_input_select_option" data-type="1">男</option>' +
        '<option value="" class="info_content_input_select_option" data-type="2">女</option>' +
        '</select>' +
        '</span>' +
        '</div>' +
        '<div class="text-box-one id-card">' +
        '<span class="info_content_left">证件类型</span>' +
        '<span class="info_content_input id-kind">' +
        '<select name=""  class="info_content_input_select card-kind">' +
        '<option value="" class="info_content_input_select_option" data-type="1">身份证</option>' +
        '<option value="" class="info_content_input_select_option" data-type="2">护照</option>' +
        '<option value="" class="info_content_input_select_option" data-type="3">其他</option>' +
        // '<option value="" class="info_content_input_select_option" data-type="3">军官证</option>' +
        // '<option value="" class="info_content_input_select_option" data-type="4">驾驶证</option>' +
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
  },
  data_story: function () {
    var Cdata = {
      contactnane: $($('.info_content_input')[0]).val() || '',
      contacttel: $($('.info_content_input')[1]).val() || '',
      postsign: $('.content-dd-right-img-2').attr('index'),
      accident: $('.text-box-baoxian-img').first().attr('choose'),
      delay: $('.text-box-baoxian-img').last().attr('choose')

    };
    var arr = [], $father = $('#text-box-idCard-box');
    for (var i = 0; i < $('#text-box-idCard-box').find('li').length; i++) {
      var $son = $($father.find('li')[i]);
      arr[i] = {
        passenger_name: $son.find('.passenger-name').find('.info_content_input').val() || '',//姓名
        card_kind: $son.find('.card-kind option:selected').attr('data-type') || '',//证件类别
        sex_kind: $son.find('.sex-kind option:selected').attr('data-type') || '',//证件类别
        passenger_code: $son.find('.passenger-code').find('.info_content_input').val() || '',//证件号码
        passenger_phone: $son.find('.passenger-phone').find('.info_content_input').val() || '',//电话
        passenger_birthday_year: $son.find('.info_content_input_birthday').find('input').eq(0).val() || '',//年份
        passenger_birthday_month: $son.find('.info_content_input_birthday').find('input').eq(1).val() || '',//月份
        passenger_birthday_day: $son.find('.info_content_input_birthday').find('input').eq(2).val() || ''//日份
      }
    }
    Cdata.passengers = arr;
    return Cdata;
  },
  editAddressClick: function () {
    $('#editAddress').on('click', function () {
      var data = page.data_story();
      Storage.set('PassengerData', data);
      self.location.href = '../pages/addressList.html?sign=special'
    })
  },
  judge_special: function () {
    if (ZSH_Extent.getPostUrl('sign') === 'special') {
      var passenger_arr = Storage.get('PassengerData');
      $($('#contact-name').find('.info_content_input')[0]).val(passenger_arr.contactnane);
      $($('#contact-name').find('.info_content_input')[1]).val(passenger_arr.contacttel);
      if (passenger_arr.accident == 'true') {
        $('.text-box-baoxian-img').first().attr({
          'choose': passenger_arr.accident,
          'src': '../img/air/air-info-2.png'
        })
      }
      if (passenger_arr.delay == 'true') {
        $('.text-box-baoxian-img').last().attr({
          'choose': passenger_arr.delay,
          'src': '../img/air/air-info-2.png'
        })
      }
      $('.content-dd-right-img-2').attr('index', passenger_arr.postsign);
      if (passenger_arr.postsign === '0') {
        $('.content-dd-right-img-2').attr('src', '../img/air/addNewAddress-03.png');
      }
      var $father = $('#text-box-idCard-box');
      $($('.info_content_input')[0]).val(passenger_arr.contactnane);
      $($('.info_content_input')[1]).val(passenger_arr.contacttel);
      for (var i = 0; i < passenger_arr.passengers.length; i++) {
        if (i + 1 < passenger_arr.passengers.length) {
          $('.text-box-idCard-add').eq(0).click();
        }
        var $son = $($father.find('li')[i]);
        $son.find('.passenger-name').find('.info_content_input').val(passenger_arr.passengers[i].passenger_name);
        $son.find('.passenger-code').find('.info_content_input').val(passenger_arr.passengers[i].passenger_code);
        $son.find('.passenger-phone').find('.info_content_input').val(passenger_arr.passengers[i].passenger_phone);
        $son.find('.info_content_input_birthday').find('input').eq(0).val(passenger_arr.passengers[i].passenger_birthday_year);
        $son.find('.info_content_input_birthday').find('input').eq(1).val(passenger_arr.passengers[i].passenger_birthday_month);
        $son.find('.info_content_input_birthday').find('input').eq(2).val(passenger_arr.passengers[i].passenger_birthday_day);
        $son.find(".card-kind").find('option').eq(Number(passenger_arr.passengers[i].card_kind) - 1).attr("selected", "selected");
        $son.find(".sex-kind").find('option').eq(Number(passenger_arr.passengers[i].sex_kind) - 1).attr("selected", "selected");
        if (passenger_arr.passengers[i].card_kind !== '1') {
          $son.find('.passenger-birthday').show();
        }
      }
    }
  },
  /*******
   * 修复最后一栏填写信息后，提交按钮恢复
   * ******/
  check_createBtn: function () {
    var clock = setInterval(function () {
      console.log(1);
      page.common_fun.dynamic_check();
      // 是否禁用提交按钮
      if (page.check_submit() && page.check_textNull()) {
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
    }, 1200);
  },
/* ***  默认回填联系人，使用第一个乘机人信息 */
  last_one_person:function () {
    $('#last_phone_input').on('blur',function(){
      var last_one=$('#text-box-idCard-box').children('li:last-child');
      var last_name=last_one.find('.info_content_input[name=conName]').val();
      var last_phone=last_one.find('.info_content_input[name=phone]').val();
       $('.text-box').find('.info_content_input[name=conName]').val(last_name);
       $('.text-box').find('.info_content_input[name=phone]').val(last_phone);
    })
  },
/* ***  乘机人信息默认使用最后一次信息 */
  Storage_last_info:function () {
    var last_info={};
    var last_one=$('#text-box-idCard-box').children('li:last-child');
    var last_name=last_one.find('.info_content_input[name=conName]').val(),
      last_phone=last_one.find('.info_content_input[name=phone]').val(),
      last_card=last_one.find('.info_content_input[name=idCard]').val(),
      last_card_kind=last_one.find('.card-kind option:selected').attr('data-type'),
      last_sex_kind=last_one.find('.sex-kind option:selected').attr('data-type'),
      last_birthday_year=last_one.find('.info_content_input_birthday input').eq(0).val(),
      last_birthday_month=last_one.find('.info_content_input_birthday input').eq(1).val(),
      last_birthday_day=last_one.find('.info_content_input_birthday input').eq(2).val(),
      last_choose_accident=$('.text-box-baoxian-img').eq(0).attr('choose'),
      last_choose_delay=$('.text-box-baoxian-img').eq(1).attr('choose');
    ;
    last_info={
      name:last_name,
      phone:last_phone,
      card:last_card,
      card_kind:last_card_kind,
      sex_kind:last_sex_kind,
      birthday_year:last_birthday_year,
      birthday_month:last_birthday_month,
      birthday_day:last_birthday_day,
      choose_accident:last_choose_accident,
      choose_delay:last_choose_delay
    };
    Storage.set('last_person_info',last_info);
    return '信息存储成功';   //提示语
  },
/* ***   初始化进入，回填乘机人和联系人  */
  auto_set_info:function () {
    var  info=Storage.get('last_person_info')||'';
    if(info===''||info===undefined){

    }else{
      var last_one=$('#text-box-idCard-box').children('li:last-child');
    last_one.find('.info_content_input[name=conName]').val(info.name);
    last_one.find('.info_content_input[name=phone]').val(info.phone);
    last_one.find('.info_content_input[name=idCard]').val(info.card);
    last_one.find('.info_content_input_birthday input').eq(0).val(info.birthday_year);
    last_one.find('.info_content_input_birthday input').eq(1).val(info.birthday_month);
    last_one.find('.info_content_input_birthday input').eq(2).val(info.birthday_day);
    $('#text-box-idCard-box').children('li:last-child').find(".sex-kind option").eq((Number(info.sex_kind)-1)).attr('selected','true');
    $('#text-box-idCard-box').children('li:last-child').find(".card-kind option").eq((Number(info.card_kind)-1)).attr('selected','true');
      $('#last_phone_input').blur();
      if(info.choose_accident=='true'){
        $('.text-box-baoxian-img').eq(0).click();
      }
      if(info.choose_delay=='true'){
        $('.text-box-baoxian-img').eq(1).click();
      }


    }


  },
  /*  a标签再做存储 */
  a_store:function () {
    $('a').on('click',function () {
      console.log(12455)
      page.Storage_last_info()
    })
  }


};
var popup = {
  loading_show: function () {
    $('#popup').fadeIn(300);
  },
  loading_dis: function () {
    $('#popup').fadeOut(300);
  }
};
function change_Ip(hmp_website_Ip) {
  air_info_confirm.create_order.url = hmp_website_Ip + 'hmp_website/yiplain/getpolicyandcreateorder.json';
  air_info_confirm.json_accident.url = hmp_website_Ip + 'hmp_website/yiplain/getinsuranceprice.json';
  air_info_confirm.json_delay.url = hmp_website_Ip + 'hmp_website/yiplain/getinsuranceprice.json';
  air_info_confirm.get_initaddress.url = hmp_website_Ip + 'hmp_website/user/getdefaultaddress.json';
}
