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
	set = require( './../lib/proto.set.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'proto set', function tests() {

	it( 'should export a function', function test() {
		expect( set ).to.be.a( 'function' );
	});

	it( 'should return a function', function test() {
		expect( set( 2 ) ).to.be.a( 'function' );
	});

	it( 'should create a setter which can be bound to an ndarray prototype', function test() {
		var filepath,
			file;

		filepath = path.resolve( __dirname, 'fixtures/proto.set.1d.js' );
		file = fs.readFileSync( filepath );

		assert.strictEqual( set( 1 ).toString()+'\n', file.toString() );

		filepath = path.resolve( __dirname, 'fixtures/proto.set.2d.js' );
		file = fs.readFileSync( filepath );

		assert.strictEqual( set( 2 ).toString()+'\n', file.toString() );

		filepath = path.resolve( __dirname, 'fixtures/proto.set.5d.js' );
		file = fs.readFileSync( filepath );

		assert.strictEqual( set( 5 ).toString()+'\n', file.toString() );
	});

});
