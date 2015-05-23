'use strict';

// METHODS //

var createSetter = require( './proto.set.js' ),
	createGetter = require( './proto.get.js' );


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
	var proto;

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
		var nbytes,
			len,
			i;

		/* jshint validthis: true */
		if ( !( this instanceof ndarray ) ) {
			return new ndarray( data, shape, offset, strides );
		}
		// Calculate the total number of view elements...
		len = 1;
		for ( i = 0; i < ndims; i++ ) {
			len *= shape[ i ];
		}

		// TODO: Calculate the number of bytes used by view elements...

		this.offset = offset;
		this.strides = strides;
		this.shape = shape;
		this.length = len;
		this.nbytes = nbytes;
		this.data = data;

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
	// proto.dtype = dtype;

	// Number of view dimensions:
	Object.defineProperty( proto, 'ndims', {
		'value': ndims,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});
	// proto.ndims = ndims;

	// Create a setter function:
	Object.defineProperty( proto, 'set', {
		'value': createSetter( ndims ),
		'configurable': false,
		'enumerable': false,
		'writable': false
	});
	// proto.set = createSetter( ndims );

	// Create a getter function:
	Object.defineProperty( proto, 'get', {
		'value': createGetter( ndims ),
		'configurable': false,
		'enumerable': false,
		'writable': false
	});
	// proto.get = createGetter( ndims );

	// Return the new class:
	return ndarray;
} // end FUNCTION ctor()


// EXPORTS //

module.exports = ctor;
