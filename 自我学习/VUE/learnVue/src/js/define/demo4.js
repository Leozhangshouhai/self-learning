/**
 * Created by leo on 2017/5/2.
 */

Vue.component('zujian', {
    template: '<div><button v-on:click="click12">我是btn1</button></div>',
    methods:{
        click12:function(){
            console.log('i am  click');
            container.$emit('id-selected', 1);
        }
    }
});
Vue.component('zujiansss', {
    template: '<div><button @click="click12">我是btn2</button></div>',
    methods:{
        click12:function(){
            console.log('i am  selected');
            container.$on('id-selected', function (id) {
                console.log(1234)
            })
        }
    }
});

var container=new Vue({
    el:'#container',
    data:{
        c:3,
        a:{
          x:'xxxx'
        }
    },
    methods:{
        selected:function () {
            console.log('1234')
        },
        btn3:function () {
           if(!this.a.a){
               this.a = Object.assign({}, this.a, { a: 1, b: 2 ,x:'1234'});
           }else{
               this.a.a++;
           }
        }
    }
});
