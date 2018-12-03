/**
* Created  on 2018/3/6.
*/

<template>
    <div class="invoice">
        <div class="masking" :class="value ?'nomasking':'' " v-setHeight="value"></div>
        <div class="need">
            <div>需要发票</div>
            <div><mt-switch v-model="value"></mt-switch></div>
        </div>
        <ul class="list" >
            <li>
                <div>发票抬头</div>
                <div class="input-box">
                    <input type="text" v-model="title" placeholder="请输入发票抬头">
                </div>
            </li>
            <li>
                <div>纳税人识别号</div>
                <div class="input-box">
                    <input type="text" v-model="taxpayerIdentifyNum" placeholder="请输入纳税人识别号">
                </div>
            </li>
            <li>
                <div>电子邮件</div>
                <div class="input-box">
                    <input type="text" v-model="email" placeholder="请输入电子邮件">
                </div>
            </li>
            <li class="btn-box">
                <div @click="back">确定</div>
            </li>
        </ul>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { Switch, Toast} from 'mint-ui';
    import fly from '../assets/js/linyer'
    Vue.component(Switch.name, Switch);

    Vue.directive('setHeight' ,{
        inserted: function(el, binding){
            let AllHeight = fly.boxheight();
            el.style.height = AllHeight-55 + 'px';
            el.style.top = 55 + 'px'
        }
    })

    export default {
        data() {
            return {
                value: false,
                email: '',
                taxpayerIdentifyNum: '',
                title:  '',
            }
        },
        watch: {
            value: function (newValue) {
                if(newValue === false ){
                    window.sessionStorage.removeItem('invoice')
                    this.email = ''
                    this.taxpayerIdentifyNum = ''
                    this.title = ''
                }else{
                    let invoice = JSON.parse(window.sessionStorage.getItem('invoice'));
                    if(invoice){
                        this.email = invoice.email
                        this.taxpayerIdentifyNum = invoice.taxpayerIdentifyNum
                        this.title = invoice.title
                    }
                }
            }
        },
        created() {
            let invoice = JSON.parse(window.sessionStorage.getItem('invoice'))
            if(invoice&&invoice.email){
                //需要发票
                this.value = true
            }
        },
        computed : {},
        methods : {
            back(){
                let invoice = {
                    email: this.email,
                    taxpayerIdentifyNum: this.taxpayerIdentifyNum,
                    title: this.title,
                    type: '1'
                }
                if(this.ValidateTitle() && this.ValidateNum() && this.ValidateEmail()){
                    window.sessionStorage.setItem('invoice', JSON.stringify(invoice))
                    this.$router.go(-1)
                }

            },
            ValidateTitle(){
                if(this.title === ''){
                    Toast('发票抬头不能为空！')
                    return false
                }else{
                    return true
                }
            },
            ValidateNum(){
                if(this.taxpayerIdentifyNum === ''){
                    Toast('纳税人识别号不能为空！')
                    return false
                }else{
                    return true
                }
            },
            ValidateEmail(){
                if(this.email === ''){
                    Toast('纳税人识别号不能为空！')
                    return false
                }

                if(!fly.isEmail(this.email)){
                    Toast('邮箱格式不对！')
                    return false
                }else{
                    return true
                }
            }
        },
        mounted(){

        }
    }
</script>


<style lang="scss">
    .mint-switch-input:checked + .mint-switch-core{
        border-color: #48ce58;
        background-color: #48ce58;
    }
    .invoice{
        position: relative;
        font-family: PingFangSC-Regular;
        color: #031e4d;
        width: 100%;
        .need{
            font-size: .3rem;
            padding: 0 .3rem;
            height: 55px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: .02rem solid #e4e4e4;
        }
        .list{
            font-size: .3rem;
            padding: 0 .3rem;
            height: 4rem;
            >li{
                /*height: 1.1rem;*/
                border-bottom: .02rem solid #e4e4e4;
                padding-top: .24rem;
                color: #031e4d;
                .input-box{
                    padding: .16rem 0;
                    input{
                        border: 0;
                        outline: 0;
                        font-size: .36rem;
                    }
                }
                &.btn-box{
                    text-align: right;
                    border: 0;
                    margin-top: .2rem;
                    div{
                        margin-right: .2rem;
                        display: inline-block;
                        text-align: center;
                        width: 1.72rem;
                        height: .7rem;
                        line-height: .7rem;
                        color: #fff;
                        font-size: .3rem;
                        background: #fec421;
                        border-radius: .35rem;
                    }
                }
            }
        }
        .masking{
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(0,0,0,.3);
        }
        .nomasking{
            display: none;
        }
    }
</style>
