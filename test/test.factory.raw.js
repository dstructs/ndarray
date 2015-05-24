/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	factory = require( './../lib/factory.raw.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'low-level (raw) ndarray factory', function tests() {

	it( 'should export a function', function test() {
		expect( factory ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a shape option', function test() {
		expect( foo ).to.throw( Error );

		function foo() {
			factory( {} );
		}
	});

	it( 'should throw an error if provided an invalid shape', function test() {
		expect( foo ).to.throw( Error );

		function foo() {
			factory( {
				'shape': NaN
			});
		}
	});

	it( 'should throw an error if provided an invalid strides option', function test() {
		expect( foo ).to.throw( Error );

		function foo() {
			factory( {
				'strides': NaN
			});
		}
	});

	it( 'should throw an error if provided an invalid offset option', function test() {
		expect( foo ).to.throw( Error );

		function foo() {
			factory( {
				'offset': NaN
			});
		}
	});

	it( 'should throw an error if provided an invalid dtype', function test() {
		expect( foo ).to.throw( Error );

		function foo() {
			factory( {
				'dtype': 'UnKnOWn'
			});
		}
	});

	it( 'should return a function', function test() {
		var ndarray = factory({
			'shape': [2,2]
		});

		assert.isFunction( ndarray );
	});

	it( 'should return a function which creates ndarrays', function test() {
		var ndarray,
			shape,
			data,
			arr;

		shape = [ 5, 2 ];
		data = new Int32Array( 10 );

		ndarray = factory({
			'dtype': 'int32',
			'shape': shape
		});

		arr = ndarray( data );

		assert.deepEqual( arr.data, data );
		assert.deepEqual( arr.shape, shape );
	});

	it( 'should set the underlying data type as `generic` by default', function test() {
		var ndarray,
			shape,
			data,
			arr;

		shape = [ 2, 2 ];
		data = [ 'a', 'b', 'c', 'd' ];

		ndarray = factory({
			'shape': shape
		});

		arr = ndarray( data );

		assert.deepEqual( arr.data, data );
		assert.deepEqual( arr.shape, shape );
		assert.strictEqual( arr.dtype, 'generic' );
	});

});
