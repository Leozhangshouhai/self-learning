<template>
    <div class="register">
        我是 <span style="color:red">{{selectedIndex}}</span>  页面
    </div>
  </template>
  <script>
    import Vue from 'vue';
    import {
      Toast,
      Field,
      Button
    } from 'mint-ui';
    Vue.component(Toast.name, Toast);
    Vue.component(Field.name, Field);
    Vue.component(Button.name, Button);
    import {
      CONFIRM
    } from '../assets/js/tools.js';
    import api from '../assets/js/api.js';
    import config from '../assets/js/config.js';
    import MD5 from "../assets/js/md5.js";
    import fly from '../assets/js/linyer.js';
   
    export default {
      name: "register",
      data() {
        return {
  
        }
      },
  
      created() {
       
      
      },
      computed: {
        selectedIndex(){
                this.selected=this.$store.state.selectedIndex;
                 return this.$store.state.selectedIndex
            }
      },
      methods: {
       
  
      }
    }
  </script>