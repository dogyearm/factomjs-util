# SYNOPSIS
[![NPM Package](https://img.shields.io/npm/v/ethereumjs-util.svg?style=flat-square)](https://www.npmjs.com/package/factomjs-util)
[![Build Status](https://travis-ci.org/Emyrk/factomjs-util.svg?branch=master)](https://travis-ci.org/Emyrk/factomjs-util)
[![Coverage Status](https://coveralls.io/repos/github/Emyrk/factomjs-util/badge.svg?branch=master)](https://coveralls.io/github/Emyrk/factomjs-util?branch=master)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)  


A collection of utility functions for factom. It can be used in node.js or can be in the browser with browserify.


# Precompiled for Web

Use `dist/factomjs-util.js` and use like so:
```javascript
// There is a require function to act similar to node
var fctUtils = require('factomjs-util');

// Use like normal
var  p = fctUtils.randomPrivateKey()
// ...
```

# Things you can do

## Making a factoid transaction

```javascript
// This is the transaction object
var t = new fctUtils.Transaction()

// We will need the private key for the inputs later. Input and output is in factoshis
t.addInput('FA2THnSmkrf7veBZ21u5bkT3xqKM3DBd8nQwByyNK3J4XEk16Byb', 100000)
t.addOutput('FA2bEwF9UB2WCYhqPXxKknHyxoju4g6Uwoa7jw3cHCfQuPNz75yo', 100000)
var ok = t.addFee("FA2THnSmkrf7veBZ21u5bkT3xqKM3DBd8nQwByyNK3J4XEk16Byb", 1000)
if(!ok) {
	// The fee was not added for some reason. Like address not found in transaction or something
}

// You do not need to do this, but it timestamps the transaction to 'now'. You should do this before you sign and send
// if the build process takes a lot of time
t.updateTime()

t.sign('Fs2aMCyRrHnaBHbf1Y51LJ7vaUkQrLdRJ7krdbrVs7W9DbCHJWxW')
var txHex = fctUtils.bufferToHex(t.MarshalBinary())

// txHex is what goes in the submit api call
```

## Address manipulation

```javascript
// Let's get a new address
var sec = fctUtils.randomPrivateKey()

// Get the public key
var pub = fctUtils.privateKeyToPublicKey(sec)

// These are not human readable addresses, to get those:
// To get the Fs...
var humanSecret = fctUtils.privateFactoidKeyToHumanAddress(sec)
// To get the Fa...
var humanPublic = fctUtils.publicFactoidKeyToHumanAddress(pub)

// If given a Fs... and you want the private key to get the public key:
sec = fctUtils.privateHumanAddressStringToPrivate("Fs1KWJrpLdfucvmYwN2nWrwepLn8ercpMbzXshd1g8zyhKXLVLWj")

// Then to get the Fa...
pub = fctUtils.privateKeyToPublicKey(sec)
humanPublic = fctUtils.publicFactoidKeyToHumanAddress(pub)
console.log(humanPublic) // FA1zT4aFpEvcnPqPCigB3fvGu4Q4mTXY22iiuV69DqE1pNhdF2MC

```

# Functions

The factom specific functions are:
The factom specific functions are:

[privateKeyToPublicKey](https://github.com/Emyrk/factomjs-util/blob/master/docs/index.md#privatekeytopublickey) : Gets the public keypair for a private key

[publicFactoidKeyToHumanAddress](https://github.com/Emyrk/factomjs-util/blob/master/docs/index.md#publicfactoidkeytohumanaddress) : Public key to 'FA...'

[privateFactoidKeyToHumanAddress](https://github.com/Emyrk/factomjs-util/blob/master/docs/index.md#privatefactoidkeytohumanaddress) : Private key to 'Fs...'

[publicECKeyToHumanAddress](https://github.com/Emyrk/factomjs-util/blob/master/docs/index.md#publiceckeytohumanaddress) : Public key to 'EC...'

[privateECKeyToHumanAddress](https://github.com/Emyrk/factomjs-util/blob/master/docs/index.md#privateeckeytohumanaddress) : Public key to 'Es...'

[privateHumanAddressStringToPrivate](https://github.com/Emyrk/factomjs-util/blob/master/docs/index.md#privatehumanaddressstringtoprivate) : 'Fs...' or "Es..." to private key

[isValidAddress](https://github.com/Emyrk/factomjs-util/blob/master/docs/index.md#isvalidaddress) : Returns true if given string is a valid address.



# Inspired By

This is based off of the etheruem js library, but for Factom

https://github.com/ethereumjs/ethereumjs-util