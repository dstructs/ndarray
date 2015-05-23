'use strict';

// MODULES //

var validate = require( './validate.js' ),
	ctor = require( './ctor.raw.js' );


// VARIABLES //

var CACHE = require( './cache.js' ).RCTORS;


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
* @returns {Function} ndarray factory
*/
function ndarrayFactory( opts ) {
	var strides,
		offset,
		dtype,
		shape,
		ndims,
		ctors,
		len,
		f, i;
	if ( opts.hasOwnProperty( 'shape' ) ) {
		shape = opts.shape;
	} else {
		throw new Error( 'ndarrayFactory()::invalid input argument. Must specify the `ndarray` shape. Value: `' + opts + '`.' );
	}
	if ( opts.hasOwnProperty( 'dtype' ) ) {
		dtype = opts.dtype;
	} else {
		dtype = 'generic';
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

	// Get the view constructor...
	ctors = CACHE[ dtype ];
	len = ctors.length;

	// If the constructor has not already been created, create it, as well as any lower dimensional views of the same data type...
	for ( i = len+1; i <= ndims; i++ ) {
		ctors.push( ctor( dtype, i ) );
	}
	f = ctors[ ndims-1 ];

	/**
	* FUNCTION: ndarray( data )
	*	Creates an ndarray.
	*
	* @param {Array|Int8Array|Uint8Array|Uint8ArrayClamped|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Buffer|Object} - input data
	* @returns {ndarray} ndarray instance
	*/
	return function ndarray( data ) {
		return new f( data, shape, offset, strides );
	};
} // end FUNCTION ndarrayFactory()


// EXPORTS //

module.exports = ndarrayFactory;
