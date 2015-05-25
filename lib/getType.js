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
	var type;

	type = ITYPES[ typeName( x ) ];
	if ( type ) {
		return type;
	}
	if ( isArray( x ) ) {
		return 'generic';
	}
	if ( hasInterface( x ) ) {
		return 'generic';
	}
	return null;
} // end FUNCTION getType()


// EXPORTS //

module.exports = getType;
