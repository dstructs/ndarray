'use strict';

/**
* FUNCTION: indexOf( arr, val )
*	Returns the index of a value in an array.
*
* @private
* @param {Array} arr - search array
* @param {*} val - value for which to search
* @returns {Number} value index or -1
*/
function indexOf( arr, val ) {
	var len = arr.length,
		i;

	for ( i = 0; i < len; i++ ) {
		if ( arr[ i ] === val ) {
			return i;
		}
	}
	return -1;
} // end FUNCTION indexOf()


// EXPORTS //

module.exports = indexOf;
