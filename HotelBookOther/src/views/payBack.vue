/**
* Created  on 2018/2/27.
*/

<template>
    <div class="payBack">
        <div class="payBack-top">
            <div>
                <img :src="status ? succeedImg : failedImg" alt="">
                <span>{{status ? '订单成功' : '订单失败' }}</span>
            </div>
            <div class="hotel-home">
                <!--<p>上海万和昊美艺术酒店</p>-->
                <p>{{orderInfo.hotelName}}</p>
            </div>
        </div>
        <div class="hotel-img">
            <div class="img-box">
                <img :src="orderInfo.featurePicPath" alt="暂无酒店图片">
            </div>
        </div>
        <div class="info-box">
            <div class='hotel-info'>
                <div>{{orderInfo.hotelName}}</div>
                <p v-if="status">下载ABC旅行预订APP，享受更多优惠</p>
                <div class="payback-btn" @click="downloadApp()" v-text="status ? '下载ABC旅行预订' : '继续支付'"></div>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                succeedImg: require('../assets/img/succeed.png'),
                failedImg: require('../assets/img/failed.png'),
                status: true,
                orderInfo: '',
            }
        },
        created() {
            this.orderInfo = JSON.parse(window.sessionStorage.getItem('orderInfo'))||{};
        },
        computed : {},
        methods : {
            downloadApp(){
                window.location.href = 'http://android.myapp.com/myapp/detail.htm?apkName=com.huicheng.hotel.android'
            }
        }
    }
</script>


<style lang="scss" scoped>
    //@import "../assets/css/payBack";
    .payBack{
        color: #666666;
        width: 100%;
        padding: 0 5%;
        .payBack-top{
            padding: .8rem 0 .78rem;
            width: 100%;
            //margin: 0 auto;
            border-bottom: .01rem solid #e2e2e2;
            text-align: center;
            >div{
                &.hotel-home{
                    padding-top: .44rem;
                }
                >img{
                    width: .66rem;
                    display: inline-block;
                    margin-right: .34rem;
                }
                >span{
                    font-family: PingFangSC-Light;
                    font-size: .36rem;
                }
                >p{
                    font-size: .28rem;
                    font-weight: 600;
                    line-height: .4rem;
                    font-family: PingFangSC-Medium;
                }
            }
        }
        >.hotel-img{
            width: 100%;
            //margin: 0 auto;
            padding-top: .45rem;
            >.img-box{
                width: 100%;
                height: 3.9rem;
                border-radius: .12rem;
                background: #d8d8d8;
                overflow: hidden;
                >img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        >.info-box{
            width: 100%;
            padding: 0 .2rem;
            position: relative;
            text-align: center;
            >.hotel-info{
                height: 1.75rem;
                padding-top: .38rem;
                >div{
                    font-family: PingFangSC-Light;
                    font-size: .36rem;
                    color: #989898;
                }
                >p{
                    font-family: PingFangSC-Medium;
                    color: #666666;
                    font-size: .28rem;
                    line-height: .76rem;
                    font-weight: 600;
                }
                >.payback-btn{
                    width: 100%;
                    line-height: .86rem;
                    color: #ffffff;
                    font-size: .3rem;
                    font-family: PingFangSC-Semibold;
                    background: #ffc012;
                    border-radius: .43rem;
                    margin-top: .2rem;
                }
            }

        }
    }

</style>
