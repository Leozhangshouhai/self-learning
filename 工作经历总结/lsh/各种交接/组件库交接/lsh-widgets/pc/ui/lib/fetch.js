import {support} from 'support';
import {Deferred, when} from 'deferred';
import {encodeParam} from 'param';
import Loading from '../loading/loading';
/**
 * Fetch api的易用封装
 * 根据链商业务的实际情况，会有一些默认的配置
 * 默认配置：
 *    发送POST类型的请求
 *    发送和返回JSON格式的数据
 *    contentType为application/x-www-form-urlencoded
 * Fetch的用法详见：https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch or https://fetch.spec.whatwg.org/
 * Polyfill参考自GitHub的实现方案（GitHub's WHATWG Fetch polyfill）：https://github.com/github/fetch
 * */
export function fetch( url = '', params = {}, options = {} ) {
    // 参数init的命名参考了Fetch的原版命名
    const {
        // 这个不用解释
        method = 'POST',

        // 请求的数据，等同于ajax的data
        param = params,

        contentType = 'application/x-www-form-urlencoded',

        // 数据类型，小写
        dataType = 'json',

        beforeSend = function () {}
    } = options;

    const def = new Deferred( beforeSend );

    Loading.show();

    // todo 发送excel的问题
    window.fetch( url, {
        method: method,
        credentials: 'include',
        headers: {
            'Content-Type': contentType
        },
        body: encodeParam( param )
    } ).then( function ( response ) {
        Loading.hide();
        if ( response.status === 200 ) {
            if ( dataType.toLowerCase() === "json" ) {
                response.json().then( function ( _response ) {
                    if ( _response && typeof _response.ret !== undefined && _response.ret === 0 ) {
                        def.resolve( _response.content || {} );
                    } else {
                        def.reject( _response && _response.msg ? _response.msg : '数据请求错误！' );
                    }
                } ).catch( function ( e ) {
                    def.reject( `返回的数据格式有误：${e} in ${response.url}` );
                } );
            }
        } else {
            Loading.hide();
            def.reject( '数据请求错误！' );
        }
    }, function () {
        Loading.hide();
        def.reject( '请求失败！' );
    } );

    return def;
};

