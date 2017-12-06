/**
* Created by Linyer on 2017/7/21.
*/
<template>
    <div>
        <mt-field label="用户名：" placeholder="请输入用户名" v-model="newuser.username"></mt-field>
        <mt-field label="密码：" placeholder="请输入密码" type="password" v-model="newuser.password"></mt-field>
        <mt-button type="primary" class="col-1 fs-25" @click="login">登陆</mt-button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Toast, Field, Button} from 'mint-ui';

    Vue.component(Toast.name, Toast);
    Vue.component(Field.name, Field);
    Vue.component(Button.name, Button);
    export default {
        data() {
            return {
                newuser: {
                    username: '',
                    password: ''
                }
            };
        },
        created() {
            const _self = this;
            setTimeout(()=>{
                _self.Indicator.close();
            },1000)
        },
        methods: {
            login() {
                const _self = this;
                this.$store.dispatch('isLogin', this.newuser)
                    .then(function () {
                        if (_self.$store.state.is_login) {
                            Toast("登录成功");
                            _self.$router.push("/index");
                        }
                        else {
                            Toast("登录失败")
                        }
                    })
            }
        }
    };
</script>

<style lang="scss">

</style>