// The prep_enc_key and pre_dec_key are used to allow repeating XOR
// key of multiple length

function xor_cipher_enc(msg, key) {

	var key = prep_enc_key(msg, key);
		msg_buffer = new Buffer(msg, 'utf-8'),
		key_buffer = new Buffer(key, 'utf-8'),
		cipher_buffer = new Buffer(msg_buffer.length);

	for (var i = 0; i < msg_buffer.length; i++) {
		cipher_buffer[i] = (msg_buffer[i] ^ key_buffer[i]);
	}
	
	return cipher_buffer.toString('hex');
}

function xor_cipher_dec(cipher, key) {
	var key = prep_enc_key(cipher, key),
		cipher_buffer = new Buffer(cipher, 'hex'),
		key_buffer = new Buffer(key, 'utf-8'),
		msg_buffer = new Buffer(cipher_buffer.length);

	for (var i = 0; i < cipher_buffer.length; i++) {
		msg_buffer[i] = cipher_buffer[i] ^ key_buffer[i];
	}

	return msg_buffer.toString('utf-8');
}

function prep_enc_key(msg, key) {	
	
	if (key.length > msg.length) {
		key = key.slice(0, msg.length);
	} 
	else if (key.length < msg.length) {
		var orig_key = key;
			diff = msg.length - key.length,
			pad = diff % key.length,
			div = Math.floor(diff / key.length),
			i = 0,
			trail = key.slice(0, pad);
		for (i = 0; i < div; i++) {
			key += orig_key;
		}
		key += trail;
	}
	return key;
}
function prep_dec_key(cipher_buffer, key_buffer) {
	if (cipher_buffer.length < key_buffer.length) {
		key_buffer = key_buffer.slice(0, cipher_buffer.length);
	} else if (cipher_buffer.length > key_buffer.length) {
		var orig_key = key_buffer,
			diff = cipher_buffer.length - key_buffer.length,
			division = Math.floor(diff / key_buffer.length),
			modulo = diff % key_buffer.length;

		for (var i = 0; i < division; i++) {
			key_buffer += orig_key;
		}
		key_buffer += orig_key.slice(0,modulo);

		return new Buffer(key_buffer);
	}
}

var encrypted_message = xor_cipher_enc("Cooking MC\'s like a pound of bacon", 'X');
console.log('the secret is: ', encrypted_message);
var decrypted_message = xor_cipher_dec(encrypted_message, 'X');
console.log('the original message was: ', decrypted_message)

var em2 = xor_cipher_enc('C', 'X');
console.log('single secret is: ', em2);
// console.log(prep_dec_key(em2, 'X'))
var dm2 = xor_cipher_dec(em2, 'X');
console.log('decrypted mesage is: ', dm2);

module.exports = {
	enc : xor_cipher_enc,
	dec : xor_cipher_dec
}