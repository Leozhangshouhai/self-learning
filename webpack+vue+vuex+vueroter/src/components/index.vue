<template>
    <div>
        <mu-auto-complete hintText="请随便输入点啥" @input="handleInput" :dataSource="dataSource" @change="handlechange" />
        <mu-auto-complete hintText="请随便输入点啥" labelFloat label="full width" fullWidth @input="handleInput" :dataSource="dataSource"/>
    </div>
</template>

<script>

	import Vue from 'vue';
	import fly from "../assets/js/linyer"
    import MuseUI from 'muse-ui'
    import 'muse-ui/dist/muse-ui.css'
    import { Spinner } from 'mint-ui';

    Vue.component(Spinner.name, Spinner);

    Vue.use(MuseUI)
    export default {
      data () {
        return {
          dataSource: []
        }
      },
      methods: {
        handlechange (val) {
          console.log(`you choose ${val}`)
        },

        handleInput (val) {
          this.dataSource = [
            val,
            val + val,
            val + val + val
          ]
        }
      }
    }
</script>

<style lang="scss" >

#index{
    /*background-color: #0077DB;*/
}
    .toast{
        font-size: 1.5rem;
        color: white;
        z-index: 11111;
        padding: 0.25rem !important;
        border-radius: 10px;
    }
</style>