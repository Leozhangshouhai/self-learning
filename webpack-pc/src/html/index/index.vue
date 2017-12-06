<template>
    <div>
        111
    </div>
</template>
<script>
    import Vue from "vue"
    import fly from "../../assets/js/linyer";

    export default {
        name: 'index',
        data() {
            return {}
        },
        created() {
            this.Loading.service({
                text: "拼命加载中",
                spinner: "el-icon-loading"
            });
        },
        mounted() {
        },
        methods: {}
    }
</script>


<style lang="scss">
    @import "../../assets/css/index";
</style>
