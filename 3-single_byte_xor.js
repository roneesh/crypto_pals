var xor = require('./5-xor_cipher'); // to easily check my decryption

function brute_force_xor(secret) {
	var possibleKeys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split(''),
		possibleTranslationsWithScores = [],
		topScore,
		scores = [],
		topScorers = [];

	// xor the message against a single letter key, we do this for every
	// letter in the english alphabet since our message is in English
	// Running this function 52 times (a-z and A-Z) gives us 52 possible
	// translations that we then have to score.
	function xor_against_key(cipher_text, key) {
		var cipher_buffer = new Buffer(cipher_text, 'hex'),
			key_buffer = new Buffer(key, 'utf-8'),
			return_buffer = new Buffer(cipher_buffer.length),
			i = 0, 
			len = cipher_buffer.length

		for (i; i < len; i++) {
			return_buffer[i] = cipher_buffer[i] ^ key_buffer[0]
		}
		return return_buffer.toString();
	}

	// For every english character after the xor, it gets 1pt.
	// We will score each of our 52 translations with this function
	function scoreTranslation(plainText) {
		var score = 0,
			i = 0,
			len = plainText.length
		for (i; i < len; i++) {
			if (/[ETAOIN SHRDLU etaoin shrdlu\']/.test(plainText[i])) {
				score++;
			}
		}
		return score;

	}

	// CHANGE TO RUNNING A FOR, SINCE WE NEED TO USE A BUFFER
	// Run a map and filter to get the list of translations and their scores
	// We also run Math.max on just an array of scores to get the top one
	// We then filter our array of translations return only the ones
	// with their score as the top score (in the cryptopals example, two
	// translations have the top score).

	for (var i = 0; i < possibleKeys.length; i++) {
		var translation = xor_against_key(secret, possibleKeys[i]),
			score = scoreTranslation(translation);
		scores.push(score)
		possibleTranslationsWithScores.push({
			translation: translation, 
			score: score, 
			key: possibleKeys[i]
		})
	}

	topScore = Math.max.apply(null, scores);

	topScorers = possibleTranslationsWithScores.filter(function(translation) {
		return translation.score === topScore;
	});

	return topScorers;

}

// var hexEncodedString = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736';
// bf = brute_force_xor(hexEncodedString);
// console.log(bf);
/* Returns: 
[ { translation: 'Cooking MC\'s like a pound of bacon',
    score: 24,
    key: 'X' } ]
*/

// var key = bf[0].key;
// console.log(key);
// Returns: 'X'

// Test
// var dec = xor.dec(hexEncodedString, key);
// console.log(dec);


module.exports = brute_force_xor;
