var crypto = require('crypto'),
	fs = require('fs');

var input = fs.readFileSync('./ciphers/7-cipher.txt', 'utf-8'),
	inputBuffer = new Buffer(input, 'base64'),
	key = new Buffer('YELLOW SUBMARINE'),
	iv = '';

var decipher = crypto.createDecipheriv('aes-128-ecb', key, iv);
var plaintext = Buffer.concat([decipher.update(inputBuffer), decipher.final()])

console.log(plaintext.toString());