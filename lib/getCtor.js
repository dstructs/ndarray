'use strict';

// MODULES //

var ctor = require( './ctor.js' );


// VARIABLES //

var CACHE = require( './cache.js' ).CTORS;


// GET CTOR //

/**
* FUNCTION: getCtor( dtype, ndims )
*	Returns an ndarray constructor.
*
* @param {String} dtype - underlying ndarray data type
* @param {Number} ndims - view dimensions
* @returns {ndarray} ndarray constructor
*/
function getCtor( dtype, ndims ) {
	var ctors,
		len,
		i;

	ctors = CACHE[ dtype ];
	len = ctors.length;

	// If the constructor has not already been created, use the opportunity to create it, as well as any lower dimensional constructors of the same data type....
	for ( i = len+1; i <= ndims; i++ ) {
		ctors.push( ctor( dtype, i ) );
	}
	return ctors[ ndims-1 ];
} // end FUNCTION getCtor()


// EXPORTS //

module.exports = getCtor;
