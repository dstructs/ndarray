'use strict';

/**
* FUNCTION: getLength( len )
*	Encloses a view length and returns a getter function.
*
* @param {Number} len - view length
* @returns {Function} getter
*/
function getLength( len ) {
	/**
	* FUNCTION: getLength()
	*	Returns the number of elements in the array view.
	*
	* @returns {Number} array view length
	*/
	return function getLength() {
		return len;
	};
} // end FUNCTION getLength()


// EXPORTS //

module.exports = getLength;
