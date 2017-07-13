<template>
    <div id="example">

        <router-link to="demo">{{ msg }}</router-link>
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
        msg: 'Welcome to Your Vue.js App'
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
