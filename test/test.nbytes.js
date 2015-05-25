/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	nbytes = require( './../lib/nbytes.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number of bytes', function tests() {

	it( 'should export a function', function test() {
		expect( nbytes ).to.be.a( 'function' );
	});

	it( 'should return the number of bytes for typed arrays', function test() {
		var n;

		n = nbytes( new Int8Array( 10 ), 'int8' );
		assert.strictEqual( n, 10, 'int8' );

		n = nbytes( new Uint8Array( 10 ), 'uint8' );
		assert.strictEqual( n, 10, 'uint8' );

		n = nbytes( new Uint8ClampedArray( 10 ), 'uint8' );
		assert.strictEqual( n, 10, 'uint8_clamped' );

		n = nbytes( new Int16Array( 10 ), 'int16' );
		assert.strictEqual( n, 20, 'int16' );

		n = nbytes( new Uint16Array( 10 ), 'uint16' );
		assert.strictEqual( n, 20, 'uint16' );

		n = nbytes( new Int32Array( 10 ), 'int32' );
		assert.strictEqual( n, 40, 'int32' );

		n = nbytes( new Uint32Array( 10 ), 'uint32' );
		assert.strictEqual( n, 40, 'uint32' );

		n = nbytes( new Float32Array( 10 ), 'float32' );
		assert.strictEqual( n, 40, 'float32' );

		n = nbytes( new Float64Array( 10 ), 'float64' );
		assert.strictEqual( n, 80, 'float64' );
	});

	it( 'should return the number of bytes for buffer objects', function test() {
		var n = nbytes( new Buffer( 20 ), 'binary' );
		assert.strictEqual( n, 20, 'binary' );
	});

	it( 'should return `null` for generic arrays or where the element size cannot be readily determined', function test() {
		var n;

		n = nbytes( new Array( 10 ), 'generic' );
		assert.isNull( n, 'generic' );

		n = nbytes( {}, 'generic' );
		assert.isNull( n, 'generic' );
	});

});
