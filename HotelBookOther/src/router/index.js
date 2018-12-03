import Vue from 'vue'
import Router from 'vue-router'

//路由按需加载
const index = resolve => require( [ '@/views/index' ], resolve );
const createOrder = resolve => require( [ '@/views/createOrder' ], resolve );
const payBack = resolve => require( [ '@/views/payBack' ], resolve );
const invoice = resolve => require( [ '@/views/invoice' ], resolve );
const orderList = resolve => require( [ '@/views/orderList' ], resolve );
const shopList = resolve => require( [ '@/views/shopList' ], resolve );
const orderDetail = resolve => require( [ '@/views/orderDetail' ], resolve );
const payment = resolve => require( [ '@/views/payment' ], resolve );
const discount = resolve => require( [ '@/views/discount' ], resolve );
const demo = resolve => require( [ '@/views/demo' ], resolve );
const useIndex = resolve => require( [ '@/useCenter/useIndex' ], resolve );
const fellow = resolve => require( [ '@/useCenter/fellow' ], resolve );
const fellowList = resolve => require( [ '@/useCenter/fellowList' ], resolve );

Vue.use( Router )

const router = new Router( {
    mode: 'hash',
    routes: [
        //如果要缓存某个页面的数据，则在路由后面加上meta: {keepAlive: true}
        { path: '/', component: index, meta: { title: '预订酒店' } },
        { path: '/index', component: index, meta: { title: '预订酒店' } },
        { path: '/createOrder', component: createOrder, meta: { title: '预订酒店' } },
        { path: '/payBack', component: payBack, meta: { title: '预订酒店' } },
        { path: '/invoice', component: invoice, meta: { title: '发票' } },
        { path: '/orderList', component: orderList, meta: { title: '订单列表' } },
        { path: '/shopList', component: shopList, meta: { title: '订单列表' } },
        { path: '/orderDetail', component: orderDetail, meta: { title: '订单详情' } },
        { path: '/payment', component: payment, meta: { title: '支付详情' } },
        { path: '/discount', component: discount, meta: { title: '我的优惠券' } },
        { path: '/useIndex', component: useIndex, meta: { title: '个人中心' } },
        { path: '/fellow', component: fellow, meta: { title: '会员申请' } },
        { path: '/fellowList', component: fellowList, meta: { title: '会员管理' } },
    ]
} )

router.afterEach(route => {
    // 从路由的元信息中获取 title 属性
    if (route.meta.title) {
        document.title = route.meta.title;
        // // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
        if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            var i = document.createElement('iframe');
            i.src = '/favicon.ico';
            i.style.display = 'none';
            i.onload = function () {
                setTimeout(function () {
                    i.remove();
                }, 10)
            }
            document.body.appendChild(i);
        }
    }
});


export default router
