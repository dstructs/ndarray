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

	// Code generation. Start with the outer function definition...
	// => function createGetter( data, offset, strides ) {
	f = 'return function createGetter(d,o,s){';

	// Dereference stride elements...
	// => var s0 = strides[0], s1 = strides[1],...
	f += 'var ';
	for ( i = 0; i < N; i++ ) {
		f += 's' + i + '=s[' + i + ']';
		if ( i < n ) {
			f += ',';
		} else {
			f += ';';
		}
	}

	// Add the inner function definition...
	f += 'return function get(';

	// Create the index input arguments...
	// => function get( i0, i1,...) {
	for ( i = 0; i < N; i++ ) {
		f += 'i' + i;
		if ( i < n ) {
			f += ',';
		}
	}
	f += '){';

	// Create the inner function body...

	// Index into the view according to the offset and strides...
	// => return d[offset+strides[0]*i0+strides[1]*i1+...];
	f += 'return d[o+';
	for ( i = 0; i < N; i++ ) {
		f += 's' + i + '*i' + i;
		if ( i < n ) {
			f += '+';
		}
	}
	f += '];';

	// Close the inner function:
	f += '};';

	// Close the outer function:
	f += '}';

	// Create the outer function in the global scope:
	return ( new Function( f ) )();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;
