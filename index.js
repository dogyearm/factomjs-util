// const assert = require('assert')
const BN = require('bn.js')
const crypto = require('crypto')
const createHash = require('create-hash')
const ed25519 = require('ed25519')
const base58 = require('base-58')
const Buffer = require('safe-buffer').Buffer
Object.assign(exports, require('ethjs-util'))

/**
 * the factoid public address prefix
 * @var {Buffer} "5fb1"
 */
exports.FACTOID_PUBLIC_PREFIX = Buffer.from('5fb1', 'hex')

/**
 * the factoid private address prefix
 * @var {Buffer} "5fb1"
 */
exports.FACTOID_PRIVATE_PREFIX = Buffer.from('6478', 'hex')

/**
 * the entrycredit public address prefix
 * @var {Buffer} "5fb1"
 */
exports.ENTRYCREDIT_PUBLIC_PREFIX = Buffer.from('592a', 'hex')

/**
 * the entrycredit private address prefix
 * @var {Buffer} "5fb1"
 */
exports.ENTRYCREDIT_PRIVATE_PREFIX = Buffer.from('5db6', 'hex')

/**
 * the max integer that this VM can handle (a ```BN```)
 * @var {BN} MAX_INTEGER
 */
exports.MAX_INTEGER = new BN('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16)

/**
 * 2^256 (a ```BN```)
 * @var {BN} TWO_POW256
 */
exports.TWO_POW256 = new BN('10000000000000000000000000000000000000000000000000000000000000000', 16)

/**
 * [`BN`](https://github.com/indutny/bn.js)
 * @var {Function}
 */
exports.BN = BN

/**
 * Returns a buffer filled with 0s
 * @method zeros
 * @param {Number} bytes  the number of bytes the buffer should be
 * @return {Buffer}
 */
exports.zeros = function (bytes) {
  return Buffer.allocUnsafe(bytes).fill(0)
}

/**
 * Left Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @method lsetLength
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @param {Boolean} [right=false] whether to start padding form the left or right
 * @return {Buffer|Array}
 */
exports.setLengthLeft = exports.setLength = function (msg, length, right) {
  var buf = exports.zeros(length)
  msg = exports.toBuffer(msg)
  if (right) {
    if (msg.length < length) {
      msg.copy(buf)
      return buf
    }
    return msg.slice(0, length)
  } else {
    if (msg.length < length) {
      msg.copy(buf, length - msg.length)
      return buf
    }
    return msg.slice(-length)
  }
}

/**
 * Right Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @return {Buffer|Array}
 */
exports.setLengthRight = function (msg, length) {
  return exports.setLength(msg, length, true)
}

/**
 * Trims leading zeros from a `Buffer` or an `Array`
 * @param {Buffer|Array|String} a
 * @return {Buffer|Array|String}
 */
exports.unpad = exports.stripZeros = function (a) {
  a = exports.stripHexPrefix(a)
  var first = a[0]
  while (a.length > 0 && first.toString() === '0') {
    a = a.slice(1)
    first = a[0]
  }
  return a
}
/**
 * Attempts to turn a value into a `Buffer`. As input it supports `Buffer`, `String`, `Number`, null/undefined, `BN` and other objects with a `toArray()` method.
 * @param {*} v the value
 */
exports.toBuffer = function (v) {
  if (!Buffer.isBuffer(v)) {
    if (Array.isArray(v)) {
      v = Buffer.from(v)
    } else if (typeof v === 'string') {
      if (exports.isHexString(v)) {
        v = Buffer.from(exports.padToEven(exports.stripHexPrefix(v)), 'hex')
      } else {
        v = Buffer.from(v)
      }
    } else if (typeof v === 'number') {
      v = exports.intToBuffer(v)
    } else if (v === null || v === undefined) {
      v = Buffer.allocUnsafe(0)
    } else if (v.toArray) {
      // converts a BN to a Buffer
      v = Buffer.from(v.toArray())
    } else {
      throw new Error('invalid type')
    }
  }
  return v
}

exports.copyBuffer = function (buf, from, to) {
  var copy = Buffer.from(buf)
  copy = copy.slice(from, to)
  return copy
}

/**
 * Converts a `Buffer` to a `Number`
 * @param {Buffer} buf
 * @return {Number}
 * @throws If the input number exceeds 53 bits.
 */
exports.bufferToInt = function (buf) {
  return new BN(exports.toBuffer(buf)).toNumber()
}

/**
 * Converts a `Buffer` into a hex `String`
 * @param {Buffer} buf
 * @return {String}
 */
exports.bufferToHex = function (buf) {
  buf = exports.toBuffer(buf)
  return '0x' + buf.toString('hex')
}

/**
 * Interprets a `Buffer` as a signed integer and returns a `BN`. Assumes 256-bit numbers.
 * @param {Buffer} num
 * @return {BN}
 */
exports.fromSigned = function (num) {
  return new BN(num).fromTwos(256)
}

/**
 * Converts a `BN` to an unsigned integer and returns it as a `Buffer`. Assumes 256-bit numbers.
 * @param {BN} num
 * @return {Buffer}
 */
exports.toUnsigned = function (num) {
  return Buffer.from(num.toTwos(256).toArray())
}

/**
 * Creates SHA256 hash of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @return {Buffer}
 */
exports.sha256 = function (a) {
  a = exports.toBuffer(a)
  return createHash('sha256').update(a).digest()
}

/**
 * Creates SHA256D hash of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @return {Buffer}
 */
exports.sha256d = function (a) {
  return exports.sha256(exports.sha256(a))
}

/**
 * Checks if the address satisfies the prefix and checksum
 * @param {String} address The human readable address
 * @return {Boolean}
 */
exports.isValidAddress = function (address) {
  try {
    var add = base58.decode(address)
    if (add.length !== 38) {
      return false
    }

    switch (address.substring(0, 2)) {
      case 'Fs':
        break
      case 'FA':
        break
      case 'Es':
        break
      case 'EC':
        break
      default:
        return false
    }

    var checksum = exports.sha256d(exports.copyBuffer(add, 0, 34))
    if (exports.bufferToHex(exports.copyBuffer(checksum, 0, 4)) === exports.bufferToHex(exports.copyBuffer(add, 34, 38))) {
      return true
    }
  } catch (err) {
    console.log(err)
    return false
  }

  return false
}

/**
 * Returns the factom human readable address for a factoid public.
 * @param {Buffer} key The 32 byte buffer of the key
 * @return {String} "Fa..."
 */
exports.publicFactoidToAddress = function (key) {
  return exports.keyToAddress(key, 'FA')
}

/**
 * Returns the factom human readable address for a factoid secret.
 * @param {Buffer} key The 32 byte buffer of the key
 * @return {String} "Fa..."
 */
exports.privateFactoidToAddress = function (key) {
  return exports.keyToAddress(key, 'Fs')
}

/**
 * Returns the factom human readable address for a entry credit public.
 * @param {Buffer} key The 32 byte buffer of the key
 * @return {String} "Ec..."
 */
exports.publicECToAddress = function (key) {
  return exports.keyToAddress(key, 'EC')
}

/**
 * Returns the factom human readable address for a entry credit secret.
 * @param {Buffer} key The 32 byte buffer of the key
 * @return {String} "Es..."
 */
exports.privateECToAddress = function (key) {
  return exports.keyToAddress(key, 'Es')
}

/**
 * Returns the factom human readable address for a key.
 * @param {Buffer} key The 32 byte buffer of the key
 * @param {String} prefix FA, Fs, EC, or Es
 * @return {String}
 */
exports.keyToAddress = function (pubKey, prefix) {
  if (pubKey.length !== 32) {
    throw new Error('pubkey must be 32 bytes')
  }

  pubKey = exports.toBuffer(pubKey)
  var address
  switch (prefix) {
    case 'FA':
      address = Buffer.concat([exports.FACTOID_PUBLIC_PREFIX, exports.keyToRCD(pubKey)])
      break
    case 'Fs':
      address = Buffer.concat([exports.FACTOID_PRIVATE_PREFIX, pubKey])
      break
    case 'EC':
      address = Buffer.concat([exports.ENTRYCREDIT_PUBLIC_PREFIX, exports.keyToRCD(pubKey)])
      break
    case 'Es':
      address = Buffer.concat([exports.ENTRYCREDIT_PRIVATE_PREFIX, pubKey])
      break
    default:
      address = Buffer.concat([exports.FACTOID_PUBLIC_PREFIX, pubKey])
  }
  var checksum = exports.sha256d(address)
  return base58.encode(Buffer.concat([address, checksum.slice(0, 4)]))
}

/**
 * Returns the rcd for a given public key. Type 1
 * @param {Buffer} key The 32 byte buffer of the key
 * @return {Buffer} rcd
 */
exports.keyToRCD = function (key) {
  return exports.sha256d(Buffer.concat([Buffer.from('01', 'hex'), key]))
}

/**
 * Returns the ethereum public key of a given private key
 * @param {Buffer} privateKey A private key must be 256 bits wide
 * @return {Buffer}
 */
exports.privateToPublic = function (privateKey) {
  privateKey = exports.toBuffer(privateKey)
  var keypair = ed25519.MakeKeypair(privateKey)
  return keypair.publicKey
}

/**
 * ed25519 sign
 * @param {Buffer} msg
 * @param {Buffer} privateKey
 * @return {Buffer} signature
 */
exports.edsign = function (msg, privateKey) {
  return ed25519.Sign(msg, privateKey)
}

exports.privateAddressStringToPrivate = function (address) {
  if (exports.isValidAddress(address) && address.substring(0, 2) === 'Fs') {
    var fulladd = base58.decode(address)
    var key = exports.copyBuffer(fulladd, 2, 34)
    return key
  }
  throw new Error('invalid address')
}

/**
 * Generates a new random private key.
 * @return {Buffer}
 */
exports.randomPrivateKey = function (from, nonce) {
  return crypto.randomBytes(32)
}

/**
 * Adds "0x" to a given `String` if it does not already start with "0x"
 * @param {String} str
 * @return {String}
 */
exports.addHexPrefix = function (str) {
  if (typeof str !== 'string') {
    return str
  }

  return exports.isHexPrefixed(str) ? str : '0x' + str
}

/**
 * Validate 25519 signature
 * @method isValidSignature
 * @param {Buffer} msg
 * @param {Buffer} sig
 * @param {Buffer} pubkey
 * @return {Boolean}
 */
exports.isValidSignature = function (msg, sig, pubkey) {
  return ed25519.Verify(msg, sig, pubkey)
}

/**
 * Converts a `Buffer` or `Array` to JSON
 * @param {Buffer|Array} ba
 * @return {Array|String|null}
 */
exports.baToJSON = function (ba) {
  if (Buffer.isBuffer(ba)) {
    return '0x' + ba.toString('hex')
  } else if (ba instanceof Array) {
    var array = []
    for (var i = 0; i < ba.length; i++) {
      array.push(exports.baToJSON(ba[i]))
    }
    return array
  }
}
