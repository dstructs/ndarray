'use strict';

/**
* FUNCTION: getStrides( strides )
*	Encloses view strides and returns a getter function.
*
* @param {Number[]} strides - view strides
* @returns {Function} getter
*/
function getStrides( strides ) {
	var ndims = strides.length;
	/**
	* FUNCTION: getStrides()
	*	Returns the view strides.
	*
	* @returns {Number[]} strides
	*/
	return function getStrides() {
		var arr = new Array( ndims ),
			i;

		// Copy the strides array...
		for ( i = 0; i < ndims; i++ ) {
			arr[ i ] = strides[ i ];
		}
		return arr;
	};
} // end FUNCTION getStrides()


// EXPORTS //

module.exports = getStrides;
