// const assert = require('assert')
const BN = require('bn.js')
const crypto = require('crypto')
const createHash = require('create-hash')
const ed25519 = require('supercop.js')
const base58 = require('base-58')
const Buffer = require('safe-buffer').Buffer
const isHexPrefixed = require('is-hex-prefixed')
const stripHexPrefix = require('strip-hex-prefix')

const MAX_UINT32 = 0xFFFFFFF

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
 * Checks if the address satisfies the prefix and checksum conditions and returns true
 * if so.
 * @param {String} address The human readable address
 * @return {Boolean}
 */
function isValidAddress (address) {
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

    var checksum = sha256d(copyBuffer(add, 0, 34))
    if (bufferToHex(copyBuffer(checksum, 0, 4)) === bufferToHex(copyBuffer(add, 34, 38))) {
      return true
    }
  } catch (err) {
    return false
  }

  return false
}

/**
 * Returns the factom human readable address for a factoid public key.
 * @param {Buffer} key The 32 byte buffer of the key
 * @return {String} "Fa..."
 */
function publicFactoidKeyToHumanAddress (key) {
  return keyToAddress(key, 'FA')
}

/**
 * Returns the factom human readable address for a factoid rcd hash.
 * @param {Buffer} key The 32 byte buffer of the rcd hash
 * @return {String} "Fa..."
 */
function publicFactoidRCDHashToHumanAddress (rcdHash) {
  return keyToAddress(rcdHash, 'FA', true)
}

/**
 * Returns the factom human readable address for a factoid secret key.
 * @param {Buffer} key The 32 byte buffer of the key
 * @return {String} "Fs..."
 */
function privateFactoidKeyToHumanAddress (key) {
  return keyToAddress(key, 'Fs')
}

/**
 * Returns the factom human readable address for a entry credit public key.
 * @param {Buffer} key The 32 byte buffer of the key
 * @return {String} "Ec..."
 */
function publicECKeyToHumanAddress (key) {
  return keyToAddress(key, 'EC')
}

/**
 * Returns the factom human readable address for a entry credit rcd hash.
 * @param {Buffer} key The 32 byte buffer of the rcd hash
 * @return {String} "EC..."
 */
function publicECRCDHashToHumanAddress (rcdHash) {
  return keyToAddress(rcdHash, 'EC', true)
}

/**
 * Returns the factom human readable address for a entry credit secret key.
 * @param {Buffer} key The 32 byte buffer of the key
 * @return {String} "Es..."
 */
function privateECKeyToHumanAddress (key) {
  return keyToAddress(key, 'Es')
}

/**
 * Returns the factom human readable address for a key.
 * @param {Buffer} key The 32 byte buffer of the key
 * @param {String} prefix FA, Fs, EC, or Es
* @param {String} isRCD If passing an RCD hash, indicate it here
 * @return {String}
 */
function keyToAddress (pubKey, prefix, isRCD) {
  if (pubKey.length !== 32) {
    throw new Error('pubkey must be 32 bytes')
  }

  if (isRCD === undefined) {
    isRCD = false
  }

  pubKey = toBuffer(pubKey)
  var address
  switch (prefix) {
    case 'FA':
      if (isRCD) {
        address = Buffer.concat([exports.FACTOID_PUBLIC_PREFIX, pubKey])
      } else {
        address = Buffer.concat([exports.FACTOID_PUBLIC_PREFIX, keyToRCD1(pubKey)])
      }
      break
    case 'Fs':
      address = Buffer.concat([exports.FACTOID_PRIVATE_PREFIX, pubKey])
      break
    case 'EC':
      if (isRCD) {
        address = Buffer.concat([exports.FACTOID_PUBLIC_PREFIX, pubKey])
      } else {
        address = Buffer.concat([exports.ENTRYCREDIT_PUBLIC_PREFIX, keyToRCD1(pubKey)])
      }
      break
    case 'Es':
      address = Buffer.concat([exports.ENTRYCREDIT_PRIVATE_PREFIX, pubKey])
      break
    default:
      address = Buffer.concat([exports.FACTOID_PUBLIC_PREFIX, pubKey])
  }
  var checksum = sha256d(address)
  return base58.encode(Buffer.concat([address, checksum.slice(0, 4)]))
}

/**
 * Returns the rcd for a given public key. Type 1
 * @param {Buffer} key The 32 byte buffer of the key
 * @return {Buffer} rcd
 */
