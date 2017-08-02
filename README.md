# SYNOPSIS
[![NPM Package](https://img.shields.io/npm/v/ethereumjs-util.svg?style=flat-square)](https://www.npmjs.com/package/factomjs-util)
[![Build Status](https://travis-ci.org/Emyrk/factomjs-util.svg?branch=master)](https://travis-ci.org/Emyrk/factomjs-util)
[![Coverage Status](https://coveralls.io/repos/github/Emyrk/factomjs-util/badge.svg?branch=master)](https://coveralls.io/github/Emyrk/factomjs-util?branch=master)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)  


A collection of utility functions for factom. It can be used in node.js or can be in the browser with browserify.

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