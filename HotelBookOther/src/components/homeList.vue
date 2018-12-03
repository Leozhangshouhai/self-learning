/**
* Created  on 2018/2/26.
*/

<template>
    <div class="home-type" >
        <div class="home-box"  style="display: none">
            <div class="pic-box">
                <img :src="homeInfo.picPath" alt="">
            </div>
            <div class="house-intro">
                <div class="house-name">{{homeInfo.name}}</div>
                <div class="house-other">
                    <span>{{homeInfo.roomArea}}平米</span>
                    <span>{{homeInfo.bedSituation}}</span>
                    <span v-if="!clockRoom">{{breakfastType(homeInfo.breakfastNum)}}</span>
                    <!--<span>{{homeInfo.feature}}</span>-->
                </div>
                <div v-if="clockRoom">
                    <p>入住时段：{{homeInfo.roomTime}}</p>
                    <p>入住时长：{{homeInfo.roomDuration}}小时</p>
                </div>
            </div>
            <div class="house-price">
                <span>￥{{toDecimal(homeInfo.price)}}</span>
                <span class="lowest">起</span>
                <img :class="rotateImg" src="../assets/img/more1.png" alt="">
            </div>
        </div>
        <div class="room">
            <div class="room-img" @click.stop="check('price')">
                <img :src="homeInfo.picPath" alt="">
            </div>
            <div class="room-info">
                <div class="room-name" @click.stop="check('info')">
                    <div>
                        {{homeInfo.name}}
                        <img class="icon_downarrow" src="../assets/img/new/icon_downarrow.png" alt="">
                    </div>
                    <div v-show="clockRoom" class="time-info">
                        <img class="clockRoom-icon" src="../assets/img/new/icon_timeslot.png" alt="">
                        <span class="roomTime">{{homeInfo.roomTime}}</span>
                        <img class="clockRoom-icon" src="../assets/img/new/icon_timelength.png" alt="">
                        <span>{{homeInfo.roomDuration}}小时</span>
                    </div>
                </div>
                <div class="price" @click.stop="check('price')">
                    ￥{{toDecimal(homeInfo.price)}}
                    <!--<img :class="rotateImg" src="../assets/img/more1.png" alt="">-->
                    <img :class="rotateImg" class="icon-enter" src="../assets/img/new/icon_enter.png" alt="">
                </div>
            </div>
        </div>
        <div class="offer-server" v-if="show">
            <div
                class="offline"
                :class="offlineShow ? '' : 'cantpay' "
                @click="toCreate(totalPrice,'02')">
                <span >到店付</span>
                <span class="pay-btn ">￥{{totalPrice}}</span>
            </div>
            <div
                class="online"
                :class="onlineShow ?'' : 'cantpay' "
                @click="toCreate(toDecimal(preTotalPrice),'01')">
                <span>在线付</span>
                <span class="pay-btn ">￥{{toDecimal(preTotalPrice)}}</span>
            </div>
        </div>
        <!--弹出层-->
        <ShowMsg v-bind:dialogCreate ="dialogCreate" v-on:closeDiaLog="closeDiaLog">
            <div class="inner-img">
                <img :src="homeInfo.picPath" alt="">
            </div>
            <div class="inner-info">
                <div class="inner-name">{{homeInfo.name}}</div>
                <div class="inner-list">
                    <div class="inner-list-lable">房间信息</div>
                    <div class="inner-house-info list-content">
                        <span v-for="(item, index) in houseInfo" :key="index">{{item.name}}</span>
                    </div>
                </div>
                <div class="inner-list">
                    <div class="inner-list-lable">房间信息</div>
                    <div class="list-content">
                        <span v-for="(item, index) in bedInfo" :key="index">{{item.name}}</span>
                    </div>
                </div>
                <div class="inner-list">
                    <div class="inner-list-lable">客房设施</div>
                    <div class="list-content">
                        <span v-for="(item, index) in houseBasic" :key="index">{{item.name}}</span>
                    </div>
                </div>
            </div>
        </ShowMsg>

    </div>
