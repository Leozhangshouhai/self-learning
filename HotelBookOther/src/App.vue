<template>
    <div id="app">
        <!-- <transition name="slide-fade"> -->
            <router-view class="view-warp"></router-view>
        <!-- </transition> -->

    </div>
</template>

<script>
    import "./assets/js/autoSize(100).js";
    export default {
        name: 'app',
        data() {
            return {}
        }
    }
</script>

<style lang="scss">
    @import "assets/css/reset";
    #app {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        overflow-y:auto;
        -webkit-overflow-scrolling : touch;
        .view-warp {
            width: 100%;
            height:100%;
            overflow: auto;
            transition: all .5s cubic-bezier(.55, 0, .1, 1);
        }
    }
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */

    .slide-fade-enter-active {
        transition: all .5s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        opacity: 0;
        -webkit-transform: translate(-100%, 0);
        transform: translate(-100%, 0);
    }
</style>
