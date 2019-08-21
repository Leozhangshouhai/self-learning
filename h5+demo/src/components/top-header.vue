/**
* Created by Linyer on 2017/7/21.
*/
<template>
    <div class="top-box" :style="'background-color:'+backgroud">
            <span class="mui-icon mui-icon-back" @click="go_pre()"></span>
            <span class="middle-title">{{title}}</span>
            <slot name="right">
                <span class="mui-icon mui-icon-back right-icon" ></span>
            </slot>
    </div>
</template>

<script>
    import Vue from 'vue';
    export default {
        data() {
            return {
                newuser: {
                    username: '',
                    password: ''
                }
            };
        },
        props:{
            'title':{
                type:String,
                default:'最后的'
            },
            'fn':{
                type:Function,
            },
            'backgroud':{
                default:'#571eeb'
            }
        },
        created() {
           
        },
        methods: {
            go_pre(){
                this.fn? this.fn():this.$router.go(-1);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import  "../assets/css/common";
    .top-box{
        display: flex;
        align-items: center;
        position: relative;
        background: #571eeb;
        justify-content: space-between;
        padding:  0 13px;
        height: 40px;
        .mui-icon-back{
            color: white;
        }
        .middle-title{
            font-size: 16px;
            color: white;
        }
    }
    .right{
        width: 24px;
    }
    .right-icon{
        visibility:hidden
    }
</style>