/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	factory = require( './../lib/factory.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'ndarray factory', function tests() {

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
				'shape': [ 2, 2 ],
				'strides': NaN
			});
		}
	});

	it( 'should throw an error if provided an invalid offset option', function test() {
		expect( foo ).to.throw( Error );

		function foo() {
			factory( {
				'shape': [ 2, 2 ],
				'offset': NaN
			});
		}
	});

	it( 'should throw an error if provided an invalid dtype', function test() {
		expect( foo ).to.throw( Error );

		function foo() {
			factory( {
				'shape': [ 2, 2 ],
				'dtype': 'UnKnOWn'
			});
		}
	});

	it( 'should throw an error if provided a strict option which is not a boolean primitive', function test() {
		var values = [
			5,
			'5',
			null,
			undefined,
			NaN,
			new Boolean( true ),
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				factory( {
					'shape': [ 2, 2 ],
					'strict': value
				});
			};
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
			dtype,
			shape,
			data,
			arr;

		dtype = 'int32';
		shape = [ 5, 2 ];
		data = new Int32Array( 10 );

		ndarray = factory({
			'dtype': dtype,
			'shape': shape
		});

		arr = ndarray( data );

		assert.deepEqual( arr.data, data );
		assert.deepEqual( arr.shape, shape );
		assert.strictEqual( arr.dtype, dtype );
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

	it( 'should throw an error if provided data of an unrecognized/unsupported type', function test() {
		var values,
			ndarray;

		values = [
			'5',
			null,
			undefined,
			function(){},
			{}
		];

		ndarray = factory({
			'shape': [ 2, 2 ]
		});

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				ndarray( value );
			};
		}
	});

	it( 'should throw an error when input data is of a different type and recasting is not desired', function test() {
		var ndarray = factory({
			'dtype': 'int32',
			'shape': [ 2, 2 ],
			'strict': true
		});

		expect( foo ).to.throw( TypeError );

		function foo() {
			ndarray( new Float64Array( 10 ) );
		}
	});

	it( 'should throw an error if provided input data incompatible with the view shape', function test() {
		var ndarray = factory({
			'dtype': 'int32',
			'shape': [ 2, 2 ]
		});

		expect( foo ).to.throw( RangeError );

		function foo() {
			ndarray( new Int32Array( 1 ) );
		}
	});

});
