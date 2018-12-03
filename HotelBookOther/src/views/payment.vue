<template>
    <div class="payBack">
        <!--<Myhead title="支付方式"></Myhead>-->
        <div class="content">
            <div class="content-detail">
                <div class="left"><p>订单：</p></div>
                <div class="middle">
                    <!--<p>{{info.name}}</p>-->
                    <p>{{info.roomName}}</p>
                    <p>{{info.checkInAndOutDate}}</p>
                </div>
                <div class="right">
                    <!--<p></p>-->
                    <p>{{info.custCount}}间</p>
                    <p>{{info.during/24}}晚</p>
                </div>
            </div>
            <div class="totle">
                <span>订单总价：</span>
                <span class="price">￥{{Math.floor(info.totalPrice)}}</span>
                <button @click="checkDetail">明细</button>
            </div>
        </div>
        <p class="tips">订单请在{{deadtime}}前完成付款。（15分钟内完成支付)</p>
        <p class="tips-title">订单确认后，不可取消或修改</p>
        <div class="payBtnBox">
            <button @click="payment">支付</button>
        </div>
        <!--明细-->
        <detailBox ref="profile"></detailBox>
    </div>
</template>
<script>
    import Myhead from "../components/navTop";
    import detailBox from "../components/detail-box";
    import fly from '../assets/js/linyer'
    import wxApi from '../assets/js/wxApi';
    import { Toast,Indicator} from 'mint-ui';
    export default {
        data() {
            return {
                info: {
                    hotelName: 'ADC旅行酒店',
                    roomName: '豪华双人床',
                    checkInAndOutDate: '10月27-10月29日',
                    custCount: '1',
                    during: '2',
                    totalPrice: '750'
                },
            }
        },
        components: {
            Myhead,
            detailBox
        },
        created() {
            console.log(1);
            this.info = JSON.parse(window.sessionStorage.getItem('orderInfo'))
            console.log(this.info)
        },
        computed: {
            deadtime() {
                let now = new Date(new Date().getTime() + 60000 * 15).toString().split(' ');
                return now[4];
            }
        },
        methods: {
            checkDetail(){
                this.$refs.profile.checkDetail()
            },
            payment(){
                let data = {
                    assureAmount:0,
                    orderAmount:this.info.totalPrice,
                    hotelid: window.localStorage.getItem('hotelId')
                }
                Indicator.open('加载中...');
                // const promise = new Promise((resolve,reject) => {
                    fly.codeAxios({
                        url: this.$api.HOTEL.Create,
                        data: data,
                        success:  (data) => {
                            Indicator.close();
                            if ( data.data.head.rtnCode == '000000' ) {
                                var myhrefs = document.domain;
                                var encode=encodeURIComponent('/wechat/HotelBook/index.html#/payBack') 
                                var hrefUrl='http://'+myhrefs+encode;
                                var apiUrl= '/hmp_website/assure/pay'
                                console.log('http://'+ myhrefs+apiUrl+'?orderNo='+this.info.orderNo+
                                 '&returnUrl='+hrefUrl)
                                window.location.href ='http://'+ myhrefs+apiUrl+'?orderNo='+this.info.orderNo+
                                '&returnUrl='+hrefUrl;
                            }else{
                                Toast(data.data.head.rtnMsg)
                            }
                        }
                    })
                // })
                // promise.then(res => {
                //     console.log(res)
                //     //支付成功
                //     // if(res.status && res.status === 'noneedpay'){
                //     //     this.$router.push({path: '/payBack'})
                //     // }else{
                //     //     wxApi.chooseWXPay(res)
                //     // }
                // })
            }
        }
    }
</script>


<style lang="scss">
    .content {
        margin: 0 5%;
        border-bottom: 1px solid #bbbbbb;
        * {
            box-sizing: border-box;
        }
        .content-detail {
            width: 100%;
            padding: .44rem 0;
            font-size: 0;
            color: black;
            div {
                display: inline-block;
                font-size: .32rem;
                vertical-align: top;
                p {
                    padding: .05rem 0;
                }
            }
            .left {
                width: 15%;
            }
            .right {
                width: 20%;
            }
            .middle {
                width: 65%;
            }

        }
        .totle {
            font-size: .48rem;
            padding-bottom: .54rem;
            * {
                vertical-align: middle;
            }
            .price {
                color: #9aca3f;
                font-weight: bold;
                padding: 0 .4rem;

            }
            button {
                border: none;
                outline: none;
                background-color: #9aca3f;
                text-align: center;
                border-radius: 1rem;
                color: white;
                font-size: .3rem;
                padding: 0 .2rem;
            }

        }
    }

    .tips {
        padding: .2rem 5% 1.12rem 5%;
        font-size: .34rem;
        line-height: .6rem;
    }

    .tips-title {
        font-size: .36rem;
        color: #9aca3f;
        text-align: center;
    }

    .payBtnBox {
        padding: .2rem 5%;
        position: fixed;
        bottom: 0;
        box-shadow: 0 -2px 4px #bbbbbb;
        border-top: 1px solid #bbbbbb;
        width: 100%;
        button {
            text-align: center;
            color: white;
            font-size: .36rem;
            background-color: #9aca3f;
            outline: none;
            border: none;
            border-radius: .3rem;
            padding: .22rem 0;
            width: 100%;
            display: inline-block;
        }

    }

</style>
