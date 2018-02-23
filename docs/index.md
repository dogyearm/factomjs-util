# Transaction

[index.js:538-545](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L538-L545 "Source code on GitHub")

Constructor for a new Transaction object. This is used to build factoid/ec transactions
It will use the Address struct for inputs/outputs

## addFee

[index.js:657-666](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L657-L666 "Source code on GitHub")

Adds the fee to the input specified

**Parameters**

-   `address` **String** Address of input to add fee too 'FA....'
-   `ecrate`  

Returns **bool** true if added, false if not found

## addInput

[index.js:611-618](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L611-L618 "Source code on GitHub")

Will add an address as an input. The private key is not needed until the signing

**Parameters**

-   `address` **Address** The address object as an input. It also contains the amount
-   `amount` **int** Optional argument to change the amount

## addOutput

[index.js:733-744](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L733-L744 "Source code on GitHub")

Will add an address as an output. If it is an ECAddress, it will be set as an ECOutput with the amount in factoshis

**Parameters**

-   `address` **Address** The address object as an input. It also contains the amount and type
-   `amount` **int** Optional argument to change the amount

## calculateECFee

[index.js:639-650](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L639-L650 "Source code on GitHub")

Will return the fee in number of ECs of the transaction

Returns **int** fee In Entry Credits

## calculateFee

[index.js:704-706](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L704-L706 "Source code on GitHub")

Will return the fee in number of ECs of the transaction

**Parameters**

-   `ecrate` **int** The current Entry credit rate

Returns **int** fee In factoshis

## MarshalBinary

[index.js:758-764](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L758-L764 "Source code on GitHub")

Will return the Marshaled form of the transaction

Returns **Buffer** 

## MarshalBinary

[index.js:758-764](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L758-L764 "Source code on GitHub")

Will add the RCDHash to the transaction. RCDs corrospond to the inputs.

**Parameters**

-   `rcdHash` **Buffer** The RCD hash

## MarshalBinarySig

[index.js:770-802](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L770-L802 "Source code on GitHub")

Will return the Marshaled form of the transaction for signing

Returns **Buffer** 

## sign

[index.js:808-820](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L808-L820 "Source code on GitHub")

Will sign the transaction and add the

**Parameters**

-   `secretKey` **Buffer/String** Key to sign as 32 byte buffer or 'Fs...'

## subFee

[index.js:673-697](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L673-L697 "Source code on GitHub")

Subtracts the fee from the output

**Parameters**

-   `address` **String** Address of output to deduct fee from 'FA....' or 'EC.....'
-   `ecrate`  

Returns **bool** true if added, false if not found or not enough output to cover fee

## updateTime

[index.js:720-726](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L720-L726 "Source code on GitHub")

Will update the timestamp to the time given. If no time given, will update to now.

**Parameters**

-   `time` **Date** The new time to be set, or none for "now"

# addHexPrefix

[index.js:431-437](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L431-L437 "Source code on GitHub")

Adds "0x" to a given `String` if it does not already start with "0x"

**Parameters**

-   `str` **String** 

Returns **String** 

# Address

[index.js:553-588](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L553-L588 "Source code on GitHub")

Will create an address object.

**Parameters**

-   `faAddress` **buffer/String** The 32 byte RCD hash or the human readable address
-   `amount` **int** Factoshi amount, no negitive numbers
-   `isFactoid` **bool** Setting this to false indicates an EC address

# baToJSON

[index.js:444-454](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L444-L454 "Source code on GitHub")

Converts a `Buffer` or `Array` to JSON

**Parameters**

-   `ba` **Buffer or Array** 

Returns **Array or String or ** 

# BN

[index.js:53-53](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L53-L53 "Source code on GitHub")

