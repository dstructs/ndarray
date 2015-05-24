/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	itypes = require( './../lib/itypes.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'input data types', function tests() {

	it( 'should export an object', function test() {
		expect( itypes ).to.be.an( 'object' );
	});

});
