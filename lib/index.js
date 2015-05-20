'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isArray = require( 'validate.io-array' ),
	isBuffer = require( 'validate.io-buffer' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isNumberArray = require( 'validate.io-number-primitive-array' ),
	isPositiveIntegerArray = require( 'validate.io-positive-integer-array' ),
	typeName = require( 'type-name' );


// VARIABLES //

var CTORS, typedArrays;

typedArrays = [
	'Int8Array',
	'Uint8Array',
	'Uint8ArrayClamped',
	'Int16Array',
	'Uint16Array',
	'Int32Array',
	'Uint32Array',
	'Float32Array',
	'Float64Array'
];

CTORS = {};


// FUNCTIONS //

var hasInterface = require( './hasInterface.js' ),
	indexOf = require( './indexOf.js' );


/**
* FUNCTION: getType( x )
*	Determines an input data type.
*
* @private
* @param {*} x - input value
* @returns {String|Null} data type
*/
function getType( x ) {
	var i;
	if ( isArray( x ) ) {
		return 'Array';
	}
	if ( isBuffer( x ) ) {
		return 'Buffer';
	}
	if ( hasInterface( x ) ) {
		return 'Object';
	}
	i = indexOf( typedArrays, typeName( x ) );
	if ( i > -1 ) {
		return typedArrays[ i ];
	}
	return null;
} // end FUNCTION getType()


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
		length,
		dtype,
		nbytes,
		strides,
		offset,
		shape,
		ndims,
		opts,
		s, i;

	type = getType( data );
	if ( type === null ) {
		throw new TypeError( 'ndarray()::invalid input argument. Input data must be an array, typed array, buffer, or have a valid interface. Value: `' + data + '`.' );
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
		shape = opts.shape;
		if ( !isPositiveIntegerArray( shape ) ) {
			throw new TypeError( 'ndarray()::invalid option. Shape option must be an array of positive integers. Option: `' + shape + '`.' );
		}
		length = 1;
		for ( i = 0; i < ndims; i++ ) {
			length *= shape[ i ];
		}
		if ( length > data.length ) {
			throw new Error( 'ndarray()::invalid option. Array shape exceeds the number of input array elements.' );
		}
	} else {
		length = data.length;
		shape = [ length ];
	}
	ndims = shape.length;

	// [3] Determine the view strides...
	if ( opts.hasOwnProperty( 'strides' ) ) {
		strides = opts.strides;
		if ( !isNumberArray( strides ) ) {
			throw new TypeError( 'ndarray()::invalid option. Strides option must be an array of number primitives. Option: `' + strides + '`.' );
		}
		if ( strides.length !== ndims ) {
			throw new Error( 'ndarray()::invalid option. Number of strides must equal the number of dimensions. ndims: '+ ndims + '`. Option: `' + strides + '`.' );
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
		if ( offset >= length ) {
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

	// [5] Return a new ndarray instance:
	return this;
} // end FUNCTION ndarray()



// EXPORTS //

module.exports = ndarray;
