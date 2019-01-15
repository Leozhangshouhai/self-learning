const class2type = {};
const class2typeTostring = ({}).toString;
const class2typeHasOwn = ({}).hasOwnProperty;

"Boolean Number String Function Array Date RegExp Object Error".split( " " ).forEach( function ( name ) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function typeOf( obj ) {
    if ( obj == null ) {
        return String( obj );
    }

    return typeof obj === "object" || typeof obj === "function" ?
        class2type[ class2typeTostring.call( obj ) ] || "object" :
        typeof obj;
}

// function isFunction( fn ) {
//     return typeOf( fn ) === "function";
// }
const isFunction = fn => typeOf( fn ) === "function";

function isArray( arr ) {
    return typeOf( arr ) === "array";
}

function isNumeric( n ) {
    return !isNaN( parseFloat( n ) ) && isFinite( n );
}

function isPlainObject( obj ) {
    let key;

    if ( !obj || typeOf( obj ) !== "object" || obj.nodeType || obj == obj.window ) {
        return false;
    }

    try {
        if ( obj.constructor && !class2typeHasOwn.call( obj, "constructor" ) && !class2typeHasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
            return false;
        }
    } catch ( e ) {
        return false;
    }

    for ( key in obj ) {}

    return key === undefined || class2typeHasOwn.call( obj, key );
}

function isEmptyObject( obj ) {
    for ( let name in obj ) {
        return false;
    }
    return true;
}

export {
    typeOf,
    isFunction,
    isArray,
    isNumeric,
    isPlainObject,
    isEmptyObject
};