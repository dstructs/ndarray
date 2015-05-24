/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// File system module:
	fs = require( 'fs' ),

	// Path module:
	path = require( 'path' ),

	// Module to be tested:
	get = require( './../lib/get.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'get', function tests() {

	it( 'should export a function', function test() {
		expect( get ).to.be.a( 'function' );
	});

	it( 'should return a function', function test() {
		expect( get( 2 ) ).to.be.a( 'function' );
	});

	it( 'should create a getter factory', function test() {
		var filepath,
			file;

		filepath = path.resolve( __dirname, 'fixtures/get.1d.js' );
		file = fs.readFileSync( filepath );

		assert.strictEqual( get( 1 ).toString()+'\n', file.toString() );

		filepath = path.resolve( __dirname, 'fixtures/get.2d.js' );
		file = fs.readFileSync( filepath );

		assert.strictEqual( get( 2 ).toString()+'\n', file.toString() );

		filepath = path.resolve( __dirname, 'fixtures/get.5d.js' );
		file = fs.readFileSync( filepath );

		assert.strictEqual( get( 5 ).toString()+'\n', file.toString() );
	});

});
