'use strict';

var ndarray = require( './../lib' );

var arr = ndarray( new Int8Array( 2*2 ), {
	'shape': [ 2, 2 ]
});

console.log( arr );
console.log( arr.shape );
console.log( arr.strides );
console.log( arr.dtype );
console.log( arr.ndims );
