const rSpace = /\+/g;
export default {
    /**
     * 查询url参数
     * */
    queryString ( key ) {
        const reg = new RegExp( '(^|&)' + key + '=([^&]*)(&|$)', 'i' );
        const result = window.location.search.substr( 1 ).match( reg );
        if ( result != null ) {
            var value = decodeURIComponent( result[ 2 ] ) || '';

            return value.replace( rSpace, ' ' );
        }
        return null;
    },

    /**
     * 查询全部url参数
     * 会以对象形式返回
     * */
    queryLocationSearch ( url ) {
        let search = "";
        let result = {};
        if ( url ) {
            if ( url.indexOf( '?' ) >= 0 ) {
                search = url.substr( url.indexOf( '?' ) + 1 );
            }
        } else {
            search = window.location.search.substr( 1 );
        }
        if ( search.length ) {
            let params = search.split( "&" );
            for ( let i = 0, length = params.length; i < length; i++ ) {
                var item = params[ i ].split( "=" );
                // 对于空格, 正常情况下,是转义为 '+'(W3C); 但是encodeURIComponent是将' ' 转义为 '%20' (RFC)
                // RFC 1738: ' ' -> '%20' 同时包括(php) rawurlencode/encodeURIComponent
                // 表单的POS,GET: ' ' -> '+'  同时包括(php) urlencode, (jQuery) $.params()
                var key = decodeURIComponent( item[ 0 ] ) || '';
                var value = decodeURIComponent( item[ 1 ] ) || '';
                result[ key.replace( rSpace, ' ' ) ] = value.replace( rSpace, ' ' );
            }
        }

        return result
    },

    /**
     * 查询全部hash参数
     * 以对象形式返回
     */
    getLocationHash ( url ) {
        let hash = "";
        let result = {};
        if ( url ) {
            if ( url.indexOf( '#' ) >= 0 ) {
                hash = url.substr( url.indexOf( '#' ) + 1 );
            }
        } else {
            hash = window.location.hash.substr( 1 );
        }
        if ( hash.length ) {
            let params = hash.split( "&" );
            for ( let i = 0, length = params.length; i < length; i++ ) {
                let item = params[ i ].split( "=" );
                let key = decodeURIComponent( item[ 0 ] ) || '';
                let value = decodeURIComponent( item[ 1 ] ) || '';
                result[ key.replace( rSpace, ' ' ) ] = value.replace( rSpace, ' ' );
            }
        }
        return result;
    },

    getHash ( key ) {
        let hash = location.hash.substr( 1 );
        let reg = new RegExp( '(^|&)' + key + '=([^&]*)(&|$)', 'i' );
        let result = hash.match( reg );

        if ( !key || typeof key !== "string" ) {
            return hash;
        } else {
            return result != null ? result[ 2 ] : null;
        }
    },

    /**
     * 设置hash值, 对此方法做一些逻辑调整;
     * @param key hash参数, 如果此参数为空, 则清空整个hash;
     * @param value 需要设置的参数值, 若为空, 则从url中除去;
     * @param replace {{boolean}} 是否完全替换掉当前hash, 默认做合并处理; 设置为true时, 全部替换hash;
     */
    setHash: function ( key, value, replace ) {
        let flag = replace === undefined || replace === false;

        if ( key ) {
            // 处理hash参数
            if ( flag ) {

                // 合并处理
                let hash = this.getLocationHash();
                let hashStr = '';
                if ( value == null ) {
                    delete hash[ key ];
                } else {
                    hash[ key ] = value;
                }
                for ( let o in hash ) {
                    hashStr += (o + "=" + hash[ o ] + "&");
                }
                location.hash = hashStr.replace( /\&$/, "" );

            } else {
                // 全部替换
                if ( key ) {
                    if ( value == null ) {
                        location.hash = key;
                    } else {
                        // 先实现覆盖版本的
                        location.hash = key + "=" + value;
                    }
                }

            }

        } else {
            // 没有参数则清空hash;
            location.hash = "";
        }

    },

    /**
     * @param obj {{object}} 跳转url的query参数
     * @param replace {{boolean}} 是否完全替换掉当前query, 默认为false
     * @param replaceHash {{boolean}} 是否完全清空hash, 默认为false, 保留hash
     * */
    jump ( obj, replace, replaceHash ) {
        if ( !$$isPlainObject( obj ) || $$isEmptyObject( obj ) ) {
            return;
        }

        let search = this.queryLocationSearch();
        let location = window.location;
        let hash = location.hash;

        if ( replace ) {
            search = obj;
        }

        if ( replaceHash ) {
            hash = "";
        }

        // 如果某一query为false, 则该query不会出现在最终的url里
        // 并且如果原始url有这个参数, 还会把它从url中删除
        for ( let o in $$extend( search, obj ) ) {
            // 这里不会处理字符串"false"
            if ( search[ o ] === false ) {
                delete search[ o ];
            }
        }

        location.href = location.pathname + ($$isEmptyObject( search ) ? "" : "?") + $$param( search ) + hash;
    }
}