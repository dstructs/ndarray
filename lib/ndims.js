'use strict';

/**
* FUNCTION: getDims( ndims )
*	Encloses the number of view dimensions and returns a getter function.
*
* @param {Number} ndims - number of dimensions
* @returns {Function} getter
*/
function getDims( ndims ) {
	/**
	* FUNCTION: getDims()
	*	Returns the number of view dimensions.
	*
	* @returns {Number} number of dimensions
	*/
	return function getDims() {
		return ndims;
	};
} // end FUNCTION getDims()


// EXPORTS //

module.exports = getDims;