function keyToRCD1 (key) {
  return sha256d(Buffer.concat([Buffer.from('01', 'hex'), key]))
}

/**
 * Returns the factom public key of a given private key
 * @param {Buffer} privateKey A private key must be 256 bits wide
 * @return {Buffer}
 */
function privateKeyToPublicKey (privateKey) {
  if (privateKey.length !== 32) {
    throw new Error('expect length 32')
  }
  privateKey = toBuffer(privateKey)
  var keypair = ed25519.createKeyPair(privateKey)
  return keypair.publicKey
}

/**
 * ed25519 sign
 * @param {Buffer} msg
 * @param {Buffer} privateKey
 * @param {Buffer} publicKey Optional give public key to reduce some computation
 * @return {Buffer} signature
 */
function edSign (msg, privateKey) {
  var keypair = ed25519.createKeyPair(privateKey)
  var sig = ed25519.sign(msg, keypair.publicKey, keypair.secretKey)
  return sig
}

/**
 * Validate 25519 signature
 * @method isValidSignature
 * @param {Buffer} msg
 * @param {Buffer} sig
 * @param {Buffer} pubkey
 * @return {Boolean}
 */
function isValidSignature (msg, sig, pubkey) {
  return ed25519.verify(sig, msg, pubkey)
}

function privateHumanAddressStringToPrivate (address) {
  if (isValidAddress(address) && (address.substring(0, 2) === 'Fs' || address.substring(0, 2) === 'Es')) {
    var fulladd = base58.decode(address)
    var key = copyBuffer(fulladd, 2, 34)
    return key
  }
  throw new Error('invalid address')
}

function publicHumanAddressStringToRCD (address) {
  if (isValidAddress(address) && (address.substring(0, 2) === 'FA' || address.substring(0, 2) === 'EC')) {
    var fulladd = base58.decode(address)
    var key = copyBuffer(fulladd, 2, 34)
    return key
  }
  throw new Error('invalid address')
}

/**
 * Generates a new random private key.
 * @return {Buffer}
 */
function randomPrivateKey (from, nonce) {
  return crypto.randomBytes(32)
}

/*
 *
 *    Utility Functions
 *
 */

/**
 * Returns a buffer filled with 0s
 * @method zeros
 * @param {Number} bytes  the number of bytes the buffer should be
 * @return {Buffer}
 */
