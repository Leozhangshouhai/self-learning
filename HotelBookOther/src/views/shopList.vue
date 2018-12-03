<template>
    <div class="orderdetail">
        <div class="dv15"></div>
<div class="detail">
    <div class="detailimg">
    <img :src="info.commodityImageUrl" 
    alt="" style="width: 7rem;height: 4.5rem;border-radius: 5px;">
    </div>
    <div class="detailtxt">
        <div class="txt1">{{info.commodityName}}</div>
        <div class="hotelname">酒店名称：<span class="names">{{info.hotelName}}</span></div>
        <div class="hotelname" v-for="(item,index) in info.commodityAttrAndValues" :key="index">{{item.attrName}}：<span class="names">{{item.attrValue}}</span></div>
        <div class="hotelname">数量：<span class="names">{{info.orderBoughtNumber}}{{info.unitName}}</span></div>
        <div class="hotelname">总价：<span class="names">{{info.orderMoney}}</span></div>
        <div class="hotelname" v-show="info.postAddress">{{dizhi}}：<span class="names">{{info.postAddress}}</span></div>
    </div>
    <div class="detailtxt">
        <div class="hotelname">订单编号：<span class="names">{{info.orderNo}}</span></div>
        <div class="hotelname">下单时间：<span class="names">{{info.orderCreateDate}}</span></div>
        <div class="hotelname">订单状态：<span class="names">{{info.orderStatusName}}</span></div>
         <div class="hotelname" v-show="info.checkCode">核销码：<span class="names">{{info.checkCode}}</span></div>
    </div>
    <div class="zhifu1" v-show="show=='00'"></div>
    <div class="detailtxt" v-if="show!='00'">
        <!-- <div class="hotelname">支付方式：<span class="names">{{info.payWayName}}</span></div> -->
        <div class="hotelname">支付时间：<span class="names">{{info.payTime}}</span></div>
    </div>
    
    <div class="zhifu" v-else @click="payment">
        立即支付
    </div>

</div>
    </div>
</template>
<script>
import Vue from "vue";
import fly from "../assets/js/linyer";
import wechat from '../assets/js/weChat';
import { Toast,Indicator} from 'mint-ui';
export default {
  data() {
    return {
        info:{},
        orderId:wechat.getUrlStr('orderId'),
        show:'',
        hotelId:window.localStorage.getItem('hotelId'),
        orderNo:'',
        dizhi:''

    };
  },
  created() {
this.getInfo();

  },
  computed: {},
  methods: {
       payment(){
        var myhrefs = document.domain;
        var encode=encodeURIComponent("/wechat/deposit/agreementList.html?attachedData="+this.hotelId) 
        var hrefUrl='http://'+myhrefs+encode;
        var apiUrl= '/wechat-mall/pay'
        window.location.href ='http://'+ myhrefs+apiUrl+'?orderNo='+this.orderNo+
        '&returnUrl='+hrefUrl;
    //     let data={
    //         orderNo:this.orderNo,
    //         returnUrl:hrefUrl
    //     }
    // fly.AxiosB({
    //     url: this.$api.HOTEL.pay,
    //     data:data,
    //     success: (res) => {
    //         if(res.data.rtnCode === '0000'){
      
    //         }else{
    //             Toast({
    //                 message:rtnMsg,
    //             });
    //         }
    //     }

    // })
    },
      getInfo(){
        fly.AxiosGet({
        url : this.$api.HOTEL.info+this.orderId,
        success : (res) =>{
        Indicator.close();
        console.log(res.data.data)
        // this.info=res.data.data
        if(res.data.rtnCode == '0000'){
        this.info=res.data.data
        this.consumeWayCode=res.data.data.consumeWayCode
        if(this.consumeWayCode=="03"){
           this.dizhi="地址"
        }else{
           this.dizhi="备注" 
        }
        this.show=res.data.data.orderStatusCode
        this.orderNo=res.data.data.orderNo
        }else{
        Toast(res.data.head.rtnMsg)
        }

        },
        error : (err) =>{
        }
        })
      }
    //      to(){
    //     this.$router.push('index1')
    // }
  }
};
</script>

<style>
/* .orderdetail{
    background-color: #eeeeee;

} */
.dv15{
    width: 100%;
    height: .15rem;
    background-color: #eeeeee;
}
.detail{
    /* margin-top: .15rem; */
    padding: .1rem .25rem .25rem .25rem;
    background-color: #ffffff;
    /* border-bottom: 1px solid #cfcfcf; */
}
.detailimg{
    padding: 0rem 0rem .25rem;
    border-bottom: 1px solid #cfcfcf;
}
img {
    width: 100%;
    display: block;
    padding: 0;
    margin: 0;
}
.txt1{
    padding: .15rem 0;
    color: #333333;
    font-size: .36rem;
    font-weight: 600;
    line-height: .36rem;
}
.hotelname{
    font-size: 16px;
    color: #000000;
    padding: .1rem 0;
}
.detailtxt{
    padding: .1rem 0 .28rem;
    border-bottom: 1px solid #cfcfcf;
}
.names{
    /* position: absolute; */
    width: 50%;
    /* margin-left: 30%; */
    left: 30%;
    color: #4a4a4a;
        float: right;
    margin-right: 1.5rem;
}
.detailtxt:last-child{
    border: 0;
}
.zhifu{
position: fixed;
    bottom: 0;
    width: 7rem;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    font-size: .36rem;
    background-color: #1FA71F;
    color: #ffffff;
}
.zhifu1{
    height: 1.5rem;
}
</style>