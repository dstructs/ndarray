/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	validate = require( './../lib/validate.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'validate', function tests() {

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				validate( 'int32', 10, value );
			};
		}
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type', function test() {
		var values = [
			'beep',
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				validate( 'int32', 10, {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a shape option which is not an array of positive integers', function test() {
		var values = [
			'beep',
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			[ 1, Math.PI ],
			[ 0 ],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				validate( 'int32', 10, {
					'shape': value
				});
			};
		}
	});

	it( 'should throw an error if provided an incompatible shape option', function test() {
		expect( foo ).to.throw( Error );

		function foo() {
			validate( 'int32', 10, {
				'shape': [100, 100 ]
			});
		}
	});

	it( 'should throw an error if provided a strides option which is not a numeric array', function test() {
		var values = [
			'beep',
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			[ '1' ],
			[ null ],
			[ NaN ],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				validate( 'int32', 10, {
					'strides': value
				});
			};
		}
	});

	it( 'should throw an error if provided an incompatible strides option', function test() {
		expect( foo ).to.throw( Error );

		function foo() {
			validate( 'int32', 10, {
				'shape': [100, 100 ],
				'strides': [ 1, 2, 3, 4, 5 ]
			});
		}
	});

	it( 'should throw an error if provided an offset option which is not a number primitive', function test() {
		var values = [
			'5',
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				validate( 'int32', 10, {
					'offset': value
				});
			};
		}
	});

	it( 'should throw an error if provided an incompatible offset option (e.g., exceeds ndarray length', function test() {
		expect( foo ).to.throw( Error );

		function foo() {
			validate( 'int32', 10, {
				'offset': 100
			});
		}
	});

	it( 'should return an object', function test() {
		var opts;

		opts = validate( 'int32', 10, {} );

		assert.isObject( opts );
	});

	it( 'should provide a default shape, if not provided a shape option', function test() {
		var opts = validate( 'int32', 10, {} );
		assert.deepEqual( opts.shape, [10] );
	});

	it( 'should provide default strides, if not provided a strides option', function test() {
		var opts;

		opts = validate( 'int32', 10, {} );
		assert.deepEqual( opts.strides, [1] );

		opts = validate( 'int32', 50, {
			'shape': [5,10]
		});
		assert.deepEqual( opts.strides, [10,1] );

		opts = validate( 'int32', 210, {
			'shape': [5,6,7]
		});
		assert.deepEqual( opts.strides, [42,7,1] );
	});

	it( 'should provide a default offset, if not provided an offset option', function test() {
		var opts;

		opts = validate( 'int32', 10, {} );
		assert.strictEqual( opts.offset, 0 );
	});

	it( 'should consider negative strides when determining a default offset', function test() {
		var opts;

		opts = validate( 'int32', 100, {
			'shape': [10,10],
			'strides': [-10,-1]
		} );
		assert.strictEqual( opts.offset, 99 );
	});

});
