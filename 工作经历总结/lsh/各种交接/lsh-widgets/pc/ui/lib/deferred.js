import {support} from 'support';
import * as typeCheck from 'typeCheck'

/**
 * 基于Promise简单封装一个Deferred对象和when方法
 * 用法类似于jQuery.Deferred和jQuery.when
 * 解决原生Promise诸如跨方法调用、没有finally( 也叫always )等小问题
 *
 * Deferred不要跟原生Promise混用
 * 因为Deferred的then和catch方法每次都返回当前的Deferred实例而不是Promise对象
 * Deferred内部会把then方法产生的新Promise对象替换掉自己的promise来保证链式调用的正确性
 * */
class Deferred {
    constructor( beforeActive ) {
        if ( typeCheck.isFunction( beforeActive ) ) {
            beforeActive.call( this );
        }

        this.promise = new Promise( ( resolve, reject ) => {
            this.resolve = resolve;
            this.reject = reject;
        } );
    }

    then( resolve, reject ) {
        const newDef = new Deferred();

        this.promise.then( resolve, reject ).then( function ( value ) {
            newDef.resolve( value );
        } ).catch( function ( msg ) {
            newDef.reject( msg );
        } );

        return newDef;
    }

    // catch( reject ) {
    //     return this.then( null, reject );
    // }

    // always( fn ) {
    //     return this.then( fn, fn );
    // }

    static resolve( value ) {
        let def = new Deferred();

        def.resolve( value );

        return def;
    }

    static reject( msg ) {
        let def = new Deferred();

        def.reject( msg );

        return def;
    }
}

function when( ...deferreds ) {
    const newDef = new Deferred();
    let remaining = deferreds.length;
    const resolveValues = new Array( deferreds.length );

    let updateFunc = function ( i ) {
        return function ( value ) {
            resolveValues[ i ] = value;
            if ( !(--remaining) ) {
                newDef.resolve( resolveValues );
            }
        };
    };

    deferreds.forEach( function ( def, index ) {
        if ( def instanceof Deferred ) {
            def.then( updateFunc( index ), newDef.reject );
        } else {
            --remaining;
        }
    } );

    return newDef;
}

export {
    Deferred,
    when
}