function zeros (bytes) {
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
function setLengthLeft (msg, length, right) {
  var buf = zeros(length)
  msg = toBuffer(msg)
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

function setLength (msg, length, right) {
  return setLengthLeft(msg, length, right)
}

/**
 * Right Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @return {Buffer|Array}
 */
function setLengthRight (msg, length) {
  return setLength(msg, length, true)
}

/**
 * Trims leading zeros from a `Buffer` or an `Array`
 * @param {Buffer|Array|String} a
 * @return {Buffer|Array|String}
 */
function unpad (a) {
  a = stripHexPrefix(a)
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
function toBuffer (v) {
  if (!Buffer.isBuffer(v)) {
    if (Array.isArray(v)) {
      v = Buffer.from(v)
    } else if (typeof v === 'string') {
      if (isHexString(v)) {
        v = Buffer.from(padToEven(stripHexPrefix(v)), 'hex')
      } else {
        v = Buffer.from(v)
      }
    } else if (typeof v === 'number') {
      v = intToBuffer(v)
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

function copyBuffer (buf, from, to) {
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
function bufferToInt (buf) {
  return new BN(toBuffer(buf)).toNumber()
}

/**
 * Converts a `Buffer` into a hex `String`
 * @param {Buffer} buf
 * @return {String}
 */
function bufferToHex (buf) {
  buf = toBuffer(buf)
  return '0x' + buf.toString('hex')
}

/**
 * Interprets a `Buffer` as a signed integer and returns a `BN`. Assumes 256-bit numbers.
 * @param {Buffer} num
 * @return {BN}
 */
function fromSigned (num) {
  return new BN(num).fromTwos(256)
}

/**
 * Converts a `BN` to an unsigned integer and returns it as a `Buffer`. Assumes 256-bit numbers.
 * @param {BN} num
 * @return {Buffer}
 */
function toUnsigned (num) {
  return Buffer.from(num.toTwos(256).toArray())
}

/**
 * Creates SHA256 hash of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @return {Buffer}
 */
function sha256 (a) {
  a = toBuffer(a)
  return createHash('sha256').update(a).digest()
}

/**
 * Creates SHA256D hash of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @return {Buffer}
 */
function sha256d (a) {
  return sha256(sha256(a))
}

/**
 * Adds "0x" to a given `String` if it does not already start with "0x"
 * @param {String} str
 * @return {String}
 */
function addHexPrefix (str) {
  if (typeof str !== 'string') {
    return str
  }

  return isHexPrefixed(str) ? str : '0x' + str
}

/**
 * Converts a `Buffer` or `Array` to JSON
 * @param {Buffer|Array} ba
 * @return {Array|String|null}
 */
function baToJSON (ba) {
  if (Buffer.isBuffer(ba)) {
    return '0x' + ba.toString('hex')
  } else if (ba instanceof Array) {
    var array = []
    for (var i = 0; i < ba.length; i++) {
      array.push(baToJSON(ba[i]))
    }
    return array
  }
}

/**
 * Pads a `String` to have an even length
 * @param {String} value
 * @return {String} output
 */
function padToEven (value) {
  var a = value; // eslint-disable-line

  if (typeof a !== 'string') {
    throw new Error(`[ethjs-util] while padding to even, value must be string, is currently ${typeof a}, while padToEven.`)
  }

  if (a.length % 2) {
    a = `0${a}`
  }

  return a
}

/**
 * Is the string a hex string.
 *
 * @method check if string is hex string of specific length
 * @param {String} value
 * @param {Number} length
 * @returns {Boolean} output the string is a hex string
 */
function isHexString (value, length) {
  if (typeof (value) !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false
  }

  if (length && value.length !== 2 + 2 * length) { return false }

  return true
}

/**
 * Converts an`Number` to a 8 byte `Buffer`
 * @param {Number} i
 * @return {Buffer}
 */
function int64ToBuffer (i) {
  var b = new Buffer(8)
  const big = ~~(i / MAX_UINT32)
  const low = (i % MAX_UINT32) - big

  b.writeUInt32BE(big, 0)
  b.writeUInt32BE(low, 4)
  return b
}

/**
 * Converts an `Number` to a `Buffer`
 * @param {Number} i
 * @return {Buffer}
 */
function intToBuffer (i) {
  const hex = intToHex(i)

  return new Buffer(hex.slice(2), 'hex')
}

/**
 * Converts a `Number` into a hex `String`
 * @param {Number} i
 * @return {String}
 */
function intToHex (i) {
  var hex = i.toString(16); // eslint-disable-line

  return `0x${padToEven(hex)}`
}

/*
 * Marshaling Transactions
 */

/**
 * Constructor for a new Transaction object. This is used to build factoid/ec transactions
 * It will use the Address struct for inputs/outputs
 */
function Transaction () {
  this.Inputs = []
  this.Outputs = []
  this.ECOutputs = []
  this.RCDs = []
  this.Signatures = []
  this.MillitimeStamp = (new Date()).getTime()
}

/**
 * Will create an address object.
 * @param {buffer/String} faAddress The 32 byte RCD hash or the human readable address
 * @param {int} amount Factoshi amount, no negitive numbers
 * @param {bool} isFactoid Setting this to false indicates an EC address
 */
function Address (faAddress, amount, isFactoid) {
  if (isFactoid === undefined) {
    isFactoid = true
  }
  this.IsFactoid = isFactoid
  if (faAddress.length === 32) {
    this.RCDHash = faAddress
    if (isFactoid) {
      this.HumanReadable = publicFactoidRCDHashToHumanAddress(faAddress)
    } else {
      this.HumanReadable = publicECRCDHashToHumanAddress(faAddress)
    }
  } else {
    if (typeof faAddress !== 'string') {
      console.log(faAddress)
      throw new Error('HumanReadable param must be a string')
    }
    if (!isValidAddress(faAddress)) {
      throw new Error('HumanReadable param must be valid')
    }

    if (faAddress.substring(0, 2) === 'FA') {
      this.IsFactoid = true
    } else {
      this.IsFactoid = false
    }

    this.HumanReadable = faAddress
    this.RCDHash = publicHumanAddressStringToRCD(faAddress)
  }
  if (amount === undefined) {
    this.Amount = 0
  } else {
    this.Amount = amount
  }
}

Address.prototype.updateAmount = function (amount) {
  this.Amount = amount
}

Address.prototype.isFactoid = function () {
  return this.IsFactoid
}

Address.prototype.getHumanReadable = function () {
  return this.HumanReadable
}

Address.prototype.MarshalBinary = function () {
  return Buffer.concat([intToBuffer(this.Amount), this.RCDHash])
}

/**
 * Will add an address as an input. The private key is not needed until the signing
 * @param {Address} address The address object as an input. It also contains the amount
 * @param {int} amount Optional argument to change the amount
 */
Transaction.prototype.addInput = function (address, amount) {
  var add = checkAddress(address)

  if (amount !== undefined) {
    add.updateAmount(amount)
  }
  this.Inputs.push(add)
}

// Fee structure can be found:
// https://github.com/FactomProject/FactomDocs/blob/master/factomDataStructureDetails.md#sighash-type
//
// Transaction data size. -- Factoid transactions are charged the same
//    amount as Entry Credits (EC). The size fees are 1 EC per KiB with a
//    maximum transaction size of 10 KiB.
// Number of outputs created -- These are data points which potentially
//    need to be tracked far into the future. They are more expensive
//    to handle, and require a larger sacrifice. Outputs cost 10 EC per
//    output. A purchase of Entry Credits also requires the 10 EC sized
//    fee to be valid.
// Number of signatures checked -- These cause expensive computation on
//    all full nodes. A fee of 10 EC equivalent must be paid for each
//    signature included.

/**
 * Will return the fee in number of ECs of the transaction
 * @return {int} fee In Entry Credits
 */
Transaction.prototype.calculateECFee = function () {
  // Currently only works for RCD_1
  var data = this.MarshalBinarySig()
  // Size is the size of the data up to the signatute + number of inputs times the (RCD_1 size + Siganture size)
  var totalInputs = this.Inputs.length
  var size = data.length + (totalInputs * (33 + 64))
  var kib = Math.floor((size + 1023) / 1024)

  // fee in EC
  var fee = (kib * 1) + ((this.Outputs.length + this.ECOutputs) * 10) + totalInputs
  return fee
}

/**
 * Adds the fee to the input specified
 * @param {String} address Address of input to add fee too 'FA....'
 * @return {bool} true if added, false if not found
 */
Transaction.prototype.addFee = function (address, ecrate) {
  var fee = this.calculateFee(ecrate)
  for (var i = 0; i < this.Inputs.length; i++) {
    if (this.Inputs[i].HumanReadable === address) {
      this.Inputs[i].Amount = this.Inputs[i].Amount + fee
      return true
    }
  }
  return false
}

/**
 * Subtracts the fee from the output
 * @param {String} address Address of output to deduct fee from 'FA....' or 'EC.....'
 * @return {bool} true if added, false if not found or not enough output to cover fee
 */
Transaction.prototype.subFee = function (address, ecrate) {
  var fee = this.calculateFee(ecrate)
  for (var i = 0; i < this.Outputs.length; i++) {
    if (this.Outputs[i].HumanReadable === address) {
      if (this.Outputs[i].Amount < fee) {
        // Not enough to cover fee
        return false
      }

      this.Outputs[i].Amount = this.Outputs[i].Amount - fee
      return true
    }
  }
  for (i = 0; i < this.ECOutputs.length; i++) {
    if (this.ECOutputs[i].HumanReadable === address) {
      if (this.ECOutputs[i].Amount < fee) {
        // Not enough to cover fee
        return false
      }
      this.ECOutputs[i].Amount = this.ECOutputs[i].Amount - fee
      return true
    }
  }
  return false
}

/**
 * Will return the fee in number of ECs of the transaction
 * @param {int} ecrate The current Entry credit rate
 * @return {int} fee In factoshis
 */
Transaction.prototype.calculateFee = function (ecrate) {
  return this.calculateECFee() * ecrate
}

function checkAddress (address) {
  if (!(address instanceof Address)) {
    var add = new Address(address, 0)
    return add
  }
  return address
}

/**
 * Will update the timestamp to the time given. If no time given, will update to now.
 * @param {Date} time The new time to be set, or none for "now"
 */
Transaction.prototype.updateTime = function (time) {
  if (time !== undefined) {
    this.MillitimeStamp = time
    return
  }
  this.MillitimeStamp = (new Date()).getTime()
}

/**
 * Will add an address as an output. If it is an ECAddress, it will be set as an ECOutput with the amount in factoshis
 * @param {Address} address The address object as an input. It also contains the amount and type
 * @param {int} amount Optional argument to change the amount
 */
Transaction.prototype.addOutput = function (address, amount) {
  address = checkAddress(address)

  if (amount !== undefined) {
    address.updateAmount(amount)
  }
  if (address.isFactoid()) {
    this.Outputs.push(address)
  } else {
    this.ECOutputs.push(address)
  }
}

/**
 * Will add the RCDHash to the transaction. RCDs corrospond to the inputs.
 * @param {Buffer} rcdHash The RCD hash
 */
// Transaction.prototype.addRCD = function (rcdHash) {
//   this.RCDs.push(rcdHash)
// }

/**
 * Will return the Marshaled form of the transaction
 * @return {Buffer}
 */
Transaction.prototype.MarshalBinary = function () {
  var buf = this.MarshalBinarySig()
  for (var i = 0; i < this.RCDs.length; i++) {
    buf = Buffer.concat([buf, Buffer.concat([this.RCDs[i], this.Signatures[i].MarshalBinary()])])
  }
  return buf
}

/**
 * Will return the Marshaled form of the transaction for signing
 * @return {Buffer}
 */
Transaction.prototype.MarshalBinarySig = function () {
  var buf = new Buffer(1)
  // Verion
  buf.writeUInt8(2, 0)
  var ts = intToBuffer(this.MillitimeStamp)
  buf = Buffer.concat([buf, ts])

  var amts = new Buffer(3)
  amts.writeUInt8(this.Inputs.length, 0)
  amts.writeUInt8(this.Outputs.length, 1)
  amts.writeUInt8(this.ECOutputs.length, 2)

  buf = Buffer.concat([buf, amts])

  var i = 0
  for (i = 0; i < this.Inputs.length; i++) {
    var data = this.Inputs[i].MarshalBinary()
    buf = Buffer.concat([buf, data])
  }

  for (i = 0; i < this.Outputs.length; i++) {
    data = this.Outputs[i].MarshalBinary()
    buf = Buffer.concat([buf, data])
  }

  for (i = 0; i < this.ECOutputs.length; i++) {
    data = this.ECOutputs[i].MarshalBinary()
    buf = Buffer.concat([buf, data])
  }

  // Timestamp
  return buf
}

/**
 * Will sign the transaction and add the
 * @param {Buffer/String} secretKey Key to sign as 32 byte buffer or 'Fs...'
 */
Transaction.prototype.sign = function (secretKey) {
  if (secretKey.length !== 32) {
    if (isValidAddress(secretKey)) {
      secretKey = privateHumanAddressStringToPrivate(secretKey)
    } else {
      throw new Error('secretKey must be 32 byte buffer or valid human readable address')
    }
  }
  var data = this.MarshalBinarySig()
  var sig = new Signature(data, secretKey)
  this.Signatures.push(sig)
  this.RCDs.push(Buffer.concat([Buffer.from('01', 'hex'), privateKeyToPublicKey(secretKey)]))
}

function Signature (msg, secretKey) {
  this.PublicKey = privateKeyToPublicKey(secretKey)
  this.Sig = edSign(msg, secretKey)
}

/**
 * Will return the Marshaled form of the Signature
 * @return {Buffer}
 */
Signature.prototype.MarshalBinary = function () {
  return this.Sig
}

module.exports = {
  baToJSON,
  isValidSignature,
  randomPrivateKey,
  keyToRCD1,
  privateKeyToPublicKey,
  edSign,
  keyToAddress,
  privateFactoidKeyToHumanAddress,
  publicECKeyToHumanAddress,
  privateECKeyToHumanAddress,
  publicFactoidKeyToHumanAddress,
  privateHumanAddressStringToPrivate,
  publicHumanAddressStringToRCD,
  sha256,
  sha256d,
  isValidAddress,
  zeros,
  setLengthLeft,
  setLengthRight,
  unpad,
  toBuffer,
  copyBuffer,
  bufferToInt,
  bufferToHex,
  setLength,
  fromSigned,
  toUnsigned,
  intToBuffer,
  intToHex,
  addHexPrefix,
  publicFactoidRCDHashToHumanAddress,
  publicECRCDHashToHumanAddress,
  int64ToBuffer,
  Transaction,
  Address,
  Signature,
  checkAddress
}
