<template>
  <div class="box-all">
    <mt-swipe :auto="time" :continuous='false'>
      <mt-swipe-item v-for="item,index in arr " :key="index">
        <img :src="item.src" alt="" class="swiper-img" @click="go_outer(item.url)">
      </mt-swipe-item>
    </mt-swipe>
    <div class="right-timer" @click="clickR()">{{arr.length>1?showTimer:'跳过'}}</div>
  </div>
</template>

<script>
  import {
    Swipe,
    SwipeItem
  } from 'mint-ui';
  import Vue from "vue";
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  export default {
    name: "agreement",
    data() {
      return {
        time:2000,
        showTimer:'',
        arr: [{
            url: 'http://img5.imgtn.bdimg.com/it/u=1575846504,4151736717&fm=15&gp=0.jpg',
            src: 'http://img5.imgtn.bdimg.com/it/u=1575846504,4151736717&fm=15&gp=0.jpg'
          },
          {
            url: 'http://img4.imgtn.bdimg.com/it/u=3848112615,2177625479&fm=15&gp=0.jpg',
            src: 'http://img4.imgtn.bdimg.com/it/u=3848112615,2177625479&fm=15&gp=0.jpg'
          }, {
            url: 'http://img4.imgtn.bdimg.com/it/u=2878318058,2425462332&fm=26&gp=0.jpg',
            src: 'http://img4.imgtn.bdimg.com/it/u=2878318058,2425462332&fm=26&gp=0.jpg'
          }
        ]
      }
    },
    created() {
      this.showTimer=(this.time/1000)*this.arr.length;
      if(this.arr.length>1){
        this.setTimer();
      }
     
    },
    destroyed() {
      clearInterval(this.showTimer)
    },
    methods: {
      clickR(){
        if(this.arr.length>1){

        }else{
          this.$router.push('/register')
        }
      },
      setTimer(){
        this.timer=setInterval(()=>{
          this.showTimer-=1;
          if(this.showTimer<=0){
            clearInterval(this.timer);
            this.$router.push('/register')
          }
        },1000)
      },
      handleChange(index) {
        console.log(index)
      },
      go_outer(url){
        let _t=this;
        this.Indicator.open('正在前往...');
        plus.runtime.openURL(url, function () {
          console.log(3333)
          _t.Indicator.close();
        })
        setTimeout(() => {
                    _t.Indicator.close();
                }, 2000)
      }
    },
    components: {

    }
  }
</script>

<style scoped lang="scss">
  .box-all {
    height: 100%;
    overflow-y: auto;
    position: relative;
  }
  .swiper-img{
    width: 100%;
    height: 100%;
  }
  .right-timer{
    padding: 4px 20px;
    color: white;
    position: absolute;
    right: 20px;top: 20px;
    background-color: rgba(0,0,0,.3);
    font-size: 14px;
    border-radius: 10px;
    border: 1px solid white;
  }
</style>