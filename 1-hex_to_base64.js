var lib = require("./util/sjclLib");

var hex_to_bitarray = lib.hex_to_bitarray,
    bitarray_to_base64 = lib.bitarray_to_base64;

var hexString = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d',
	expectedOutput = 'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t';

// 1. Plain JS
function hex_to_base64(hexString) {
	var buffer = new Buffer(hexString, 'hex');
	return buffer.toString('base64');
}

// test of plain JS
if (hex_to_base64(hexString) !== expectedOutput) {
	throw "hex to base64 failed!"
} else {
	console.log('hex_to_base64 worked!')
}

// 2. Using SJCL
var base64 = bitarray_to_base64(hex_to_bitarray(hexString));
if (base64 !== expectedOutput) {
	throw "hex to base64 via SJCL failed!"
} else {
	console.log('hex to base64 via SJCL worked!');
}