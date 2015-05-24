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
	set = require( './../lib/set.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'set', function tests() {

	it( 'should export a function', function test() {
		expect( set ).to.be.a( 'function' );
	});

	it( 'should return a function', function test() {
		expect( set( 2 ) ).to.be.a( 'function' );
	});

	it( 'should create a setter factory', function test() {
		var filepath,
			file;

		filepath = path.resolve( __dirname, 'fixtures/set.1d.js' );
		file = fs.readFileSync( filepath );

		assert.strictEqual( set( 1 ).toString()+'\n', file.toString() );

		filepath = path.resolve( __dirname, 'fixtures/set.2d.js' );
		file = fs.readFileSync( filepath );

		assert.strictEqual( set( 2 ).toString()+'\n', file.toString() );

		filepath = path.resolve( __dirname, 'fixtures/set.5d.js' );
		file = fs.readFileSync( filepath );

		assert.strictEqual( set( 5 ).toString()+'\n', file.toString() );
	});

});
