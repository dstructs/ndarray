'use strict';

// MODULES //

var ndarray1 = require( 'ndarray' ),
	ndarray2 = require( './../lib' );


// VARIABLES //

var start,
	stop,
	iArr,
	res,
	len,
	arr,
	i;


// --------------------------------------
// WARM-UP //

len = 1e6;
for ( i = 0; i < len; i++ ) {
	i = i;
}


// --------------------------------------
// BENCHMARK

iArr = new Float32Array( 128*128 );
len = 1e6;

res = new Array( 2 );

// Incumbent...
arr = ndarray1( iArr, [128,128] );
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	arr.set( 64, 64, Math.random() );
}
stop = process.hrtime( start );

res[ 0 ] = stop[ 0 ] + stop[ 1 ]*1e-9;

// Challenger...
arr = ndarray2.raw( iArr, [128,128] );
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	arr.set( 64, 64, Math.random() );
}
stop = process.hrtime( start );

res[ 1 ] = stop[ 0 ] + stop[ 1 ]*1e-9;

// Results:
console.log( 'Set (prototype):' );
console.log( 'Curr:\t%d ops/sec', Math.floor( len/res[ 0 ] ) );
console.log( 'New:\t%d ops/sec', Math.floor( len/res[ 1 ] ) );
console.log( '\n' );

