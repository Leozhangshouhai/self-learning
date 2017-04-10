/**
 * Created by leo on 2017/2/16.
 */
var Ajax_accessTicket='';
function css_right() {
    var padding = parseInt($('.airtickets-show-dd-star').css('height')) - $('.airtickets-show-dd-timelong').height();
    var padding_top = padding / 2;

    $('.airtickets-show-dd-timelong').css({
        'padding-top': padding_top + 'px',
        'padding-bottom': padding_top + 'px'
    })
};
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
};
Date.prototype.toLocaleString = function() {
    return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 " + this.getHours() + ":" + this.getMinutes() ;
};
function jump2Order(){
    connectWebViewJavascriptBridge(function(bridge) {
        /*在回调中首先要对bridge进行init才能继续使用*/
        bridge.init(function(message, responseCallback) {})
        bridge.callHandler('reBookPlane', null, function(response) {})

    });
};
$(function(){
    connectWebViewJavascriptBridge(function(bridge) {


        bridge.init(function(message, responseCallback) {

            var data = { 'Javascript Responds':'Wee!' }
            responseCallback(data);
        });
        bridge.callHandler('getUserTicket', null, function(response) {
            //alert(response);

            Ajax_accessTicket=JSON.parse(response).userTicket;
        });
        document.getElementById('AliPay').onclick = function(e) {
            e.preventDefault();
            var orderNo=$('#orderNO').html();
            bridge.callHandler('payPlaneTicket', {'orderNo':orderNo,'payChannel':'01'},function(response) {
                //alert(response);
                log('callback', response)
            })
        };
        document.getElementById('wechat').onclick = function(e) {
            e.preventDefault();

            var orderNo=$('#orderNO').html();
            bridge.callHandler('payPlaneTicket', {'orderNo':orderNo,'payChannel':'02'},function(response) {
                //alert(response);
                //ZSH_Extent.createLoading('')
                log('callback', response)
            })
        }



    });
    document.getElementById('go2pay').onclick = function() {
        $('#popup-pay').show();
    };
    document.getElementById('cancelorder').onclick = function() {
        var param = createparam({
            'mainorderid':getQueryString('orderId')
        });

        $.ajax({
            url: "http://118.178.225.32/hmp_website/yiplain/cancelorder.json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            type: "post",

            data : {"data":JSON.stringify(param)},
            success :  function (data) {
                data = JSON.parse(data);
                if(data.head.rtnCode == '000000'){
                    var obj = data.body;
                    if(obj.status == 'success'){
                        alert("成功取消订单");
                    }
                }else{
                    alert(data.head.rtnMsg);
                }

            }
        });
    };
    css_right();
    $('.air-pay-box-title').on('click','img',function(){

        $('#popup-pay').hide();
    })

    var param = createparam({
        'orderId':getQueryString('orderId'),
        'orderType':'2'

    });

    $.ajax({
        url: "http://118.178.225.32/hmp_website/order/detail.json",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        type: "post",

        data : {"data":JSON.stringify(param)},
        success :  function (data) {
            if(data.head.rtnCode == '000000'){
                var obj = data.body;
                $('#orderNO').html(obj.orderNO);

                var firststarttime = new Date(obj.firstline.startdate);
                $('#firststarttime').html(firststarttime.toLocaleString());

                $.each(obj.firstline.airLinePriceVOList,function(index,ele){
                    if("10" == ele.type){
                        $('#firstadultcontainer').show();
                        $('#firstadultprice').html('￥' + ele.ticketprice);
                        $('#firstadultmess').html('成人 × ' + ele.count);
                    }else if("11" == ele.type){
                        $('#firstchildcontainer').show();
                        $('#firstchildprice').html('￥' + ele.ticketprice);
                        $('#firstchildmess').html('儿童 × ' + ele.count);
                    }
                });

                $('#firstaircono').attr('src','../../../pages/plain/img/air/logoPNG/' + obj.firstline.airco + '.png');
                $('#firstairconame').html(obj.firstline.airconame);
                $('#firstairline').html(obj.firstline.airco + obj.firstline.lineno);
                $('#firstcheckinbar').html(obj.firstline.bar);
                $('#firstlinestarttime').html(obj.firstline.starttime);
                $('#firstlineendtime').html(obj.firstline.endtime);
                $('#firstlinestartbuilding').html(obj.firstline.startairport + obj.firstline.startcheckin);
                $('#firstlineendbuilding').html(obj.firstline.endairport + obj.firstline.endcheckin);
                $('#firstlinelasttime').html(obj.firstline.lasttime);

                if(obj.firstline.orderstatus == '5'){
                    $('#firstairlinestatus').html("已申请改签");
                }else if(obj.firstline.orderstatus == '6'){
                    $('#firstairlinestatus').html("已申请退票");
                }
                if(obj.secondline == null || obj.secondline.airco == null || obj.secondline.airco == ''){
                    $('#popup-detail-title-back').hide();
                }else{
                    var secondstarttime = new Date(obj.secondline.startdate);
                    $('#secondstarttime').html(secondstarttime.toLocaleString());

                    $.each(obj.secondline.airLinePriceVOList,function(index,ele){
                        if("10" == ele.type){
                            $('#secondadultcontainer').show();
                            $('#secondadultprice').html('￥' + ele.ticketprice);
                            $('#secondadultmess').html('成人 × ' + ele.count);
                        }else if("11" == ele.type){
                            $('#secondchildcontainer').show();
                            $('#secondchildprice').html('￥' + ele.ticketprice);
                            $('#secondchildmess').html('儿童 × ' + ele.count);
                        }
                    });

                    $('#secondaircono').attr('src','../../../pages/plain/img/air/logoPNG/' + obj.secondline.airco + '.png');
                    $('#secondairconame').html(obj.secondline.airconame);
                    $('#secondairline').html(obj.secondline.airco + obj.secondline.lineno);
                    $('#secondcheckinbar').html(obj.secondline.bar);
                    $('#secondlinestarttime').html(obj.secondline.starttime);
                    $('#secondlineendtime').html(obj.secondline.endtime);
                    $('#secondlinestartbuilding').html(obj.secondline.startairport + obj.secondline.startcheckin);
                    $('#secondlineendbuilding').html(obj.secondline.endairport + obj.secondline.endcheckin);
                    $('#secondlinelasttime').html(obj.secondline.lasttime);

                    if(obj.secondline.orderstatus == '5'){
                        $('#secondairlinestatus').html("已申请改签");
                    }else if(obj.secondline.orderstatus == '6'){
                        $('#secondairlinestatus').html("已申请退票");
                    }
                }

                if(obj.totalbuildandfuelprice){
                    $('#totalbuildandfuelprice').html('￥' + obj.totalbuildandfuelprice);
                }else{
                    $('#totalbuildandfuelpricecontainer').hide();
                }


                //循环乘机人信息
                var html_pass = '';
                $.each(obj.passengers,function(index,ele){
                    html_pass += '<dl>'+
                    '<dd class="info-card-box-dd">'+
                    '<p class="info-card-box-dd-first">乘机人'+(index + 1)+'</p>'+

                    '<p class="info-card-box-dd-second">'+ele.passengername+'</p>'+
                    '</dd>'+

                    '<dd class="info-card-box-dd">'+
                    '<p class="info-card-box-dd-first">证件类型</p>'+

                    '<p class="info-card-box-dd-second">'+ele.cardtype+'</p>'+
                    '</dd>'+
                    '<dd class="info-card-box-dd">'+
                    '<p class="info-card-box-dd-first">证件号码</p>'+

                    '<p class="info-card-box-dd-second">'+ele.cardno+'</p>'+
                    '</dd>'+
                    '</dl>'
                });

                $('#passengers').html(html_pass);

                $('#contactname').html(obj.contactname);
                $('#contactphone').html(obj.contactphone);

                if(obj.accident){
                    $('#accident').html(obj.accident == null || obj.accident == '' ?'无':'￥' + obj.accident);
                }else{
                    $('#accidentcontainer').hide();
                }
                if(obj.delay){
                    $('#delay').html(obj.delay == null || obj.delay == '' ?'无':'￥' + obj.delay);
                }else{
                    $('#delaycontainer').hide();
                }


                $('#ordermoney').html(obj.orderMoney);
                //根据订单类型不同判断
                if(obj.ordertype == '1'){
                    //购买
                    if(obj.orderstatus == '0' || obj.orderstatus == '3'){
                        if(obj.paystatus != '01'){
                            $('#go2pay').show();
                            $('#cancelorder').show();
                        }
                    }else if(obj.orderstatus == '1' ){

                        $('#cancelorder').show();

                    }
                }else if(obj.ordertype == '2'){
                    //退票

                }else if(obj.ordertype == '1'){
                    //改签，如果审核通过但是未支付则显示去支付按钮
                    if(obj.orderstatus == '5' && obj.paystatus == '00'){
                        $('#go2pay').show();
                    }
                    //如果订单状态是已创建，但是还未付款，就显示取消订单
                    if(obj.orderstatus == '0' && obj.paystatus == '00'){
                        $('#cancelorder').show();
                    }

                }


                $('#orderstatusname').html(obj.orderstatusname);
                $('#paystatusname').html(obj.paystatusname);
            }else{
                alert(data.head.rtnMsg);
            }

        }
    });
})