</template>
<script>

    import Vue from "vue";
    import fly from '../assets/js/linyer'
    import {Toast, Indicator} from 'mint-ui';
    import ShowMsg from '../components/showMsg'

    Vue.directive('setWidth' ,{
        inserted: function(el, binding){
            let lenght = binding.value.serviceList.length;
            el.style.width = lenght*1.5 + 'rem'
        }
    })


    export default {
        props: ['homedata','datePicker','beginDate','endDate','clockRoom', 'curSelec', 'clear'],
        data() {
            return {
                houseInfo: [],
                bedInfo: [],
                houseBasic: [],
                checkType: '',
                dialogCreate: false,
                show: false,
                rotateImg: '',
                homeInfo: '',
                datePickerTime:{},
                AccessTicket: '',
                preTotalPrice: 0,
                totalPrice: 0,
                onlineShow:false,
                offlineShow:false,
                type: '1',
                hotelId: ''

            }
        },
        created() {
            this.homeInfo = this.homedata;
            this.datePickerTime=this.datePicker;
            this.type = window.sessionStorage.getItem('type')
            this.hotelId = window.localStorage.getItem('hotelId')
            this.AccessTicket = window.sessionStorage.getItem('hotelBookAccessTicket')
        },
        watch:{
            beginDate(newBeginDate,oldBeginDate){
                if(newBeginDate != oldBeginDate){
                    this.show = false;
                    this.preTotalPrice = 0;
                    this.totalPrice = 0;
                    this.rotateImg = ''
                }
            },
            endDate(newEndDate,oldEndDate){
                if(newEndDate != oldEndDate){
                    this.show = false;
                    this.preTotalPrice = 0;
                    this.totalPrice = 0;
                    this.rotateImg = ''
                }
            },
            curSelec(newCurSelec,oldCurSelec){
                console.log(newCurSelec+ 'old' + oldCurSelec)
                if(newCurSelec !== oldCurSelec){
                    this.show = false;
                    this.preTotalPrice = 0;
                    this.totalPrice = 0;
                    this.rotateImg = ''
                }
            },
            clear(newClear, oldClear){
                if(newClear !== oldClear){
                    this.show = false;
                    this.preTotalPrice = 0;
                    this.totalPrice = 0;
                    this.rotateImg = ''
                }
            },
            homedata(newHomedata){
                this.homeInfo = newHomedata;
            }
        },
        computed: {

        },
        methods : {
            closeDiaLog(data){
                this.dialogCreate = data
            },
            breakfastType: function(type){
                if(type == 1){
                    return '单早'
                }else if(type == 2){
                    return '双早'
                }else if(type >= 3){
                    return '多早'
                }else{
                    return '无早'
                }
            },
            check(type){
                this.checkType = type
                if(type == 'price'){
                    if(!this.show){
                        this.brforeRoomDetail(this.datePickerTime)
                    }{
                        this.show = false;
                        this.preTotalPrice = 0;
                        this.totalPrice = 0;
                        this.rotateImg = ''
                    }
                }else{
                    this.brforeRoomDetail(this.datePickerTime)
                }
            },
            toCreate(val,way){
                if(way === '02'){
                    if(this.offlineShow != true ){
                        return
                    }
                }else if(way === '01'){
                    if( this.onlineShow != true){
                        return
                    }
                }
                window.sessionStorage.setItem('homeInfo',JSON.stringify(this.homeInfo));
                window.sessionStorage.setItem('datePickerTime',JSON.stringify(this.datePickerTime));
                window.sessionStorage.setItem('price',val);
                window.sessionStorage.setItem('paytab',way)
                // window.location.href = window.location.origin + window.location.pathname + '#/createOrder'
                window.location.href = `${window.location.origin}/wechat/HotelBook/index.html#/createOrder`
                //this.$router.push({ path: '/createOrder'})
            },
            brforeRoomDetail(datetime={
                login:new Date().getTime().toString(),
                logout:(new Date().getTime() + 86400000).toString()
            }){
                Indicator.open('加载中...');

                const promies = new Promise((resolve,reject) =>{
                    fly.codeAxios({
                        url : this.$api.HOTEL.beforeroomdetail,
                        data : {
                            beginDate : datetime.login,
                            endDate : datetime.logout,
                            type : `${window.sessionStorage.getItem('type')}`,
                            hotelId : `${this.hotelId}`,
                            roomId: `${this.homeInfo.id}`
                        },
                        accessTicket: this.AccessTicket,
                        success: (data) => {
                            Indicator.close();
                            if ( data.data.head.rtnCode == '000000' ) {
                                let getjson = data.data.body;
                                resolve(getjson);
                            }else{
                                Toast(data.data.head.rtnMsg)
                            }

                        }, error: (data) => {
                            Indicator.close();
                            reject(data);
                        }
                    })
                });
                promies.then( val =>{
                    if(val.status === 'true'){
                        this.getRoomDetail(this.datePickerTime)
                    }else{
                        Toast(val.remark)
                    }
                }).catch( error =>{
                    console.log(error)
                })
            },
            getRoomDetail(datetime={
                login:new Date().getTime().toString(),
                logout:(new Date().getTime() + 86400000).toString()
            }){
                const promies = new Promise((resolve, reject) =>{
                    fly.codeAxios({
                        url : this.$api.HOTEL.roomdetail,
                        data : {
                            beginDate :datetime.login,
                            endDate : datetime.logout,
                            type : `${window.sessionStorage.getItem('type')}`,
                            hotelId : `${this.hotelId}`,
                            roomId: `${this.homeInfo.id}`
                        },
                        accessTicket: this.AccessTicket,
                        success : (data) => {
                            if ( data.data.head.rtnCode == '000000' ) {
                                let getjson = data.data.body;
                                resolve(getjson)
                            }else{
                                Toast(data.data.head.rtnMsg)
                            }
                        }, error : function (data) {
                            console.log(data)
                        }
                    })
                })
                promies.then( val => {
                    if(this.checkType == 'price'){
                        this.show = true
                        this.rotateImg = 'rotatepic'
                    }else{
                        this.dialogCreate = true
                    }
                    this.houseInfo = val.serviceList[0].capacityVOList
                    this.bedInfo = val.serviceList[1].capacityVOList
                    this.houseBasic = val.serviceList[2].capacityVOList
                    this.homeInfo.serviceList = this.getServiceList(val.serviceList);
                    let preLenone = val.preTotalPriceList || [];
                    let preLentwo = val.totalPriceList || [];
                    let canOlinePay = window.localStorage.getItem('canOlinePay')
                    if(canOlinePay == 'contOlinePay'){
                        //this.offlineShow = true;
                        this.onlineShow = false;
                        (val.unitPrice !=null && val.unitPrice!= '' && val.onlyOnline ==false) ? this.offlineShow = true : this.offlineShow = false;
                    }else{
                        (val.unitPrice !=null && val.unitPrice!= '' && val.onlyOnline ==false) ? this.offlineShow = true : this.offlineShow = false;
                        (val.preUnitPrice!=null && val.preUnitPrice!='') ? this.onlineShow = true : this.onlineShow = false ;
                    }


                    for (let i = 0 ; i < preLenone.length ; i++){
                        this.preTotalPrice += parseFloat(preLenone[i].price || 0)
                    }
                    for (let i = 0 ; i < preLentwo.length ; i++){
                        this.totalPrice += parseFloat(preLentwo[i].price || 0)
                    }
                    this.preTotalPrice = Math.floor(this.preTotalPrice)
                    this.totalPrice = Math.floor(this.totalPrice)
                })
            },
            getServiceList(list){
                let listA = []
                for(let i=0; i< list.length; i++){
                    if(list[i].capacityVOList){
                        for(let j=0 ; j< list[i].capacityVOList.length ; j++){
                            listA.push({
                                name: list[i].capacityVOList[j].name,
                                iconUrl: list[i].capacityVOList[j].iconUrl
                            })
                        }
                    }
                }
                return listA
            },
            toDecimal(val){
                return fly.toDecimal(val)
            }

        },
        components: {
            ShowMsg
        }
    }
