/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	getType = require( './../lib/getType.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'get type', function tests() {

	it( 'should export a function', function test() {
		expect( getType ).to.be.a( 'function' );
	});

	it( 'should determine the underlying data type for typed arrays', function test() {
		var type;

		type = getType( new Int8Array( 10 ) );
		assert.strictEqual( type, 'int8', 'Int8Array' );

		type = getType( new Uint8Array( 10 ) );
		assert.strictEqual( type, 'uint8', 'Uint8Array' );

		type = getType( new Uint8ClampedArray( 10 ) );
		assert.strictEqual( type, 'uint8_clamped', 'Uint8ClampedArray' );

		type = getType( new Int16Array( 10 ) );
		assert.strictEqual( type, 'int16', 'Int16Array' );

		type = getType( new Uint16Array( 10 ) );
		assert.strictEqual( type, 'uint16', 'Uint16Array' );

		type = getType( new Int32Array( 10 ) );
		assert.strictEqual( type, 'int32', 'Int32Array' );

		type = getType( new Uint32Array( 10 ) );
		assert.strictEqual( type, 'uint32', 'Uint32Array' );

		type = getType( new Float32Array( 10 ) );
		assert.strictEqual( type, 'float32', 'Float32Array' );

		type = getType( new Float64Array( 10 ) );
		assert.strictEqual( type, 'float64', 'Float64Array' );
	});

	it( 'should return `binary` if provided a Buffer object', function test() {
		var type = getType( new Buffer( 10 ) );
		assert.strictEqual( type, 'binary', 'Buffer' );
	});

	it( 'should return `generic` if provided a regular array', function test() {
		var type = getType( [] );
		assert.strictEqual( type, 'generic', 'Array' );
	});

	it( 'should return `generic` if provided an object having an interface supporting `get`, `set`, and `length`', function test() {
		var type = getType({
			'get': function get(){},
			'set': function set(){},
			'length': 10
		});
		assert.strictEqual( type, 'generic', 'Object with interface' );
	});

	it( 'should return `null` if provided a value having an unrecognized/unsupported data type', function test() {
		var values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			{},
			function(){},
			new Boolean( true ),
			{ 'get': function get(){} }
		];

		for ( var i = 0; i < values.length; i++  ) {
			assert.isNull( getType( values[ i ] ) );
		}
	});

});
