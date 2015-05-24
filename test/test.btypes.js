/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	btypes = require( './../lib/btypes.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'base types', function tests() {

	it( 'should export an object', function test() {
		expect( btypes ).to.be.an( 'object' );
	});

});
