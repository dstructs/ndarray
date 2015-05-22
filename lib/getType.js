'use strict';

// MODULES //

var typeName = require( 'type-name' ),
	isArray = require( 'validate.io-array' ),
	hasInterface = require( './hasInterface.js' );


// VARIABLES //

var ITYPES = require( './itypes.js' );


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

	type = typeName( x );
	if ( ITYPES.hasOwnProperty( type ) && ITYPES[ type ] !== null ) {
		return ITYPES[ type ];
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
