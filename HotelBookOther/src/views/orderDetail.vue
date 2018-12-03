/**
* Created  on 2018/3/8.
*/

<template>
    <div class="orderDetail">
        <div class="top-home-name shadow-box">
            <div class="top-info">
                <span>{{orderDetail.roomName}}</span>
                <span class="numberRoom">{{orderDetail.roomCnt}}间</span>
            </div>
            <div class="pay-info-box ">
                <div class="list">
                    <div class="name">订单金额</div>
                    <div @click="checkDetail">
                        <span class="money">￥{{parseInt(orderDetail.amount)}}</span>
                        <span class="detail">明细</span>
                    </div>
                </div>
                <div class="list">
                    <div class="name">支付方式</div>
                    <div class="way">{{orderDetail.payWay==1?'到店付':'在线付'}}</div>
                </div>
            </div>
        </div>
        <div class="info-box shadow-box">
            <div class="left">
                <!--<div class="title">{{orderDetail.hotleName}}</div>-->
                <div class="info">
                    <span class="addr">酒店地址：</span>{{orderDetail.hotelAddress}}
                </div>
            </div>
            <div class="right" @click="gomap">
                <div>查看路线</div>
            </div>
        </div>
        <div class="info-box shadow-box tel-box">
            <div class="left">
                <!--<div class="title">{{orderDetail.homeName}}</div>-->
                <div class="info">
                    <span class="addr">酒店电话：</span>{{orderDetail.hotelPhone}}
                </div>
            </div>
            <!--<div class="right">-->
            <!--<div><a :href=orderDetail.hoteltel>联系酒店</a></div>-->
            <!--</div>-->
        </div>
        <div class="info-list-box shadow-box">
            <ul>
                <li v-for="(val,key,index) in changeinfo">
                    <span>{{dictionary[key]}}</span>
                    <input v-if="edit" type="text" maxlength="11" v-model="changeinfo[key]">
                    <span v-else>{{val}}</span>
                </li>
                <li>
                    <span>订单号</span>
                    <span>{{orderDetail.orderNO}}</span>
                </li>
                <li>
                    <span>发票信息</span>
                    <span>{{orderDetail.invoice}}</span>
                </li>
            </ul>
        </div>
        <div class="btn-box">
            <div v-show="showBtn.gotopay" class="to-pay com-box" @click="toPay">去支付</div>
            <div class="order-handle" v-show="showBtn.changeorder">
                <div @click="cancelOrder">取消订单</div>
                <div @click="changeOrder" v-text="changeText" :class="edit?'surechange':''"></div>
            </div>
            <!--<div class="com-box">去评价</div>-->
            <div class="com-box agin-box" v-show="showBtn.onceagain" @click="orderagain">再次预订</div>
        </div>

        <!--明细-->
        <detailBox ref="profile"></detailBox>

    </div>
