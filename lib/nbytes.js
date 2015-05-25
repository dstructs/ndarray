'use strict';

// NUMBER OF BYTES //

/**
* FUNCTION: nbytes( data, dtype )
*	Returns the number of bytes consumed by view elements.
*
* @param {Array|Int8Array|Uint8Array|Uint8ArrayClamped|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Buffer|Object} data - input data
* @param {String} dtype - underlying data type
* @returns {Number|Null} number of bytes or null
*/
function nbytes( data, dtype ) {
	switch ( dtype ) {
	case 'int8':
	case 'uint8':
	case 'uint8_clamped':
	case 'int16':
	case 'uint16':
	case 'int32':
	case 'uint32':
	case 'float32':
	case 'float64':
		return data.byteLength;
	case 'binary':
		return data.length;
	default:
		return null;
	}
} // end FUNCTION nbytes()


// EXPORTS //

module.exports = nbytes;
