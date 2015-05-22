'use strict';

// MODULES //

var ndarray1 = require( 'ndarray' ),
	ndarray2 = require( './../lib' );


// VARIABLES //

var factory,
	start,
	stop,
	iArr,
	raw,
	res,
	len,
	arr,
	v,
	i;


// --------------------------------------
// WARM-UP //

len = 1e6;
for ( i = 0; i < len; i++ ) {
	i = i;
}


// --------------------------------------
// TEST 1: Creation

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
	arr = ndarray2( iArr, {
		'shape': [128,128]
	});
}
stop = process.hrtime( start );

res[ 1 ] = stop[ 0 ] + stop[ 1 ]*1e-9;

// Results:
console.log( 'Creation:' );
console.log( 'Curr:\t%d ops/sec', Math.floor( len/res[ 0 ] ) );
console.log( 'New:\t%d ops/sec', Math.floor( len/res[ 1 ] ) );
console.log( '\n' );


// --------------------------------------
// TEST 2: Creation using a factory

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


// --------------------------------------
// Test 3: Setting an ndarray element value

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
arr = ndarray2( iArr, {
	'shape': [128,128]
});
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	arr.set( 64, 64, Math.random() );
}
stop = process.hrtime( start );

res[ 1 ] = stop[ 0 ] + stop[ 1 ]*1e-9;

// Results:
console.log( 'Set:' );
console.log( 'Curr:\t%d ops/sec', Math.floor( len/res[ 0 ] ) );
console.log( 'New:\t%d ops/sec', Math.floor( len/res[ 1 ] ) );
console.log( '\n' );



// --------------------------------------
// Test 4: Getting an ndarray element value

iArr = new Float32Array( 128*128 );
len = 1e6;

res = new Array( 2 );

// Incumbent...
arr = ndarray1( iArr, [128,128] );
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	v = arr.get( 64, 64 );
}
stop = process.hrtime( start );

res[ 0 ] = stop[ 0 ] + stop[ 1 ]*1e-9;

// Challenger...
arr = ndarray2( iArr, {
	'shape': [128,128]
});
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	v = arr.get( 64, 64 );
}
stop = process.hrtime( start );

res[ 1 ] = stop[ 0 ] + stop[ 1 ]*1e-9;

// Results:
console.log( 'Get:' );
console.log( 'Curr:\t%d ops/sec', Math.floor( len/res[ 0 ] ) );
console.log( 'New:\t%d ops/sec', Math.floor( len/res[ 1 ] ) );
console.log( '\n' );




// --------------------------------------
// TEST 5: Creation (using raw API)

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
raw = ndarray2.raw;
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	arr = raw( iArr, {
		'shape': [128,128]
	});
}
stop = process.hrtime( start );

res[ 1 ] = stop[ 0 ] + stop[ 1 ]*1e-9;

// Results:
console.log( 'Creation (using raw API):' );
console.log( 'Curr:\t%d ops/sec', Math.floor( len/res[ 0 ] ) );
console.log( 'New:\t%d ops/sec', Math.floor( len/res[ 1 ] ) );
console.log( '\n' );


// --------------------------------------
// Test 6: Setting an ndarray element value (prototype)

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
arr = ndarray2.raw( iArr, {
	'shape': [128,128]
});
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



// --------------------------------------
// Test 7: Getting an ndarray element value (prototype)

iArr = new Float32Array( 128*128 );
len = 1e6;

res = new Array( 2 );

// Incumbent...
arr = ndarray1( iArr, [128,128] );
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	v = arr.get( 64, 64 );
}
stop = process.hrtime( start );

res[ 0 ] = stop[ 0 ] + stop[ 1 ]*1e-9;

// Challenger...
arr = ndarray2.raw( iArr, {
	'shape': [128,128]
});
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	v = arr.get( 64, 64 );
}
stop = process.hrtime( start );

res[ 1 ] = stop[ 0 ] + stop[ 1 ]*1e-9;

// Results:
console.log( 'Get (prototype):' );
console.log( 'Curr:\t%d ops/sec', Math.floor( len/res[ 0 ] ) );
console.log( 'New:\t%d ops/sec', Math.floor( len/res[ 1 ] ) );
console.log( '\n' );
