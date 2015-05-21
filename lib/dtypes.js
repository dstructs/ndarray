'use strict';

// DTYPES //

var DTYPES = {
	'Int8Array': 'int8',
	'Uint8Array': 'uint8',
	'Uint8ArrayClamped': 'uint8_clamped',
	'Int16Array': 'int16',
	'Uint16Array': 'uint16',
	'Int32Array': 'int32',
	'Uint32Array': 'uint32',
	'Float32Array': 'float32',
	'Float64Array': 'float64',
	'Buffer': 'binary',
	'Array': null,
	'Object': null,
	'StringArray': 'string',
	'BooleanArray': 'boolean',
	'LogicalArray': 'int8',
	'NumberArray': 'float64'
};

// TODO: export reverse mapping


// EXPORTS //

module.exports = DTYPES;
