var bufferUtils = {},
	_ = require('./lodash');

bufferUtils.stringToBuffer = function(str, encoding) {
	return new Buffer(str, encoding);
}

bufferUtils.padToSize = function(buffer, size) {
	if (buffer.length >= size) {
		return buffer;
	}
	else {
		var i = 0,
			len = buffer.length;
		while(buffer.length < size) {
			buffer = Buffer.concat([buffer, new Buffer('00', 'hex')]);
		}		
		return buffer;
	}
}

bufferUtils.transpose2D = function(array2D) {
	var arrayLength = array2D.length,
		bufferLength = array2D[0].length;
	
	// checks
	if (arrayLength <= 1) {
		return array2D;
	}
	for (var i = 0; i < arrayLength; i++) {
		if (array2D[i].length !== bufferLength) throw 'Arrays not of equal size';
	}

	// setup blank transposed 2D array
	var transposedArray = [],
		transposedArrayOfBuffers = [];

	for (var i = 0; i < bufferLength; i++) {
		transposedArray.push([])
	}

	// transpose
	for (var i = 0; i < bufferLength; i++) { 
		for (var j = 0; j < arrayLength; j++) {
			transposedArray[i].push(array2D[j][i])
		}
	}

	for (var i = 0; i < transposedArray.length; i++) {
		transposedArrayOfBuffers.push(new Buffer(transposedArray[i]));
	}

	return transposedArrayOfBuffers;

}

bufferUtils.bufferToChunks = function(buffer, chunkSize) {
	var bufferLength = buffer.length

	if (bufferLength < chunkSize) {
		return [this.padToSize(buffer, chunkSize)];
	} else if (bufferLength === chunkSize) {
		return [buffer];
	}

	// turn into chunks
	var bufferToChunks = [];
	for (var i = 0; i < bufferLength; i += chunkSize) {
		bufferToChunks.push(buffer.slice(i, i + chunkSize));
	}

	// pad the last buffer if necessary
	var padLen = bufferToChunks[0].length,
		bufferToPad = bufferToChunks.length - 1;

	if (bufferToChunks[bufferToPad].length < padLen) {
		bufferToChunks[bufferToPad] = this.padToSize(bufferToChunks[bufferToPad], padLen);
	}

	return bufferToChunks;

}

module.exports = bufferUtils;

//****
//TEST
//****

// 1. bufferUtils.stringToBuffer
// var a = bufferUtils.stringToBuffer('Hello World!');
// var b = new Buffer('Hello World!');
// if (a.length !== b.length) throw 'bufferUtils.stringToBuffer failed!'
// hard to test for equality due to call by value/reference issue

// 2. bufferUtils.padToSize
// var a = new Buffer(12);
// a = bufferUtils.padToSize(a, 20);
// if (a.length !== 20) throw 'bufferUtils.padToSize failed!'

// var b = new Buffer(1);
// b = bufferUtils.padToSize(b, 100);
// if (b.length !== 100) throw 'bufferUtils.padToSize failed!'

// var c = new Buffer('hello, world')
// c = bufferUtils.padToSize(c, 30);
// if (c.length !== 30) throw 'bufferUtils.padToSize failed!';

// 3. bufferUtils.transpose2D
// var a = new Buffer('hello world!'),
// 	b = new Buffer('hello world!'),
// 	c = new Buffer('hello world!'),
// 	arr2d = [a, b, c];
// 	d = bufferUtils.transpose2D([a, b, c]);
// if (d.length !== arr2d[0].length) throw 'bufferUtils.transpose2D failed!'

// var arr2dSingle = [a],
// 	e = bufferUtils.transpose2D(arr2dSingle);
// if (e !== arr2dSingle) throw 'bufferUtils.transpose2D failed!'

// var f = new Buffer('abcdefghijklmnop'),
// 	g = new Buffer('abcedfghijklmnop'),
// 	arr2d = [f, g],
// 	h = bufferUtils.transpose2D([f,g]);
// if (h[0].length !== 2) throw 'bufferUtils.transpose2D failed!';
// if (h[h.length - 1].length !== 2) throw 'bufferUtils.transpose2D failed!';

// 4. bufferUtils.bufferToChunks
// var a = new Buffer('hello world!'),
// 	chunkSize = 50,
// 	aToFifty = bufferUtils.bufferToChunks(a, chunkSize);

// if (aToFifty.length !== 1) throw 'bufferUtils.bufferToChunks failed!';
// if (aToFifty[0].length !== 50) throw 'bufferUtils.bufferToChunks failed!';

// var a = new Buffer('hello world!'),
// 	chunkSize = 12,
// 	aToTwelve = bufferUtils.bufferToChunks(a, chunkSize);

// if (aToTwelve.length !== 1) throw 'bufferUtils.bufferToChunks failed!';
// if (aToTwelve[0].length !== 12) throw 'bufferUtils.bufferToChunks failed!';

// var a = new Buffer('hello world!!'),
// 	chunkSize = 2,
// 	aToTwo = bufferUtils.bufferToChunks(a, chunkSize);
// console.log(aToTwo)

// 5. Transpose a chunked array
// console.log(bufferUtils.transpose2D(aToTwo));
// --> it works!


console.log(bufferUtils.singleCharBuffer());
