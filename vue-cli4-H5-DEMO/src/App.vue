<template>
  <div id="app">
    <transition :name="pageDirection">
      <router-view class="view-warp" v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <transition :name="pageDirection">
      <keep-alive>
        <router-view class="view-warp" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "app",
  created() {
    // 处理iOS 微信客户端6.7.4后 键盘收起页面未下移bug
    const isIOS = /iphone|ipod|ipad/i.test(navigator.appVersion);
    if (isIOS) {
      document.addEventListener(
        "blur",
        e => {
          // 这里加了个类型判断，因为a等元素也会触发blur事件
          const isInClude = ["input", "textarea"].includes(e.target.localName);
          isInClude && document.body.scrollIntoView(false);
        },
        true
      );
    }
  },
  mounted() {},
  computed: {
    ...mapState("pageDirection", ["pageDirection"])
  },
  methods: {
    ...mapMutations("pageDirection", ["afterEnter"])
  }
};
</script>
<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;

  .view-warp {
    width: 100%;
    height: 100%;
    transition: all 300ms cubic-bezier(0.55, 0, 0.1, 1);
  }
  .fade-enter-active,
  .fade-leave-active,
  .slide-left-enter,
  .slide-right-enter,
  .slide-left-leave-active,
  .slide-right-leave-active {
    // 启用硬件加速
    will-change: transform;
    position: fixed;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
  }
}
</style>
