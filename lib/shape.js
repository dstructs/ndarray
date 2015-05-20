'use strict';

/**
* FUNCTION: getShape( shape )
*	Encloses a view shape and returns a getter function.
*
* @param {Number[]} shape - view shape
* @returns {Function} getter
*/
function getShape( shape ) {
	var ndims = shape.length;
	/**
	* FUNCTION: getShape()
	*	Returns the view shape.
	*
	* @returns {Number[]} view shape
	*/
	return function getShape() {
		var arr = new Array( ndims ),
			i;

		// Copy the shape array...
		for ( i = 0; i < ndims; i++ ) {
			arr[ i ] = shape[ i ];
		}
		return arr;
	};
} // end FUNCTION getShape()


// EXPORTS //

module.exports = getShape;
