'use strict';

// METHODS //

var getType = require( './dtype.js' ),
	getDims = require( './ndims.js' ),
	getLength = require( './length.js' ),
	getShape = require( './shape.js' ),
	getStrides = require( './strides.js' ),
	getOffset = require( './offset.js' );


// NDARRAY //

/**
* FUNCTION: ndarray( data, opts )
*	`ndarray` constructor.
*
* @constructor
* @param {Array|Int8Array|Uint8Array|Uint8ArrayClamped|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Buffer|Object} - input data
* @param {Object} [opts] - function options
* @returns {ndarray} ndarray instance
*/
function ndarray( data, opts ) {

	// Underlying data type:
	Object.defineProperty( this, 'dtype', {
		'get': getType( opts.dtype ),
		'configurable': false,
		'enumerable': true
	});

	// Number of view dimensions:
	Object.defineProperty( this, 'ndims', {
		'get': getDims( opts.ndims ),
		'configurable': false,
		'enumerable': true
	});

	// View length:
	Object.defineProperty( this, 'length', {
		'get': getLength( opts.length ),
		'configurable': false,
		'enumerable': true
	});

	// View shape:
	Object.defineProperty( this, 'shape', {
		'get': getShape( opts.shape ),
		'configurable': false,
		'enumerable': true
	});

	// View strides:
	Object.defineProperty( this, 'strides', {
		'get': getStrides( opts.strides ),
		'configurable': false,
		'enumerable': true
	});

	// View offset:
	Object.defineProperty( this, 'offset', {
		'get': getOffset( opts.offset ),
		'configurable': false,
		'enumerable': true
	});

	// Number of bytes used by the view elements:
	Object.defineProperty( this, 'nbytes', {
		'get': getBytes,
		'configurable': false,
		'enumerable': true
	});

	// Create the underlying data storage array:
	Object.defineProperty( this, 'data', {
		'get': getData,
		'configurable': false,
		'enumerable': true
	});

	return this;

	/**
	* FUNCTION: getBytes()
	*	Returns the number of bytes used by the view elements.
	*
	* @returns {Number} number of bytes
	*/
	function getBytes() {
		return nbytes;
	}

	/**
	* FUNCTION: getData()
	*	Returns the underlying data store.
	*
	* @returns {Array|Int8Array|Uint8Array|Uint8ArrayClamped|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Buffer|Object} underlying data store
	*/
	function getData() {
		return data;
	}
} // end FUNCTION ndarray()
