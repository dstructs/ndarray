/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	ndarray = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-ndarray', function tests() {

	it( 'should export a function', function test() {
		expect( ndarray ).to.be.a( 'function' );
	});

	it( 'should export a factory method', function test() {
		expect( ndarray.factory ).to.be.a( 'function' );
	});

	it( 'should export a low-level (raw) API', function test() {
		expect( ndarray.raw ).to.be.a( 'function' );
	});

	it( 'should export a factory method which wraps the low-level (raw) API', function test() {
		expect( ndarray.rawFactory ).to.be.a( 'function' );
	});

});
