import Vue from '../third-party/vue';
import on from '../lib/event';

/**
 * @author Dingxu
 * @date 2016.7
 * 这里对Vue进行了上层封装
 * Vue本身太过依赖于模版层，期望DOM去承载所有的东西
 * 这在业务复杂度上升到一定程度以后显然是不合理的
 * 所以这里用类似偏函数的方式实现对vue的扩展
 * 方便业务层进行场景扩展
 *
 * 【重要】关于用法：
 * 除了listeners这个额外加入的东西
 * 其余参数的格式都与Vue的用法完全一致
 * listeners的用法后面有具体说明
 * */
// 视图实例
window.$$Page = options => extendVue( options );

// 组件实例
// 组件实例不同于视图实例
// 视图实例往往起到的是命名空间和容器的作用
// 它本身没有什么复用性需求
// 而组件则不然
// 大多数组件被设计的初衷是为了被复用，如UI组件、部分纯逻辑组件等
// 他们除了自己固定的一些视图模板和行为外，往往还需要用户在使用时自行定制的一些参数
// 而这些参数光靠DOM的props去承载，在很多时候是比较困难且不好维护和阅读的
// 所以在这里引入了component这个中间函数来使得组件可以更灵活的干预最后传给vue的参数
// 当然，这样也会带来代码略显碎片化的弊端，这个问题还需要再行考虑一种更好的代码组织形式
window.$$Component = ( id, component, options ) => extendVue( component( options ), "component", id );

function extendVue( component = {}, type, name ) {
    let config = Object.assign( {
        // 在Vue之外新插入的选项
        // 主要用于处理DOM的事件代理
        // Vue本身(v2.0)只提供行内事件
        // 底层使用的是zepto的事件系统
        listeners: {}
    }, component );

    config.mounted = new Proxy( component.mounted || function () {}, {
        apply: function ( fn /* 原始的mounted函数 */, thisArg /* 当前的VM */ ) {
            bindEvents( thisArg, config.listeners, config.el || config.wrap );
            fn.call( thisArg );
            return fn;
        }
    } );

    // 返回Vue实例或Vue组件实例
    return type === "component" ? Vue.component( name, config ) : new Vue( config );
}

function bindEvents( vm, events = {}, context ) {
    // "eventType selector": function() {}
    // 用法类似backbone
    // such as: "click .ac-btn": function( e, vm ) { console.log("ac-btn被点击了") }
    for ( let event in events ) {
        let ex = event.split( " " );
        on( ex[ 0 ], ex.slice( 1 ).join( " " ), context, events[ event ], vm );
    }
}

export default {};