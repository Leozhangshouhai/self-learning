<template>
    <div id="app">
        <transition :name="pageDirection">
            <router-view class="view-warp" v-if="$route.meta.keepAlive!=true"></router-view>
        </transition>
        <transition :name="pageDirection">
            <keep-alive>
                <router-view class="view-warp" v-if="$route.meta.keepAlive==true"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
    import "./assets/js/autoSize(100).js";
    import {mapState, mapMutations} from 'vuex';

    export default {
        name: 'app',
        data() {
            return {};
        },
        computed: {
            ...mapState([
                'pageDirection'
            ])
        },
        methods: {
            ...mapMutations([
                'afterEnter'
            ])
        }
    }
</script>
<style lang="scss">
    @import "./assets/css/index";
    @import "./assets/css/iconfont.css";

    #app {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        min-height: 100%;
        .view-warp {
            width: 100%;
            height:100%;
            transition: all .5s cubic-bezier(.55, 0, .1, 1);
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s ease;
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(100%, 0);
        transform: translate(100%, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-100%, 0);
        transform: translate(-100%, 0);
    }
</style>
