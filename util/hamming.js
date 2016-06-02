module.exports = compare;

function compare(a, b) {
  a = hexToBinary(a)
  b = hexToBinary(b)
  return hammingDistance(a, b);
}

var lookup = {
  '0': '0000',
  '1': '0001',
  '2': '0010',
  '3': '0011',
  '4': '0100',
  '5': '0101',
  '6': '0110',
  '7': '0111',
  '8': '1000',
  '9': '1001',
  'a': '1010',
  'b': '1011',
  'c': '1100',
  'd': '1101',
  'e': '1110',
  'f': '1111',
  'A': '1010',
  'B': '1011',
  'C': '1100',
  'D': '1101',
  'E': '1110',
  'F': '1111'
};

var binaryLookup = {
	'0000' : '0',
	'0001' : '1',
	'0010' : '2',
	'0011' : '3',
	'0100' : '4',
	'0101' : '5',
	'0110' : '6',
	'0111' : '7',
	'1000' : '8',
	'1001' : '9',
	'1010' : 'a',
	'1011' : 'b',
	'1100' : 'c',
	'1101' : 'd',
	'1110' : 'e',
	'1111' : 'f',
}

function hexToBinary(s) {
  // if input is not buffer, make it a hex string, else throw err
  if (Buffer.isBuffer(s)) {
  	s = s.toString('hex');
  } 
  // remote the trailing 0x from some bits
  s = s.replace(/^0x/, '');

  // initialize your return binary string
  var ret = '';

  // traverse the string, replacing hex chars with binary equivalents
  for (var i = 0; i < s.length; i++) ret += lookup[s[i]];

  return ret;
}

function BinaryToHex(s) {
	if (typeof s !== 'string') throw 'Need a string type!';

	var hexString = '';

	for (var i = 0; i < s.length; i = i + 4) {
		hexString += binaryLookup[s.slice(i, (i+4))];
	}

	return hexString;
}

function hammingDistance(a, b) {
  a = hexToBinary(a);
  b = hexToBinary(b);
  var count = 0;
  for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) count++;
  return count;
}

// var buffer1 = new Buffer('Hello, World!');

// console.log(buffer1.toString())
// console.log(buffer1.toString('hex'));

// var buf1Binary = hexToBinary(buffer1);
// console.log(buf1Binary);

// console.log(BinaryToHex(buf1Binary));

// var buffer2 = new Buffer(BinaryToHex(buf1Binary), 'hex');

// console.log(buffer2);

// console.log(buffer2.toString())

// [ '4855', '4966', '5451', '7350', '4168', '3950' ]

// var a = new Buffer('48554966545173504168395045303438476d6c6c48306b63446b345441', 'hex'),
//     b = new Buffer('4966545173504168395045303438476d6c6c48306b63446b3454415173', 'hex');

// console.log(hexToBinary(a))
// console.log(hexToBinary(b))

// console.log('raw hamming dist: ', compare(a,b))

// var a = Buffer.concat(new Buffer(2), [48, 55]),
//     b = new Buffer([49, 66], 'utf8');

// console.log(a, b);

