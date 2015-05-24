TODO
====

1. Create custom constructors based on `dtype` and `ndims`
	-	use `new this.constructor`
		-	these basically provide shortcuts for internal methods
	-	ability to use custom `set` and `get`
		-	from an `object` which implements set and get
2. `order` (???)
	-	name?
3. WARNING:
	-	dtypes, itypes, btypes, and ctor cache all have to be kept in sync from a dev perspective. A change to one can affect others
4. remove any unused mods
5. determine what `dtype` will be
	-	see `lib/getType.js`
	-	`double` or `float64`
	-	`single` or `float` or `float32`
6. support for the following `dtypes`
	-	string (array)
	-	boolean (array)
	-	logical (array)
	- 	mixed => `generic`
	-	complex => `[real,imaginary]`
7. benchmarks
8. is `uint8_clamped` a separate `dtype`?
9. separate mods
	-	ind2sub
		-	given an `ndarray` and a sequence of linear indices, return subscripts
	-	sub2ind
		-	given an `ndarray` and a subscript, return the linear index
	- 	transpose
		-	works on a matrix
	-	shiftdim
	-	reshape
	-	permute
		-	generalization of transpose for multidimensional arrays
	-	squeeze
10. fancy indexing
	-	return new view
11. possibility of an empty `ndarray`?
	-	if so, then could have `shape = [0]`
	-	`ndims` should be `0`
	-	should we even allow this?
		-	or just return `null`?
		-	what abt functions which filter an `ndarray` and no element satisfies filter?
			-	could just return `null`, rather than an empty `ndarray`
			-	this would be similar to how things are handled now with plain arrays
12. README warnings
	-	don't mutate `strides`
	-	don't mutate `shape`
	-	don't mutate `data`
	-	=> the view will be corrupted
13. casting to different data type
	-	both main export and factory
14. determine to handle sparse data structures implemented via objects/hashes.
15. to freeze or not to freeze strides and shape?
	-	if not, then allow for view corruption
	-	if yes, then encourage use of `reshape`
16. [cast mod](matlab)
	-	see [also](http://docs.scipy.org/doc/numpy/reference/generated/numpy.ndarray.astype.html)
	-	focus on typed arrays; however, can branch out into string <=> boolean, string <=> number, etc.
17. [class mod](matlab)
	-	underlying data type
	- 	compute-array-dtype
18. if provided a numeric value, instead of an array, should this behave like typed arrays?
	-	initialize an ndarray array as all zeros?
	-	although this could just as easily be done in userland
19. stringArray get/set api
	-	iget/iset
	-	mget/mset
	-	sget/sset
	-	get/set
20. 


#### Tests

1. ctor
	-	nbytes
2. ctor.raw
	-	nbytes
3. factory
4. 
5. getType
6. ndarray
7. ndarray.raw
8. 
