ndarray
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Multidimensional arrays.


## Installation

``` bash
$ npm install compute-ndarray
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var ndarray = require( 'compute-ndarray' );
```

#### ndarray( data[, options] )

Creates a new multidimensional `array`.

``` javascript
var data = new Float32Array( 10 );

var view = ndarray( data );
```

The `ndarray` constructor accepts the following `options`:

*	__dtype__: specifies the underlying storage data type. If the input `data` is not of the same type, the `data` is cast to the specified `dtype`.
*	__shape__: specifies the array `shape`. Default: `[ data.length ]`.
*	__strides__: specifies the array `strides`, which describe how to index into the input `data` array to create a multidimensional view.
*	__offset__: specifies the view `offset`, which points to where the view should begin in the input `data` array. Default: `0`. 

To cast the input `data` to a different underlying array data type, set the `dtype` option.
	
``` javascript
var data = new Float32Array( 10 );

// Cast the data array to a Float64Array:
var view = ndarray( data, {
	'dtype': 'float64'
});
```

To create multidimensional views, specify the view `shape`.

``` javascript
// Create a 5x2 matrix:
var view = ndarray( data, {
	'shape': [5,2]
});
/* View:
	[ 0 0
	  0 0
	  0 0
	  0 0
	  0 0 ]
*/
```

To control how an input `data` array is indexed when creating a multidimensional view, specify the view `strides`.

``` javascript
var arr = new Float32Array( 20 );

for ( var i = 0; i < arr.length; i++ ) {
	arr[ i ] = i;
}
// => [0,1,2,3,...,19]

// Create a custom 5x2 view using only the even indices `[0,2,4,...]`: 
var view = ndarray( data, {
	'shape': [5,2],
	'strides': [10,2]
});
/* View:
	[  0  2
	   4  6
	   8 10
	  12 14
	  16 18	]
*/
```

To specify a custom view offset, set the `offset` option.

``` javascript
// Create a 5x2 view starting at the 10th element in the input array:
var view = ndarray( data, {
	'shape': [5,2],
	'offset': 10
});
/* View:
	[ 10 11
	  12 13
	  14 15
	  16 17
	  18 19 ]
*/
```





## Examples

``` javascript
var ndarray = require( 'compute-ndarray' );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## Credits

This module was inspired by [ndarray](https://github.com/scijs/ndarray).



---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015. The Compute.io Authors.


[npm-image]: http://img.shields.io/npm/v/compute-ndarray.svg
[npm-url]: https://npmjs.org/package/compute-ndarray

[travis-image]: http://img.shields.io/travis/compute-io/ndarray/master.svg
[travis-url]: https://travis-ci.org/compute-io/ndarray

[coveralls-image]: https://img.shields.io/coveralls/compute-io/ndarray/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/ndarray?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/ndarray.svg
[dependencies-url]: https://david-dm.org/compute-io/ndarray

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/ndarray.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/ndarray

[github-issues-image]: http://img.shields.io/github/issues/compute-io/ndarray.svg
[github-issues-url]: https://github.com/compute-io/ndarray/issues
