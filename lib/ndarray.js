'use strict';

// MODULES //

var getType = require( './getType.js' ),
	validate = require( './validate.js' ),
	getCtor = require( './getCtor.js' );


// VARIABLES //

var BTYPES = require( './btypes.js' );


// NDARRAY //

/**
* FUNCTION: ndarray( data[, opts] )
*	Creates a new ndarray instance.
*
* @param {Array|Int8Array|Uint8Array|Uint8ArrayClamped|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Buffer|Object} - input data
* @param {Object} [opts] - function options
* @param {Number[]} [opts.shape] - ndarray view shape
* @param {Number[]} [opts.strides] - ndarray view strides
* @param {Number} [opts.offset] - ndarray view offset
* @param {String} [opts.dtype="generic"] - underlying ndarray data type
* @returns {ndarray} ndarray instance
*/
function ndarray( data, options ) {
	var dtype,
		opts,
		ctor;

	dtype = getType( data );
	if ( dtype === null ) {
		throw new TypeError( 'ndarray()::invalid input argument. Input data must be a valid type. Consult the documentation for a list of valid data types. Value: `' + data + '`.' );
	}
	if ( arguments.length < 1 ) {
		opts = validate( dtype, data.length, {} );
	} else {
		opts = validate( dtype, data.length, options );
	}
	if ( dtype !== opts.dtype ) {
		// TODO: check if has interface; if so, need to use provided getter
		// TODO: caste as new data type; copy the input data to a new data store. Use the BTYPES mapping above.
	}

	// Return a new ndarray instance...
	ctor = getCtor( opts.dtype, opts.ndims );
	return new ctor( data, opts.shape, opts.offset, opts.strides );
} // end FUNCTION ndarray()


// EXPORTS //

module.exports = ndarray;
