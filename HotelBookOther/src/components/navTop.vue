<template>
    <div class="navTop">
      <img src="../assets/img/left.png" alt="" @click="goAhead">
      {{title}}
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
      props:['title'],
        created() {

        },
        computed: {},
        methods: {
          goAhead(){
            window.history.back();
          }
        }
    }
</script>


<style lang="scss">
    @import "../assets/css/payBack";
  .navTop{
    text-align: center;
    font-size: .4rem;
    border-bottom: 1px solid #bbbbbb;
    padding: .2rem 0;
    position: relative;
    img{
      width: .4rem;
      position: absolute;
      left: 5%;
      top: 50%;
      margin-top: -.2rem;
    }
  }
</style>