</script>


<style lang="scss">
   .home-type{
       width: 100%;
       padding: 0 .4rem;
       margin-bottom: .56rem;
        >.home-box{
            padding: .18rem;
            font-size: 0;
            box-shadow: 0 .04rem .08rem 0 rgba(0,0,0,.1);
            >div{
                font-size: .32rem;
                display: inline-block;
                vertical-align: middle;
                &.pic-box{
                    width: 2rem;
                    height: 1.44rem;
                    overflow: hidden;
                    border-radius: .1rem;
                    >img{
                        width: 100%;
                        height: 100%;
                    }
                }
                &.house-intro{
                    width: 3.05rem;
                    padding: .2rem 0 .2rem .2rem;
                    border-right: .01rem solid #e7e7e7;
                    div{
                        color: #000;
                        font-size: 0;
                        &.house-name{
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-family: PingFangSC-Regular;
                            font-size: .28rem;
                            margin-bottom: .1rem;
                            line-height: normal;
                        }
                        &.house-other{
                            margin-bottom: .1rem;
                        }
                        >span{
                            font-size: .26rem;
                            margin-right: .12rem;
                        }
                        >p{
                            font-size: .2rem;
                            margin-right: .12rem;
                            line-height: .3rem;
                            margin-bottom: .1rem;
                        }
                    }
                }
                &.house-price{
                    width: 2rem;
                    text-align: right;
                    >img{
                        width: .18rem;
                        display: inline-block;
                        &.rotatepic{
                            transform:rotate(90deg);
                        }
                    }
                    >span{
                        color: #555555;
                        font-size: .4rem;
                        &.lowest{
                            font-size: .22rem;
                        }
                    }
                }
            }
        }
        >.offer-server{
            position: relative;
            &:before{
                position: absolute;
                content: '';
                top: -.1rem;
                right: .6rem;
                width:0;
                height:0;
                border-left:.1rem solid transparent;
                border-right:.1rem solid transparent;
                border-bottom:.1rem solid #06182f;
            }
            width: 100%;
            height: 1.1rem;
            border-radius: .1rem;
            background: #06182f;
            padding: 0 .34rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: .27rem;
            >div{
                width: 2.55rem;
                height: .72rem;
                line-height: .7rem;
                text-align: center;
                border: .02rem solid #ffffff;
                font-family: PingFangSC-Regular;
                border-radius: .1rem;
                font-size: .24rem;
                background: #06182f;
                span{
                    display: inline-block;
                    vertical-align: middle;
                    line-height: .7rem;
                }
                &.offline{
                    color: #ffffff;
                    background: #06182f;
                }
                &.online{
                    color: #06182f;
                    background: #fff;
                    border: .02rem solid #ffffff;
                }
                &.cantpay{
                    color: #06182f;
                    border-color:#ffffff;
                    background: #ffffff;
                }
            }
        }
       >.room{
           .room-img{
               width: 100%;
               height: 3.6rem;
               border-radius: .1rem;
               overflow: hidden;
               >img{
                   width: 100%;
                   height: 100%;
               }
           }
           .room-info{
               display: flex;
               justify-content: space-between;
               align-items: center;
               padding-top: .3rem;
               color: #06182f;
               .room-name{
                   font-size: .32rem;
                   .time-info{
                       padding-top: .16rem;
                       span{
                           font-size: .22rem;
                       }
                   }
                   .roomTime{
                       margin-right: .3rem;
                   }
                   .icon_downarrow{
                       width: .08rem;
                       display: inline-block;
                       margin-top: .1rem;
                   }
                   .clockRoom-icon{
                       width: .21rem;
                       display: inline-block;
                   }
               }
               .price{
                   font-size: .5rem;
                   .icon-enter{
                       width: .11rem;
                       display: inline-block;
                       margin-top: -.05rem;
                   }
                   .rotatepic{
                       transform:rotate(90deg);
                   }
               }
           }
       }
   }
   .inner-img{
       width: 100%;
       height: 3.68rem;
       overflow: hidden;
       border-radius: .1rem .1rem 0 0;
       img{
           width: 100%;
           height: 100%;
       }
   }
   .inner-info{
       padding-left: .45rem;
       padding-right: .45rem;
       .inner-name{
           padding-top: .5rem;
           padding-bottom: .38rem;
           color: #000;
           font-size: .34rem;
           font-weight: bold;
       }
       .inner-list{
            .inner-list-lable{
                color: #002347;
                font-size: .26rem;
                font-weight: bold;
            }
           .list-content{
               padding-top: .24rem;
               padding-bottom: .4rem;
               span{
                   display: inline-block;
                   min-width: 25%;
                   font-size: .24rem;
                   color: #000;
                   line-height: .36rem;
                   padding-right: .1rem;
               }
           }
       }
   }


</style>
