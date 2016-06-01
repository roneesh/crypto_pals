var crypto = require('crypto'),
	fs = require('fs');

var input = fs.readFileSync('./ciphers/8-cipher.txt', 'utf8'),
	ciphers = input.toString().split('\n'),
	ciphersWithRepetitions = [];


ciphers.forEach(function(cipher) {

	// 1. split cipher into 16 byte chunks
	cipher.match(/.{1,16}/g);
	console.log(cipher);

	// 2. any chunks are equal add to ciphersWithRepetitions along with count

});