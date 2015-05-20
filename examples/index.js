'use strict';

var ndarray = require( 'ndarray' );

var arr = ndarray( new Int8Array(128*128), [128,128] );

var generator = require( './../lib/set.js' );

var d = [ 1, 2, 3, 4, 5, 6 ];

var createSetter = generator( 2 );
console.log( createSetter.toString() );

var set = createSetter( d, 0, [3,1] );
console.log( set.toString() );

set( 1, 2, 299 );
console.log( d );
