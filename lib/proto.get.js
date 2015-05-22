/* jshint evil:true */
'use strict';

/**
* FUNCTION: get( ndims )
*	Returns a function factory for creating getter functions for views having a specified number of dimensions.
*
* @param {Number} ndims - view dimensions
* @returns {Function} getter factory
*/
function get( N ) {
	var n = N - 1,
		f,
		i;

	// Code generation. Start with the function definition...
	f = 'return function get(';

	// Create the index input arguments...
	// => function get( i0, i1,...) {
	for ( i = 0; i < N; i++ ) {
		f += 'i' + i;
		if ( i < n ) {
			f += ',';
		}
	}
	f += '){';

	// Create the function body...

	// Index into the view according to the offset and strides...
	// => return data[offset+strides[0]*i0+strides[1]*i1+...];
	f += 'return this.data[this.offset+';
	for ( i = 0; i < N; i++ ) {
		f += 'this.strides[' + i + ']*i' + i;
		if ( i < n ) {
			f += '+';
		}
	}
	f += '];';

	// Close the function:
	f += '};';

	// Create the function in the global scope:
	return ( new Function( f ) )();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;
