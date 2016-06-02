function fixed_xor(buffer1, buffer2) {
	if (buffer1.length !== buffer2.length) {
		throw "Buffers must be of equal length";
	}

	var i = 0,
		len = buffer1.length,
		returnBuffer = new Buffer(buffer1.length);

	for (i = 0; i < len; i++) {
		returnBuffer[i] = buffer1[i] ^ buffer2[i]
	}

	return returnBuffer;
}

// Test
var a = new Buffer('1c0111001f010100061a024b53535009181c', 'hex'),
	b = new Buffer('686974207468652062756c6c277320657965', 'hex'),
	c = fixed_xor(a, b).toString('hex'),
	expectedHexResult = '746865206b696420646f6e277420706c6179';

if (c !== expectedHexResult) {
	throw 'fixed_xor not working!'
} else {
	console.log('it is working!')
}
