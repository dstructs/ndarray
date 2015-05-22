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
function ndarray( data, options ) {
	var strides,
		offset,
		shape,
		ndims,
		dtype,
		opts,
		ctor,
		s, i;

	dtype = getType( data );
	if ( dtype === null ) {
		throw new TypeError( 'ndarray()::invalid input argument. Input data must be a valid type. Consult the documentation for a list of valid data types. Value: `' + data + '`.' );
	}
	if ( arguments.length > 1 ) {
		opts = options;
	} else {
		opts = {};
	}
	// Parse ndarray options...
	if ( opts.hasOwnProperty( 'shape' ) ) {
		shape = opts.shape;
		ndims = shape.length;
	} else {
		shape = [ data.length ];
		ndims = 1;
	}
	if ( opts.hasOwnProperty( 'strides' ) ) {
		strides = opts.strides;
	} else {
		strides = new Array( ndims );
		s = 1;
		for ( i = ndims-1; i >= 0; i-- ) {
			strides[ i ] = s;
			s *= shape[ i ];
		}
	}
	if ( opts.hasOwnProperty( 'offset' ) ) {
		offset = opts.offset;
	} else {
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
