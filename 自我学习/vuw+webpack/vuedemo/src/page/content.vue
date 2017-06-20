<template>
    <div id="example1">
   content--内容
      <h>{{msg}}</h>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                msg: 'Hello World!'
            }
        }
    }
</script>

<style lang="scss">
    #example1 {

        height: 100vh;
    }
</style>
