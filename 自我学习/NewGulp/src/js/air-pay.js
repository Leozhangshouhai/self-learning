/**
 * Created by leo on 2017/1/9.
 */
$(function () {
    css_right();
    $('#whole').css('visibility', 'visible');
    //  获取订单信息
    air_pay_data.pay_info = Storage.get('air-pay-data');
    air_pay_data.plane_information_json = Storage.get('json_plane_order_personInfo');
    air_pay_data.init();
    page.click_init();
    page.pay_way();
});
// 部分CSS 样式修正
function css_right() {
    var padding = parseInt($('.airtickets-show-dd-star').css('height')) - $('.airtickets-show-dd-timelong').height();
    var padding_top = padding / 2;
    $('.airtickets-show-dd-timelong').css({
        'padding-top': padding_top + 'px',
        'padding-bottom': padding_top + 'px'
    })
};

var air_pay_data = {
    pay_info: {},
    plane_information_json: {},
    sign: 1,
    init: function () {
        this.data_binding();
    },
    data_binding: function () {
        console.log(this.plane_information_json.go);
        console.log(this.pay_info);
        //  初始化绑定
        $('.info-show-title-add').html(this.plane_information_json.go.city + '-' + this.plane_information_json.go.ecity);
        $('.info-show-title-name').html('单程');
        var timearr = this.plane_information_json.go.data.split('-');
        var $go = $('#popup-detail-title-go');
        var $goAllFee = this.pay_info.body.orderDetail[0].cabinprice;
        var $goFee = Number(this.pay_info.body.orderDetail[0].fuleprice) + Number(this.pay_info.body.orderDetail[0].taxprice);
        // $('.info-show-price').html('￥' + (Number($goAllFee) + $goFee));
        $('.info-show-price').html('￥' + this.pay_info.body.mainOrderVO.orderMoney);
        $go.find('.popup-detail-title-time-date').first().html(timearr[1] + '月' + timearr[2] + '日');
        $go.find('.popup-detail-title-time-price').html('￥' + Number($goAllFee) * this.pay_info.body.orderDetail[0].pcount);
        $('.oil-fee-total').html('￥' + Number($goFee) * this.pay_info.body.orderDetail[0].pcount);
        $go.find('.popup-detail-title-airline-img').attr('src', this.plane_information_json.go.plane_info.airLogo);
        $go.find('.popup-detail-title-airline').find('.popup-detail-title-airline-company').html(this.plane_information_json.go.plane_info.airName);
        $go.find('.popup-detail-title-time-airline-name').html(this.plane_information_json.go.plane_info.airCode + this.plane_information_json.go.plane_info.flightNo);
        $go.find('.popup-detail-title-counter').find('.popup-detail-title-time-name').html(this.plane_information_json.go.plane_info.checkBar == '' ? '无' : this.plane_information_json.go.plane_info.checkBar);
        $go.find('.popup-detail-title-airline').find('.popup-detail-title-airline-box')
            .find('.airtickets-show-dd-star').find('.airtickets-show-dd-star-time')
            .html(this.plane_information_json.go.plane_info.takeOffTime)
            .siblings('.airtickets-show-dd-start-add')
            .html(this.plane_information_json.go.plane_info.originCityName + this.plane_information_json.go.plane_info.terminal.split(',')[0]);
        $go.find('.popup-detail-title-airline')
            .find('.popup-detail-title-airline-box')
            .find('.airtickets-show-dd-timelong')
            .find('.airtickets-show-dd-time-long')
            .html(this.plane_information_json.go.plane_info.timediff);
        $go.find('.popup-detail-title-airline').find('.popup-detail-title-airline-box')
            .find('.airtickets-show-dd-end').find('.airtickets-show-dd-star-time')
            .html(this.plane_information_json.go.plane_info.arriveOffTime)
            .siblings('.airtickets-show-dd-start-add')
            .html(this.plane_information_json.go.plane_info.arriveCityName + this.plane_information_json.go.plane_info.terminal.split(',')[1]);
        if (this.plane_information_json.back) {
            this.sign = 2;
            $('.info-show-title-name').html('往返');
            var $back = $('#popup-detail-title-back');
            $back.fadeIn(300);
            $back.find('.popup-detail-title-time-date').html(timearr[1] + '月' + timearr[2] + '日');
            $back.find('.popup-detail-title-airline-img').attr('src', this.plane_information_json.back.plane_info.airLogo);
            $back.find('.popup-detail-title-airline').find('.popup-detail-title-airline-company').html(this.plane_information_json.back.plane_info.airName);
            $back.find('.popup-detail-title-time-airline-name').html(this.plane_information_json.back.plane_info.airCode + this.plane_information_json.back.plane_info.flightNo);
            $back.find('.popup-detail-title-counter').find('.popup-detail-title-time-name').html(this.plane_information_json.back.plane_info.checkBar == '' ? '无' : this.plane_information_json.go.plane_info.checkBar);
            $back.find('.popup-detail-title-airline').find('.popup-detail-title-airline-box')
                .find('.airtickets-show-dd-star').find('.airtickets-show-dd-star-time')
                .html(this.plane_information_json.back.plane_info.takeOffTime)
                .siblings('.airtickets-show-dd-start-add')
                .html(this.plane_information_json.back.plane_info.originCityName + this.plane_information_json.back.plane_info.terminal.split(',')[0]);
            $back.find('.popup-detail-title-airline')
                .find('.popup-detail-title-airline-box')
                .find('.airtickets-show-dd-timelong')
                .find('.airtickets-show-dd-time-long')
                .html(this.plane_information_json.back.plane_info.timediff);
            $back.find('.popup-detail-title-airline').find('.popup-detail-title-airline-box')
                .find('.airtickets-show-dd-end').find('.airtickets-show-dd-star-time')
                .html(this.plane_information_json.back.plane_info.arriveOffTime)
                .siblings('.airtickets-show-dd-start-add')
                .html(this.plane_information_json.back.plane_info.arriveCityName + this.plane_information_json.back.plane_info.terminal.split(',')[1]);
        }
        if (this.plane_information_json.back) {
            var $backFee = Number(this.pay_info.body.orderDetail[1].fuleprice) + Number(this.pay_info.body.orderDetail[1].taxprice);
            var $backAllFee = this.pay_info.body.orderDetail[1].cabinprice;
            $back.find('.popup-detail-title-time-price').html('￥' + ((Number($backAllFee) + Number($goAllFee)) * this.pay_info.body.orderDetail[0].pcount));
            $('.oil-fee-total').html('￥' + (Number($goFee) + $backFee) * this.pay_info.body.orderDetail[0].pcount);

        }
        //计算延误保险费，意外保险费
        if (this.pay_info.body.delayamount) {
            $('.fee-delay').html('￥' + this.pay_info.body.delayamount + '(' + this.pay_info.body.delaynum + '份)');
        } else {
            $('.oil-fee-box').eq(1).hide();
        }
        if (this.pay_info.body.accidentamount) {
            $('.fee-accident').html('￥' + this.pay_info.body.accidentamount + '(' + this.pay_info.body.accidentnum + '份)');
        } else {
            $('.oil-fee-box').eq(2).hide();
        }
        if (this.pay_info.body.mailmoney == '0') {
            $('.oil-fee-box').eq(3).hide();
        } else {
            $('.fee-post').html('￥' + this.pay_info.body.mailmoney);
        }

    }
};
var page = {

    click_init: function () {
        $('#make-sure').on('click', function () {
            //$('.popup').fadeOut(300);
            $('.popup').css('z-index', -10);
        });
        $('.info-show-price-detail').click(function () {

            $('.popup').css('z-index', 110);

        })
    },
    pay_way: function () {
        Storage.set('orderNo', air_pay_data.pay_info.body.mainOrderVO.orderNo);
        document.getElementById('AliPay').onclick = function (e) {
            e.preventDefault();
            var orderNo = air_pay_data.pay_info.body.mainOrderVO.orderNo;
            WebViewJavascriptBridge.callHandler('payPlaneTicket', {
                'orderNo': orderNo,
                'payChannel': '01'
            }, function (response) {
                var res = JSON.parse(response);
                if (res.info.resultStatus == '9000') {
                    self.location.href = '../pages/pay-successOrfail.html?sign=' + air_pay_data.sign + '&&type=1'
                } else {
                    self.location.href = '../pages/pay-successOrfail.html?sign=' + air_pay_data.sign + '&&type=2'
                }
            })
        };
        document.getElementById('wechat').onclick = function (e) {
            e.preventDefault();
            var orderNo = air_pay_data.pay_info.body.mainOrderVO.orderNo;
            WebViewJavascriptBridge.callHandler('payPlaneTicket', {
                'orderNo': orderNo,
                'payChannel': '02'
            }, function (response) {

                var res = JSON.parse(response);
                if (res.info == 0) {
                    self.location.href = '../pages/pay-successOrfail.html?sign=' + air_pay_data.sign + '&&type=1'
                } else {
                    self.location.href = '../pages/pay-successOrfail.html?sign=' + air_pay_data.sign + '&&type=2'
                }
                log('callback', response);
            })
        }
    }
}




