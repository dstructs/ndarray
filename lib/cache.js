'use strict';

// CONSTRUCTOR CACHE //

var // Raw constructors:
	RCTORS = {},

	// Strict constructors:
	CTORS = {};


(function setup() {
	var dtypes = require( './dtypes.js' ),
		type,
		len,
		i;

	len = dtypes.length;
	for ( i = 0; i < len; i++ ) {
		type = dtypes[ i ];
		RCTORS[ type ] = [];
		CTORS[ type ] = [];
	}
})();


// EXPORTS //

module.exports.CTORS = CTORS;
module.exports.RCTORS = RCTORS;
