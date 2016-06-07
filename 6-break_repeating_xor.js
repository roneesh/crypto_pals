var compare = require('./util/hamming'),
	fs = require('fs'),
	file = require('./ciphers/6-cipher.js'),
	cipherBuffer = new Buffer(file, 'base64'),
	bu = require('./util/bufferUtils'),
	brute_force_xor = require('./3-single_byte_xor.js'),
	xor = require('./5-xor_cipher');

function getKeySize(cipherBuffer) {
	var keySize = 2,
		avgHammingDistanceForKeySize = [],
		lowestHammingDistance = null;

	while(keySize <= 40) {
		avgHammingDistanceForKeySize.push({
			key: keySize,
			avgHammingDistance: hammingTest(cipherBuffer, keySize)
		});
		keySize++;
	}

	return avgHammingDistanceForKeySize.sort(function(a, b) {
		if (a.avgHammingDistance < b.avgHammingDistance) {return -1; }
		else if (b.avgHammingDistance > a.avgHammingDistance) {return 1;  }
		else if (a.avgHammingDistance === b.avgHammingDistance) { return 0; }
	})
}

function hammingTest(cipherBuffer, keySize) {
	return compare(cipherBuffer.slice(0, keySize), cipherBuffer.slice(keySize, 2*keySize)) / keySize;
}

// ****
// LOGS

// 1. Log the raw cipher as a buffer
// console.log(file);
// console.log(cipherBuffer);

// 2. Log the likely key size
// var likelyKeySize = getKeySize(cipherBuffer);
// console.log(likelyKeySize);

// 3. Log the cipher split by our likelyKeySize, or a number we choose
// var cipherByKeySize = bu.bufferToChunks(cipherBuffer, likelyKeySize);
// console.log(cipherByKeySize);

// 4. Log the transposed blocks by key size
// var transposedBlocks = bu.transpose2D(cipherByKeySize);
// console.log('transposedBlocks')
// console.log(transposedBlocks);

// 5. brute foce each block and then push into a key block
// var keys = []
// transposedBlocks.forEach(function(transposedBlock) {
	// var bf = brute_force_xor(transposedBlock.toString('hex'));
	// keys.push(bf[0].key);
// });
// var key = keys.join('');
// console.log(key);

// 6. Decrypt message with repeating key
// var decryptedMessage = xor.dec(cipherBuffer, key);
// console.log(decryptedMessage);


// *************************************
// TO TEST ALL KEYS AT ONCE VIA FOR LOOP

for (var i = 1; i < 40; i++) {
	var cipherByKeySize = bu.bufferToChunks(cipherBuffer, i);
	var transposedBlocks = bu.transpose2D(cipherByKeySize);
	var keys = [];

	transposedBlocks.forEach(function(transposedBlock) {
		var bf = brute_force_xor(transposedBlock.toString('hex'));
		keys.push(bf[0].key);
	});

	var key = keys.join('');
	var decryptedMessage = xor.dec(cipherBuffer, key);

	console.log('key size - ', i)
	console.log('key - ', key);
	console.log(decryptedMessage);
	console.log('********\n');
}

