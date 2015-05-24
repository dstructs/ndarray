/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	dtypes = require( './../lib/dtypes.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'data types', function tests() {

	it( 'should export an array', function test() {
		expect( dtypes ).to.be.an( 'array' );
	});

});
