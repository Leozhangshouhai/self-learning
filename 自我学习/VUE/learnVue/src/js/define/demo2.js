/**
 * Created by leo on 2017/4/27.
 */
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
    demolist:[
        {text:'工资'},
        {text:'年龄'},
        {text:'生日'}
    ],
    demolist2:[0,1,2,3],
    order:'paying ',
    sign:-1,
    age:23
};
var demo2={
    props:['title'],
    template:'<div class="classname">{{ title}} </div> '
};
// Vue.component('myde', {
//     template:'<div class="classname">标题{{ title}} </div>',
//     props: ['title']
// });
var age1=22;
var container=new Vue({
    el:'#container',
    data:data,
    computed:{
        evenlist:function () {
            return this.list.filter(function (demo) {
                return demo.age>=22
            })
        },
        evenorder:function () {
            return _.orderBy(this.list,'birthday')
        },
        limitby:function () {
            return this.list.slice(0,1);
        }
    },
    methods:{
      evenfilter:function (list,age) {
          return list.filter(function (demo) {
              return demo.age===age;
          })
      },
    },
    components:{
        'my-demo2':demo2
    }
});
