'use strict';

// MODULES //

var typeName = require( 'type-name' ),
	isArray = require( 'validate.io-array' ),
	hasInterface = require( './hasInterface.js' );


// VARIABLES //

var ITYPES = require( './itypes.js' );


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

	type = ITYPES[ typeName( x ) ];
	if ( type ) {
		return type;
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
