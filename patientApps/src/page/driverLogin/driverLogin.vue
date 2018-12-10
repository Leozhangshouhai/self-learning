<template>
  <div class="contain">
    <img src="../../assets/img_driverlogin.png" class="derver_img" alt="">
    <div class="from_item ui-bg1 ui-box-sizing ui-size-26 ui-color1 ui-pdl-25 ui-pdt-51 ui-line-height">
      请输入司机账号
    </div>
    <div class="from_item ui-bg2 ui-box-sizing ui-size-26 ui-color2 ui-pdl-25 ui-pdt-25">
      <label for="">用户名</label>
      <input class="from_input ui-size-16 ui-color2" ref="username" placeholder="请填写用户名" type="text" v-model="username">
    </div>
    <div class="from_item ui-mgt-30 ui-border-top ui-bg2 ui-box-sizing ui-size-26 ui-color2 ui-pdl-25 ui-pdt-25">
      <label for="">密码</label>
      <input class="from_input ui-size-16 ui-color2" ref="password" placeholder="请填写密码" type="password" v-model="password">
    </div>
    <div class="from_btn">
      <yd-button size="large" @click.native="recommanderLogin()" type="warning">登录</yd-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username:"",//hexiao1
        password:""//123456
      }
    },
    created() {

    },
    methods: {
      /**
       *@desc 登陆
       *@author renlinfei
       *@date 2018-11-26
       */
      recommanderLogin(){
        var data={
            username:this.username,
            password:this.password
        }
        if(data.username==""){
          this.$dialog.toast({
            mes: '请输入用户名',
            timeout: 1500,
            icon: 'error',
            callback: () => {
              this.$refs.username.focus();
            }
          });
          return;
        }else if(data.password==""){
          this.$dialog.toast({
            mes: '请输入密码',
            timeout: 1500,
            icon: 'error',
            callback: () => {
                this.$refs.password.focus();
            }
          });
          return;
        }
        this.$api.codeAxios({
          url: "/hmp_website/activity/recommanderLogin.json",
          data,
          success:res=>{
            sessionStorage.setItem("key",res)
            this.$router.push({path: '/commission'});
          }
          //this.$router.push({path: '/passlist'});
        })
      }
    }
  };
</script>
<style lang="scss" scoped>
  .derver_img{
    width: 100%;
  }
  .from_item{
    height: 1rem;
    border-bottom: 1px solid #dddddd;
    label{
      margin-top: 0.04rem;
      display: inline-block;
    }
  }
  .from_input{
    padding: 0.05rem;
    border:0px;
    display: inline-block;
    float: right;
    margin-top: 0.05rem;
    margin-right: 0.25rem;
    text-align: right;
  }
  .from_btn{
    margin-top: 0.4rem;
    padding: 0 0.25rem;
  }
</style>
