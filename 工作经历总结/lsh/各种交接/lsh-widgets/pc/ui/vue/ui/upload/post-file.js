/*
 * 全局封装的fetch方法不适用于文件上传, 如果要使用XMLHttpRequest的方式, 可以参考Element的实现
 * https://github.com/ElemeFE/element/blob/dev/packages/upload/src/ajax.js
 *
 * 这里针对文件上传单独写一个上传的请求方法, fetch暂不支持onprogress的进度监听, 不提供进度条功能
 *
 * @author Kongkong
 * @date 2017.4.27
 */
import {Deferred} from '../../../lib/deferred';
import Loading from '../../../loading/loading';

export function PostFile( url = '', formData = {} ) {
    const method = 'POST';
    // const contentType = `multipart/form-data;`;
    const dataType = 'json';
    const commonError = '上传失败';

    const def = new Deferred();

    Loading.show();

    window.fetch( url, {
        method: method,
        credentials: 'include',
        headers: {
            // 不需要手动写入multipart/form-data, fetch发请求传入文件时会自动添加文件扩展名, 并增加boundary标识
            // 手动写入无boundary标识, 后端无法解析文件
            // 'Content-Type': contentType
        },
        body: formData
    } ).then( function ( response ) {
        if ( response.status === 200 ) {
            Loading.hide();
            if ( dataType.toLowerCase() === "json" ) {
                response.json().then( function ( _response ) {
                    if ( _response && typeof _response.ret !== undefined && _response.ret === 0 ) {
                        def.resolve( _response.content || {} );
                    } else {
                        def.reject( _response && _response.msg ? _response.msg : commonError );
                    }
                } ).catch( function ( e ) {
                    def.reject( `${commonError}：${e} in ${response.url}` );
                } );
            }
        } else {
            Loading.hide();
            def.reject( commonError );
        }
    }, function () {
        Loading.hide();
        def.reject( '请求失败！' );
    } );

    return def;
}