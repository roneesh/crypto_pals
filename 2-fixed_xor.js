// 1. Via Regular Javascript

// function fixed_xor(buffer1, buffer2) {
// 	if (buffer1.length !== buffer2.length) {
// 		throw "Buffers must be of equal length";
// 	}

// 	var i = 0,
// 		len = buffer1.length,
// 		returnBuffer = new Buffer(buffer1.length);

// 	for (i = 0; i < len; i++) {
// 		returnBuffer[i] = buffer1[i] ^ buffer2[i]
// 	}

// 	return returnBuffer;
// }

// // Test
// var a = new Buffer('1c0111001f010100061a024b53535009181c', 'hex'),
// 	b = new Buffer('686974207468652062756c6c277320657965', 'hex'),
// 	c = fixed_xor(a, b).toString('hex'),
// 	expectedHexResult = '746865206b696420646f6e277420706c6179';

// if (c !== expectedHexResult) {
// 	throw 'fixed_xor not working!'
// } else {
// 	console.log('it is working!')
// }

// module.exports = fixed_xor;

// 2. Via SJCL

var lib = require("./util/sjclLib");

var hex_to_bitarray = lib.hex_to_bitarray,
	bitarray_to_hex = lib.bitarray_to_hex,
	bitarray_xor = lib.bitarray_xor;

var a1 = hex_to_bitarray('1c0111001f010100061a024b53535009181c'),
	a2 = hex_to_bitarray('686974207468652062756c6c277320657965');

var xorOutput = bitarray_to_hex(bitarray_xor(a1, a2));

// Test

var expectedHexResult = '746865206b696420646f6e277420706c6179';

// console.log(bitarray_xor(a1, a2), hex_to_bitarray('746865206b696420646f6e277420706c6179'))

if (xorOutput !== expectedHexResult) {
	throw 'fixed xor via SJCL not working!'
} else {
	console.log('fixed xor via SJCL is working!')
}

