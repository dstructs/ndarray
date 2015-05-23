'use strict';

// MODULES //

var getType = require( './getType.js' ),
	getCtor = require( './getCtor.js' );


// NDARRAY //

/**
* FUNCTION: ndarray( data[, opts])
*	Creates a new ndarray instance.
*
* @param {Array|Int8Array|Uint8Array|Uint8ArrayClamped|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Buffer|Object} - input data
* @param {Object} [opts] - function options
* @param {Number[]} [opts.shape] - ndarray view shape
* @param {Number[]} [opts.strides] - ndarray view strides
* @param {Number} [opts.offset] - ndarray view offset
* @returns {ndarray} ndarray instance
*/
function ndarray( data, shape, strides, offset ) {
	var ndims,
		dtype,
		ctor,
		s, i;

	dtype = getType( data );
	if ( dtype === null ) {
		throw new TypeError( 'ndarray()::invalid input argument. Input data must be a valid type. Consult the documentation for a list of valid data types. Value: `' + data + '`.' );
	}
	// Parse ndarray options...
	if ( shape ) {
		ndims = shape.length;
	} else {
		shape = [ data.length ];
		ndims = 1;
	}
	if ( !strides ) {
		strides = new Array( ndims );
		s = 1;
		for ( i = ndims-1; i >= 0; i-- ) {
			strides[ i ] = s;
			s *= shape[ i ];
		}
	}
	if ( !offset && offset !== 0 ) {
		offset = 0;
		for ( i = 0; i < ndims; i++ ) {
			if ( strides[ i ] < 0 ) {
				offset -= ( shape[i] - 1 ) * strides[ i ];
			}
		}
	}
	// Return a new ndarray instance...
	ctor = getCtor( dtype, ndims, true );
	return new ctor( data, shape, offset, strides );
} // end FUNCTION ndarray()


// EXPORTS //

module.exports = ndarray;
