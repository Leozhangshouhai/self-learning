/**
 * Created by leo on 2017/6/5.
 */
$("#city-picker").cityPicker({
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker">确定</button>\
    <h1 class="title">选择收货地址</h1>\
    </header>'
});
var info = {
    getpageinfo:function () {
     var  addjson={};
     addjson.phone=$('#phone').val();
     addjson.name=$('#name').val();
     addjson.address=$('#infoarea').val();
     addjson.id=ZSH_Extent.getPostUrl('addressId');
     var string=$('#city-picker').val().split(' ');
        addjson.province=string[0];
        addjson.city=string[1];
        addjson.area=string[2];
     return addjson;
    },
    addaddress: {
        url: 'http://101.37.32.245/hmp_website/user/addaddress.json',
        parameters: {
            address:'',
            province:'',
            city:'',
            area:'',
            name:'',
            phone:''
        },
        success: function (data) {
            console.log(data)
            if (data.head.rtnCode === '000000') {
                // 退票成功，返回机票入口页
                self.location.href='../pages/addressList.html'
            } else {
                //  其他情况
            }
        },
        error: function (error) {
            console.log(error);
            // 业务异常
            ZSH_Extent.createLoading(error.head.rtnMsg)
        }
    },
    editaddress: {
        url: 'http://101.37.32.245/hmp_website/user/updateaddress.json',
        parameters: {
            address:'',
            province:'',
            city:'',
            area:'',
            name:'',
            phone:'',
            id:''
        },
        success: function (data) {
            console.log(data)
            if (data.head.rtnCode === '000000') {
                // 退票成功，返回机票入口页
                self.location.href='../pages/addressList.html';
            } else {
                //  其他情况
            }
        },
        error: function (error) {
            console.log(error);
            // 业务异常
            ZSH_Extent.createLoading(error.head.rtnMsg)
        }
    },
    getaddress: {
        url: 'http://101.37.32.245/hmp_website/user/getaddressdetail.json',
        parameters: {
            id:''
        },
        success: function (data) {
            console.log('获取订单成功');
            console.log(data);
            if (data.head.rtnCode === '000000') {
                // 退票成功，返回机票入口页
                var success=data.body;
                $('#name').val(success.name);
                $('#city-picker').val(success.province+' '+success.city+' '+success.area);
                $('#phone').val(success.phone);
                $('#infoarea').val(success.address);
                document.title = '修改地址';
                $('endorsed').html('修改地址');
                $('.make-sure-pay').html('修改');
            } else {
                //  其他情况
            }
        },
        error: function (error) {
            console.log(error);
            // 业务异常
            ZSH_Extent.createLoading(error.head.rtnMsg)
        }
    },
};

var page = {
    init: function () {
        $('.content-dd-right-img-1').on('click', function () {
            $("#city-picker").picker('open')
        });
        $('.content-dd-right-img-2').click(function () {
            var s = $(this).attr('index');
            if (s === '02') {
                $(this).attr('src', '../img/air/addNewAddress-03.png');
                $(this).attr('index', '03')
            } else {
                $(this).attr('src', '../img/air/addNewAddress-02.png');
                $(this).attr('index', '02')
            }
        });
        //     兼容手机软盘输入时，btn 顶起问题
        var sheight =  document.body.clientHeight - $('.header').height() - $('.make-sure-pay-box').height() - $('.contentMy').height();
        $('#bank').height(sheight + 'px');
        $('.make-sure-pay-box').on('click',function () {
            page.submitAddress();
        });
        this.judgeEditOrAdd();
    },
    submitAddress:function () {
        info.addaddress.parameters=info.getpageinfo();
        info.editaddress.parameters=info.getpageinfo();
        if(info.addaddress.parameters.name===''){
            ZSH_Extent.createLoading('收件人不能为空');
        }else if(info.addaddress.parameters.phone===''){
            ZSH_Extent.createLoading('联系人不能为空')
        }else if(info.addaddress.parameters.address===''){
            ZSH_Extent.createLoading('收件地址不能为空')
        }else if($('#infoarea').val()===''){
            ZSH_Extent.createLoading('地址详情不能为空')
        }else{
            if(ZSH_Extent.getPostUrl('addressId')){
                Ajax_json(info.editaddress,changeIp);
            }else{
                delete info.addaddress.parameters.id;
                Ajax_json(info.addaddress,changeIp);
            }
        }

    },
    judgeEditOrAdd:function () {
       var sign=ZSH_Extent.getPostUrl('addressId');
       if(sign){
           info.getaddress.parameters.id=sign;
           Ajax_json(info.getaddress,changeIp)
       }
    }
};
$(function () {
    $('#container').css('visibility', 'visible')
    page.init();
});
function changeIp(hmp_website_Ip) {
        info.addaddress.url = hmp_website_Ip + 'hmp_website/user/addaddress.json';
     info.editaddress.url = hmp_website_Ip + 'hmp_website/user/updateaddress.json';
     info.getaddress.url = hmp_website_Ip + 'hmp_website/user/getaddressdetail.json';
};