/**
* Created  on 2018/3/8.
*/

<template>
    <div  class="list-box">
        <div class="pofied">
         <div class="warp-bar">
         <ul class="nav-bar">
          <li v-for="(item, index) in itemTab" class="nav-bar-item"
           :class="{'nav-bar-active':item.type == type }"
           :key="index"
           :value="item.type"
            @click="changeTab(item.type)">
        {{item.title}}
          </li>
         </ul>
         </div>
        </div>
        <checkInfo @getHotelDetail="getList"></checkInfo>
        <!-- <checkInfo @getHotelDetail="getList"></checkInfo> -->
           <!-- <div class="pofied1"></div> -->
   <div class="page-loadmore-wrapper">
        <mt-loadmore
            :bottom-all-loaded="allLoaded"
            :bottom-method="loadBottom"
            @bottom-status-change="handleBottomChange"
            ref="loadmore">
          <ul>
                <li v-for="(list,index) in orderList" @click="ToDetail(index)" :key="index" v-show="orderList.length!=0">
                   <div v-show="type==0" class="orderlist-li">
                    <div class="left">
                        <img :src="list.featurePicPath" >
                    </div>
                    <div class="right">
                        <div class="home-name">
                            <span>{{list.roomName}}</span>
                            <span class="num">{{list.custCount}}间</span>
                        </div>
                        <div class="during comstyle">
                            <span>{{list.checkInAndOutDate}}</span>
                            <span>{{list.during}}晚</span>
                        </div>
                        <div class="homeInfo comstyle">
                            <span>{{list.breakfastNum}}</span>
                        </div>
                        <div class="tel comstyle">
                            <img src="../assets/img/tel.png" alt="">
                            <span>{{list.hotelPhone}}</span>
                        </div>
                        <div class="money-box">
                            <p>￥{{Math.floor(list.totalPrice)}}</p>
                            <p>{{list.orderStatusName}}</p>
                        </div>
                    </div>
                    </div>
                </li>
                 <!-- </ul> -->
                 <!-- <ul > -->
             <li  v-for="(list,index) in shoplist" @click="ToDetail(index)"  v-show="shoplist.length!=0">
                    <div v-show="type==1" class="orderlist-li">
                    <div class="left">
                        <img :src="list.commodityImageUrl" >
                    </div>
                    <div class="right1">
                        <div class="whist2 lin6" >
                            <span style="color:#3c3c3c; font-size:.36rem;line-height:.38rem;">{{list.commodityName}}</span>
                        </div>
                        <div class="whist2 lin7">
                              数量：<span class="num" style="color:#9b9b9b;">{{list.orderBoughtNumber}}{{list.unitName}}</span>
                        </div>
                        <div class="whist2 comstyle lin6" v-for="(Titem,Tindex) in list.commodityAttrAndValues" :key="Tindex" style="color:#9b9b9b;">
                            <span> {{Titem.attrName}}:</span><span>{{Titem.attrValue}} </span>
                        </div>
                        <div class="money-box">
                            <p>￥{{Math.floor(list.orderMoney)}}</p>
                            <p>{{list.orderStatusName}}</p>
                        </div>
                    </div>
                     </div>
                </li>
                 </ul>
        <div v-show="zanwu">{{zanwu}}</div>
        </mt-loadmore>
            </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import fly from "../assets/js/linyer"
    import wechat from "../assets/js/weChat"
    import checkInfo from '../components/check-info.vue'
    import { Toast,Indicator ,Loadmore, Navbar, TabItem,TabContainer, TabContainerItem} from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    Vue.component(Navbar.name, Navbar);
    Vue.component(TabItem.name, TabItem);
    Vue.component(TabContainer.name, TabContainer);
    Vue.component(TabContainerItem.name, TabContainerItem);
    export default {
        data() {
            return {
                type:0,
                clickType:1,
                allLoaded:false,
                loading:false,
                bottomStatus:'pull',
                zanwu:'',
                // havaOrder: true,
                parma:{
                    type:'1',
                    pageIndex: '0',
                    pageSize: '6',
                    hotelid: window.localStorage.getItem('hotelId')
                },
                shops:{
                    pageIndex: '0',
                    pageSize: '5',
                    hotelId: window.localStorage.getItem('hotelId'),
                    openid:''
                },
                listName: [],
                itemTab: [{
                title: '酒店订单',
                type: 0,
                },
                {
                title: '商城订单',
                type: 1,
                }
                ],
                AccessTicket: '',
                shoplist:{
                    shopType:[]
                },
                orderList: [
                  /*  {
                        featurePicPath: require('../assets/img/homelist01.png'),
                        roomName: '巴洛克英伦欧式大床房',
                        custCount: 1,
                        checkInAndOutDate: '10月14日-10月15日',
                        during: '20',
                        breakfastNum: '不含早',
                        hotelPhone: '(0575)87265413',
                        totalPrice: '1152',
                        orderStatus: '已确认'
                    },*/
                ]
            }
        },
        created() {
            if(
                wechat.getUrlStr('hotelId')!==null
                && wechat.getUrlStr('hotelId')!== undefined
                && wechat.getUrlStr('hotelId')!== ''
                && wechat.getUrlStr('appId')!==null
                && wechat.getUrlStr('appId')!== undefined
                && wechat.getUrlStr('appId')!== ''
            ){
                let hotelId = wechat.getUrlStr('hotelId');
                let appId =wechat.getUrlStr('appId');
                window.localStorage.setItem('hotelId',hotelId)
                window.localStorage.setItem('wxappid',appId)
            }
            //临时
             //this.getList()
        },
        methods: {
            changeTab(index) {
                this.type = index
                this.allLoaded = false;
                this.shoplist=[]
                this.shops.pageIndex=0
                if(this.type==0){
                this.clickType=1
                }else{
                    this.clickType=2
                    this.getShoplist();
                }
            // this.baseline = false;
            // if (this.type == 0 && !this.myList.status && this.myList.list.length == 0) {
            //     this.getCouponList(this.myList)
            // } else if (this.type == 1 && !this.shopList.status && this.shopList.list.length == 0) {
            //     this.getCoordinate(this.shopList);
            //     // this.getCouponList(this.shopList)

            // }
        },
        getShoplist() {
        this.shops.openid=window.localStorage.getItem('openid')
        this.allLoaded = false
        var self=this
         Indicator.open('Loading...');
            fly.AxiosC({
                url: this.$api.HOTEL.shopList,
                data:this.shops,
                success: (res) => {
                    Indicator.close();
                    if(res.data.rtnCode === '0000'){
                    // res.data.data.data.forEach(function(item, i) {
                    //     if (item.commodityAttrAndValues == null) {} else {
                    //         this.shoplist.shopType=item.commodityAttrAndValues
                    //     }
                    // })
                    // this.commodityAttrAndValues=res.data.data.data.commodityAttrAndValues
                    // this.shoplist=res.data.data.data
                    // this.shoplist.shopType=res.data.data.data.commodityAttrAndValues
                    if (self.shops.pageIndex > 0) {
                        // _self.listshow = false;
                        self.shoplist = self.shoplist.concat(res.data.data.data)
                        // if(data.list==0){
                        // _self.$refs.loadmore.onBottomLoaded()
                        // }
                    } else {
                        self.shoplist=res.data.data.data
                    }
                     _self.$refs.loadmore.onBottomLoaded()
                       self.loading=false
                        if(self.shoplist.length==0){
                        self.zanwu="暂无商品"
                        }else if(self.shoplist.length!=0){
                        self.zanwu=false
                        }
                  res.data.data.data.length < self.shops.pageSize ? self.allLoaded = true : self.allLoaded = false
                    }else{
                        Toast({
                            message:rtnMsg,
                        });
                    }
                }
            })
                },
            handleBottomChange(status) {
                    this.bottomStatus = status;
            },
            getList(){
                this.AccessTicket=window.sessionStorage.getItem('hotelBookAccessTicket');
                Indicator.open('Loading...');
                fly.codeAxios({
                    url: this.$api.HOTEL.orderList,
                    data: this.parma,
                    accessTicket: this.AccessTicket,
                    success: (res) => {
                        Indicator.close();
                        console.log(res)
                        if (res.data.head.rtnCode === '000000') {
                            //成功
                            this.orderList=res.data.body;

                            const orderInfo = {
                                featurePicPath: this.orderList[0].featurePicPath,
                                hotelName: this.orderList[0].hotelName
                            }
                            window.sessionStorage.setItem('orderInfo',JSON.stringify(orderInfo))
                        } else {
                            Toast(res.data.head.rtnMsg)
                        }
                    },
                    error:function (res) {
                        Indicator.close();
                        console.log(res)
                    }
                })
            },
            ToDetail(index) {
                if(this.clickType==1){
                let orderid=this.orderList[index].orderId
                this.$router.push({path: '/orderDetail?orderid='+orderid})
                }else if(this.clickType==2){
                let orderId=this.shoplist[index].orderId
                this.$router.push({path: '/shopList?orderId='+orderId})  
                }
            },
            loadBottom() {
            //    this.loading = true;
                if(this.clickType==1){
                this.parma.pageIndex=(this.parma.pageIndex*1+1).toString();
                fly.codeAxios({
                    url: this.$api.HOTEL.orderList,
                    data: this.parma,
                    accessTicket: this.AccessTicket,
                    success: (res) => {
                        console.log(res)
                        if (res.data.head.rtnCode === '000000') {
                            // 成功
                            if(res.data.body.length<6){
                                this.allLoaded = true
                            }
                            if(this.orderList.length==0){
                            self.zanwu="暂无商品"
                            }else if(this.orderList.length!=0){
                            self.zanwu=false
                                }
                            this.loading = false;
                            this.orderList  = this.orderList.concat(res.data.body);
                            this.$refs.loadmore.onBottomLoaded();
                        } else {
                            Toast(res.data.head.rtnMsg)
                        }
                    },
                    error:function (res) {
                        console.log(res)
                    }
                })
                }else if(this.clickType==2){
                    this.allLoaded = true
                    this.shops.pageIndex=(this.shops.pageIndex*1+1).toString(); 
                    this.getShoplist();
                }
            }
        },
        components: {
            checkInfo
        }
    }
