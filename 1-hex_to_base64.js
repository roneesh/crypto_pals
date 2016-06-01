var hexString = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d',
	expectedOutput = 'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t';

function hex_to_base64(hexString) {
	var buffer = new Buffer(hexString, 'hex');
	return buffer.toString('base64');
}

// Test
if (hex_to_base64(hexString) !== expectedOutput) {
	throw "hext to base64 failed!"
} else {
	console.log('hex_to_base64 worked!')
}