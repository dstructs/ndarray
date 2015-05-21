TODO
====

1. Create custom constructors based on `dtype` and `ndims`
	-	use `new this.constructor`
	-	file: `ctor.js`
	-	these basically provide shortcuts for internal methods
	-	ability to use custom `set` and `get`
		-	from an `object` which implements set and get
2. `order` (???)
	-	name?
3. cache methods which create other methods based on `ndims`
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
7. include README warnings
	-	cache `ndarray.shape`
	-	cache `ndarray.strides`
8. 