</script>


<style lang="scss">
.mint-loadmore-text{
    display: none;
}

    .list-box{
        height: 100%;
        overflow: scroll;
    }
    .mint-loadmore{
        min-height: 100%;
        //overflow: scroll;
    }
    .pofied {
        position: absolute;
        width: 100%;
        background-color: #e9e9e9;
        top: 0;
        z-index: 2;
        // border-radius: 8px;
    }
        .nav-bar-active {
        // background-color: #e9202b;
            font-weight: bold;
        border-bottom: 3px solid #b49d74;
    }
        .nav-bar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    overflow: hidden;
    padding: 0 1rem;
    position: absolute;
    width: 100%;
    margin-top: .3rem;
    }
    .warp-bar{
     height: 1.2rem;
     line-height: 1.2rem;
    }
    .pofied1{
        position: relative;
             height: 1.2rem;
     line-height: 1.2rem;
    }

    .nav-bar-item {
        flex: 1;
        font-size: .32rem;
        color: #000000;
        padding: 0 .5rem;
    }

    ul li {
        list-style-type: none;
    }
    .page-loadmore-wrapper{
        position: relative;
        height: 90%;
        top: 10%;
        overflow: scroll;
    }
.lin6{
    line-height: .3rem;
}
.lin7{
    line-height: .3rem;
    padding: .1rem 0;
}
.money-box{
    position: absolute;
    font-size: .4rem;
    text-align: right;
    line-height: .56rem;
    color: #b8834d;
    top: .6rem;
    right: .15rem;
    font-family: PingFangSC-Semibold;
}
.whist2{
    font-size: .28rem;
width: 3.5rem;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
}


    @import "../assets/css/orderList";
</style>
