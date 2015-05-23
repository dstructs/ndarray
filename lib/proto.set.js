/* jshint evil:true */
'use strict';

/**
* FUNCTION: set( ndims )
*	Returns a setter function for views having a specified number of dimensions.
*
* @param {Number} ndims - view dimensions
* @returns {Function} setter
*/
function set( N ) {
	var n = N - 1,
		f,
		i;

	// Code generation. Start with the function definition...
	f = 'return function set(';

	// Create the index input arguments...
	// => function set( i0, i1,..., v ) {
	for ( i = 0; i < N; i++ ) {
		f += 'i' + i + ',';
	}
	// Add the value argument...
	f += 'v){';

	// Create the function body...

	// Index into the view according to the offset and strides...
	// => return data[offset+strides[0]*i0+strides[1]*i1+...] = v;
	f += 'return this.data[this.offset+';
	for ( i = 0; i < N; i++ ) {
		f += 'this.strides[' + i + ']*i' + i;
		if ( i < n ) {
			f += '+';
		}
	}
	f += ']';

	// Set the value:
	f += '=v;';

	// Close the function:
	f += '};';

	// Create the function in the global scope:
	return ( new Function( f ) )();
} // end FUNCTION set()


// EXPORTS //

module.exports = set;
