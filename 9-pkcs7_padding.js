var message = "YELLOW SUBMARINE",
	byteSize = 20,
	bu = require('./util/bufferUtils')

var a = new Buffer(message),
	b = bu.padToSize(a, 20);

if (b.length !== 20) {
	throw 'bufferUtils.padToSize failed!'
} else {
	console.log('it worked!');
}