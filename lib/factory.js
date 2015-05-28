'use strict';

// MODULES //

var isBoolean = require( 'validate.io-boolean-primitive' ),
	validate = require( './validate.js' ),
	getType = require( './getType.js' ),
	getCtor = require( './getCtor.js' );


// VARIABLES //

var ITYPES = require( './itypes.js' );


// FACTORY //

/**
* FUNCTION: ndarrayFactory( opts )
*	Creates a reusable ndarray factory.
*
* @param {Object} opts - ndarray options
* @param {Number[]} opts.shape - ndarray view shape
* @param {Number[]} [opts.strides] - ndarray view strides
* @param {Number} [opts.offset] - ndarray view offset
* @param {String} [opts.dtype="generic"] - underlying ndarray data type
* @param {Boolean} [opts.strict=false] - boolean indicating whether to accept input data of a different type. If `false`, input data is cast to the factory's ndarray data type.
* @returns {Function} ndarray factory
*/
function ndarrayFactory( opts ) {
	var strides,
		offset,
		strict,
		dtype,
		shape,
		ndims,
		ctor,
		len,
		i;

	if ( opts.hasOwnProperty( 'shape' ) ) {
		shape = opts.shape;
	} else {
		throw new Error( 'ndarrayFactory()::invalid input argument. Must specify the `ndarray` shape. Value: `' + opts + '`.' );
	}
	if ( opts.hasOwnProperty( 'dtype' ) ) {
		dtype = opts.dtype;
	} else {
		dtype ='generic';
	}
	if ( opts.hasOwnProperty( 'strict' ) ) {
		strict = opts.strict;
		if ( !isBoolean( strict ) ) {
			throw new TypeError( 'ndarrayFactory()::invalid option. Strict option must be a boolean primitive. Option: `' + strict + '`.' );
		}
	}
	ndims = shape.length;
	len = 1;
	for ( i = 0; i < shape.length; i++ ) {
		len *= shape[ i ];
	}
	opts = validate( dtype, len, opts );

	// Dereference remaining options...
	strides = opts.strides;
	offset = opts.offset;

	// Get the appropriate ndarray constructor...
	ctor = getCtor( dtype, ndims );

	/**
	* FUNCTION: ndarray( data )
	*	Creates an ndarray.
	*
	* @param {Array|Int8Array|Uint8Array|Uint8ArrayClamped|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Buffer|Object} - input data
	* @returns {ndarray} ndarray instance
	*/
	return function ndarray( data ) {
		var type = getType( data );
		if ( type === null ) {
			throw new TypeError( 'ndarray()::invalid input argument. Input data must be a valid type. Consult the documentation for a list of valid data types. Value: `' + data + '`.' );
		}
		if ( ITYPES[ type ] !== dtype ) {
			if ( strict ) {
				throw new TypeError( 'ndarray()::invalid input argument. Input data is of the wrong type for this factory. Value: `' + data + '`.' );
			}
			// TODO: cast to new data type
			// TODO: if casting to generic, cast to dense generic array
			// TODO: check if has interface; if so, need to use provided getter
		}
		if ( len > data.length ) {
			throw new RangeError( 'ndarray()::invalid input argument. View shape is incompatible with the input data. Insufficient number of data elements.' );
		}
		return new ctor( data, shape, offset, strides );
	};
} // end FUNCTION ndarrayFactory()


// EXPORTS //

module.exports = ndarrayFactory;
