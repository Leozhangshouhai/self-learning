/**
* Created by Linyer on 2017/7/17.
*/
<template>
    <div class="fly-index">
     我是ES6语法 ，测试页面

     <h4>{{data}}</h4> 
    </div>
</template>

<script>
    import Vue from 'vue';
    import fly from "../assets/js/linyer"
    import axios from "axios";
    export default {
        data() {
            return {
               data:'',
            };
        },
        created() {
           this.Indicator.close();
           var data=this.MIterator(['a','12','我'])
           console.log(data);
           console.log(  data.next() );
           this.data=data.next();
           var arr=['1','WW2','3'];
           let obj={};
           obj[Symbol.iterator]=arr[Symbol.iterator].bind(arr);
           console.log(obj);
           console.log(typeof obj);
           for(let a of obj){
               console.log(a)
           };
           let qa=Symbol({a:123,toString(){  return this.a+'s'}});
           console.log(qa)
          let as=async function(){
              let Qs= await wait();
              console.log('Qs:'+Qs);
              function wait(){
                        for(var i=0;i<10000000000;i++){
                            
                        }
                        return i;
                      }
          }
          as();
        },
        methods:{
            MIterator(arr){
             
                    var nextindex=-10;
                    return {
                        next:function(){
                            return nextindex<arr.length?
                            {value:arr[nextindex++],done:false}:{value:undefined,done:true }
                        }
                    }
                  
            }
        }
       
    };
</script>

<style lang="scss">

</style>