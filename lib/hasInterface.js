'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isFunction = require( 'validate.io-function' );


// HAS INTERFACE //

/**
* FUNCTION: hasInterface( x )
*	Validates if a value conforms to a particular interface.
*
* @private
* @param {*} x - value to be validated
* @returns {Boolean} boolean indicating if a value conforms to a particular interface
*/
function hasInterface( x ) {
	return isObject( x ) && isFunction( x.get ) && isFunction( x.set ) && x.hasOwnProperty( 'length' );
} // end FUNCTION hasInterface()


// EXPORTS //

module.exports = hasInterface;
