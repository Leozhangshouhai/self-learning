function css_right(){var i=parseInt($(".airtickets-show-dd-star").css("height"))-$(".airtickets-show-dd-timelong").height(),t=i/2;$(".airtickets-show-dd-timelong").css({"padding-top":t+"px","padding-bottom":t+"px"})}$(function(){css_right(),$("#whole").css("visibility","visible"),air_pay_data.pay_info=Storage.get("air-pay-data"),air_pay_data.plane_information_json=Storage.get("json_plane_order_personInfo"),air_pay_data.init(),page.click_init(),page.pay_way()});var air_pay_data={pay_info:{},plane_information_json:{},sign:1,init:function(){this.data_binding()},data_binding:function(){console.log(this.plane_information_json.go),console.log(this.pay_info),$(".info-show-title-add").html(this.plane_information_json.go.city+"-"+this.plane_information_json.go.ecity),$(".info-show-title-name").html("单程");var i=this.plane_information_json.go.data.split("-"),t=$("#popup-detail-title-go"),a=this.pay_info.body.orderDetail[0].cabinprice,n=Number(this.pay_info.body.orderDetail[0].fuleprice)+Number(this.pay_info.body.orderDetail[0].taxprice);if($(".info-show-price").html("￥"+this.pay_info.body.mainOrderVO.orderMoney),t.find(".popup-detail-title-time-date").first().html(i[1]+"月"+i[2]+"日"),t.find(".popup-detail-title-time-price").html("￥"+Number(a)*this.pay_info.body.orderDetail[0].pcount),$(".oil-fee-total").html("￥"+Number(n)*this.pay_info.body.orderDetail[0].pcount),t.find(".popup-detail-title-airline-img").attr("src",this.plane_information_json.go.plane_info.airLogo),t.find(".popup-detail-title-airline").find(".popup-detail-title-airline-company").html(this.plane_information_json.go.plane_info.airName),t.find(".popup-detail-title-time-airline-name").html(this.plane_information_json.go.plane_info.airCode+this.plane_information_json.go.plane_info.flightNo),t.find(".popup-detail-title-counter").find(".popup-detail-title-time-name").html(""==this.plane_information_json.go.plane_info.checkBar?"无":this.plane_information_json.go.plane_info.checkBar),t.find(".popup-detail-title-airline").find(".popup-detail-title-airline-box").find(".airtickets-show-dd-star").find(".airtickets-show-dd-star-time").html(this.plane_information_json.go.plane_info.takeOffTime).siblings(".airtickets-show-dd-start-add").html(this.plane_information_json.go.plane_info.originCityName+this.plane_information_json.go.plane_info.terminal.split(",")[0]),t.find(".popup-detail-title-airline").find(".popup-detail-title-airline-box").find(".airtickets-show-dd-timelong").find(".airtickets-show-dd-time-long").html(this.plane_information_json.go.plane_info.timediff),t.find(".popup-detail-title-airline").find(".popup-detail-title-airline-box").find(".airtickets-show-dd-end").find(".airtickets-show-dd-star-time").html(this.plane_information_json.go.plane_info.arriveOffTime).siblings(".airtickets-show-dd-start-add").html(this.plane_information_json.go.plane_info.arriveCityName+this.plane_information_json.go.plane_info.terminal.split(",")[1]),this.plane_information_json.back){this.sign=2,$(".info-show-title-name").html("往返");var e=$("#popup-detail-title-back");e.fadeIn(300),e.find(".popup-detail-title-time-date").html(i[1]+"月"+i[2]+"日"),e.find(".popup-detail-title-airline-img").attr("src",this.plane_information_json.back.plane_info.airLogo),e.find(".popup-detail-title-airline").find(".popup-detail-title-airline-company").html(this.plane_information_json.back.plane_info.airName),e.find(".popup-detail-title-time-airline-name").html(this.plane_information_json.back.plane_info.airCode+this.plane_information_json.back.plane_info.flightNo),e.find(".popup-detail-title-counter").find(".popup-detail-title-time-name").html(""==this.plane_information_json.back.plane_info.checkBar?"无":this.plane_information_json.go.plane_info.checkBar),e.find(".popup-detail-title-airline").find(".popup-detail-title-airline-box").find(".airtickets-show-dd-star").find(".airtickets-show-dd-star-time").html(this.plane_information_json.back.plane_info.takeOffTime).siblings(".airtickets-show-dd-start-add").html(this.plane_information_json.back.plane_info.originCityName+this.plane_information_json.back.plane_info.terminal.split(",")[0]),e.find(".popup-detail-title-airline").find(".popup-detail-title-airline-box").find(".airtickets-show-dd-timelong").find(".airtickets-show-dd-time-long").html(this.plane_information_json.back.plane_info.timediff),e.find(".popup-detail-title-airline").find(".popup-detail-title-airline-box").find(".airtickets-show-dd-end").find(".airtickets-show-dd-star-time").html(this.plane_information_json.back.plane_info.arriveOffTime).siblings(".airtickets-show-dd-start-add").html(this.plane_information_json.back.plane_info.arriveCityName+this.plane_information_json.back.plane_info.terminal.split(",")[1])}if(this.plane_information_json.back){var o=Number(this.pay_info.body.orderDetail[1].fuleprice)+Number(this.pay_info.body.orderDetail[1].taxprice),l=this.pay_info.body.orderDetail[1].cabinprice;e.find(".popup-detail-title-time-price").html("￥"+(Number(l)+Number(a))*this.pay_info.body.orderDetail[0].pcount),$(".oil-fee-total").html("￥"+(Number(n)+o)*this.pay_info.body.orderDetail[0].pcount)}this.pay_info.body.delayamount?$(".fee-delay").html("￥"+this.pay_info.body.delayamount+"("+this.pay_info.body.delaynum+"份)"):$(".oil-fee-box").eq(1).hide(),this.pay_info.body.accidentamount?$(".fee-accident").html("￥"+this.pay_info.body.accidentamount+"("+this.pay_info.body.accidentnum+"份)"):$(".oil-fee-box").eq(2).hide(),this.pay_info.body.mainOrderVO.needinvoince?$(".fee-post").eq(0).html("￥"+this.pay_info.body.mailmoney):$("#postbox").hide()}},page={click_init:function(){$("#make-sure").on("click",function(){$(".popup").css("z-index",-10)}),$(".info-show-price-detail").click(function(){$(".popup").css("z-index",110)})},pay_way:function(){Storage.set("orderNo",air_pay_data.pay_info.body.mainOrderVO.orderNo),document.getElementById("AliPay").onclick=function(i){i.preventDefault();var t=air_pay_data.pay_info.body.mainOrderVO.orderNo;WebViewJavascriptBridge.callHandler("payPlaneTicket",{orderNo:t,payChannel:"01"},function(i){var t=JSON.parse(i);"9000"==JSON.parse(t.info).resultStatus?self.location.href="../pages/pay-successOrfail.html?sign="+air_pay_data.sign+"&&type=1":self.location.href="../pages/pay-successOrfail.html?sign="+air_pay_data.sign+"&&type=2"})},document.getElementById("wechat").onclick=function(i){i.preventDefault();var t=air_pay_data.pay_info.body.mainOrderVO.orderNo;WebViewJavascriptBridge.callHandler("payPlaneTicket",{orderNo:t,payChannel:"02"},function(i){0==JSON.parse(i).info?self.location.href="../pages/pay-successOrfail.html?sign="+air_pay_data.sign+"&&type=1":self.location.href="../pages/pay-successOrfail.html?sign="+air_pay_data.sign+"&&type=2",log("callback",i)})}}};