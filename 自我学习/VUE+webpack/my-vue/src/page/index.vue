<template>
    <div id="example">
        <h1>{{ msg }}</h1>
        <ul>
            <li v-for="n in 5">{{ n }}</li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: '我是page 下面的index'
      }
    }
  }
</script>

<style scoped>
    #example {
        background: red;
        height: 100vh;
    }
</style>
