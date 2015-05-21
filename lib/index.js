'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isNumberArray = require( 'validate.io-number-primitive-array' ),
	isPositiveIntegerArray = require( 'validate.io-positive-integer-array' ),
	getType = require( './getType.js' ),
	create = require( './ndarray.js' );


// VARIABLES //

// TODO: import reverse mapping
var DTYPES = require( './dtypes.js' ),
	CTORS = {};


// NDARRAY //

/**
* FUNCTION: ndarray( data[, opts])
*	Creates a new `ndarray` instance.
*
* @param {Array|Int8Array|Uint8Array|Uint8ArrayClamped|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Buffer|Object} - input data
* @param {Object} [opts] - function options
* @returns {ndarray} ndarray instance
*/
function ndarray( data, options ) {
	var type,
		dtype,
		strides,
		offset,
		shape,
		ndims,
		opts,
		ctor,
		len,
		s, i;

	type = getType( data );
	if ( type === null ) {
		throw new TypeError( 'ndarray()::invalid input argument. Input data must be a valid type. Consult the documentation for a list of valid data types. Value: `' + data + '`.' );
	}
	if ( arguments.length < 1 ) {
		opts = {};
	} else {
		opts = options;
	}
	if ( !isObject( opts ) ) {
		throw new TypeError( 'ndarray()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
	}
	// [0] Determine the underlying storage data type...
	if ( opts.hasOwnProperty( 'dtype' ) ) {
		// TODO: validate valid dtype
		// TODO: if necessary (caste as new data type), copy the input data to a new data store
	} else {
		dtype = type;
	}

	// [1] Determine the array view shape...
	if ( opts.hasOwnProperty( 'shape' ) ) {
		if ( !isPositiveIntegerArray( opts.shape ) ) {
			throw new TypeError( 'ndarray()::invalid option. Shape option must be an array of positive integers. Option: `' + opts.shape + '`.' );
		}
		ndims = opts.shape.length;
		shape = new Array( ndims );
		len = 1;
		for ( i = 0; i < ndims; i++ ) {
			shape[ i ] = opts.shape[ i ];
			len *= shape[ i ];
		}
		if ( len > data.length ) {
			throw new Error( 'ndarray()::invalid option. Array shape exceeds the number of input array elements.' );
		}
	} else {
		len = data.length;
		shape = [ len ];
		ndims = 1;
	}

	// [3] Determine the view strides...
	if ( opts.hasOwnProperty( 'strides' ) ) {
		if ( !isNumberArray( opts.strides ) ) {
			throw new TypeError( 'ndarray()::invalid option. Strides option must be an array of number primitives. Option: `' + opts.strides + '`.' );
		}
		if ( opts.strides.length !== ndims ) {
			throw new Error( 'ndarray()::invalid option. Number of strides must equal the number of dimensions. ndims: '+ ndims + '`. Option: `' + opts.strides + '`.' );
		}
		strides = new Array( ndims );
		for ( i = 0; i < ndims; i++ ) {
			strides[ i ] = opts.strides[ i ];
		}
	} else {
		strides = new Array( ndims );
		s = 1;
		for ( i = ndims-1; i >= 0; i-- ) {
			strides[ i ] = s;
			s *= shape[ i ];
		}
	}

	// [4] Determine the view offset...
	if ( opts.hasOwnProperty( 'offset' ) ) {
		offset = opts.offset;
		if ( !isNumber( offset ) ) {
			throw new TypeError( 'ndarray()::invalid option. Offset must be a number primitive. Option: `' + offset + '`.' );
		}
		if ( offset >= len ) {
			throw new RangeError( 'ndarray()::invalid option. Offset cannot exceed the number of array elements. Option: `' + offset + '`.' );
		}
	} else {
		offset = 0;

		// Account for negative strides...
		for ( i = 0; i < ndims; i++ ) {
			if ( strides[ i ] < 0 ) {
				offset -= ( shape[i] - 1 ) * strides[ i ];
			}
		}
	}

	// [5] Return a new ndarray instance...
	ctor = ndims + 'd_' + dtype;
	if ( CTORS.hasOwnProperty( ctor ) ) {
		ctor = CTORS[ ctor ];
	} else {
		CTORS[ ctor ] = create( dtype, ndims );
		ctor = CTORS[ ctor ];
	}
	return new ctor( data, shape, offset, strides );
} // end FUNCTION ndarray()



// EXPORTS //

module.exports = ndarray;
