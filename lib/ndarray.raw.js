'use strict';

// MODULES //

var getType = require( './getType.js' ),
	ctor = require( './ctor.raw.js' );


// VARIABLES //

var CACHE = require( './cache.js' ).RCTORS;


// NDARRAY //

/**
* FUNCTION: ndarray( data[, dtype[, shape[, offset[, strides ]]]] )
*	Creates a new ndarray instance.
*
* @param {Array|Int8Array|Uint8Array|Uint8ArrayClamped|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Buffer|Object} - input data
* @param {String} [dtype] - underlying ndarray data type
* @param {Number[]} [shape] - ndarray view shape
* @param {Number} [offset] - ndarray view offset
* @param {Number[]} [strides] - ndarray view strides
* @returns {ndarray} ndarray instance
*/
function ndarray( data, dtype, shape, offset, strides ) {
	var ctors,
		len,
		f, d, s,
		i;

	// Parse ndarray options...
	if ( !dtype ) {
		dtype = getType( data );
		if ( dtype === null ) {
			throw new TypeError( 'ndarray()::invalid input argument. Input data must be a valid type. Consult the documentation for a list of valid data types. Value: `' + data + '`.' );
		}
	}
	if ( shape ) {
		d = shape.length;
	} else {
		shape = [ data.length ];
		d = 1;
	}
	if ( !strides ) {
		strides = new Array( d );
		s = 1;
		for ( i = d-1; i >= 0; i-- ) {
			strides[ i ] = s;
			s *= shape[ i ];
		}
	}
	if ( typeof offset !== 'number' || offset !== offset ) {
		offset = 0;

		// Account for negative strides...
		for ( i = 0; i < d; i++ ) {
			if ( strides[ i ] < 0 ) {
				offset -= ( shape[i] - 1 ) * strides[ i ];
			}
		}
	}
	// Get the view constructor...
	ctors = CACHE[ dtype ];
	len = ctors.length;

	// If the constructor has not already been created, create it, as well as any lower dimensional views of the same data type...
	for ( i = len+1; i <= d; i++ ) {
		ctors.push( ctor( dtype, i ) );
	}
	f = ctors[ d-1 ];

	// Create a new view:
	return new f( data, shape, offset, strides );
} // end FUNCTION ndarray()


// EXPORTS //

module.exports = ndarray;
