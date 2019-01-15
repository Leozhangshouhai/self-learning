import * as typeCheck from 'typeCheck'

const rbracket = /\[\]$/;
const r20 = /%20/g;

function buildParams( prefix, obj, traditional, add ) {
    var name;

    if ( typeCheck.isArray( obj ) ) {
        // Serialize array item.
        obj.forEach( obj, function ( v, i ) {
            if ( traditional || rbracket.test( prefix ) ) {
                // Treat each array item as a scalar.
                add( prefix, v );

            } else {
                // Item is non-scalar (array or object), encode its numeric index.
                buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
            }
        } );

    } else if ( !traditional && typeCheck.typeOf( obj ) === "object" ) {
        // Serialize object item.
        for ( name in obj ) {
            buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
        }

    } else {
        // Serialize scalar item.
        add( prefix, obj );
    }
}

export function encodeParam( a ) {
    var prefix,
        s = [],
        add = function ( key, value ) {
            // If value is a function, invoke it and return its value
            value = typeCheck.isFunction( value ) ? value() : ( value == null ? "" : value );
            s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
        };

    // If an array was passed in, assume that it is an array of form elements.
    if ( typeCheck.isArray( a ) ) {
        // Serialize the form elements
        a.forEach( function ( array ) {
            add( array.name, array.value );
        } );

    } else {
        // If traditional, encode the "old" way (the way 1.3.2 or older
        // did it), otherwise encode params recursively.
        for ( prefix in a ) {
            buildParams( prefix, a[ prefix ], undefined, add );
        }
    }

    // Return the resulting serialization
    return s.join( "&" ).replace( r20, "+" );
}