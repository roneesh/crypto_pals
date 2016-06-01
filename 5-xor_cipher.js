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
	var cipher_buffer = new Buffer(cipher, 'hex'),
		key_buffer = new Buffer(key, 'utf-8'),
		msg_buffer = new Buffer(cipher_buffer.length);

	key_buffer = prep_dec_key(cipher_buffer, key_buffer);

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
function prep_dec_key(msg_buffer, key_buffer) {
	if (msg_buffer.length < key_buffer.length) {
		key_buffer = key_buffer.slice(0, msg_buffer.length);
	} else if (msg_buffer.length > key_buffer.length) {
		var orig_key = key_buffer,
			diff = msg_buffer.length - key_buffer.length,
			division = Math.floor(diff / key_buffer.length),
			modulo = diff % key_buffer.length;

		for (var i = 0; i < division; i++) {
			key_buffer += orig_key;
		}
		key_buffer += orig_key.slice(0,modulo);

		return new Buffer(key_buffer, 'utf-8');
	}
}

var encrypted_message = xor_cipher_enc("the secret is love", 'cupid');
console.log('the secret is: ', encrypted_message);
var decrypted_message = xor_cipher_dec(encrypted_message, 'cupid');
console.log('the original message was: ', decrypted_message)