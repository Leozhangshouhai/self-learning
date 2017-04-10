/**
 * Created by leo on 2016/12/31.
 */

var page = {
    binding_click: function () {
        // 机票展示  点击事件绑定
        $('.airtickets-show-dd-box').on('click', function () {
            $(this).parent().siblings('.airtickets-show-dd').find('.airtickets-show-dd-detail').hide();
            if ($(this).siblings('.airtickets-show-dd-detail').css('display') === 'none') {
                $(this).siblings('.airtickets-show-dd-detail').show();
            } else {
                $(this).siblings('.airtickets-show-dd-detail').hide();
            }
        });
        //跳转事件
        $('.airtickets-show-dd-detail-dd').on('click', function () {
            // 如果是往返则执行2，单程就不执行
            if (air_price.sign == 2 && air_price.type == 2) {
                Storage.set('json_plane_back', air_price.all_plane);
                Storage.set('json_plane_go_index',{I:$(this).attr('i'),J:$(this).attr('j')});
                self.location.href = '../pages/air-price.html?type=1&&sign=2';
            } else {
                if((air_price.type == '1' && air_price.sign =='2' )){
                    air_price.plane_back_index={I:$(this).attr('i'),J:$(this).attr('j')};
                }else{
                    air_price.plane_go_index={I:$(this).attr('i'),J:$(this).attr('j')};
                }
                Storage.set('json_plane_order', air_price);

                self.location.href='../pages/air-order.html';
            }
        })


    },
    // 底部切换 点击事件
    change_click:function(){
        $('.fixed-choose').on('click', function () {
            var temp_arr_a;
            if((air_price.type == 1 && air_price.sign == 2)){
                //  返程信息
                $('#airtickets-show-dl').empty();
                temp_arr_a=air_price.bubbling_order(air_price.all_plane.secondFlightList,$(this).attr('name'));//默认价格排序
            }
            else{
                //  去程l
                $('#airtickets-show-dl').empty();
                temp_arr_a=air_price.bubbling_order(air_price.all_plane.firstFlightList,$(this).attr('name'));//默认价格排序
            }

            air_price.date_bind(temp_arr_a);
            $(this).addClass('choose-active').siblings('.fixed-choose')
                .removeClass('choose-active');
        })
    },
    time_show: function () {
        var num = 0;
        if (calendar.arr[6].sign > calendar.arr[0].sign) {
            //跨月情况
            for (var i = 0; i < calendar.arr.length; i++) {
                if (calendar.arr[i].sign == calendar.arr[0].sign) {
                    var dd = '<dd class="time-show-dd">' +
                        '<p class="time-show-dd-date">' + calendar.arr[i].day + '</p>' +
                        '<p class="time-show-dd-weekday">' + calendar.arr[i].weekday + '</p>' +
                        '</dd>';
                    num++;
                    if (i == 3) {
                        dd = '<dd class="time-show-dd time-show-dd-center">' +
                        '<p class="time-show-dd-date">' + calendar.arr[i].day + '</p>' +
                        '<p class="time-show-dd-weekday">' + calendar.arr[i].weekday + '</p>' +
                        '</dd>';
                    }
                    $('.time-show-dl').append(dd);
                } else {
                    var dd = '<dd class="time-show-dd1">' +
                        '<p class="time-show-dd-date">' + calendar.arr[i].day + '</p>' +
                        '<p class="time-show-dd-weekday">' + calendar.arr[i].weekday + '</p>' +
                        '</dd>';
                    if (i == 3) {
                        dd = '<dd class="time-show-dd1 time-show-dd-center">' +
                        '<p class="time-show-dd-date">' + calendar.arr[i].day + '</p>' +
                        '<p class="time-show-dd-weekday">' + calendar.arr[i].weekday + '</p>' +
                        '</dd>';
                    }
                    $('.time-show-dl1').append(dd);
                }
            }
            // 宽度计算
            $('.time-show-dl').css('width', parseFloat(num / 7) * 0.95 * 100 + '%');
            $('.time-show-dl1').css('width', (95 - parseFloat(num / 7) * 0.95 * 100) + '%');
            $($('.time-show-dd-month')[0]).html(calendar.arr[0].month + '月');
            if (calendar.arr[6].year == calendar.arr[0].year) {
                $($('.time-show-dd-month')[1]).html(calendar.arr[6].month + '月');

            } else {
                $($('.time-show-dd-month')[1]).html(calendar.arr[6].year + '年' + calendar.arr[6].month + '月');

            }
            $('.time-show-dd').css('width', parseFloat(1 / num) * 100 + '%')
            $('.time-show-dd1').css('width', parseFloat(1 / (7 - num)) * 100 + '%')
        } else {
            // 同月
            for (var j = 0; j < calendar.arr.length; j++) {
                var dd = '<dd class="time-show-dd">' +
                    '<p class="time-show-dd-date">' + calendar.arr[j].day + '</p>' +
                    '<p class="time-show-dd-weekday">' + calendar.arr[j].weekday + '</p>' +
                    '</dd>';
                if (j == 3) {
                    dd = '<dd class="time-show-dd time-show-dd-center">' +
                    '<p class="time-show-dd-date">' + calendar.arr[j].day + '</p>' +
                    '<p class="time-show-dd-weekday">' + calendar.arr[j].weekday + '</p>' +
                    '</dd>';
                }
                $('.time-show-dl').append(dd);

            }
            $('.time-show-dl').css('width', '100%');
            $($('.time-show-dd-month')[0]).html(calendar.arr[0].month + '月');
            $('.time-show-dd').css('width', parseFloat(1 / calendar.arr.length) * 100 + '%')
        }
    }
};
//  需要传入的json  格式
var json = {
    year: 2016,
    month: 12,
    weekday: '周四',
    day: 31
};
//  日期处理函数
var calendar = {
    //  传入任意一个数，生成以该数为中心的，前后三天（共七天的数组）
    //  支持年，月，日，星期 四个数据的输出
    montharr: [],   //月份数组
    arr: [],      //存储前后七天的数组
    calendar_sign: 0,
    init: function (json) {
        calendar.arr[3] = json;
        calendar.arr.length = 7;
        calendar.judgeDay(json);  //模拟json 数据，
    },
    // 调用其他的，生成前后3天，总共7天的数组
    judgeDay: function (json) {
        calendar.judgeMonth(json.year);
        var add = 0, reduce = 0;
        for (var i = 0; i < 7; i++) {
            var temJson = {};
            var weekNum = calendar.judgeWeek(json.weekday);
            if (i == 3) {
                calendar.arr[3].sign = this.calendar_sign;
            } else {
                // 判断中心日期 前后日年月星期数据
                if (i < 3) {
                    temJson.day = json.day - (i + 1);
                    temJson.year = json.year;
                    if (temJson.day < 1) {
                        temJson.month = json.month - 1;
                        if (temJson.month < 1) {
                            temJson.year = json.year - 1;
                            temJson.month = 12;
                        }
                        temJson.sign = calendar.calendar_sign - 1;
                        reduce++;
                        temJson.day = calendar.montharr[temJson.month - 1] - reduce + 1;
                    } else {
                        temJson.month = json.month;
                        temJson.sign = calendar.calendar_sign;
                    }
                    var weekday = calendar.judgeWeek(Math.abs(weekNum - (i + 1) + 7) % 7);
                    temJson.weekday = weekday;
                    calendar.arr[3 - i - 1] = temJson;
                } else if (i > 3) {
                    temJson.day = json.day + (i - 3);
                    temJson.year = json.year;
                    if (temJson.day > calendar.montharr[json.month - 1]) {
                        temJson.month = json.month + 1;
                        if (temJson.month > 12) {
                            temJson.month = 1;
                            temJson.year = json.year + 1;
                        }
                        temJson.sign = calendar.calendar_sign + 1;
                        add++;
                        temJson.day = add;
                    } else {
                        temJson.month = json.month;
                        temJson.sign = calendar.calendar_sign

                    }
                    var weekday = calendar.judgeWeek((weekNum + (i - 3)) % 7);
                    temJson.weekday = weekday;
                    calendar.arr[3 + i - 3] = temJson;
                }

            }

        }

    },
    // 判断星期
    judgeWeek: function (week) {
        var weekday = '';
        if (typeof week == 'string') {
            switch (week) {
                case  '周日':
                    weekday = 0;
                    break;
                case  '周一':
                    weekday = 1;
                    break;
                case  '周二':
                    weekday = 2;
                    break;
                case  '周三':
                    weekday = 3;
                    break;
                case  '周四':
                    weekday = 4;
                    break;
                case   '周五':
                    weekday = 5;
                    break;
                case  '周六':
                    weekday = 6;
                    break;
                default :
                    break;
            }
            return Number(weekday);
        }
        else {
            switch (week) {
                case  0:
                    weekday = '周日';
                    break;
                case  1:
                    weekday = '周一';
                    break;
                case  2:
                    weekday = '周二';
                    break;
                case  3:
                    weekday = '周三';
                    break;
                case  4:
                    weekday = '周四';
                    break;
                case  5:
                    weekday = '周五';
                    break;
                case  6:
                    weekday = '周六';
                    break;
                default :
                    break;
            }
            return weekday;
        }

    },

    //判断每月天数
    judgeMonth: function (year) {
        if (calendar.judgeYear(year)) {
            calendar.montharr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        } else {
            calendar.montharr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        }
    },
    //判断闰年
    judgeYear: function (year) {
        return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)
    }
}
