'use strict';

/**
* FUNCTION: getOffset( offset )
*	Encloses a view offset and returns a getter function.
*
* @param {Number} offset - view offset
* @returns {Function} getter
*/
function getOffset( offset ) {
	/**
	* FUNCTION: getOffset()
	*	Returns the view offset.
	*
	* @returns {Number} offset
	*/
	return function getOffset() {
		return offset;
	};
} // end FUNCTION getOffset()


// EXPORTS //

module.exports = getOffset;
