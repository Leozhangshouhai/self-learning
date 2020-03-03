<template>
  <div ref="wrapper" class="bg">
    <div>111</div>
    <router-link :to="{path: '/login'}" class="my-order">跳转</router-link>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.bg {
  background-color: aqua;
}
</style>
