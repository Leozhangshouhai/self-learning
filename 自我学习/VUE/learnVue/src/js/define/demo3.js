/**
 * Created by leo on 2017/4/28.
 */
Vue.component('mokuai-1',{
    template:'  <span class="right-mode">'+
    '<p class="right-mode-title">{{title}}</p>'+
    '<p class="right-mode-info">{{number}}</p>'+
    '</span>',
    props:['title','number']
});
Vue.component('mokuai-2',{
    template:'<span class="right-mode">'+
    '<p class="right-mode-title">{{title}}</p>'+
    '</span>',
    props:['title']
});
Vue.component('mokuai-all',{
    template:'<dd class="head-dl" :class="json.color">' +
    '<span class="left-title">{{json.title}}</span>' +
    '<mokuai-1 v-if="json.judge" v-for="(demo,index) in  list" :title="demo.title" :number="demo.number"></mokuai-1>' +
    '<mokuai-2  v-if="!json.judge" v-for="(demo,index) in  list" :title="demo.title" ></mokuai-2>'+
    ' <span class="end-box bg-color1">'+
    '<img v-if="json.judge" src="../images/yuandian.png" alt="" class="end-text">' +
    '<span v-else class="end-info">11</span>'+
    '</span></dd>',
    props:['list','title','color','judge','json']
});
var data={
    price:'1234',
    lists:[
        {
            title:'订单状态',
            color:'color1',
            judge:true,
            list:[{title:'总订单量',number:106,judge:true},
            {title:'有效订单',number:106,judge:true},
            {title:'待确认订单',number:16,judge:true},
            {title:'夜归人订单',number:16,judge:true}]
        },
        {
            title:'待处理订单',
            color:'color2',
            judge:false,
            list:[
                // {title:['H12345874565','酒店入住费用','2017-4-17 16:00:03']}
                {title:'H12345874565'},
                {title:'酒店入住费用'},
                {title:'2017-4-17 16:00:03'},
            ]
        },

        {
            title:'房型概况',
            color:'color3',
            judge:true,
            list:[{title:'房型总量',number:16,judge:true},
                {title:'上架房型量',number:10,judge:true},
                {title:'未上架房型量',number:6,judge:true},
            ]
        },
        {
            title:'0元住活动',
            color:'color2',
            judge:true,
            list:[
                {title:'抢房节活动状态',number:'激活',judge:true},
                {title:'抢房起止时间',number:'2017-4-4',judge:true},
                {title:'抢房节房型总量',number:6,judge:true},
                {title:'酒店参与房型数量',number:6,judge:true},
                {title:'酒店今年已参与房量',number:6,judge:true},
                {title:'酒店最近已被抢购房量',number:16,judge:true},
            ]
        },
        {
            title:'最新消息',
            color:'color3',
            judge:false,
            list:[{title:'审核通过信息',judge:false},
                {title:'2017-04-11 11:08:04',judge:false}
            ]
        },
        {
            title:'最新评论',
            color:'color2',
            judge:true,
            list:[{title:'总评论数',number:16,judge:true},
                {title:'平均评分',number:4.8635,judge:true},
                {title:'今日评论',number:6,judge:true}
            ]
        },
        {
            title:'粉丝状况',
            color:'color3',
            judge:true,
            list:[{title:'总粉丝数',number:16,judge:true},
                {title:'待审核粉丝数',number:0,judge:true},
                {title:'今日新增粉丝数',number:6,judge:true}
            ]
        }
    ],
};
var container=new Vue({
    el:'#container',
    data:data,
    methods:{

    }
})