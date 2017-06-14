/**
 * Created by leo on 2017/3/2.
 */
$(function () {
    air_order.information = Storage.get('json_plane_order');
    air_order.yiorderidInfo = Storage.get('yiorderidInfo');
    $('#container').fadeIn(100);
    air_order.init();
    page.make_sure();
});
var air_order = {
    init: function () {
        air_order.changeTo_plane_json();
        air_order.data_binding();
    },
    plane_information_json: {},
    yiorderidInfo:{},
    //  把上去页面的所有信息挑选出来存储为现在需要的信息
    changeTo_plane_json: function () {
        var judge = (this.information.type == '1' && this.information.sign == '2') ? true : false;//判断是往返还是单程
        this.sign = this.information.sign;
        this.type = this.information.type;
        this.plane_information_json.go = {
            data: this.information.air_json.date,
            city: this.information.air_json.scity,
            city_3: this.information.air_json.scity_3,
            plane_info: this.information.all_plane.firstFlightList[Number(this.information.plane_go_index.I)],
            plane_info_seat: this.information.all_plane.firstFlightList[Number(this.information.plane_go_index.I)].cabinSeatList[this.information.plane_go_index.J]
        };
        this.plane_information_json.go.plane_info.cabinSeatList = this.plane_information_json.go.plane_info_seat;
        this.plane_information_json.go.ecity = this.information.air_json.ecity;
        // 往返情况，增加返程信息
        if (judge) {
            this.plane_information_json.back = {
                data: this.information.air_json.date_back,
                city: this.information.air_json.ecity,
                city_3: this.information.air_json.ecity_3,
                plane_info: this.information.all_plane.secondFlightList[Number(this.information.plane_back_index.I)],
                plane_info_seat: this.information.all_plane.secondFlightList[Number(this.information.plane_back_index.I)].cabinSeatList[this.information.plane_back_index.J]
            }
            this.plane_information_json.back.plane_info.cabinSeatList = this.plane_information_json.back.plane_info_seat;
        }

    },
    data_binding: function () {
        var judge = (this.information.type == '1' && this.information.sign == '2') ? true : false;//判断是往返还是单程
        $('.header-chufa').html(this.plane_information_json.go.city);
        $('.header-daoda').html(this.plane_information_json.go.ecity);
        // 加载去程信息
        var timearr = this.plane_information_json.go.data.split('-');
        var $go = $('#popup-detail-title-go');
        $go.find('.popup-detail-title-time-date').html(timearr[1] + '月' + timearr[2] + '日');
        $go.find('.popup-detail-title-time-price').html(this.plane_information_json.go.plane_info_seat.cabinSeatPrice);
        $go.find('.popup-detail-title-airline-img').attr('src', this.plane_information_json.go.plane_info.airLogo);
        $go.find('.popup-detail-title-airline').find('.popup-detail-title-airline-company').html(this.plane_information_json.go.plane_info.airName);
        $go.find('.popup-detail-title-time-airline-name').html(this.plane_information_json.go.plane_info.airCode + this.plane_information_json.go.plane_info.flightNo);
        $go.find('.popup-detail-title-counter').find('.popup-detail-title-time-name').html(this.plane_information_json.go.plane_info.checkBar == '' ? '无' : this.plane_information_json.go.plane_info.checkBar);
        $go.find('.popup-detail-title-airline').find('.popup-detail-title-airline-box')
            .find('.airtickets-show-dd-star').find('.airtickets-show-dd-star-time')
            .html(this.plane_information_json.go.plane_info.takeOffTime)
            .siblings('.airtickets-show-dd-start-add')
            .html(this.plane_information_json.go.plane_info.originCityName + this.plane_information_json.go.plane_info.terminal.split(',')[0]);
        $go.find('.popup-detail-title-airline').find('.popup-detail-title-airline-box')
            .find('.airtickets-show-dd-end').find('.airtickets-show-dd-star-time')
            .html(this.plane_information_json.go.plane_info.arriveOffTime)
            .siblings('.airtickets-show-dd-start-add')
            .html(this.plane_information_json.go.plane_info.arriveCityName + this.plane_information_json.go.plane_info.terminal.split(',')[1]);
        //  加载返程信息
        if (judge) {
            var $back = $('#popup-detail-title-back');
            $back.fadeIn(300);
            $back.find('.popup-detail-title-time-date').html(timearr[1] + '月' + timearr[2] + '日');
            $back.find('.popup-detail-title-time-price').html(this.plane_information_json.back.plane_info_seat.cabinSeatPrice);
            $back.find('.popup-detail-title-airline-img').attr('src', this.plane_information_json.back.plane_info.airLogo);
            $back.find('.popup-detail-title-airline').find('.popup-detail-title-airline-company').html(this.plane_information_json.back.plane_info.airName);
            $back.find('.popup-detail-title-time-airline-name').html(this.plane_information_json.back.plane_info.airCode + this.plane_information_json.back.plane_info.flightNo);
            $back.find('.popup-detail-title-counter').find('.popup-detail-title-time-name').html(this.plane_information_json.back.plane_info.checkBar == '' ? '无' : this.plane_information_json.go.plane_info.checkBar);
            $back.find('.popup-detail-title-airline').find('.popup-detail-title-airline-box')
                .find('.airtickets-show-dd-star').find('.airtickets-show-dd-star-time')
                .html(this.plane_information_json.back.plane_info.takeOffTime)
                .siblings('.airtickets-show-dd-start-add')
                .html(this.plane_information_json.back.plane_info.originCityName + this.plane_information_json.back.plane_info.terminal.split(',')[0]);
            $back.find('.popup-detail-title-airline').find('.popup-detail-title-airline-box')
                .find('.airtickets-show-dd-end').find('.airtickets-show-dd-star-time')
                .html(this.plane_information_json.back.plane_info.arriveOffTime)
                .siblings('.airtickets-show-dd-start-add')
                .html(this.plane_information_json.back.plane_info.arriveCityName + this.plane_information_json.back.plane_info.terminal.split(',')[1]);
        }
        if (this.plane_information_json.back) {
            $('.air-total-fee-price').html(Number(this.plane_information_json.go.plane_info_seat.cabinSeatPrice) + Number(this.plane_information_json.back.plane_info_seat.cabinSeatPrice));
        } else {
            $('.air-total-fee-price').html(Number(this.plane_information_json.go.plane_info_seat.cabinSeatPrice));
        }
    },
    getApplyInfo: {
        url: 'http://101.37.32.245/hmp_website/yiplain/changeticketapply.json',
        parameters: {
            'flydate': '2017-01-01 ',
            'stime':'HH:mm',
            'etime':'HH:mm',
            'airco':'CA',
            'flightno':'4454',
            'applyForReason':'改签原因',
            'cabin':'Q',
            'pagname':'',
            'contactname':'张寿海',
           'contactphone':'13551801507',
            'outticketorderid':ZSH_Extent.getPostUrl('yiorderid')
        },
        success: function (data) {
            console.log(data);
            if (data.head.rtnCode === '000000') {
                // 禁止一切函数和修改
                ZSH_Extent.createLoading('改签成功','index');
            }
        },
        error:function (error) {
            console.log(error);
            ZSH_Extent.createLoading(error.msg);
        }
    }
}
var page = {
    make_sure: function () {
        if (ZSH_Extent.getPostUrl('yiorderid') !== null && ZSH_Extent.getPostUrl('yiorderid') !== 'false') {
            $('.make-sure-pay').html('改&nbsp;&nbsp;&nbsp;&nbsp;签');
        };
        $('.make-sure-pay-box').on('click', function () {
            Storage.set('json_plane_order_personInfo', air_order.plane_information_json);
            console.log(air_order.plane_information_json.go)
            if (ZSH_Extent.getPostUrl('yiorderid') != null && ZSH_Extent.getPostUrl('yiorderid') != 'false') {
                //     改签接口操作
                //    ********************
                air_order.getApplyInfo.parameters={
                    'flydate': air_order.plane_information_json.go.plane_info.takeOffDate,
                    'stime':air_order.plane_information_json.go.plane_info.takeOffTime,
                    'etime':air_order.plane_information_json.go.plane_info.arriveOffTime,
                    'airco':air_order.plane_information_json.go.plane_info.airCode,
                    'flightno':air_order.plane_information_json.go.plane_info.flightNo,
                    'applyForReason':Storage.get('endorsedReason').reasonContent||'',
                    'cabin':air_order.plane_information_json.go.plane_info_seat.cabinSeatCode,
                    'pagname':air_order.yiorderidInfo.ticketno,
                    'contactname':air_order.yiorderidInfo.contactname,
                    'contactphone':air_order.yiorderidInfo.contactphone,
                    'outticketorderid':ZSH_Extent.getPostUrl('yiorderid')
                };
                Ajax_json(air_order.getApplyInfo,change_Ip)
            } else {
                self.location.href = '../pages/air_info_confirm.html';
            }

        })
    }
};
function change_Ip(hmp_website_Ip) {
    air_order.getApplyInfo.url=hmp_website_Ip+'hmp_website/yiplain/changeticketapply.json';

}
