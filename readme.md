## The CryptoPals Challenges

My first attempt at CryptoPals in Javascript. 

Here's some advice, don't do these in Javascript, it's just not ideally suited for crypto, especially if you're not using a library like SJCL or 'crypto'. Manipulating Buffers is messy (since it acts like an array, but doesn't have all array operations), and it's also poorly documented.