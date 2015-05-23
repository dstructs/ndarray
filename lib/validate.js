'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isNumberArray = require( 'validate.io-number-primitive-array' ),
	isPositiveIntegerArray = require( 'validate.io-positive-integer-array' ),
	contains = require( 'validate.io-contains' );


// VARIABLES //

var DTYPES = require( './dtypes.js' );


// VALIDATE //

/**
* FUNCTION: validate( dtype, len, options )
*	Validates ndarray options. If an option is not provided, the function determines a default value.
*
* @param {String} dtype - inferred input data type
* @param {Number} len - input data length
* @param {Object} options - ndarray options
* @param {Number[]} [opts.shape] - ndarray view shape
* @param {Number[]} [opts.strides] - ndarray view strides
* @param {Number} [opts.offset] - ndarray view offset
* @param {String} [opts.dtype] - desired underlying ndarray type
* @returns {Object} validated ndarray options
*/
function validate( dtype, len, opts ) {
	var strides,
		offset,
		shape,
		ndims,
		l,
		s, i;

	if ( !isObject( opts ) ) {
		throw new TypeError( 'ndarray()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
	}

	// [0] Determine the underlying storage data type...
	if ( opts.hasOwnProperty( 'dtype' ) ) {
		dtype = opts.dtype;
		if ( !contains( DTYPES, dtype ) ) {
			throw new Error( 'ndarray()::invalid option. Unrecognized/unsupported data type. Option: `' + dtype + '`.' );
		}
	}

	// [1] Determine the array view shape...
	if ( opts.hasOwnProperty( 'shape' ) ) {
		if ( !isPositiveIntegerArray( opts.shape ) ) {
			throw new TypeError( 'ndarray()::invalid option. Shape option must be an array of positive integers. Option: `' + opts.shape + '`.' );
		}
		ndims = opts.shape.length;
		shape = new Array( ndims );
		l = 1;
		for ( i = 0; i < ndims; i++ ) {
			shape[ i ] = opts.shape[ i ];
			l *= shape[ i ];
		}
		if ( l > len ) {
			throw new Error( 'ndarray()::invalid option. Array shape exceeds the number of input array elements.' );
		}
	} else {
		shape = [ len ];
		ndims = 1;
	}

	// [2] Determine the view strides...
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

	// [3] Determine the view offset...
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
	// [4] Return the validated `ndarray` options:
	return {
		'dtype': dtype,
		'ndims': ndims,
		'shape': shape,
		'strides': strides,
		'offset': offset
	};
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
