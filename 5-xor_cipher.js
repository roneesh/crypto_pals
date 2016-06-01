function xor_cipher_enc(msg, key) {

	var msg_buffer = new Buffer(msg, 'utf-8'),
		key_buffer = new Buffer(key, 'utf-8'),
		cipher_buffer = new Buffer(msg_buffer.length);

	for (var i = 0; i < msg_buffer.length; i++) {
		cipher_buffer[i] = msg_buffer[i] ^ key_buffer[0];
	}
	
	return cipher_buffer.toString('hex');
}

function xor_cipher_dec(cipher, key) {
	var cipher_buffer = new Buffer(cipher, 'hex'),
		key_buffer = new Buffer(key, 'utf-8'),
		msg_buffer = new Buffer(cipher_buffer.length);

	for (var i = 0; i < cipher_buffer.length; i++) {
		msg_buffer[i] = cipher_buffer[i] ^ key_buffer[0];
	}

	return msg_buffer.toString('utf-8');
}

var encrypted_message = xor_cipher_enc("Cooking MC\'s like a pound of bacon", 'X');
console.log('the secret is: ', encrypted_message);
var decrypted_message = xor_cipher_dec(encrypted_message, 'X');
console.log('the original message was: ', decrypted_message)

var em2 = xor_cipher_enc('C', 'X');
console.log('single secret is: ', em2);
var dm2 = xor_cipher_dec(em2, 'X');
console.log('decrypted mesage is: ', dm2);

module.exports = {
	enc : xor_cipher_enc,
	dec : xor_cipher_dec
}