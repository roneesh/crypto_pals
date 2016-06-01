var compare = require('./util/hamming'),
	fs = require('fs'),
	file = fs.readFileSync('./ciphers/6-cipher.txt'),
	cipherBuffer = new Buffer(file, 'base64'),
	_ = require('./util/lodash'),
	bu = require('./util/bufferUtils'),
	brute_force_xor = require('./3-single_byte_xor.js'),
	xor = require('./5-xor_cipher');

function getKeySize(cipherBuffer) {
	var keySize = 2,
		avgHammingDistanceForKeySize = [],
		lowestHammingDistance = null;

	while(keySize <= 60) {
		avgHammingDistanceForKeySize.push({
			key: keySize,
			avgHammingDistance: hammingTest(cipherBuffer, keySize)
		});
		keySize++;
	}

	lowestHammingDistance = avgHammingDistanceForKeySize.reduce(function(prev, curr) {
	    return prev.avgHammingDistance < curr.avgHammingDistance ? prev : curr;
	});
	
	return lowestHammingDistance;
}

function hammingTest(cipherBuffer, keySize) {

	// 1. If you want to do a hamming test by n blocks and average

	// var	testBlocks = [],
	// 	blockCounter = 0,
	// 	blockLimit = 24,
	// 	hammingScores = [],
	// 	avgHammingScore;

	// // will push 10 blocks of the keySize into testBlocks
	// while (blockCounter < (blockLimit * 2)) {
	// 	testBlocks.push(cipherBuffer.slice(blockCounter, (blockCounter + keySize)).toString('hex'));
	// 	blockCounter = blockCounter + 2;
	// }

	// // console.log(testBlocks);

	// // will hamming score blocks 1&2, then 3&4 until 5 scores are produced
	// for (var i = 0; i < testBlocks.length; i = i + 2) {
	// 	hammingScores.push(compare(testBlocks[i], testBlocks[i+1]) / keySize);
	// }
	
	// //reduce to avgHammingScore and return
	// return hammingScores.reduce(function(a, b) {
	// 	return a + b;
	// }) / hammingScores.length

	// 2. If you just want to compare the first two bocks
	return compare(cipherBuffer.slice(0, keySize), cipherBuffer.slice(keySize, 2*keySize)) / keySize;
}


// ****
// LOGS

// 1. Log the raw cipher as a buffer
// console.log(cipherBuffer);

// 2. Log the likely key size
var likelyKeySize = getKeySize(cipherBuffer);
// console.log(likelyKeySize);

// 3. Log the cipher split by our likelyKeySize, or a number we choose
var cipherByKeySize = bu.bufferToChunks(cipherBuffer, 20);
// console.log(cipherByKeySize);

// 4. Log the transposed blocks by key size
var transposedBlocks = bu.transpose2D(cipherByKeySize);
console.log(transposedBlocks);

// 5. brute foce each block and then push into a key block
var keys = []
transposedBlocks.forEach(function(transposedBlock) {
	var bf = brute_force_xor(transposedBlock)
	keys.push(bf[0].key)
});
var k = new Buffer(keys);
console.log(k.toString('utf-8'))

// 6. Decrypt message with repeating key
var decryptedMessage = xor.xor_dec(cipherBuffer, k);
console.log(decryptedMessage);


