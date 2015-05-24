/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	cache = require( './../lib/cache.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'cache', function tests() {

	it( 'should export an object', function test() {
		expect( cache ).to.be.an( 'object' );
	});

	it( 'should export a strict constructor cache', function test() {
		expect( cache.CTORS ).to.be.an( 'object' );
	});

	it( 'should export a low-level (raw) constructor cache', function test() {
		expect( cache.RCTORS ).to.be.an( 'object' );
	});

});
