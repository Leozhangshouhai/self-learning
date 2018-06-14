/**
* Created by Linyer on 2017/7/17.
*/
<template>
    <div class="fly-index">
        <p>{{isLogin ? "是" : "否"}}登录状态</p>
        <p class="fs-60 mgt-50">13544443333</p>
    </div>
</template>

<script>
    import Vue from 'vue';
    import fly from "../assets/js/linyer"
    import axios from "axios";
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
        created() {
            var json={
                "token":"Epoint_WebSerivce_**##0601",
                "params":{
                       "areacode":"610000",
	                "usertype": "1"
                        }
                    };
            axios.post('http://118.122.125.48:8080/jtqzwfw/rest/zwdtTask/getTaskKindsByOu', json)
                .then(function (res) {});
                
            const _self = this;
            _self.isLogin = _self.$store.state.is_login;
            console.log(_self.$store.state.is_login);
            setTimeout(()=>{
                _self.Indicator.close();
            },1000)
   
        },
       
    };
</script>

<style lang="scss">

</style>