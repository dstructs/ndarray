'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isBuffer = require( 'validate.io-buffer' ),
	typeName = require( 'type-name' );


// VARIABLES //

var DTYPES = require( './dtypes.js' );


// FUNCTIONS //

var hasInterface = require( './hasInterface.js' );


/**
* FUNCTION: getType( x )
*	Determines an input data type.
*
* @private
* @param {*} x - input value
* @returns {String|Null} data type
*/
function getType( x ) {
	var type = typeName( x );
	if ( DTYPES.hasOwnProperty( type ) && DTYPES[ type] !== null ) {
		return DTYPES[ type ];
	}
	if ( isArray( x ) ) {
		// TODO: determine array type
		// String, Boolean, Logical, Number, mixed
		return 'generic';
	}
	if ( isBuffer( x ) ) {
		return DTYPES[ 'Buffer' ];
	}
	if ( hasInterface( x ) ) {
		return 'object';
	}
	return null;
} // end FUNCTION getType()


// EXPORTS //

module.exports = getType;
