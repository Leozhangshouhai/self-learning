/**
 * Created by leo on 2016/12/30.
 */
$(function () {
    //location.href=document.referrer;
    air.calendar_init('ca');
    air.page_click();
    /*
     *，原设计默认显示往返，
     * 现在改为默认显示单程，
     * 故模拟执行一次单程点击事件
     * */
    $('#choose-btn').find('div').first().click();
    air.get_today();
    air.submit_click();
    air.get_3code();
    air.endorsed_judge();
  //   显示整个页面
      air.showAll()
});
//页面初始化
var air = {
    showAll:function () {
           $('#container').css('visibility','visible');
    },
    deadline:'',
    someCommonClick:function () {
        // 切换出发到达 城市 功能
        $('#change-position').on('click',function () {
            setTimeout(air.change_position,500);
        });

    },
    page_click: function () {
        $('#choose-btn').find('div').on('click', function () {
            $(this).addClass('active').siblings('div').removeClass('active');
            if ($(this).html() == '单程') {
                json_sign.type = 1;
                $($('.middle-time-box')[1]).hide();
                $('.middle-time-p,.middle-time-week,.middle-time-time').css('text-align', 'center');
                $('.middle-time-p').css('font-size', '1.8rem');
                $($('.middle-time-box')[0]).removeClass('selected').addClass('only').css({
                        'width': '100%',
                        'border-right': 'none'
                    }
                );
                $('.middle-data-img>img').attr('src', '../img/air/2.png');
            }else if($(this).html() == '往返'){
                json_sign.type = 2;
                $($('.middle-time-box')[1]).show();
                $('.middle-time-p,.middle-time-week,.middle-time-time').css('text-align', 'left');
                $('.middle-time-p').css('font-size', '1.2rem');
                $('.middle-data-img>img').attr('src', '../img/air/1.png');

                $($('.middle-time-box')[0]).removeClass('only').addClass('selected').css({
                        'width': '50%',
                        'border-right': '1px solid #E0E0E0'
                    }
                ).siblings('.middle-time-box').removeClass('selected');
                var div = '<div id="ca"></div>';
                $('#calendar-box').empty().append(div);
                air.calendar_init('ca');
            }

        });
        $('.middle-time-box').on('click', function () {
            $(this).addClass('selected').siblings('.middle-time-box').removeClass('selected');
        })
        $('#start').on('click', function () {
            var div = '<div id="ca"></div>';
            $('#calendar-box').empty().append(div);
            air.calendar_init('ca');

        });
        $('#end').on('click', function () {

            var div = '<div id="ca1"></div>';
            $('#calendar-box').empty().append(div);
            air.calendar_init('ca1', air.deadline);

        });
    },
    //  日历初始化
    calendar_init: function (id, deadline) {
        var width = parseInt($('#header').css('width'));
        var height = width * 0.85;
        $('#' + id).calendar({
            width: width,
            height: height,
            selectedRang: [deadline ? deadline : new Date(), null],
            view: 'date',
            onSelected: function (view, date, data) {
                var date_arr = String(date).split(' ');
                var weekday = air.judge_week(date_arr[0]);
                var monthday = air.judge_month(date_arr[1]);
                var today = $(this).html();
                //   进行数值日期匹配
                if (id == 'ca') {
                    air.deadline = '' + date_arr[3] + '/' + monthday + '/' + today;
                    if (json_sign.type == 2) {
                        json_sign.date = date_arr[3] + '-' + monthday + '-' + today;
                    }
                } else {
                    if (json_sign.type == 2) {
                        json_sign.date_back = date_arr[3] + '-' + monthday + '-' + today;
                    }
                }
                if (json_sign.type == 1) {
                    json_sign.date = date_arr[3] + '-' + monthday + '-' + today;
                }
                $('.middle-time-box.only,.middle-time-box.selected').find('.middle-time-time').
                    html(monthday + '月' + today + '日').attr('year', date_arr[3])
                    .siblings('.middle-time-week').html(weekday);
            }
        });
    },
    judge_week: function (week) {
        var weekday = '';
        switch (week) {
            case 'Sun':
                weekday = '周日';
                break;
            case 'Mon':
                weekday = '周一';
                break;
            case 'Tue':
                weekday = '周二';
                break;
            case 'Wed':
                weekday = '周三';
                break;
            case 'Thu' :
                weekday = '周四';
                break;
            case 'Fri' :
                weekday = '周五';
                break;
            case 'Sat' :
                weekday = '周六';
                break;
            default :
                break;
        }
        return weekday;
    },
    judge_week1: function (week) {
        var weekday = '';
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
    },
    judge_month: function (month) {
        var monthday = '';
        switch (month) {
            case 'Jan':
                monthday = 1;
                break;
            case 'Feb':
                monthday = 2;
                break;
            case 'Mar':
                monthday = 3;
                break;
            case 'Apr':
                monthday = 4;
                break;
            case 'May':
                monthday = 5;
                break;
            case 'Jun':
                monthday = 6;
                break;
            case 'Jul':
                monthday = 7;
                break;
            case 'Aug':
                monthday = 8;
                break;
            case 'Sep':
                monthday = 9;
                break;
            case 'Oct':
                monthday = 10;
                break;
            case 'Nov':
                monthday = 11;
                break;
            case 'Dec':
                monthday = 12;
                break;
            default :
                break;
        }

        return monthday;
    },
    get_today: function () {
        var data = new Date();
        var year=data.getFullYear();
        var day = data.getDate();
        var weekday = air.judge_week1(Number(data.getDay()));
        var month = parseInt(data.getMonth()) + 1;
        json_sign.date=year+'-'+month+'-'+day;
        json_sign.date_back=year+'-'+month+'-'+day;
        $('.middle-time-time').html(month + '月' + day + '日');
        $('.middle-time-week').html(weekday);
    },
    get_3code:function(){
        $('.middle-data-name').on('blur',function(){
            console.log($(this).attr('name'));
           if($(this).attr('name')==='middle-data-name-go'){
               json_sign.scity=$(this).val();
               json.code_3_go_json.parameters.keywords=encodeURI(json_sign.scity);
               Ajax_json(json.code_3_go_json,change_Ip);
           }else if($(this).attr('name')==='middle-data-name-back'){
               json_sign.ecity=$(this).val();
               json.code_3_back_json.parameters.keywords=encodeURI(json_sign.ecity);
               Ajax_json(json.code_3_back_json,change_Ip);
           }
        })
    },
    //提交按钮
    submit_click: function () {
        $('.sure-btn').on('click', function () {
            if($('.middle-data-name[name="middle-data-name-go"]').val()!=''&&$('.middle-data-name[name="middle-data-name-back"]').val()!=''){
                json_sign.scity_3=$('#position-go').find("option:selected").attr('name');
                json_sign.scity=$('#position-go').find("option:selected").attr('city-name');
                json_sign.ecity_3=$('#position-back').find("option:selected").attr('name');
                json_sign.ecity=$('#position-back').find("option:selected").attr('city-name');
                json_sign.weekday=$('#start').find(".middle-time-week").html();
                var jsonString=JSON.stringify(json_sign);
                Storage.set('json_plane',jsonString);
                var yiorderid=ZSH_Extent.getPostUrl('yiorderid')===null?false:ZSH_Extent.getPostUrl('yiorderid');
                self.location.href='air-price.html?type='+json_sign.type+'&&sign='+json_sign.type+'&&yiorderid='+yiorderid;
            }else{
                ZSH_Extent.createLoading('出发城市不能为空');
            }
        })
    },
    //交换出发和到达日期
    change_position:function () {
       //   克隆替换选项内容
       var $clone_go=$('#position-go').clone(true).attr('id','position-back');
      var $clone_back=$('#position-back').replaceWith($clone_go).attr('id','position-go');
       $('#position-go').replaceWith($clone_back);
    //    克隆交换出发城市，到达城市,并且克隆相关函数
        var $clone_city_go=$($('.middle-data-name')[0]).clone(true).attr('name','middle-data-name-back').attr('placeholder','输入到达城市')
        var $clone_city_back=$($('.middle-data-name')[1]).clone(true).attr('name','middle-data-name-go').attr('placeholder','输入出发城市')
        $($('.middle-data-name')[0]).replaceWith($clone_city_back);
        $($('.middle-data-name')[1]).replaceWith($clone_city_go);
    },
    endorsed_judge:function () {
       var yiorderid=ZSH_Extent.getPostUrl('yiorderid');
       // true --正常流程进来   false--表示改签进来
       if( yiorderid ===null){
           air.someCommonClick();
       }else{
           //  禁用顶部
           $('#header').hide();
          Ajax_json(json.getYiorderid,change_Ip);
       }
    }

};
//    数据交互
var json_sign={
    type: 2,
    scity_3: '',
    scity: '',
    ecity: '',
    ecity_3: '',
    date: '',
    date_back: '',
    weekday:''
};
var json = {
    // 获取改签订单的详情
    getYiorderid:  {
        url: 'http://101.37.32.245/hmp_website/yiplain/getchildorderdetailbyyiorderid.json',
        parameters: {
            'yiorderid': ZSH_Extent.getPostUrl('yiorderid')
        },
        success: function (data) {
            console.log(data)
            if(data.head.rtnCode==='000000'){
                Storage.set('yiorderidInfo',data.body)
                $($('.middle-data-name')[0]).val(data.body.citynamestart) ;
                $($('.middle-data-name')[1]).val(data.body.citynameend) ;
                var option=' <option value="" class="middle-data-airname-select-option"  city-name='+data.body.citynamestart+' name='+data.body.scity+'>'+data.body.airportnamestart+'</option>';
                $('#position-go').html(option);

                var option1=' <option value="" class="middle-data-airname-select-option" city-name='+data.body.citynameend+' name='+data.body.ecity+'>'+data.body.airportnameend+'</option>';
                $('#position-back').html(option1);
                $('.middle-data-name').attr('disabled','disabled');   // 禁止一切函数和修改
            }
        },
        error:function (error) {
            ZSH_Extent.createLoading(error.msg);
        }
    },
    // json 模型
    code_3_go_json: {
        url: 'http://101.37.32.245/hmp_website/yiplain/getairportlist.json',
      parameters: {
            'keywords': encodeURI(json_sign.scity)
       },
        success: function (data) {
            console.log(data);
            var data_arr=data.body.list;
            if(data_arr.length>0){
                $('#position-go').empty();
                for(var i=0;i<data_arr.length;i++){
                    var option=' <option value="" class="middle-data-airname-select-option"  city-name='+data_arr[i].cityname+' name='+data_arr[i].airport3code+'>'+data_arr[i].airportname+'</option>';
                    $('#position-go').append(option);
                }
            }else {
                ZSH_Extent.createLoading('城市名输入有误');
            }

        }
    },
    code_3_back_json: {
        url: 'http://118.178.225.32/hmp_website/yiplain/getairportlist.json',
        parameters: {
            'keywords': encodeURI(json_sign.ecity)
        },
        success: function (data) {

            var data_arr=data.body.list;
            console.log(data_arr);
            if(data_arr.length>0){
                $('#position-back').empty();
                for(var i=0;i<data_arr.length;i++){
                    var option=' <option value="" class="middle-data-airname-select-option" city-name='+data_arr[i].cityname+' name='+data_arr[i].airport3code+'>'+data_arr[i].airportname+'</option>';
                    $('#position-back').append(option);
                }
            }else{
                ZSH_Extent.createLoading('城市名输入有误');
            }
            }

        },
    //   下面的赋值方式只是表明对应关系，因初始化时json_sign 为空，所以此处赋值没有实际意义。
    go_json: {
        url: 'http://118.178.225.32/hmp_website/yiplain/getplainlist.json',
        parameters: {
            'type': '1',
            'scity': json_sign.scity_3,
            'ecity': json_sign.ecity_3,
            'date': json_sign.date
        },
        success: function (data) {
            console.log('单程航班');
            console.log(data);
        }
    },
    go_back_json: {
        url: 'http://118.178.225.32/hmp_website/yiplain/getplainlist.json',
        parameters: {
            'type': '2',
            'scity': json_sign.scity_3,
            'ecity': json_sign.ecity_3,
            'date': json_sign.date,
            'date_back': json_sign.date_back
        },
        success: function (data) {
            console.log('往返航班');
            console.log(data);
        }
    }
};
/*
* 改变接口地址IP
* */
function change_Ip(hmp_website_Ip) {
 /* json.code_3_go_json.url=hmp_website_Ip+'hmp_website/yiplain/getairportlist.json';
  json.code_3_back_json.url=hmp_website_Ip+'hmp_website/yiplain/getairportlist.json';
  json.go_json.url=hmp_website_Ip+'hmp_website/yiplain/getplainlist.json';
  json.go_back_json.url=hmp_website_Ip+'hmp_website/yiplain/getplainlist.json';
  json.getYiorderid.url=hmp_website_Ip+'hmp_website/yiplain/getchildorderdetailbyyiorderid.json'
*/
}






