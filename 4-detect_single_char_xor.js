var brute_force_xor = require('./3-single_byte_xor.js'),
	fs = require('fs'),
	messages = fs.readFileSync('./ciphers/4-messages.txt').toString().split("\n");

messages = messages.map(function(message) {
	return brute_force_xor(message)
})

var topScore = Math.max.apply(null, messages.map(function(message) {
	return message[0].score;
}));

messages = messages.filter(function(message) {
	return message[0].score === topScore;
});

// console.log(messages);