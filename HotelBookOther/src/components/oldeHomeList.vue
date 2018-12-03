/**
* Created  on 2018/2/26.
*/

<template>
    <div class="home-type" >
        <div class="home-box" @click.stop="check(homeInfo.id)">
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
        <div class="offer-server" v-if="show">
            <!--<div class=""></div>-->
            <img class="gradient" src="../assets/img/shaderight.png" alt="">
            <img class="gradientleft" src="../assets/img/shadeleft.png" alt="">
            <div class="offer-inner">
                <div class="list-con" v-setWidth="homeInfo">
                    <div v-for="(itme,pindex) in homeInfo.serviceList" :key="pindex" >
                        <img :src="itme.iconUrl" alt="">
                        <p>{{itme.name}}</p>
                    </div>
                </div>

            </div>
            <div class="pay-way">
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
        </div>
    </div>
</template>
<script>

    import Vue from "vue";
    import fly from '../assets/js/linyer'
    import {Toast, Indicator} from 'mint-ui';

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
            check(){
                if(!this.show){
                    this.brforeRoomDetail(this.datePickerTime)
                }{
                    this.show = false;
                    this.preTotalPrice = 0;
                    this.totalPrice = 0;
                    this.rotateImg = ''
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
                window.location.href = window.location.origin + window.location.pathname + '#/createOrder'
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
                    this.show = true
                    this.rotateImg = 'rotatepic'
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

        }
    }
</script>


<style lang="scss">
    .home-type{
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
            padding: 0 .28rem;
            border-bottom: .06rem solid #f0f0f0;
            >.gradient{
                position: absolute;
                top: .1rem;
                right: .28rem;
                width: .32rem;
                height: 1.84rem;
                z-index: 222;
            }
            >.gradientleft{
                position: absolute;
                top: .1rem;
                left: .28rem;
                width: .32rem;
                height: 1.84rem;
                z-index: 222;
            }
            >.offer-inner{
                position: relative;
                width: 100%;
                overflow-x: scroll;
                overflow-y: hidden;
                padding-top: .48rem ;
                padding-bottom: .48rem ;
                height: 1.94rem;
                font-size: 0;
                box-shadow: .05rem 0 .05rem -.05rem #f3f3f3,
                -.05rem 0 .05rem -.05rem #f3f3f3;
                /*&::-webkit-scrollbar {display:none}*/
                >.list-con{
                    width: 100%;
                    div{
                        width: 1.5rem;
                        display: inline-block;
                        vertical-align: middle;
                        font-size: .22rem;
                        color: #989898;
                        text-align: center;
                        >img{
                            // width: .66rem;
                            height: .66rem;
                            display: inline-block;
                            margin-bottom: .08rem;
                        }
                        p{
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            margin-top: .2rem;
                        }
                    }

                }
            }
            >.pay-way{
                padding-bottom: .34rem;
                font-size: 0;
                >div{
                    width: 3.2rem;
                    height: .74rem;
                    /*line-height: .74rem;*/
                    text-align: center;
                    margin-bottom: .12rem;
                    display: inline-block;
                    vertical-align: middle;
                    border: .02rem solid #fdcc2b;
                    font-family: PingFangSC-Regular;
                    border-radius: .08rem;
                    font-size: .32rem;
                    background: #fdcc2b;
                    span{
                        display: inline-block;
                        vertical-align: middle;
                        line-height: .7rem;
                    }
                    >.pay-btn{
                        font-size: .42rem;
                        font-family: PingFangSC-Medium;
                    }

                    &.offline{
                        color: #fdcc2b;
                        background: #fff;
                        margin-right: .2rem;
                        margin-left: .17rem;
                    }
                    &.online{
                        color: #ffffff;
                        background: #fdcc2b;
                    }
                    &.cantpay{
                        color: #666666;
                        border-color:#969696;
                        background: #969696;
                    }

                }
            }
        }
    }

</style>
