<template>
    <div v-if="show"
         class="detail-box"
         id="detailbox"
         @click="handleClose">
        <ul class="detail-list animated" :class="currClass">
            <li class="name">
                <div class="left">明细</div>
            </li>
            <li class="cost">
                <div class="left">
                    <div>房费</div>
                    <div class="during">
                        <span>{{orderDetail.checkInAndOutDate}}</span>
                        <span>{{orderDetail.breakfast}}</span>
                    </div>
                </div>
                <div class="right">
                    <div>{{parseInt(orderDetail.roomPrice)}}</div>
                    <!--<div class="during">{{`${orderDetail.numberRoom}×${orderDetail.totalMoney}`}}</div>-->
                </div>
            </li>
            <li class="discount" v-if="orderDetail.attachInfo.length >0 ">
                <div v-for="(item, index) in orderDetail.attachInfo" :key="index">
                    <div class="left">{{item.serviceName}}</div>
                    <div class="right">{{parseInt(item.orderMoney)}}</div>
                </div>

            </li>
            <li class="all-money">
                <div class="left">总价</div>
                <div class="right">{{parseInt(orderDetail.amount)}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import fly from '../assets/js/linyer'
    import {Toast, Indicator} from 'mint-ui';
    export default {
        data(){
            return {
                currClass: 'slideInUp',
                orderId: '',
                show: false,
                orderDetail: {
                    // homePic: require('../assets/img/homelist01.png'),
                    // homeName: '巴洛克英伦欧式大床房',
                    // numberRoom: 1,
                    // during: '10月14日-10月15日',
                    // dayS: 2,
                    // homeInfo: [ '78平米', '大床', '不含早'],
                    // hoteltel: '(0575)87265413',
                    // totalMoney: '1152',
                    // status: '已确认',
                    // hotleName: 'ABC旅行酒店',
                    // addr: '嘉善县西塘镇内王阁20号（紧邻烟雨长廊酒吧一条街）',
                    // payWay: '到店付'
                },
            }
        },
        created(){
            this.orderId =this.$route.query.orderid || JSON.parse(window.sessionStorage.getItem('orderInfo')).orderId
        },
        methods: {
            handleClose: function (el) {
                let event = el.target
                if(event.id == 'detailbox'){
                    this.currClass = 'slideInDown'
                    setTimeout( () => {
                        this.show = false
                        this.currClass = 'slideInUp'
                    }, 500)
                }
            },
            checkDetail(){
                Indicator.open('加载中...');
                const promies = new Promise( (resolve,reject) => {
                    let data = {
                        orderId: this.orderId,
                        orderType: '1'
                    }
                    fly.codeAxios({
                        url: this.$api.HOTEL.shortdetail,
                        data: data,
                        accessTicket: window.sessionStorage.getItem('hotelBookAccessTicket'),
                        success: data => {
                            Indicator.close();
                            if ( data.data.head.rtnCode == '000000' ) {
                                let getjson = data.data.body;
                                resolve(getjson);
                            }else{
                                Toast(data.data.head.rtnMsg)
                            }
                        },
                        error: err => {
                            reject(err)
                            Indicator.close();
                        }
                    })
                });
                promies.then( res => {
                    this.show = true;
                    //真实数据
                    this.orderDetail = res;
                    this.show = true;
                }).catch( err => {
                    Toast(err)
                })

            },

        }
    }
</script>

<style scoped lang="scss">
    .detail-box{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1111;
        background: rgba(0,0,0,.3);
        >.detail-list{
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
            background: #ffffff;
            li{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-left: .44rem;
                padding-right: .3rem;
                border-bottom: .01rem solid #cccccc;
                font-size: .32rem;
                >div{
                    font-family: PingFangSC-Regular;
                    font-size: .32rem;
                    color: #3c3c3c;
                    line-height: .45rem;
                    margin-bottom: .1rem;
                }
                &.name{
                    padding-top: .24rem;
                    padding-bottom: .16rem;
                }
                &.cost{
                    padding-top: .2rem;
                    padding-bottom: .22rem;
                    .during{
                        line-height: .4rem;
                        color: #999999;
                        font-size: .28rem;
                        /*>span:last-child{*/
                            /*margin-left: .2rem;*/
                        /*}*/
                    }

                }
                &.discount{
                    padding-bottom: .18rem;
                    padding-top: .14rem;
                    line-height: .45rem;
                    >div{
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                }
                &.all-money{
                    padding-bottom: .2rem;
                    padding-top: .2rem;
                }
                &:last-child{
                    border: 0;
                }
            }
        }
    }

    .animated {
        -webkit-animation-duration: .5s;
        animation-duration: .5s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @keyframes slideInDown {
        from {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            visibility: visible;
        }
        to {
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
        }
    }

    .slideInDown {
        -webkit-animation-name: slideInDown;
        animation-name: slideInDown;
    }

    @keyframes slideInUp {
        from {
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
            visibility: visible;
        }

        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }

    .slideInUp {
        -webkit-animation-name: slideInUp;
        animation-name: slideInUp;
    }

</style>
