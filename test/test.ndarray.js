/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	ndarray = require( './../lib/ndarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'ndarray', function tests() {

	it( 'should export a function', function test() {
		expect( ndarray ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided input data of an unknown/unsupported data type', function test() {
		var values = [
			'5',
			NaN,
			null,
			undefined,
			true,
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				ndarray( value );
			};
		}
	});

	it( 'should return an ndarray', function test() {
		var arr = ndarray( new Float32Array( 10 ) );

		assert.strictEqual( arr.dtype, 'float32' );
		assert.isArray( arr.strides );
		assert.isArray( arr.shape );
		assert.isNumber( arr.ndims );
		assert.isFunction( arr.set );
		assert.isFunction( arr.get );
		assert.isNumber( arr.offset );
	});

});
