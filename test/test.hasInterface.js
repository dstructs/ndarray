/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	hasInterface = require( './../lib/hasInterface.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'has interface', function tests() {

	it( 'should export a function', function test() {
		expect( hasInterface ).to.be.a( 'function' );
	});

	it( 'should positively validate', function test() {
		var obj, bool;

		obj = {
			'get': function get(){},
			'set': function set(){},
			'length': 10
		};

		bool = hasInterface( obj );

		assert.ok( bool );
	});

	it( 'should negatively validate', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			[],
			{},
			{ 'get': get },
			{ 'set': set },
			{ 'length': 10 },
			{
				'get': get,
				'set': set
			},
			{
				'get': get,
				'length': 10
			},
			{
				'set': set,
				'length': 10
			},
			{
				'get': get,
				'set': true,
				'length': 10
			},
			function(){}
		];

		function get(){}
		function set(){}

		for ( var i = 0; i < values.length; i++ ) {
			assert.notOk( hasInterface( values[i] ), values[ i ] );
		}
	});

});