</template>
<script>

    import fly from '../assets/js/linyer'
    import WX from '../assets/js/wxApi'
    import {Toast, Indicator} from 'mint-ui';
    import {MessageBox} from 'mint-ui';

    import detailBox from '../components/detail-box'

    export default {
        data() {
            return {
                showBtn: {
                    onceagain: false,
                    changeorder: false,
                    gotopay: false
                },
                edit: false,
                changeText: '修改订单',
                show: false, //是否展示明细
                changeinfo: {},
                orderDetail: {
                    /*     homePic: require('../assets/img/homelist01.png'),
                         homeName: '巴洛克英伦欧式大床房',
                         numberRoom: 1,
                         during: '10月14日-10月15日',
                         dayS: 2,
                         homeInfo: [ '不含早'],
                         hoteltel: '(0575)87265413',
                         totalMoney: '1152',
                         status: '已确认',
                     hotleName: 'ABC旅行酒店',
                         addr: '嘉善县西塘镇内王阁20号（紧邻烟雨长廊酒吧一条街）',
                         payWay: '到店付',
                         name: '小宝',
                         phone: '15182911111',
                         orderID: '123131232244',
                         invoice: '不需要发票',
                         policy: '到店付订单保留至00:00',
                         AccessTicket: ''*/
                },
                orderId: '',
                dictionary: {
                    guest: '入住人',
                    guestMobile: '联系电话',
                    specialComment: '特殊要求'
                },
                AccessTicket: '',
                needinfo: ['guest', 'guestMobile', 'orderNO', 'invoice', 'specialComment']
            }
        },
        created() {
            this.AccessTicket = window.sessionStorage.getItem('hotelBookAccessTicket');
            console.log(this.AccessTicket);
            this.orderId = this.$route.query['orderid'];
            fly.codeAxios({
                url: this.$api.HOTEL.orderdetail,
                data: {
                    'orderId': this.orderId,
                    'orderType': '1'
                },
                accessTicket: this.AccessTicket,
                success: (res) => {
                    Indicator.close();
                    console.log(res);
                    if (res.data.head.rtnCode === '000000') {
                        //成功
                        console.log(res.data.body);
                        this.orderDetail = res.data.body;
                        //this.orderDetail.status = 2;
                        this.changeinfo = {
                            guest: this.orderDetail.checkInName,
                            guestMobile: this.orderDetail.checkInTel,
                            specialComment: this.orderDetail.specialComment == '' ? '无' : this.orderDetail.specialComment
                        };
                        if (this.orderDetail.status == 2) {
                            //    待支付
                            this.showBtn.changeorder = true;
                            this.showBtn.onceagain = true;
                            this.showBtn.gotopay = true;

                        } else if (this.orderDetail.status == 1 || this.orderDetail.status == 5) {
                            //已完成 已确认
                            this.showBtn.onceagain = true;
                        }
                        if (this.orderDetail.status == 8) {
                            //待确认
                            this.showBtn.changeorder = true;
                            this.showBtn.onceagain = true;
                        }if(this.orderDetail.status == -1){
                            this.showBtn.onceagain = true;
                        }

                    } else {
                    }
                },
                error: function (res) {
                    console.log(res)
                }
            });

        },
        computed: {},
        methods: {
            orderagain() {
                let hotelId = window.localStorage.getItem('hotelId')
                let appId = window.localStorage.getItem('wxappid')
                this.$router.push(`/index?hotelId=${hotelId}&appId=${appId}`)
            },
            gomap() {
                let obj = {
                    hotel: this.orderDetail.coordinate.split('|')[0] + ',' + this.orderDetail.coordinate.split('|')[1]
                };
                window.location.href = `http://m.amap.com/navigation/index/daddr=${this.orderDetail.coordinate.split('|')[0]}%2C${this.orderDetail.coordinate.split('|')[1]}%2C${this.orderDetail.name}`

            },
            cancelOrder() {
                MessageBox({
                    title: '提示',
                    message: '确定取消该订单?',
                    showCancelButton: true
                }).then(action => {
                    console.log(action)
                    if (action === 'confirm') {
                        fly.codeAxios({
                            url: this.$api.HOTEL.cancelorder,
                            data: {
                                orderId: this.orderId
                            },
                            accessTicket: this.AccessTicket,
                            success: (res) => {
                                Indicator.close();
                                console.log(res);
                                if (res.data.head.rtnCode === '000000') {
                                    //成功
                                    let toast = Toast({
                                        message: res.data.body.tips,
                                        iconClass: 'icon icon-success'
                                    });
                                    setTimeout(() => {
                                        toast.close();
                                        this.$router.push('/orderList')
                                    }, 2000);
                                    // Toast(res.data.body.tips);
                                    console.log(res.data.body.tips);

                                } else {
                                }
                            },
                            error: function (res) {
                                console.log(res)
                            }
                        });
                    }
                });
            },
            checkDetail() {
                this.$refs.profile.checkDetail()
            },
            changeOrder() {
                if (this.edit) {
                    let param = JSON.stringify(this.changeinfo);
                    param = JSON.parse(param);
                    param.orderId = this.orderId;
                    fly.codeAxios({
                        url: this.$api.HOTEL.changeorderdetail,
                        data: param,
                        accessTicket: this.AccessTicket,
                        success: (res) => {
                            Indicator.close();
                            console.log(res);
                            if (res.data.head.rtnCode === '000000') {
                                //成功
                                console.log(res.data.body);

                            } else {
                            }
                        },
                        error: function (res) {
                            console.log(res)
                        }
                    });

                    this.edit = !this.edit;
                    this.changeText = '修改订单';
                } else {
                    this.edit = !this.edit;
                    this.changeText = '确认修改';
                }


            },
            toPay(){
                var myhrefs = document.domain;
                var encode=encodeURIComponent('/wechat/HotelBook/index.html#/payBack') 
                var hrefUrl='http://'+myhrefs+encode;
                var apiUrl= '/hmp_website/assure/pay'
                console.log('http://'+ myhrefs+apiUrl+'?orderNo='+this.orderDetail.orderNO+
                    '&returnUrl='+hrefUrl)
                window.location.href ='http://'+ myhrefs+apiUrl+'?orderNo='+this.orderDetail.orderNO+
                '&returnUrl='+hrefUrl;
            },
            check(){
                //window.location.href = 'http://m.amap.com/navigation/index/daddr=104.188206%2C30.858513%2C'+'歪嘴饭店'
            }
        },
        components: {
            detailBox
        }
    }
</script>


<style lang="scss">
    @import "../assets/css/orderDetail";

    .surechange {
        background-color: #00005f;
        color: white;
    }</style>
