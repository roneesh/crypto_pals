var compare = require('./util/hamming'),
	fs = require('fs'),
	file = fs.readFileSync('./ciphers/6-cipher.txt'),
	cipherBuffer = new Buffer(file, 'base64'),
	_ = require('./util/lodash');

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

	console.log('Average Hamming Distances for key size:')
	console.log(avgHammingDistanceForKeySize);

	console.log('Lowest Hamming Distance for a key size:')
	console.log(lowestHammingDistance)
	
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

function splitCipher(cipherBuffer, keySize) {
	var i = 0,
		len = cipherBuffer.length,
		ciphersByKeySize = [];

	for (i; i < len; i += keySize) {
	    ciphersByKeySize.push(cipherBuffer.slice(i, i + keySize));
	}

	// if the last buffer is short of a full block, pad it
	var lastCipher = ciphersByKeySize[ciphersByKeySize.length - 1],
		lenOfLastCipher = lastCipher.length,
		diff = keySize - lenOfLastCipher;
	while(diff > 0) {
		console.log('in while loop, diff: ', diff)
		ciphersByKeySize[ciphersByKeySize.length - 1] = Buffer.concat([ciphersByKeySize[ciphersByKeySize.length - 1], new Buffer(01)]);
		diff--;
	}

	return ciphersByKeySize;

}

function transposeBlocks(ciphersByKeySize) {

	var hexStringArrays = ciphersByKeySize.map(function(cipher) {
		return cipher.toString('hex');
	})

	console.log(hexStringArrays);

	// In progress

}

/*
transposed block sshould produce
[ [48, 48, 41, 0a, 4d, 46, 47...]
  [55, 30, 42, 42, 48, 48, 0a...]
  [49, 6b, 34, 67, 67, 55, 44...]
] for keySize of 20
*/



// ****
// LOGS

// 1. Log the raw cipher as a buffer
// console.log(cipherBuffer);

// 2. Log the likely key size
// var likelyKeySize = getKeySize(cipherBuffer);
// console.log(likelyKeySize);

// 3. Log the cipher split by our likelyKeySize, or a number we choose
// var cipherByKeySize = splitCipher(cipherBuffer, 18)

// 4. Log the transposed blocks by key size
// var transposedBlocks = transposeBlocks(cipherByKeySize);
// console.log(transposedBlocks);



