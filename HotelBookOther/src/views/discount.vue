<template>
    <div class="payBack">
        <!--<Myhead title="我的优惠券"></Myhead>-->
        <div class="img-box">
            <mt-swipe @change="handleChange" class="dl" :auto="0">
                <mt-swipe-item class="dd"  v-for="(dd,index) in discountList" :key="index">
                    <div class="conten-out">
                        <img class="imgbottom" :src="dd.featurePicPath==''?img:dd.featurePicPath" alt="">
                        <img class="imgtop" src="../assets/img/discount1.png" alt="">
                        <div class="conten-box">
                            <h4 class="ddh4">{{dd.name}}</h4>
                            <p class="ddp">{{dd.rootRule}}</p>
                            <div class="ddinfo">
                                <p>凭证号：{{dd.code}}</p>
                                <p>有效期：{{dd.startTime}}---{{dd.activeTime}}</p>
                            </div>
                        </div>
                    </div>
                </mt-swipe-item>
            </mt-swipe>

        <div class="tips">
            <p class="title">使用规则</p>
            <dl>
                <dd v-for="dd in rulerList">
                    {{dd}}
                    <!--{{discountList[rulerIndex].detailRule}}-->
                </dd>
                <!--<dd>1.本券在酒店支付订单时可使用；</dd>-->
                <!--<dd>2.每个订单仅限使用一张；</dd>-->
                <!--<dd>3.可与旅行包叠加；</dd>-->
            </dl>
        </div>
        <div class="btn" v-if="use" @click="useDiscount">
            立刻使用
        </div>
    </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import Myhead from "../components/navTop";
    import imgbottom from '../assets/img/discount.png';
    import fly from '../assets/js/linyer'
    import {Swipe, SwipeItem} from 'mint-ui';

    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);

    export default {
        data() {
            return {
                discountList: [
                    {
                        rootRule: '12312',
                        name: '123',
                        code: '1231',
                        featurePicPath: '',
                        activeTime: '1521384466064',
                        startTime: '1521084466064'
                    }
                ],
                img: '',
                AccessTicket: '',
                datePickerTime: {},
                rulerIndex:0,
                timePbj: {},
                hotelInfo: {
                    hotelid: window.localStorage.getItem('hotelId'),
                    type: window.sessionStorage.getItem('type'),
                    money: window.sessionStorage.getItem('totalmoney')
                },
            }
        },

        created() {
            this.img = imgbottom;
            this.datePickerTime = JSON.parse(window.sessionStorage.getItem('datePickerTime'));
            this.timePbj = {
                beginDate: this.datePickerTime.login,
                endDate: this.datePickerTime.logout
            };

            this.AccessTicket = window.sessionStorage.getItem("hotelBookAccessTicket");
            this.getDiscount();
        },
        components: {
            Myhead,

        },
        computed: {
            use() {
                return this.$route.query['use'];
            },
            rulerList(){
                let string=this.discountList[this.rulerIndex].detailRule||'无';
                console.log(string)
                let arr=string.split('|');
                console.log(arr)
                return arr;
            }
        },
        methods: {
            getDiscount() {
                let data = Object.assign({}, this.hotelInfo, this.timePbj)
                fly.codeAxios({
                    url: this.$api.HOTEL.discount,
                    data: data,
                    accessTicket: this.AccessTicket,
                    success: data => {
                        let arr= data.data.body.coupon;
                        for(let i=0 ;i<arr.length;i++){
                            arr[i].activeTime=new Date(arr[i].activeTime).toLocaleString().split(' ')[0];
                            arr[i].startTime=new Date(arr[i].startTime).toLocaleString().split(' ')[0];
                        }
                        this.discountList = data.data.body.coupon;
                        window.sessionStorage.setItem('discountId',this.discountList[0].id);
                        window.sessionStorage.setItem('discountName',this.discountList[0].name);
                    }
                })
            },
            useDiscount() {
                this.$router.push({path: '/createOrder'})
            },
            handleChange(index){
                this.rulerIndex=index;
                window.sessionStorage.setItem('discountId',this.discountList[index].id)
                window.sessionStorage.setItem('discountName',this.discountList[index].name);
            }
        }
    }
</script>


<style lang="scss">

    * {
        box-sizing: border-box;
    }


        .dl {
            /*width: 100%;*/
            padding: 0 .375rem;
            margin-top: .1rem;
            height: 4.43rem !important;
            .dd {
                /*color: red;*/
                font-size: .24rem;
                display: inline-block;
                width: 6.37rem;
                margin-right: .25rem;
                border-radius: .08rem;
            }
        }


    $title: .28rem;
    .title {
        color: #00005f;
        font-size: $title;
        padding: .5rem 0 .3rem 0;
    }

    .imgbottom {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
    }
    .conten-out{
        width: 100%;
        height: 100%;

    }
    .imgtop {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2;
    }

    .ddh4 {
        padding-left: .35rem;
        font-size: .36rem;
        padding-top: .6rem;
        padding-bottom: .3rem;
    }
    .conten-box{
        color: #fff;
        height: 100%;
        width: 100%;
        background: rgba(44, 37, 90, 0.72);
    }
    .ddp {
        padding-left: .35rem;

    }

    .ddinfo {
        position: absolute;
        left: .35rem;
        bottom: .7rem;
        p {
            padding: .1rem 0;

        }
    }

    .tips {
        text-align: center;
        padding: 0 .375rem;
        dl {
            dd {
                text-align: left;
                padding: .1rem 0;
                font-size: .36rem;
            }
        }
    }

    .btn {
        height: .8rem;
        line-height: .8rem;
        color: white;
        background-color: #00005f;
        text-align: center;
        border-radius: 2rem;
        margin-left: 5%;
        position: fixed;
        display: inline-block;
        width: 90%;
        bottom: .4rem;
    }
    /*.mint-swipe-items-wrap > div{*/
        /*position:relative !important;*/
    /*}*/
</style>
