import index from './index.vue';
import Vue from 'vue'

new Vue({
  el: '#app',
  render: mod => mod(index)
});


