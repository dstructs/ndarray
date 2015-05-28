ndarray
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Multidimensional arrays.


## Table of Contents

1. [Usage](#usage)
	-	[ndarray](#ndarray)
		-	[options](#ndarray-options)
			-	[dtype](#option-dtype)
			-	[shape](#option-shape)
			-	[offset](#option-offset)
			-	[strides](#option-strides)
		-	[Views](#ndarray-views)
			-	[dtype](#view-dtype)
			-	[ndims](#view-ndims)
			-	[shape](#view-shape)
			-	[offset](#view-offset)
			-	[strides](#view-strides)
			-	[length](#view-length)
			-	[nbytes](#view-nbytes)
			-	[data](#view-data)
			-	[get](#view-get)
			-	[set](#view-set)
		-	[Constructors](#ndarray-constructors)
	-	[ndarray.raw](#ndarray-raw)
		-	[Views](#ndarray-raw-views)
		-	[Constructors](#ndarray-raw-constructors)
	-	[ndarray.factory](#ndarray-factory)
	-	[ndarray.rawFactory](#ndarray-raw-factory)
1. [Examples](#examples)


## Installation

``` bash
$ npm install compute-ndarray
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var ndarray = require( 'compute-ndarray' );
```

<a name="ndarray"></a>
#### ndarray( data[, options] )

Creates a new multidimensional `array`.

``` javascript
var data = new Float32Array( 10 );

var view = ndarray( data );
```

<a name="ndarray-options"></a>
The `ndarray` constructor accepts the following `options`:

<a name="option-dtype"></a>
*	__dtype__: specifies the underlying storage data type. If the input `data` is not of the same type, the `data` is cast to the specified `dtype`.
<a name="option-shape"></a>
*	__shape__: specifies the array `shape`. Default: `[ data.length ]`.
<a name="option-strides"></a>
*	__strides__: specifies the array `strides`, which describe how to index into the input `data` array to create a multidimensional view.
<a name="option-offset"></a>
*	__offset__: specifies the view `offset`, which points to where the view should begin in the input `data` array. Default: `0`. 

To cast the input `data` to a different underlying array data type, set the `dtype` option.
	
``` javascript
var data = new Float32Array( 10 );

// Cast the data array to a Float64Array:
var view = ndarray( data, {
	'dtype': 'float64'
});
```

A `dtype` may be any one of the following:

* 	`int8`
* 	`uint8`
* 	`uint8_clamped`
* 	`int16`
*	`uint16`
*	`int32`
*	`uint32`
*	`float32`
*	`float64`
*	`binary`
*	`string` (not currently supported)
*	`boolean` (not currently supported)
*	`logical` (not currently supported)
*	`generic`


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
var data = new Float32Array( 20 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = i;
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

<a name="ndarray-views"></a>
### Views

Multidimensional views have the following properties and methods...


<a name="view-dtype"></a>
#### view.dtype

A __read-only__ property returning the underlying storage data type.

``` javascript
var dtype = view.dtype;
// returns <string>
```

<a name="view-ndims"></a>
#### view.ndims

A __read-only__ property returning the number of view dimensions.

``` javascript
var ndims = view.ndims;
// returns <number>
```


<a name="view-shape"></a>
#### view.shape

A __read-only__ property returning the view `shape`.

``` javascript
var shape = view.shape;
// returns [...]
```

<a name="view-offset"></a>
#### view.offset

A __read-only__ property returning the view `offset`.

``` javascript
var offset = view.offset;
// returns <number>
```

<a name="view-strides"></a>
#### view.strides

A __read-only__ property returning the view `strides`.

``` javascript
var strides = view.strides;
// returns [...]
```

<a name="view-length"></a>
#### view.length

A __ready-only__ property returning the view `length`; i.e., how many elements are in the view, similar to `Array#length`.

``` javascript
var len = view.length;
// returns <number>
```

<a name="view-nbytes"></a>
#### view.nbytes

A __read-only__ property returning the number of bytes consumed by the view elements.

``` javascript
var nbytes = view.nbytes;
// returns <number>
```

__Note__: this property can __only__ be calculated for typed arrays and Buffers. For any other underlying storage type, the number of bytes cannot be reliably calculated and this property is `null`.

``` javascript
var view = ndarray( new Array( 10 ), {
	'dtype': 'generic'
});

var nbytes = view.nbytes;
// returns null
```

<a name="view-data"></a>
#### view.data

A __read-only__ property pointing to the underlying storage array.

``` javascript
var data = view.data;
// returns [...]
```


<a name="view-get"></a>
#### view.get( i, j, k,...)

Returns a view element specified according to the provided subscripts.

``` javascript
var data = new Float32Array( 10 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
// => [0,1,2,3,...,9]

var view = ndarray( data, {
	'shape': [5,2]
});
/* View:
	[ 0 1
	  2 3
	  4 5
	  6 7
	  8 9 ]
*/

var value = view.get( 3, 1 );
// returns 7
```

__Note__: subscripts are __not__ validated. Out-of-bounds subscripts are permitted and will return either a value of `undefined` or a value located outside the view domain.


<a name="view-set"></a>
#### view.set( i, j, k,..., value )

Sets a view element specified according to the provided subscripts.

``` javascript
view.set( 3, 1, 20 );
/* View:
	[ 0 1
	  2 3
	  4 5
	  6 20
	  8 9 ]
*/
```

__Note__: subscripts are __not__ validated. Out-of-bounds subscripts are permitted and may result in corrupted underlying data stores. Consumers are advised to validate indices before invoking the method.


<a name="ndarray-constructors"></a>
### Constructors

Each `ndarray` view has a specialized constructor determined by the view `dtype` and `ndims`. Every constructor has the same API which is as follows...

#### view.constructor( data, shape, offset, strides )

Creates a new multidimensional `array` having a specified `shape`, `offsets`, and `strides`.

``` javascript
var data = new Float32Array( 10 );

var view1 = ndarray( data, {
	'shape': [5,2]
});
/* View:
	[ 0 0
	  0 0
	  0 0
	  0 0
	  0 0 ]
*/

var view2 = view1.constructor( data, [2,5] );
/* View:
	[ 0 0 0 0 0
	  0 0 0 0 0 ]
*/
```

Constructing views in this manner provides a shortcut for creating views with known parameters and having the same underlying data type and dimensions.



===
### Raw

For performance, a low-level API is provided which forgoes some of the guarantees of the above API, such as input argument validation and measures to prevent views from becoming corrupted. While use of the above API is encouraged in REPL environments, use of the lower-level interface may be warranted when arguments are of a known type or when many `ndarrays` must be created.


<a name="ndarray-raw"></a>
#### ndarray.raw( data[, dtype[, shape[, offset[, strides ] ] ] ] )

Creates a new multidimensional `array`.

``` javascript
var data = new Float32Array( 10 );

var view = ndarray.raw( data );
```

If the input `data` type is known, view creation is significantly faster.

``` javascript
var view = ndarray.raw( data, 'float32' );
```

__Note__: specifying a `dtype` does __not__ cast the data to a different storage type. Instead, providing the argument circumvents the needed to determine the input `data` type, resulting in increased performance.

The `shape`, `offset`, and `strides` parameters are the same as above.


<a name="ndarray-raw-views"></a>
### Views

Views properties and methods are the same as for the higher-level API, with the exception that the following properties are __no__ longer read-only:

* 	`offset`
*	`strides`
*	`shape`
*	`length`
*	`nbytes`
*	`data`

Setting these properties is __not__ recommended as the view can become corrupted; e.g., incompatible dimensions, out-of-bounds indexing, etc. In contrast to the strict API above, setting these properties will __not__ result in an error being thrown. Accordingly, modifying the properties may introduce bugs which are silent. 


<a name="ndarray-raw-constructors"></a>
### Constructors

Constructors produced using the low-level API have the same interface as those created via the higher-level API.



===
### Factory





---
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
