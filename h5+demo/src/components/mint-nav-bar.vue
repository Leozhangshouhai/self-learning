/** * Created by Linyer on 2017/7/17. */
<template>
    <div class="fly-index">

        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="index" >
                <img slot="icon" v-if="selectedIndex=='index'" src="../assets/img/new-img/1-1.png" >
                <img slot="icon" v-else src="../assets/img/new-img/1-0.png"> 资产
            </mt-tab-item>
            <mt-tab-item id="quotation">
                <img slot="icon" v-if="selectedIndex=='quotation'" src="../assets/img/new-img/2-1.png">
                <img slot="icon" v-else src="../assets/img/new-img/2-0.png"> 行情
            </mt-tab-item>
            <mt-tab-item id="wealth" >
                <img  src="../assets/img/new-img/3.png" class="nav-bar-wealth-img-3"> 
                <img slot="icon" src="../assets/img/new-img/3.png" style="visibility:hidden"> 财富
            </mt-tab-item>
            <mt-tab-item id="discover">
                <img slot="icon" v-if="selectedIndex=='discover'" src="../assets/img/new-img/5-1.png">
                <img slot="icon" v-else src="../assets/img/new-img/5-0.png"> 发现
            </mt-tab-item>
            <mt-tab-item id="register">
                <img slot="icon" v-if="selectedIndex=='register'" src="../assets/img/new-img/4-1.png">
                <img slot="icon" v-else src="../assets/img/new-img/4-0.png">我的
            </mt-tab-item>
         
 
        </mt-tabbar>
    </div>
</template>

<script>
    import Vue from 'vue';
    import fly from "../assets/js/linyer"
    // import { Toast } from 'mint-ui';
    import {
        Tabbar,
        TabItem
    } from 'mint-ui';
    Vue.component(Tabbar.name, Tabbar);
    Vue.component(TabItem.name, TabItem);
    let urls = {
        index: '/index',
        movie: '/movie',
        owner: '/owner',
        tradeIndex:'/dealArea',
        // tradeIndex:'/tradeIndex',
        getCalculate:'/getCalculate'
    }
    export default {
        data() {
            return {
                selected:'',
            };
        },
        props: [],
        watch: {
            selected(n){
                console.log(n)
                console.log(this.$store.state.selectedIndex)
                this.$router.push(`/${n}`)
               
            }
        },
        computed: {
            selectedIndex(){
                this.selected=this.$store.state.selectedIndex;
                 return this.$store.state.selectedIndex
            }
        },
        created() {
            const _self = this;
            _self.isLogin = _self.$store.state.is_login;
            console.log(_self.$store.state.is_login);

        },
        methods: {
            go_next(path){
                // console.log('navbar')
                //  this.active=path.substr(1);
                //  this.$store.state.selectedIndex= this.active;
                //  this.$router.push(path)
            }
        }
    };
</script>

<style lang="scss">
    @import "../assets/css/common";
    .mint-tabbar {
        z-index: 100;
    }
    .mint-tab-item{
        position: relative;
    }
    .mint-tabbar>.mint-tab-item.is-selected {
        /* background: red; */
        background-color: transparent;
        color: #5c1efe;
    }
    .mint-tab-item-label{
        color:#9298ad;
    }
    .is-selected> .mint-tab-item-label{
        color: #5c1efe;
    }
    .nav-bar-wealth-img-3{
        height: 50px !important;
        width: 50px !important;
        position: absolute;
        left: 50%;
        top: 50% !important;
        margin-left: -25px;
        margin-top: -43px;
        z-index: 100;
    }
</style>