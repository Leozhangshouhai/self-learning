/**
* Created by Linyer on 2017/7/17.
*/
<template>
    <div class="fly-index">
        new demo
        <p>{{isLogin ? "是" : "否"}}登录状态</p>
        <p class="fs-60 mgt-50">13544443333</p>
        <!-- <my-index></my-index> -->
    </div>
   
</template>

<script>
    import Vue from 'vue';
    import fly from "../assets/js/linyer";
    import myindex from "../components/index";
    export default {
        data() {
            return {
                newuser: {
                    username: '',
                    password: ''
                },
                isLogin: false
            };
        },
        components:{
            'my-index':myindex
        },
        created() {
            const _self = this;
            _self.isLogin = _self.$store.state.is_login;
            console.log(_self.$store.state.is_login);
            setTimeout(()=>{
                _self.Indicator.close();
            },1000)
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