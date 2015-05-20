/* jshint evil:true */
'use strict';

/**
* FUNCTION: set( ndims )
*	Returns a function factory for creating setter functions for views having a specified number of dimensions.
*
* @param {Number} ndims - view dimensions
* @returns {Function} setter factory
*/
function set( N ) {
	var n = N - 1,
		f,
		i;

	// Code generation. Start with the outer function definition...
	// => function createSetter( data, offset, strides ) {
	f = 'return function createSetter(d,o,s){';

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
	f += 'return function set(';

	// Create the index input arguments...
	// => function set( i0, i1,..., v ) {
	for ( i = 0; i < N; i++ ) {
		f += 'i' + i + ',';
	}
	// Add the value argument...
	f += 'v){';

	// Create the inner function body...

	// Index into the view according to the offset and strides...
	// => return d[offset+strides[0]*i0+strides[1]*i1+...] = v;
	f += 'return d[o+';
	for ( i = 0; i < N; i++ ) {
		f += 's' + i + '*i' + i;
		if ( i < n ) {
			f += '+';
		}
	}
	f += ']';

	// Set the value:
	f += '=v;';

	// Close the inner function:
	f += '};';

	// Close the outer function:
	f += '}';

	// Create the outer function in the global scope:
	return ( new Function( f ) )();
} // end FUNCTION set()


// EXPORTS //

module.exports = set;
