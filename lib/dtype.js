'use strict';

/**
* FUNCTION: getType( dtype )
*	Encloses a data type string and returns a getter function.
*
* @param {String} dtype - data type
* @returns {Function} getter
*/
function getType( dtype ) {
	/**
	* FUNCTION: getType()
	*	Returns the underlying array storage type.
	*
	* @returns {String} underlying array storage type
	*/
	return function getType() {
		return dtype;
	};
} // end FUNCTION getType()


// EXPORTS //

module.exports = getType;
