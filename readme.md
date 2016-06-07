## The CryptoPals Challenges

My first attempt at CryptoPals in Javascript. 

Here's some advice, don't do these in Javascript, it's just not ideally suited for crypto. The SJCL library won't help too much, it's more meant for practical modern crypto than the acadmeic exericse of breaking a cipher. The same seems to go for the 'crypto' library. Also, manipulating Buffers is messy (since it acts like an array, but doesn't have all array operations), and Buffers are poorly documented.