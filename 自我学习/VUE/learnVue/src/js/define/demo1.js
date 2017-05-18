/**
 * Created by leo on 2017/4/26.
 */

Vue.component('my-demo',{
    props:['title'],
    template:'<div class="classname" :class="[judge]" @click="add" >{{ title}}' +
    '<img :src="src" alt="" class="imgsrc"></div>',
    methods:{
       add:function () {
          if(this.message%2===0){
              this.src='../images/demo1-down.png'
          }else{
              this.src='../images/demo1-up.png'
          }
           var demo1=container.$refs.demo1;
          console.log(this)
         if( demo1.$data.judge==='select'){
             demo1.$data.judge=''
         }else{
             demo1.$data.judge='select'
         }

           this.message++;
          console.log('12345');
       }
    },
    data:function () {
        return {
            message:0,
            judge:'',
            src:'../images/demo1-up.png'
        }
    }
});
var data={
    list:[
        {
            name:'张海',age:23,paying:666,birthday:'1993-05-26'
        },   {
            name:'冉皓',age:22,paying:345,birthday:'1994-05-26'
        },   {
            name:'杨春燕',age:21,paying:989,birthday:'1995-05-26'
        },
    ],
    order:'paying ',
    sign:-1
}
var container=new Vue({
    el:'#container',
    data: data,
    methods:{
        orderBy:function (sign) {
            if(this.order===sign){
                this.sign=this.sign===1?-1:1
            }else{
                this.order=sign;
                this.sign=1
            }
            console.log(78945)
        },
    }
});

