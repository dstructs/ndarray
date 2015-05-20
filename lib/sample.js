'use strict'

function View1dint8( a, b0, c0, d ){
	this.data = a
	this.shape = [ b0 ]
	this.stride = [ c0 ]
	this.offset = d | 0
}

var proto = View1dint8.prototype

proto.dtype = 'int8'
proto.dimension = 1

Object.defineProperty( proto, 'size', {
	get: function View1dint8_size(){
		return this.shape[0]
	}
})

proto.order = [ 0 ]

proto.set = function View1dint8_set( i0, v ){
	return this.data[this.offset+this.stride[0]*i0] = v
}

proto.get = function View1dint8_get( i0 ){
	return this.data[this.offset+this.stride[0]*i0]
}

proto.index = function View1dint8_index( i0 ) {
	return this.offset+this.stride[0]*i0
}

proto.hi = function View1dint8_hi( i0 ){
	return new View1dint8(this.data,( typeof i0 !== 'number' || i0 < 0 ) ? this.shape[0]: i0|0, this.stride[0], this.offset )
}

proto.lo = function View1dint8_lo(i0){
	var b = this.offset,
		d = 0,
		a0 = this.shape[0],
		c0 = this.stride[0]

	if ( typeof i0 === 'number' && i0 >= 0 ){
		d = i0|0;
		b += c0*d;
		a0 -= d
	}

	return new View1dint8( this.data, a0, c0 ,b )
}

proto.step = function View1dint8_step( i0 ){
	var a0 = this.shape[0],
		b0 = this.stride[0],
		c = this.offset,
		d = 0,
		ceil = Math.ceil

	if ( typeof i0 === 'number' ) {
		d = i0|0;
		if ( d < 0 ) {
			c += b0*(a0-1);
			a0 = ceil(-a0/d)
		} else {
			a0 = ceil(a0/d)
		}
		b0 *= d
	}

	return new View1dint8( this.data, a0, b0, c )
}

proto.transpose = function View1dint8_transpose( i0 ) {
	i0 = (i0 === undefined ? 0 : i0|0 )

	var a = this.shape,
		b = this.stride;

	return new View1dint8( this.data, a[i0], b[i0], this.offset )
}

proto.pick = function View1dint8_pick( i0 ) {
	var a = [],
		b = [],
		c = this.offset

	if ( typeof i0 === 'number' && i0 >= 0 ) {
		c = (c+this.stride[0]*i0)|0
	} else {
		a.push( this.shape[0] );
		b.push( this.stride[0])
	}

	var ctor = CTOR_LIST[a.length+1];
	return ctor( this.data, a, b, c )
}

return function construct_View1dint8( data, shape, stride, offset ) {
	return new View1dint8( data, shape[0], stride[0], offset )
}

'use strict'

function View2dint8( a, b0, b1, c0, c1, d ) {
	this.data = a
	this.shape = [ b0, b1 ]
	this.stride = [ c0, c1 ]
	this.offset = d|0
}

var proto = View2dint8.prototype

proto.dtype = 'int8'
proto.dimension = 2

Object.defineProperty( proto, 'size', {
	get: function View2dint8_size() {
		return this.shape[0]*this.shape[1]
	}
})

Object.defineProperty( proto, 'order', {
	get: function View2dint8_order(){
	return ( Math.abs( this.stride[0] ) > Math.abs( this.stride[1] ) ) ? [ 1, 0 ] : [ 0,1 ]
	}
})

proto.set = function View2dint8_set( i0, i1, v ) {
	return this.data[this.offset+this.stride[0]*i0+this.stride[1]*i1] = v
}

proto.get = function View2dint8_get( i0, i1 ) {
	return this.data[this.offset+this.stride[0]*i0+this.stride[1]*i1]
}

proto.index = function View2dint8_index( i0, i1 ) {
	return this.offset+this.stride[0]*i0+this.stride[1]*i1
}

proto.hi = function View2dint8_hi( i0, i1 ) {
	return new View2dint8( this.data, ( typeof i0 !== 'number' || i0 < 0 ) ? this.shape[0] : i0|0, ( typeof i1 !== 'number' || i1 < 0 ) ? this.shape[1] : i1|0, this.stride[0], this.stride[1], this.offset )
}

proto.lo = function View2dint8_lo( i0, i1 ) {
	var b = this.offset,
		d = 0,
		a0 = this.shape[0],
		a1 = this.shape[1],
		c0 = this.stride[0],
		c1 = this.stride[1]

	if ( typeof i0 === 'number' && i0 >= 0 ) {
		d = i0|0;
		b += c0*d;
		a0 -= d
	}
	if ( typeof i1 === 'number' && i1 >= 0 ) {
		d = i1|0;
		b += c1*d;
		a1 -= d
	}
	return new View2dint8( this.data, a0, a1, c0, c1, b )
}

proto.step = function View2dint8_step( i0, i1 ) {
	var a0 = this.shape[0],
		a1 = this.shape[1],
		b0 = this.stride[0],
		b1 = this.stride[1],
		c = this.offset,
		d = 0,
		ceil = Math.ceil

	if ( typeof i0 === 'number' ) {
		d = i0|0;
		if ( d < 0 ) {
			c += b0*(a0-1);
			a0 = ceil(-a0/d)
		} else {
			a0 = ceil(a0/d)
		}
		b0 *= d
	}
	if ( typeof i1 === 'number' ) {
		d = i1|0;
		if ( d < 0 ) {
			c += b1*(a1-1);
			a1 = ceil(-a1/d)
		} else {
			a1 = ceil(a1/d)
		}
		b1 *= d
	}
	return new View2dint8( this.data, a0, a1, b0, b1, c )
}

proto.transpose = function View2dint8_transpose( i0, i1 ) {
	i0 = (i0 === undefined ? 0 : i0|0 );
	i1 = (i1 === undefined ? 1 : i1|0 )

	var a = this.shape,
		b = this.stride;

	return new View2dint8( this.data, a[i0], a[i1], b[i0], b[i1], this.offset )
}

proto.pick = function View2dint8_pick( i0, i1 ) {
	var a = [],
		b = [],
		c = this.offset

	if ( typeof i0 === 'number' && i0 >= 0 ) {
		c = (c+this.stride[0]*i0)|0
	} else {
		a.push( this.shape[0] );
		b.push( this.stride[0] )
	}
	if ( typeof i1 === 'number' && i1 >= 0 ) {
		c = (c+this.stride[1]*i1)|0
	} else {
		a.push( this.shape[1] );
		b.push( this.stride[1] )
	}

	var ctor = CTOR_LIST[a.length+1];
	return ctor( this.data, a, b, c )
}

return function construct_View2dint8( data, shape, stride, offset ) {
	return new View2dint8( data,shape[0], shape[1], stride[0], stride[1], offset )
}
