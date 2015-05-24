/* global require, describe, it */
'use strict';

var mpath = './../lib/getCtor.js';


// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Proxy dependencies:
	proxyquire = require( 'proxyquire' ),

	// Module to be tested:
	getCtor = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'get constructor', function tests() {

	it( 'should export a function', function test() {
		expect( getCtor ).to.be.a( 'function' );
	});

	it( 'should return a function', function test() {
		var getCtor = proxyquire( mpath, {
			'./cache.js': {
				'CTORS': {
					'int32': []
				}
			}
		});

		expect( getCtor( 'int32', 2 ) ).to.be.a( 'function' );
	});

	it( 'should add constructors to a constructor cache', function test() {
		var getCtor,
			cache;

		cache = {
			'int32': []
		};
		getCtor = proxyquire( mpath, {
			'./cache.js': {
				'CTORS': cache
			}
		});

		getCtor( 'int32', 2 );

		assert.strictEqual( cache[ 'int32' ].length, 2 );
	});

});
