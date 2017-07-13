<template>
    <div id="example">
        <h1>{{ msg }}</h1>
      <slider width="auto"
              :auto="false"
              animation="fade"
              :interval="1000"
              :speed="1000">
        <slider-item>
          <img src="../assets/1.jpg" alt="" class="img">
          <p style="font-size: 20px;color: white">this is  my world</p>
        </slider-item>
        <slider-item >
          <img src="../assets/2.jpg" alt="">
        </slider-item>
        <slider-item>
          <img src="../assets/3.jpg" alt="">
        </slider-item>
      </slider>
        <ul>
            <li v-for="n in 5">{{ n }}</li>
        </ul>
    </div>
</template>

<script>
  import { Slider, SliderItem } from 'vue-easy-slider'
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
      Slider,
      SliderItem
    }
  }
</script>

<style scoped>
img{
  width: 100%;
  height: 100%;
}
</style>
