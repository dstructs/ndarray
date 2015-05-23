'use strict';

// MODULES //

var ctor = require( './ctor.js' ),
	rawCtor = require( './ctor.raw.js' );


// VARIABLES //

var CACHE = require( './ctors.js' ),
	CTORS = CACHE.CTORS,
	RCTORS = CACHE.RCTORS;


// GET CTOR //

/**
* FUNCTION: getCtor( dtype, ndims[, raw] )
*	Returns an ndarray constructor.
*
* @param {String} dtype - underlying ndarray data type
* @param {Number} ndims - view dimensions
* @param {Boolean} [raw=false] - boolean indicating if a raw ndarrray constructor should be used
* @returns {ndarray} ndarray constructor
*/
function getCtor( dtype, ndims, raw ) {
	var ctors,
		len,
		f, i;

	if ( raw ) {
		ctors = RCTORS[ dtype ];
		f = rawCtor;
	} else {
		ctors = CTORS[ dtype ];
		f = ctor;
	}
	len = ctors.length;
	for ( i = len+1; i <= ndims; i++ ) {
		ctors.push( f( dtype, i ) );
	}
	return ctors[ ndims-1 ];
} // end FUNCTION getCtor()


// EXPORTS //

module.exports = getCtor;
