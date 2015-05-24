/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	ctor = require( './../lib/ctor.raw.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'low-level ndarray constructor', function tests() {

	it( 'should export a function', function test() {
		expect( ctor ).to.be.a( 'function' );
	});

	it( 'should return a function', function test() {
		expect( ctor( 'int32', 2 ) ).to.be.a( 'function' );
	});

	it( 'should return an ndarray constructor', function test() {
		var ndarray,
			strides,
			shape,
			offset,
			data,
			arr;

		ndarray = ctor( 'int32', 2 );
		data = new Int32Array( 10 );
		shape = [ 5, 2 ];
		offset = 0;
		strides = [ 2, 1 ];

		arr = new ndarray( data, shape, offset, strides );

		assert.deepEqual( arr.shape, shape );
		assert.deepEqual( arr.strides, strides );
		assert.strictEqual( arr.offset, offset );
		assert.strictEqual( arr.ndims, shape.length );
		assert.strictEqual( arr.dtype, 'int32' );
		assert.strictEqual( arr.length, data.length );

		// TODO: include nbytes

		assert.isFunction( arr.get );
		assert.isFunction( arr.set );

		assert.deepEqual( arr.data, data );
	});

	it( 'should return not require a `new` operator', function test() {
		var ndarray,
			strides,
			shape,
			offset,
			data,
			arr;

		ndarray = ctor( 'int32', 2 );
		data = new Int32Array( 10 );
		shape = [ 5, 2 ];
		offset = 0;
		strides = [ 2, 1 ];

		arr = ndarray( data, shape, offset, strides );

		assert.deepEqual( arr.shape, shape );
		assert.deepEqual( arr.strides, strides );
		assert.strictEqual( arr.length, data.length );

		assert.deepEqual( arr.data, data );
	});

});
