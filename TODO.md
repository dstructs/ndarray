TODO
====

1. Create custom constructors based on `dtype` and `ndims`
	-	ability to use custom `set` and `get`
		-	from an `object` which implements set and get
2. `order` (???)
	-	name?
	-	`sdims` ==> sorted dimensions
3. WARNING:
	-	dtypes, itypes, btypes, nbytes, and ctor cache all have to be kept in sync from a dev perspective. A change to one can affect others
4. remove any unused mods
5. determine what `dtype` will be
	-	see `lib/getType.js`
	-	`double` or `float64`
	-	`single` or `float` or `float32`
6. support for the following `dtypes`
	-	string (array)
	-	boolean (array)
	-	logical (array)
	-	number (array)
	- 	mixed => `generic`
	-	complex => `[real,imaginary]`
	-	how to accept? If bind `StringArray` directly to `.data`, then 3rd party methods cannot simply index into the underlying array
		-	may need to copy the data ==> use `toArray()` method
		-	bind the copied data to `.data`
		-	means original data structure does not share the same underlying data
	- 	update README when supported!!!
7. benchmarks
8. 
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
12. 
13. casting to different data type
	-	both main export and factory
14. determine to handle sparse data structures implemented via objects/hashes.
15. to freeze or not to freeze strides and shape?
	-	if not, then allow for view corruption
	-	if yes, then encourage use of `reshape`
	- 	opting for **no** to allow for consistent API between raw and strict apis.
16. [cast mod](matlab)
	-	see [also](http://docs.scipy.org/doc/numpy/reference/generated/numpy.ndarray.astype.html)
	-	focus on typed arrays; however, can branch out into string <=> boolean, string <=> number, etc.
	-	see trev norris rules of thumb
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
21. confirm underlying data structures for
	-	StringArray
	-	BooleanArray
	-	LogicalArray
	-	NumberArray
		-	this may be an API which sits atop typed arrays. In which case, not necessarily `float64`
22. should we accept `ArrayBuffer` input data?
23. IntegerArray?
	-	maybe not as hard to know the bounds
24. consider case of casting to a sparse data structure
25. if `!ndims`, `length` should be `0`.
26. 


#### Tests

1. factory
2. ndarray
3. ndarray.raw
4. 
