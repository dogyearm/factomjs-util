# addHexPrefix

[index.js:386-392](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L386-L392 "Source code on GitHub")

Adds "0x" to a given `String` if it does not already start with "0x"

**Parameters**

-   `str` **String** 

Returns **String** 

# baToJSON

[index.js:399-409](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L399-L409 "Source code on GitHub")

Converts a `Buffer` or `Array` to JSON

**Parameters**

-   `ba` **Buffer or Array** 

Returns **Array or String or ** 

# BN

[index.js:51-51](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L51-L51 "Source code on GitHub")

[`BN`](https://github.com/indutny/bn.js)

# ENTRYCREDIT_PRIVATE_PREFIX

[index.js:33-33](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L33-L33 "Source code on GitHub")

the entrycredit private address prefix

# ENTRYCREDIT_PUBLIC_PREFIX

[index.js:27-27](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L27-L27 "Source code on GitHub")

the entrycredit public address prefix

# FACTOID_PRIVATE_PREFIX

[index.js:21-21](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L21-L21 "Source code on GitHub")

the factoid private address prefix

# FACTOID_PUBLIC_PREFIX

[index.js:15-15](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L15-L15 "Source code on GitHub")

the factoid public address prefix

# MAX_INTEGER

[index.js:39-39](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L39-L39 "Source code on GitHub")

the max integer that this VM can handle (a `BN`)

# TWO_POW256

[index.js:45-45](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L45-L45 "Source code on GitHub")

2^256 (a `BN`)

# bufferToHex

[index.js:339-342](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L339-L342 "Source code on GitHub")

Converts a `Buffer` into a hex `String`

**Parameters**

-   `buf` **Buffer** 

Returns **String** 

# bufferToInt

[index.js:330-332](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L330-L332 "Source code on GitHub")

Converts a `Buffer` to a `Number`

**Parameters**

-   `buf` **Buffer** 

Returns **Number** 

# edsign

[index.js:185-187](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L185-L187 "Source code on GitHub")

ed25519 sign

**Parameters**

-   `msg` **Buffer** 
-   `privateKey` **Buffer** 

Returns **Buffer** signature

# fromSigned

[index.js:349-351](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L349-L351 "Source code on GitHub")

Interprets a `Buffer` as a signed integer and returns a `BN`. Assumes 256-bit numbers.

**Parameters**

-   `num` **Buffer** 

Returns **BN** 

# intToBuffer

[index.js:453-457](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L453-L457 "Source code on GitHub")

Converts an `Number` to a `Buffer`

**Parameters**

-   `i` **Number** 

Returns **Buffer** 

# intToHex

[index.js:464-468](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L464-L468 "Source code on GitHub")

Converts a `Number` into a hex `String`

**Parameters**

-   `i` **Number** 

Returns **String** 

# isHexString

[index.js:438-446](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L438-L446 "Source code on GitHub")

Is the string a hex string.

**Parameters**

-   `value` **String** 
-   `length` **Number** 

Returns **Boolean** output the string is a hex string

# isValidAddress

[index.js:58-88](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L58-L88 "Source code on GitHub")

Checks if the address satisfies the prefix and checksum

**Parameters**

-   `address` **String** The human readable address

Returns **Boolean** 

# isValidSignature

[index.js:214-216](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L214-L216 "Source code on GitHub")

Validate 25519 signature

**Parameters**

-   `msg` **Buffer** 
-   `sig` **Buffer** 
-   `pubkey` **Buffer** 

Returns **Boolean** 

# keyToAddress

[index.js:132-157](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L132-L157 "Source code on GitHub")

Returns the factom human readable address for a key.

**Parameters**

-   `key` **Buffer** The 32 byte buffer of the key
-   `pubKey`  
-   `prefix` **String** FA, Fs, EC, or Es

Returns **String** 

# keyToRCD

[index.js:164-166](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L164-L166 "Source code on GitHub")

Returns the rcd for a given public key. Type 1

**Parameters**

-   `key` **Buffer** The 32 byte buffer of the key

Returns **Buffer** rcd

# padToEven

[index.js:416-428](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L416-L428 "Source code on GitHub")

Pads a `String` to have an even length

**Parameters**

-   `value` **String** 

Returns **String** output

# privateECKeyToHumanAddress

[index.js:122-124](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L122-L124 "Source code on GitHub")

Returns the factom human readable address for a entry credit secret.

**Parameters**

-   `key` **Buffer** The 32 byte buffer of the key

Returns **String** "Es..."

# privateFactoidKeyToHumanAddress

[index.js:104-106](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L104-L106 "Source code on GitHub")

Returns the factom human readable address for a factoid secret.

**Parameters**

-   `key` **Buffer** The 32 byte buffer of the key

Returns **String** "Fa..."

# privateKeyToPublicKey

[index.js:173-177](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L173-L177 "Source code on GitHub")

Returns the factom public key of a given private key

**Parameters**

-   `privateKey` **Buffer** A private key must be 256 bits wide

Returns **Buffer** 

# publicECKeyToHumanAddress

[index.js:113-115](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L113-L115 "Source code on GitHub")

Returns the factom human readable address for a entry credit public.

**Parameters**

-   `key` **Buffer** The 32 byte buffer of the key

Returns **String** "Ec..."

# publicFactoidKeyToHumanAddress

[index.js:95-97](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L95-L97 "Source code on GitHub")

Returns the factom human readable address for a factoid public.

**Parameters**

-   `key` **Buffer** The 32 byte buffer of the key

Returns **String** "Fa..."

# randomPrivateKey

[index.js:202-204](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L202-L204 "Source code on GitHub")

Generates a new random private key.

**Parameters**

-   `from`  
-   `nonce`  

Returns **Buffer** 

# setLengthLeft

[index.js:243-259](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L243-L259 "Source code on GitHub")

Left Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
Or it truncates the beginning if it exceeds.

**Parameters**

-   `msg` **Buffer or Array** the value to pad
-   `length` **Number** the number of bytes the output should be
-   `right` **[Boolean]** whether to start padding form the left or right (optional, default `false`)

Returns **Buffer or Array** 

# setLengthRight

[index.js:272-274](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L272-L274 "Source code on GitHub")

Right Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
Or it truncates the beginning if it exceeds.

**Parameters**

-   `msg` **Buffer or Array** the value to pad
-   `length` **Number** the number of bytes the output should be

Returns **Buffer or Array** 

# sha256

[index.js:367-370](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L367-L370 "Source code on GitHub")

Creates SHA256 hash of the input

**Parameters**

-   `a` **Buffer or Array or String or Number** the input data

Returns **Buffer** 

# sha256d

[index.js:377-379](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L377-L379 "Source code on GitHub")

Creates SHA256D hash of the input

**Parameters**

-   `a` **Buffer or Array or String or Number** the input data

Returns **Buffer** 

# toBuffer

[index.js:294-316](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L294-L316 "Source code on GitHub")

Attempts to turn a value into a `Buffer`. As input it supports `Buffer`, `String`, `Number`, null/undefined, `BN` and other objects with a `toArray()` method.

**Parameters**

-   `v` **Any** the value

# toUnsigned

[index.js:358-360](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L358-L360 "Source code on GitHub")

Converts a `BN` to an unsigned integer and returns it as a `Buffer`. Assumes 256-bit numbers.

**Parameters**

-   `num` **BN** 

Returns **Buffer** 

# unpad

[index.js:281-289](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L281-L289 "Source code on GitHub")

Trims leading zeros from a `Buffer` or an `Array`

**Parameters**

-   `a` **Buffer or Array or String** 

Returns **Buffer or Array or String** 

# zeros

[index.js:230-232](https://github.com/Emyrk/factomjs-util/blob/5ac56eca50e6a397240af189acf90ef423ac081e/index.js#L230-L232 "Source code on GitHub")

Returns a buffer filled with 0s

**Parameters**

-   `bytes` **Number** the number of bytes the buffer should be

Returns **Buffer** 
