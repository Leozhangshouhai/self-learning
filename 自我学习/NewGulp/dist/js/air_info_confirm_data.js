function change_Ip(n){air_info_confirm.create_order.url=n+"hmp_website/yiplain/getpolicyandcreateorder.json",air_info_confirm.json_accident.url=n+"hmp_website/yiplain/getinsuranceprice.json",air_info_confirm.json_delay.url=n+"hmp_website/yiplain/getinsuranceprice.json",air_info_confirm.get_initaddress.url=n+"hmp_website/user/getdefaultaddress.json"}$(function(){air_info_confirm.plane_json=Storage.get("json_plane_order_personInfo"),page.init(),$("#container").css("visibility","visible")});var air_info_confirm={create_order:{url:"http://101.37.32.245/hmp_website/yiplain/getpolicyandcreateorder.json",parameters:{},success:function(n){console.log(n),popup.loading_dis(),"000000"==n.head.rtnCode?(Storage.set("air-pay-data",n),Storage.remove("PassengerData"),page.Storage_last_info(),self.location.href="../pages/air-pay.html"):(ZSH_Extent.createLoading("订单创建失败，请确保信息正确"),$("#popup").hide())},error:function(n){console.log(n),ZSH_Extent.createLoading("订单创建失败，请确保信息正确"),$("#popup").hide()}},json_accident:{},json_delay:{},get_initaddress:{url:"http://101.37.32.245/hmp_website/user/getdefaultaddress.json",parameters:{},success:function(n){if(console.log("获取订单成功"),console.log(n),"000000"===n.head.rtnCode){var e=n.body.address;$(".postBoxMiddle-add").html(e.province+e.city+e.area+e.address),$(".postBoxMiddle-name-name").html(e.name),$(".postBoxMiddle-name-phone").html(e.phone),$(".postBoxRight-money").html("￥"+n.body.price)}},error:function(n){console.log(n)}}},page={init:function(){this.radio_click(),this.add_infoBox(),this.get_fee(),this.regular_verify(),this.check_submit(),this.submit_click(),this.editAddressClick(),this.judge_special(),Ajax_json(air_info_confirm.get_initaddress,change_Ip),this.check_createBtn(),this.last_one_person(),this.auto_set_info(),this.data_bind()},common_fun:{error_input_check:function(){"conName"==$(this).attr("name")?page.regular_express.name($(this).val())?$(this).siblings(".info_content_error").css("display","none"):$(this).siblings(".info_content_error").css("display","inline"):"phone"==$(this).attr("name")?page.regular_express.phone($(this).val())?$(this).siblings(".info_content_error").css("display","none"):$(this).siblings(".info_content_error").css("display","inline"):"idCard"==$(this).attr("name")&&(page.regular_express.idCard($(this).val(),$(this).parents(".passenger-code").prev(".id-card").find(".card-kind option:selected").attr("data-type"))?$(this).siblings(".info_content_error").css("display","none"):$(this).siblings(".info_content_error").css("display","inline"))},error_birthday_check:function(){var n=this;if(function(n){return"year"==$(n).attr("name")?Number($(n).val())>=1900&&Number($(n).val())<=2e3?($(n).attr("verify","1"),!0):($(n).attr("verify","0"),!1):"month"==$(n).attr("name")?$(n).val()>=1&&$(n).val()<=12?($(n).attr("verify","1"),!0):($(n).attr("verify","0"),!1):"day"==$(n).attr("name")?$(n).val()>=1&&$(n).val()<=31?($(n).attr("verify","1"),!0):($(n).attr("verify","0"),!1):void 0}(n)){var e=$(".info_content_input_birthday").find("input");"1"==$(e[0]).attr("verify")&&"1"==$(e[1]).attr("verify")&&"1"==$(e[2]).attr("verify")&&$(".info_content_input_birthday").next(".info_content_error").hide()}else $(".info_content_input_birthday").next(".info_content_error").show()},dynamic_check:function(n){$(".info_content_error").each(function(n,e){if("none"!=$(e).css("display")){var i=$(e).parent().find(".info_content_input").attr("name");console.log($(e).parent().find(".info_content_input").attr("name"));var t=$(e).parent().find(".info_content_input").val();switch(i){case"conName":page.regular_express.name(t)&&$(e).css("display","none");break;case"phone":page.regular_express.phone(t)&&$(e).css("display","none");break;case"idCard":var a=$(e).parent().prev(".id-card").find(".card-kind option:selected").attr("data-type");page.regular_express.idCard(t,a)&&$(e).css("display","none")}}})}},regular_express:{phone:function(n){return!!/^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/.test(n)},idCard:function(n,e){var i,t,a;if(3==e)return!0;switch(e){case"1":i=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,a=i.test(n);break;case"2":i=/^[a-zA-Z]{5,17}$/,t=/^[a-zA-Z0-9]{5,17}$/,a=i.test(n)||t.test(n);break;case"4":i=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,a=i.test(n);break;case"5":a=!0}return!1!==a},name:function(n){var e=/^[\u4e00-\u9fa5 ]{2,20}$/,i=/^[a-z\/ ]{2,20}$/i;return 1==e.test(n)||1==i.test(n)}},submit_click:function(){$(".air-make-sure-box").on("click",function(){var n=function(){for(var n="",e=$("#text-box-idCard-box"),i=0;i<e.find("li").length;i++){var t=$(e.find("li")[i]),a=t.find(".passenger-name").find(".info_content_input").val(),o=t.find(".card-kind option:selected").attr("data-type"),r=t.find(".passenger-code").find(".info_content_input").val(),s=t.find(".passenger-phone").find(".info_content_input").val(),c="",d=t.find(".sex-kind option:selected").attr("data-type"),_="false"==$(".text-box-baoxian-img").first().attr("choose")?"0":"1",f="false"==$(".text-box-baoxian-img").last().attr("choose")?"0":"1";if("1"==o)c="18"==r.length?r.substr(6,4)+"-"+r.substr(10,2)+"-"+r.substr(12,2):"19"+r.substr(6,2)+"-"+r.substr(8,2)+"-"+r.substr(10,2);else{var p=t.find(".info_content_input_birthday").find("input"),l=2==$(p[1]).val().length?$(p[1]).val():"0"+$(p[1]).val(),m=2==$(p[2]).val().length?$(p[2]).val():"0"+$(p[2]).val();c=$(p[0]).val()+"-"+l+"-"+m}n+=a+"|"+o+"|"+r+"|"+s+"|"+c+"|"+d+"|"+f+"|"+_+"|",i!=e.find("li").length-1&&(n+=",")}return n}();air_info_confirm.create_order.parameters={type:"1",scity:air_info_confirm.plane_json.go.plane_info.originCode,ecity:air_info_confirm.plane_json.go.plane_info.arriveCode,date:air_info_confirm.plane_json.go.plane_info.takeOffDate,firstAirco:air_info_confirm.plane_json.go.plane_info.airCode,firstFlightNo:air_info_confirm.plane_json.go.plane_info.flightNo,firstAirCabin:air_info_confirm.plane_json.go.plane_info.cabinSeatList.cabinSeatCode,firstFlightStartTime:air_info_confirm.plane_json.go.plane_info.takeOffTime,firstFlightEndTime:air_info_confirm.plane_json.go.plane_info.arriveOffTime,firstTerminal:air_info_confirm.plane_json.go.plane_info.terminal,firstcabinPrice:air_info_confirm.plane_json.go.plane_info.cabinSeatList.cabinSeatPrice,firstfuelPrice:air_info_confirm.plane_json.go.plane_info.cabinSeatList.fuelPrice,firsttaxPrice:air_info_confirm.plane_json.go.plane_info.cabinSeatList.taxPrice,passengersarr:n,contactCellPhone:$("#contact-phone").find(".info_content_input").val(),contactName:$("#contact-name").find(".info_content_input").val(),needInvoince:$(".content-dd-right-img-2").attr("index"),invoinceaddress:$(".postBoxMiddle-add").html(),invoincename:$(".postBoxMiddle-name-name").html(),invoincephone:$(".postBoxMiddle-name-phone").html()},!0===air_info_confirm.plane_json.hasOwnProperty("back")&&(air_info_confirm.create_order.parameters.type="2",air_info_confirm.create_order.parameters.secondAirco=air_info_confirm.plane_json.back.plane_info.airCode,air_info_confirm.create_order.parameters.secondFlightNo=air_info_confirm.plane_json.back.plane_info.flightNo,air_info_confirm.create_order.parameters.secondAirCabin=air_info_confirm.plane_json.back.plane_info.cabinSeatList.cabinSeatCode,air_info_confirm.create_order.parameters.secondFlightStartTime=air_info_confirm.plane_json.back.plane_info.takeOffTime,air_info_confirm.create_order.parameters.secondFlightEndTime=air_info_confirm.plane_json.back.plane_info.arriveOffTime,air_info_confirm.create_order.parameters.secondTerminal=air_info_confirm.plane_json.back.plane_info.terminal,air_info_confirm.create_order.parameters.secondcabinPrice=air_info_confirm.plane_json.back.plane_info.cabinSeatList.cabinSeatPrice,air_info_confirm.create_order.parameters.secondfuelPrice=air_info_confirm.plane_json.back.plane_info.cabinSeatList.fuelPrice,air_info_confirm.create_order.parameters.secondtaxPrice=air_info_confirm.plane_json.back.plane_info.cabinSeatList.taxPrice,air_info_confirm.create_order.parameters.date_back=air_info_confirm.plane_json.back.plane_info.takeOffDate),console.log(air_info_confirm.create_order),popup.loading_show(),Ajax_json(air_info_confirm.create_order,change_Ip)})},check_textNull:function(){return $.makeArray($(".text-box-one")).every(function(n){return!!$(n).hasClass("passenger-birthday")||""!=$(n).find("input").val()})},check_submit:function(){for(var n=$(".info_content_error"),e=0;e<n.length&&"none"==$(n[e]).css("display");e++)if(e==n.length-1)return!0;return!1},regular_verify:function(){$(".info_content_input").on("blur",this.common_fun.error_input_check),$(".info_content_input_birthday").find("input").on("blur",this.common_fun.error_birthday_check)},get_fee:function(){air_info_confirm.json_accident={url:"http://118.178.225.32/hmp_website/yiplain/getinsuranceprice.json",parameters:{type:"20"},success:function(n){$($(".text-box-baoxian").find(".text-box-baoxian-money")[0]).html(n.body)}},air_info_confirm.json_delay={url:"http://118.178.225.32/hmp_website/yiplain/getinsuranceprice.json",parameters:{type:"21"},success:function(n){$($(".text-box-baoxian").find(".text-box-baoxian-money")[1]).html(n.body)}},Ajax_json(air_info_confirm.json_accident,change_Ip),Ajax_json(air_info_confirm.json_delay,change_Ip)},data_bind:function(){$(".header-chufa").html(air_info_confirm.plane_json.go.city),$(".header-daoda").html(air_info_confirm.plane_json.go.ecity);var n=$("#go_contentBox_dd");if(n.find(".go_contentBox_dd_date").html(air_info_confirm.plane_json.go.data.split("-")[1]+"月"+air_info_confirm.plane_json.go.data.split("-")[2]+"日"),n.find(".go_contentBox_dd_time").html(air_info_confirm.plane_json.go.plane_info.takeOffTime),n.find(".go_contentBox_dd_money").html(air_info_confirm.plane_json.go.plane_info_seat.cabinSeatPrice),$(".air-info-otherfree-content-money").html(Number(air_info_confirm.plane_json.go.plane_info_seat.taxPrice)+Number(air_info_confirm.plane_json.go.plane_info_seat.fuelPrice)),air_info_confirm.plane_json.back){var e=$("#back_contentBox_dd");e.fadeIn(100),e.find(".go_contentBox_dd_date").html(air_info_confirm.plane_json.back.data.split("-")[1]+"月"+air_info_confirm.plane_json.back.data.split("-")[2]+"日"),e.find(".go_contentBox_dd_time").html(air_info_confirm.plane_json.back.plane_info.takeOffTime),e.find(".go_contentBox_dd_money").html(air_info_confirm.plane_json.back.plane_info_seat.cabinSeatPrice);var i=Number(air_info_confirm.plane_json.go.plane_info_seat.taxPrice)+Number(air_info_confirm.plane_json.go.plane_info_seat.fuelPrice)+Number(air_info_confirm.plane_json.back.plane_info_seat.taxPrice)+Number(air_info_confirm.plane_json.back.plane_info_seat.fuelPrice);$(".air-info-otherfree-content-money").html(i)}},radio_click:function(){$(".text-box-baoxian-img,.air-info-otherfree-agreement-left-img").on("click",function(){"true"==$(this).attr("choose")?$(this).attr("src","../img/air/air-info-3.png").attr("choose","false"):$(this).attr("src","../img/air/air-info-2.png").attr("choose","true")}),$(".content-dd-right-img-2").on("click",function(){"1"===$(".content-dd-right-img-2").attr("index")?($("#baoxiao").show(),$(".content-dd-right-img-2").attr("src","../img/air/addNewAddress-03.png").attr("index","0")):($(".content-dd-right-img-2").attr("src","../img/air/addNewAddress-02.png").attr("index","1"),$("#baoxiao").hide())})},add_infoBox:function(){function n(){var i=$('<li class="text-box-idCard"><div class="text-box-one passenger-name"><span class="info_content_left">乘机人</span><input class="info_content_input" name="conName" type="text" value="" placeholder="乘机人姓名"/><span class="info_content_error">*输入有误,请重新输入</span></div><div class="text-box-one passenger-sex"><span class="info_content_left">性别</span><span class="info_content_input id-kind"><select  class="info_content_input_select sex-kind"><option value="" class="info_content_input_select_option" data-type="1">男</option><option value="" class="info_content_input_select_option" data-type="2">女</option></select></span></div><div class="text-box-one id-card"><span class="info_content_left">证件类型</span><span class="info_content_input id-kind"><select name=""  class="info_content_input_select card-kind"><option value="" class="info_content_input_select_option" data-type="1">身份证</option><option value="" class="info_content_input_select_option" data-type="2">护照</option><option value="" class="info_content_input_select_option" data-type="3">其他</option></select></span></div><div class="text-box-one passenger-code"><span class="info_content_left">证件号码</span><input class="info_content_input" type="text" name="idCard" value="" placeholder="必须和乘机人一致"/><span class="info_content_error">*输入有误,请重新输入</span></div><div class="text-box-one passenger-birthday"><span class="info_content_left">出生日期</span><span class="info_content_input  info_content_input_birthday"><input type="text" value="" placeholder="年" name="year"/>/<input type="text" placeholder="月" name="month"/>/<input type="text" placeholder="日" name="day"/></span><span class="info_content_error">*输入有误,请重新输入</span></div><div class="text-box-one  passenger-phone"><span class="info_content_left">手机号码</span><input class="info_content_input" name="phone" type="text" value="" placeholder="请输入手机号码"/><span class="info_content_error">*输入有误,请重新输入</span></div><div class="text-box-idCard-addAndreduce"><img src="../img/air/air-info-add.png?v=acd25aa" alt="加号" class="text-box-idCard-add"/><img src="../img/air/air-info-reduce.png?v=d4cae3c" alt="减号" class="text-box-idCard-reduce"/></div></li>');$("#text-box-idCard-box").prepend(i),$(".info_content_input").off("blur"),$(".card-kind").off("change"),page.regular_verify(),e(),i.find(".text-box-idCard-add").on("click",function(){var e=$(".air-info-otherfree-content").find(".air-info-otherfree-content-money").first().html(),i=parseInt(e/$("#text-box-idCard-box").find("li").length);$(".air-info-otherfree-content").find(".air-info-otherfree-content-money").first().html(Number(e)+i),n()}),i.find(".text-box-idCard-reduce").on("click",function(){var n=$(".air-info-otherfree-content").find(".air-info-otherfree-content-money").first().html(),e=parseInt(n/$("#text-box-idCard-box").find("li").length);$(".air-info-otherfree-content").find(".air-info-otherfree-content-money").first().html(Number(n)-e),$(this).parents(".text-box-idCard").remove()})}function e(){$(".card-kind").change(function(){"1"==$(this).find("option:selected").attr("data-type")?($(this).parents(".id-card").siblings(".passenger-birthday").find(".info_content_error").hide(),$(this).parents(".id-card").siblings(".passenger-birthday").hide().find("input").val("")):$(this).parents(".id-card").siblings(".passenger-birthday").show()})}$(".text-box-idCard-add").on("click",function(){var e=$(".air-info-otherfree-content").find(".air-info-otherfree-content-money").first().html(),i=parseInt(e/$("#text-box-idCard-box").find("li").length);$(".air-info-otherfree-content").find(".air-info-otherfree-content-money").first().html(Number(e)+i),n()}),$(".text-box-idCard-reduce").on("click",function(){var n=$(".air-info-otherfree-content").find(".air-info-otherfree-content-money").first().html(),e=parseInt(n/$("#text-box-idCard-box").find("li").length);$(".air-info-otherfree-content").find(".air-info-otherfree-content-money").first().html(Number(n)-e),$(this).parents(".text-box-idCard").remove()}),e()},data_story:function(){for(var n={contactnane:$($(".info_content_input")[0]).val()||"",contacttel:$($(".info_content_input")[1]).val()||"",postsign:$(".content-dd-right-img-2").attr("index"),accident:$(".text-box-baoxian-img").first().attr("choose"),delay:$(".text-box-baoxian-img").last().attr("choose")},e=[],i=$("#text-box-idCard-box"),t=0;t<$("#text-box-idCard-box").find("li").length;t++){var a=$(i.find("li")[t]);e[t]={passenger_name:a.find(".passenger-name").find(".info_content_input").val()||"",card_kind:a.find(".card-kind option:selected").attr("data-type")||"",sex_kind:a.find(".sex-kind option:selected").attr("data-type")||"",passenger_code:a.find(".passenger-code").find(".info_content_input").val()||"",passenger_phone:a.find(".passenger-phone").find(".info_content_input").val()||"",passenger_birthday_year:a.find(".info_content_input_birthday").find("input").eq(0).val()||"",passenger_birthday_month:a.find(".info_content_input_birthday").find("input").eq(1).val()||"",passenger_birthday_day:a.find(".info_content_input_birthday").find("input").eq(2).val()||""}}return n.passengers=e,n},editAddressClick:function(){$("#editAddress").on("click",function(){var n=page.data_story();Storage.set("PassengerData",n),self.location.href="../pages/addressList.html?sign=special"})},judge_special:function(){if("special"===ZSH_Extent.getPostUrl("sign")){var n=Storage.get("PassengerData");$($("#contact-name").find(".info_content_input")[0]).val(n.contactnane),$($("#contact-name").find(".info_content_input")[1]).val(n.contacttel),"true"==n.accident&&$(".text-box-baoxian-img").first().attr({choose:n.accident,src:"../img/air/air-info-2.png"}),"true"==n.delay&&$(".text-box-baoxian-img").last().attr({choose:n.delay,src:"../img/air/air-info-2.png"}),$(".content-dd-right-img-2").attr("index",n.postsign),"0"===n.postsign&&$(".content-dd-right-img-2").attr("src","../img/air/addNewAddress-03.png");var e=$("#text-box-idCard-box");$($(".info_content_input")[0]).val(n.contactnane),$($(".info_content_input")[1]).val(n.contacttel);for(var i=0;i<n.passengers.length;i++){i+1<n.passengers.length&&$(".text-box-idCard-add").eq(0).click();var t=$(e.find("li")[i]);t.find(".passenger-name").find(".info_content_input").val(n.passengers[i].passenger_name),t.find(".passenger-code").find(".info_content_input").val(n.passengers[i].passenger_code),t.find(".passenger-phone").find(".info_content_input").val(n.passengers[i].passenger_phone),t.find(".info_content_input_birthday").find("input").eq(0).val(n.passengers[i].passenger_birthday_year),t.find(".info_content_input_birthday").find("input").eq(1).val(n.passengers[i].passenger_birthday_month),t.find(".info_content_input_birthday").find("input").eq(2).val(n.passengers[i].passenger_birthday_day),t.find(".card-kind").find("option").eq(Number(n.passengers[i].card_kind)-1).attr("selected","selected"),t.find(".sex-kind").find("option").eq(Number(n.passengers[i].sex_kind)-1).attr("selected","selected"),"1"!==n.passengers[i].card_kind&&t.find(".passenger-birthday").show()}}},check_createBtn:function(){setInterval(function(){console.log(1),page.common_fun.dynamic_check(),page.check_submit()&&page.check_textNull()?$(".air-make-sure-box").css({background:"#0077DB",color:"white"}).attr("disabled",!1):$(".air-make-sure-box").css({background:"#e6e6e6",color:"#646464"}).attr("disabled",!0)},1200)},last_one_person:function(){$("#last_phone_input").on("blur",function(){var n=$("#text-box-idCard-box").children("li:last-child"),e=n.find(".info_content_input[name=conName]").val(),i=n.find(".info_content_input[name=phone]").val();$(".text-box").find(".info_content_input[name=conName]").val(e),$(".text-box").find(".info_content_input[name=phone]").val(i)})},Storage_last_info:function(){var n={},e=$("#text-box-idCard-box").children("li:last-child");return n={name:e.find(".info_content_input[name=conName]").val(),phone:e.find(".info_content_input[name=phone]").val(),card:e.find(".info_content_input[name=idCard]").val(),card_kind:e.find(".card-kind option:selected").attr("data-type"),sex_kind:e.find(".sex-kind option:selected").attr("data-type"),birthday_year:e.find(".info_content_input_birthday input").eq(0).val(),birthday_month:e.find(".info_content_input_birthday input").eq(1).val(),birthday_day:e.find(".info_content_input_birthday input").eq(2).val()},Storage.set("last_person_info",n),"信息存储成功"},auto_set_info:function(){var n=Storage.get("last_person_info")||"";if(""===n||void 0===n);else{var e=$("#text-box-idCard-box").children("li:last-child");e.find(".info_content_input[name=conName]").val(n.name),e.find(".info_content_input[name=phone]").val(n.phone),e.find(".info_content_input[name=idCard]").val(n.card),e.find(".info_content_input_birthday input").eq(0).val(n.birthday_year),e.find(".info_content_input_birthday input").eq(1).val(n.birthday_year),e.find(".info_content_input_birthday input").eq(2).val(n.birthday_year),$("#text-box-idCard-box").children("li:last-child").find(".sex-kind option").eq(Number(n.sex_kind)-1).attr("selected","true"),$("#text-box-idCard-box").children("li:last-child").find(".card-kind option").eq(Number(n.card_kind)-1).attr("selected","true"),$("#last_phone_input").blur()}}},popup={loading_show:function(){$("#popup").fadeIn(300)},loading_dis:function(){$("#popup").fadeOut(300)}};