[`BN`](https://github.com/indutny/bn.js)

# ENTRYCREDIT_PRIVATE_PREFIX

[index.js:35-35](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L35-L35 "Source code on GitHub")

the entrycredit private address prefix

# ENTRYCREDIT_PUBLIC_PREFIX

[index.js:29-29](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L29-L29 "Source code on GitHub")

the entrycredit public address prefix

# FACTOID_PRIVATE_PREFIX

[index.js:23-23](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L23-L23 "Source code on GitHub")

the factoid private address prefix

# FACTOID_PUBLIC_PREFIX

[index.js:17-17](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L17-L17 "Source code on GitHub")

the factoid public address prefix

# MAX_INTEGER

[index.js:41-41](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L41-L41 "Source code on GitHub")

the max integer that this VM can handle (a `BN`)

# TWO_POW256

[index.js:47-47](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L47-L47 "Source code on GitHub")

2^256 (a `BN`)

# bufferToHex

[index.js:384-387](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L384-L387 "Source code on GitHub")

Converts a `Buffer` into a hex `String`

**Parameters**

-   `buf` **Buffer** 

Returns **String** 

# bufferToInt

[index.js:375-377](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L375-L377 "Source code on GitHub")

Converts a `Buffer` to a `Number`

**Parameters**

-   `buf` **Buffer** 

Returns **Number** 

# edSign

[index.js:219-223](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L219-L223 "Source code on GitHub")

ed25519 sign

**Parameters**

-   `msg` **Buffer** 
-   `privateKey` **Buffer** 
-   `publicKey` **Buffer** Optional give public key to reduce some computation

Returns **Buffer** signature

# fromSigned

[index.js:394-396](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L394-L396 "Source code on GitHub")

Interprets a `Buffer` as a signed integer and returns a `BN`. Assumes 256-bit numbers.

**Parameters**

-   `num` **Buffer** 

Returns **BN** 

# int64ToBuffer

[index.js:498-506](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L498-L506 "Source code on GitHub")

Converts an`Number` to a 8 byte `Buffer`

**Parameters**

-   `i` **Number** 

Returns **Buffer** 

# intToBuffer

[index.js:513-517](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L513-L517 "Source code on GitHub")

Converts an `Number` to a `Buffer`

**Parameters**

-   `i` **Number** 

Returns **Buffer** 

# intToHex

[index.js:524-528](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L524-L528 "Source code on GitHub")

Converts a `Number` into a hex `String`

**Parameters**

-   `i` **Number** 

Returns **String** 

# isHexString

[index.js:483-491](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L483-L491 "Source code on GitHub")

Is the string a hex string.

**Parameters**

-   `value` **String** 
-   `length` **Number** 

Returns **Boolean** output the string is a hex string

# isValidAddress

[index.js:61-90](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L61-L90 "Source code on GitHub")

Checks if the address satisfies the prefix and checksum conditions and returns true
if so.

**Parameters**

-   `address` **String** The human readable address

Returns **Boolean** 

# isValidSignature

[index.js:233-235](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L233-L235 "Source code on GitHub")

Validate 25519 signature

**Parameters**

-   `msg` **Buffer** 
-   `sig` **Buffer** 
-   `pubkey` **Buffer** 

Returns **Boolean** 

# keyToAddress

[index.js:153-187](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L153-L187 "Source code on GitHub")

Returns the factom human readable address for a key.

**Parameters**

-   `key` **Buffer** The 32 byte buffer of the key
-   `pubKey`  
-   `prefix` **String** FA, Fs, EC, or Es
-   `isRCD` **String** If passing an RCD hash, indicate it here

Returns **String** 

# keyToRCD1

[index.js:194-196](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L194-L196 "Source code on GitHub")

Returns the rcd for a given public key. Type 1

**Parameters**

-   `key` **Buffer** The 32 byte buffer of the key

Returns **Buffer** rcd

# MarshalBinary

[index.js:831-833](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L831-L833 "Source code on GitHub")

Will return the Marshaled form of the Signature

Returns **Buffer** 

# padToEven

[index.js:461-473](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L461-L473 "Source code on GitHub")

Pads a `String` to have an even length

**Parameters**

-   `value` **String** 

Returns **String** output

# privateECKeyToHumanAddress

[index.js:142-144](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L142-L144 "Source code on GitHub")

Returns the factom human readable address for a entry credit secret key.

**Parameters**

-   `key` **Buffer** The 32 byte buffer of the key

Returns **String** "Es..."

# privateFactoidKeyToHumanAddress

[index.js:115-117](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L115-L117 "Source code on GitHub")

Returns the factom human readable address for a factoid secret key.

**Parameters**

-   `key` **Buffer** The 32 byte buffer of the key

Returns **String** "Fs..."

# privateKeyToPublicKey

[index.js:203-210](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L203-L210 "Source code on GitHub")

Returns the factom public key of a given private key

**Parameters**

-   `privateKey` **Buffer** A private key must be 256 bits wide

Returns **Buffer** 

# publicECKeyToHumanAddress

[index.js:124-126](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L124-L126 "Source code on GitHub")

Returns the factom human readable address for a entry credit public key.

**Parameters**

-   `key` **Buffer** The 32 byte buffer of the key

Returns **String** "Ec..."

# publicECRCDHashToHumanAddress

[index.js:133-135](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L133-L135 "Source code on GitHub")

Returns the factom human readable address for a entry credit rcd hash.

**Parameters**

-   `key` **Buffer** The 32 byte buffer of the rcd hash
-   `rcdHash`  

Returns **String** "EC..."

# publicFactoidKeyToHumanAddress

[index.js:97-99](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L97-L99 "Source code on GitHub")

Returns the factom human readable address for a factoid public key.

**Parameters**

-   `key` **Buffer** The 32 byte buffer of the key

Returns **String** "Fa..."

# publicFactoidRCDHashToHumanAddress

[index.js:106-108](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L106-L108 "Source code on GitHub")

Returns the factom human readable address for a factoid rcd hash.

**Parameters**

-   `key` **Buffer** The 32 byte buffer of the rcd hash
-   `rcdHash`  

Returns **String** "Fa..."

# randomPrivateKey

[index.js:259-261](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L259-L261 "Source code on GitHub")

Generates a new random private key.

**Parameters**

-   `from`  
-   `nonce`  

Returns **Buffer** 

# setLengthLeft

[index.js:288-304](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L288-L304 "Source code on GitHub")

Left Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
Or it truncates the beginning if it exceeds.

**Parameters**

-   `msg` **Buffer or Array** the value to pad
-   `length` **Number** the number of bytes the output should be
-   `right` **[Boolean]** whether to start padding form the left or right (optional, default `false`)

Returns **Buffer or Array** 

# setLengthRight

[index.js:317-319](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L317-L319 "Source code on GitHub")

Right Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
Or it truncates the beginning if it exceeds.

**Parameters**

-   `msg` **Buffer or Array** the value to pad
-   `length` **Number** the number of bytes the output should be

Returns **Buffer or Array** 

# sha256

[index.js:412-415](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L412-L415 "Source code on GitHub")

Creates SHA256 hash of the input

**Parameters**

-   `a` **Buffer or Array or String or Number** the input data

Returns **Buffer** 

# sha256d

[index.js:422-424](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L422-L424 "Source code on GitHub")

Creates SHA256D hash of the input

**Parameters**

-   `a` **Buffer or Array or String or Number** the input data

Returns **Buffer** 

# toBuffer

[index.js:339-361](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L339-L361 "Source code on GitHub")

Attempts to turn a value into a `Buffer`. As input it supports `Buffer`, `String`, `Number`, null/undefined, `BN` and other objects with a `toArray()` method.

**Parameters**

-   `v` **Any** the value

# toUnsigned

[index.js:403-405](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L403-L405 "Source code on GitHub")

Converts a `BN` to an unsigned integer and returns it as a `Buffer`. Assumes 256-bit numbers.

**Parameters**

-   `num` **BN** 

Returns **Buffer** 

# unpad

[index.js:326-334](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L326-L334 "Source code on GitHub")

Trims leading zeros from a `Buffer` or an `Array`

**Parameters**

-   `a` **Buffer or Array or String** 

Returns **Buffer or Array or String** 

# zeros

[index.js:275-277](https://github.com/MyFactomWallet/factomjs-util/blob/fe395c544a0c521c64aa07ffb5488b856202f722/index.js#L275-L277 "Source code on GitHub")

Returns a buffer filled with 0s

**Parameters**

-   `bytes` **Number** the number of bytes the buffer should be

Returns **Buffer** 
