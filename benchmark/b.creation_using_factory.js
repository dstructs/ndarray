'use strict';

// MODULES //

var ndarray1 = require( 'ndarray' ),
	ndarray2 = require( './../lib' );


// VARIABLES //

var factory,
	start,
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

factory = ndarray2.factory({
	'shape': [128,128],
	'dtype': 'float32',
	'strict': true
});

iArr = new Float32Array( 128*128 );
len = 1e6;

res = new Array( 2 );

// Incumbent...
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	arr = ndarray1( iArr, [128,128] );
}
stop = process.hrtime( start );

res[ 0 ] = stop[ 0 ] + stop[ 1 ]*1e-9;

// Challenger...

start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	arr = factory( iArr );
}
stop = process.hrtime( start );

res[ 1 ] = stop[ 0 ] + stop[ 1 ]*1e-9;

// Results:
console.log( 'Creation (using factory):' );
console.log( 'Curr:\t%d ops/sec', Math.floor( len/res[ 0 ] ) );
console.log( 'New:\t%d ops/sec', Math.floor( len/res[ 1 ] ) );
console.log( '\n' );

