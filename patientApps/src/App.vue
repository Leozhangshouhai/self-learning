<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data(){
      return{

      }
    },
    mounted() {


    }
  }
</script>

<style lang="scss">
  @import "./style/style";
  body{
    background: #f6f5fa;
  }
  @media (min-width: 320px){html{font-size: 42.6667px;} }
  @media (min-width: 360px){html{font-size: 48px;} }
  @media (min-width: 375px){html{font-size: 50px;} }
  @media (min-width: 384px){html{font-size: 51.2px;} }
  @media (min-width: 414px){html{font-size: 55.2px;} }
  @media (min-width: 448px){html{font-size: 59.7333px;} }
  @media (min-width: 480px){html{font-size: 48px;} }
  @media (min-width: 512px){html{font-size: 68.2667px;} }
  @media (min-width: 544px){html{font-size: 72.5333px;} }
  @media (min-width: 576px){html{font-size: 76.8px;} }
  @media (min-width: 608px){html{font-size: 81.0667px;} }
  @media (min-width: 640px){html{font-size: 85.3333px;} }
  @media (min-width: 750px){html{font-size: 100px;} }
  .entesd {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    z-index: 111;
  }

</style>
