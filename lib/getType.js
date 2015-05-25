'use strict';

// MODULES //

var typeName = require( 'type-name' ),
	isArray = require( 'validate.io-array' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isString = require( 'validate.io-string-primitive' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isBooleanArray = require( 'validate.io-boolean-primitive-array' ),
	isStringArray = require( 'validate.io-string-primitive-array' ),
	isNumberArray = require( 'validate.io-number-primitive-array' ),
	isLogicalArray = require( 'validate.io-logical-array' ),
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
		if ( isBoolean( v ) && isBooleanArray( x ) ) {
			return 'boolean';
		}
		else if ( isString( v ) && isStringArray( x ) ) {
			return 'string';
		}
		else if ( isNumber( v ) ) {
			if ( v === 0 || v === 1 ) {
				if ( isLogicalArray( v ) ) {
					return 'uint8';
				}
			}
			if ( isNumberArray( x ) ) {
				return 'float64';
			}
		}
		return 'generic';
	}
	if ( hasInterface( x ) ) {
		return 'generic';
	}
	return null;
} // end FUNCTION getType()


// EXPORTS //

module.exports = getType;
