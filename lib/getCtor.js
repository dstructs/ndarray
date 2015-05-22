'use strict';

// MODULES //

var ctor = require( './ctor.js' ),
	rawCtor = require( './ctor.raw.js' );


// VARIABLES //

var CTORS = require( './ctors.js' );


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
	var key;

	key = ndims + 'd_' + dtype;
	if ( raw ) {
		key += '_raw';
		if ( !CTORS.hasOwnProperty( key ) ) {
			CTORS[ key ] = rawCtor( dtype, ndims );
		}
	} else {
		if ( !CTORS.hasOwnProperty( key ) ) {
			CTORS[ key ] = ctor( dtype, ndims );
		}
	}
	return CTORS[ key ];
} // end FUNCTION getCtor()


// EXPORTS //

module.exports = getCtor;
