/** * Created by Linyer on 2017/7/17. */
<template>
    <div class="fly-index">

        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="外卖">
                <img slot="icon" src="../assets/img/index-1.png"> 外卖
            </mt-tab-item>
            <mt-tab-item id="发现">
                <img slot="icon" src="../assets/img/index-1.png"> 发现
            </mt-tab-item>
            <mt-tab-item id="我的">
                <img slot="icon" src="../assets/img/index-1.png"> 我的
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
    export default {
        data() {
            return {
                selected: ''
            };
        },
        props: [],
        created() {

            const _self = this;
            _self.isLogin = _self.$store.state.is_login;
            console.log(_self.$store.state.is_login);
            setTimeout(() => {
                _self.Indicator.close();
            }, 1000)
            //console.log(_self)
            //console.log(_self.chengdu)

            //			fly.Axios({
            //				url: _self.chengdu + _self.api.url,
            //				data: {city_name: encodeURI("成都市")},
            //				success: function (res) {
            //					console.log(res)
            //				}, error: function (err) {
            //
            //				}
            //			})
        },
        methods: {}
    };
</script>

<style lang="scss">
</style>