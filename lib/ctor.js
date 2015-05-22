'use strict';

// METHODS //

var setterFactory = require( './set.js' ),
	getterFactory = require( './get.js' );


// CTOR //

/**
* FUNCTION: ctor( dtype, ndims )
*	Creates an ndarray class based on a data type and view dimensions.
*
* @param {String} dtype - data type
* @param {Number} ndims - view dimensions
* @returns {ndarray} ndarray class
*/
function ctor( dtype, ndims ) {
	var createSetter,
		createGetter,
		proto;

	/**
	* FUNCTION: ndarray( data, shape, offset, strides )
	*	ndarray constructor.
	*
	* @constructor
	* @param {Array|Int8Array|Uint8Array|Uint8ArrayClamped|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Buffer|Object} - input data specified according to `dtype`
	* @param {Number[]} shape - view shape
	* @param {Number} offset - view offset
	* @param {Number[]} strides - view strides
	* @returns {ndarray} ndarray instance
	*/
	function ndarray( data, shape, offset, strides ) {
		var length,
			nbytes,
			i;

		/* jshint validthis: true */
		if ( !( this instanceof ndarray ) ) {
			return new ndarray( data, shape, offset, strides );
		}
		// Calculate the total number of view elements...
		length = 1;
		for ( i = 0; i < ndims; i++ ) {
			length *= shape[ i ];
		}

		// TODO: Calculate the number of bytes used by view elements...
		// TODO: make byte calculation lazy; prob no need to do it here, as it will just slow down ndarray creation

		// View offset:
		Object.defineProperty( this, 'offset', {
			'value': offset,
			'configurable': false,
			'enumerable': true,
			'writable': false
		});

		// View strides:
		Object.defineProperty( this, 'strides', {
			'value': strides,
			'configurable': false,
			'enumerable': true,
			'writable': false
		});

		// View shape:
		Object.defineProperty( this, 'shape', {
			'value': shape,
			'configurable': false,
			'enumerable': true,
			'writable': false
		});

		// View length:
		Object.defineProperty( this, 'length', {
			'value': length,
			'configurable': false,
			'enumerable': true,
			'writable': false
		});

		// Number of bytes used by the view elements:
		Object.defineProperty( this, 'nbytes', {
			'value': nbytes,
			'configurable': false,
			'enumerable': true,
			'writable': false
		});

		// Create a setter method:
		Object.defineProperty( this, 'set', {
			'value': createSetter( data, offset, strides ),
			'configurable': false,
			'enumerable': false,
			'writable': false
		});

		// Create a getter method:
		Object.defineProperty( this, 'get', {
			'value': createGetter( data, offset, strides ),
			'configurable': false,
			'enumerable': false,
			'writable': false
		});

		// Bind the underlying data storage array:
		Object.defineProperty( this, 'data', {
			'value': data,
			'configurable': false,
			'enumerable': true,
			'writable': false
		});

		return this;
	} // end FUNCTION ndarray()

	proto = ndarray.prototype;

	// Underlying data type:
	Object.defineProperty( proto, 'dtype', {
		'value': dtype,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Number of view dimensions:
	Object.defineProperty( proto, 'ndims', {
		'value': ndims,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Generate a function to create a setter:
	createSetter = setterFactory( ndims );

	// Generate a function to create a getter:
	createGetter = getterFactory( ndims );

	// Return the new class:
	return ndarray;
} // end FUNCTION ctor()


// EXPORTS //

module.exports = ctor;
