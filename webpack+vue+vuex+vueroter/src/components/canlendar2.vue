<template>
    <div>
        <mu-date-picker hintText="只能选择工作日" :shouldDisableDate="disableWeekends"/><br/>
        <mu-date-picker hintText="随机判断哪些日期不可选择" :shouldDisableDate="disableRandomDates"/>
    </div>
</template>

<script>
  import Vue from 'vue'
  import MuseUI from 'muse-ui'
  import 'muse-ui/dist/muse-ui.css'
  Vue.use(MuseUI);
  export default {

    methods: {
      disableWeekends (date) {
        console.log(date.getDay());
        return date.getDay() === 0 || date.getDay() === 6
      },
      disableRandomDates () {
        return Math.random() > 0.5
      }
    }
  }
</script>

<style lang="css">
</style>