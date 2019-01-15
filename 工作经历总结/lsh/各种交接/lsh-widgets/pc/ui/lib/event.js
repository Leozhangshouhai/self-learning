import $ from '../third-party/zepto';
import * as typeCheck from 'typeCheck';

export default function ( event, selector, context, handler, extraData ) {
    // 除了PC上的chrome返回一个函数以外
    // 其它支持Proxy的浏览器在new Proxy无返回值时返回的都是Proxy对象
    // 但神奇的是这个Proxy对象跟函数一样，是可执行的（ 它的构造器也是Function ）
    // 而它的JS内部描述却是[object ProxyObject]，因而通过isFunction是无法筛选出来的
    // 所以在这里要把Proxy对象也囊括进来
    // by Dingxu
    // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    // and  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/apply
    handler = typeCheck.isFunction( context ) || ({}).toString.call( context ).indexOf( "Proxy" ) !== -1 ? context : handler;

    context = typeof context === "string" ? $( context ) : null;

    // shortcut
    if ( typeof event != "string" || typeof selector === undefined ||
        (!typeCheck.isFunction( handler ) && ({}).toString.call( handler ).indexOf( "Proxy" ) === -1) ) {
        return;
    }

    if ( context ) {
        context.on( event, selector, function ( e ) {
            handler.call( this, e, extraData );
        } );
    } else {
        $( selector ).on( event, function ( e ) {
            handler.call( this, e, extraData );
        } );
    }
};