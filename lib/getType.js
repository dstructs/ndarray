'use strict';

// MODULES //

var typeName = require( 'type-name' ),
	isArray = require( 'validate.io-array' ),
	hasInterface = require( './hasInterface.js' );


// VARIABLES //

var ITYPES = require( './itypes.js' );


// FUNCTIONS //

var isStr = Object.prototype.toString;


// GET TYPE //

/**
* FUNCTION: getType( x )
*	Determines an input data type.
*
* @private
* @param {*} x - input value
* @returns {String|Null} data type
*/
function getType( x ) {
	var type,
		v;

	type = isStr.call( x ).slice( 8, -1 );
	switch ( type ) {
	case 'Int8Array':
	case 'LogicalArray':
		return 'int8';
	case 'Uint8Array':
		return 'uint8';
	case 'Uint8ArrayClamped':
		return 'uint8_clamped';
	case 'Int16Array':
		return 'int16';
	case 'Uint16Array':
		return 'uint16';
	case 'Int32Array':
		return 'int32';
	case 'Uint32Array':
		return 'uint32';
	case 'Float32Array':
		return 'float32';
	case 'Float64Array':
	case 'NumberArray':
		return 'float64';
	case 'Buffer':
		return 'binary';
	case 'BooleanArray':
		return 'boolean';
	case 'StringArray':
		return 'string';
	}
	if ( isArray( x ) ) {
		v = x[ 0 ];
		// TODO: determine array type; use first value as a proxy to pick the appropriate validator. If the validator fails, then know the array is mixed. (Note: logical is tricky. Even if fails, then could still be number.)
		// String, Boolean, Logical, Number, mixed
		return 'generic';
	}
	if ( hasInterface( x ) ) {
		return 'generic';
	}
	return null;
} // end FUNCTION getType()


// EXPORTS //

module.exports = getType;
