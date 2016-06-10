var crypto = require('crypto'),
	fs = require('fs');

// encrypt
var plainTextBuffer = fs.readFileSync('./ciphers/7-plainText.txt', 'utf8'),
	key = new Buffer('YELLOW SUBMARINE'),
	iv = '';

function encryptAESecb(textBuffer, key, iv) {
	var cipher = crypto.createCipheriv('aes-128-ecb', key, iv);
	return Buffer.concat([cipher.update(textBuffer), cipher.final()]).toString('base64');
}

// var encryptedFromPT = encryptAESecb(plainTextBuffer, key, iv)

// decrypt
var input = fs.readFileSync('./ciphers/7-cipher.txt', 'utf-8'),
	inputBuffer = new Buffer(input, 'base64');
// var inputBuffer = new Buffer(encryptedFromPT, 'base64');

function decryptAESecb(dataBuffer, key, iv) {
	var decipher = crypto.createDecipheriv('aes-128-ecb', key, iv);
	return Buffer.concat([decipher.update(dataBuffer), decipher.final()]).toString();
}

module.exports = {
	enc : encryptAESecb,
	dec : decryptAESecb
}