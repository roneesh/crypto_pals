var crypto = require('crypto'),
	fs = require('fs'),
	_ = require('./util/lodash')

var input = fs.readFileSync('./ciphers/8-cipher.txt', 'utf8'),
	ciphers = input.toString().split('\n'),
	ciphersWithRepetitions = [];


ciphers.forEach(function(cipher) {

	// 1. split cipher into 16 byte chunks and remove duplicates
	var chunks = cipher.match(/.{1,16}/g),
		chunkCount = chunks.length;

	if (_.uniq(chunks).length < chunkCount) {
		ciphersWithRepetitions.push(cipher);
	}
});

console.log('The following have duplicateChunks:');
ciphersWithRepetitions.forEach(function(cipher) {
	console.log(cipher)
})