var assert = require('assert')
var ethUtils = require('../index.js')
var BN = require('bn.js')

describe('zeros function', function () {
  it('should produce lots of 0s', function () {
    var z60 = ethUtils.zeros(30)
    var zs60 = '000000000000000000000000000000000000000000000000000000000000'
    assert.equal(z60.toString('hex'), zs60)
  })
})

describe('sha256', function () {
  it('should produce a sha256', function () {
    var msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    var r = '58bbda5e10bc11a32d808e40f9da2161a64f00b5557762a161626afe19137445'
    var hash = ethUtils.sha256(msg)
    assert.equal(hash.toString('hex'), r)
  })
})


describe('unpad', function () {
  it('should unpad a string', function () {
    var str = '0000000006600'
    var r = ethUtils.unpad(str)
    assert.equal(r, '6600')
  })
})

describe('unpad a hex string', function () {
  it('should unpad a string', function () {
    var str = '0x0000000006600'
    var r = ethUtils.unpad(str)
    assert.equal(r, '6600')
  })
})

describe('pad', function () {
  it('should left pad a Buffer', function () {
    var buf = Buffer.from([9, 9])
    var padded = ethUtils.setLength(buf, 3)
    assert.equal(padded.toString('hex'), '000909')
  })
  it('should left truncate a Buffer', function () {
    var buf = Buffer.from([9, 0, 9])
    var padded = ethUtils.setLength(buf, 2)
    assert.equal(padded.toString('hex'), '0009')
  })
  it('should left pad a Buffer - alias', function () {
    var buf = Buffer.from([9, 9])
    var padded = ethUtils.setLengthLeft(buf, 3)
    assert.equal(padded.toString('hex'), '000909')
  })
})

describe('rpad', function () {
  it('should right pad a Buffer', function () {
    var buf = Buffer.from([9, 9])
    var padded = ethUtils.setLength(buf, 3, true)
    assert.equal(padded.toString('hex'), '090900')
  })
  it('should right truncate a Buffer', function () {
    var buf = Buffer.from([9, 0, 9])
    var padded = ethUtils.setLength(buf, 2, true)
    assert.equal(padded.toString('hex'), '0900')
  })
  it('should right pad a Buffer - alias', function () {
    var buf = Buffer.from([9, 9])
    var padded = ethUtils.setLengthRight(buf, 3)
    assert.equal(padded.toString('hex'), '090900')
  })
})

describe('bufferToHex', function () {
  it('should convert a buffer to hex', function () {
    var buf = Buffer.from('5b9ac8', 'hex')
    var hex = ethUtils.bufferToHex(buf)
    assert.equal(hex, '0x5b9ac8')
  })
  it('empty buffer', function () {
    var buf = Buffer.alloc(0)
    var hex = ethUtils.bufferToHex(buf)
    assert.strictEqual(hex, '0x')
  })
})

describe('intToHex', function () {
  it('should convert a int to hex', function () {
    var i = 6003400
    var hex = ethUtils.intToHex(i)
    assert.equal(hex, '0x5b9ac8')
  })
})

describe('intToBuffer', function () {
  it('should convert a int to a buffer', function () {
    var i = 6003400
    var buf = ethUtils.intToBuffer(i)
    assert.equal(buf.toString('hex'), '5b9ac8')
  })
})

describe('bufferToInt', function () {
  it('should convert a int to hex', function () {
    var buf = Buffer.from('5b9ac8', 'hex')
    var i = ethUtils.bufferToInt(buf)
    assert.equal(i, 6003400)
    assert.equal(ethUtils.bufferToInt(Buffer.allocUnsafe(0)), 0)
  })
  it('should convert empty input to 0', function () {
    assert.equal(ethUtils.bufferToInt(Buffer.allocUnsafe(0)), 0)
  })
})

describe('fromSigned', function () {
  it('should convert an unsigned (negative) buffer to a singed number', function () {
    var neg = '-452312848583266388373324160190187140051835877600158453279131187530910662656'
    var buf = Buffer.allocUnsafe(32).fill(0)
    buf[0] = 255

    assert.equal(ethUtils.fromSigned(buf), neg)
  })
  it('should convert an unsigned (positive) buffer to a singed number', function () {
    var neg = '452312848583266388373324160190187140051835877600158453279131187530910662656'
    var buf = Buffer.allocUnsafe(32).fill(0)
    buf[0] = 1

    assert.equal(ethUtils.fromSigned(buf), neg)
  })
})

describe('toUnsigned', function () {
  it('should convert a signed (negative) number to unsigned', function () {
    var neg = '-452312848583266388373324160190187140051835877600158453279131187530910662656'
    var hex = 'ff00000000000000000000000000000000000000000000000000000000000000'
    var num = new BN(neg)

    assert.equal(ethUtils.toUnsigned(num).toString('hex'), hex)
  })

  it('should convert a signed (positive) number to unsigned', function () {
    var neg = '452312848583266388373324160190187140051835877600158453279131187530910662656'
    var hex = '0100000000000000000000000000000000000000000000000000000000000000'
    var num = new BN(neg)

    assert.equal(ethUtils.toUnsigned(num).toString('hex'), hex)
  })
})

describe('publicToAddress', function () {
  it('should produce an address given a public key', function () {
    var pubKey = 'a96946bcc602b0ebaa8e260cb4df0e05d7d2d3c14651cbbd902ab558610c9835'
    var address = 'FA2HmrxVecacS2tJEug1ZaGdJdfFGmU3qn3tFkMvPiroU46LBEte'
    pubKey = Buffer.from(pubKey, 'hex')
    var r = ethUtils.publicFactoidToAddress(pubKey)
    assert.equal(r, address)
  })
  it('should produce an address given a SEC1 public key', function () {
    var pubKey = '60ff85751ed8b47c1c8f010e081f8094086b85c0b57445d7db2767af6828e9d0'
    var address = 'FA2q5QgwuVyVtaT2MbMpsw5LizuGvMa9Mf5qh38hxNmkC59wbi1A'
    pubKey = Buffer.from(pubKey, 'hex')
    var r = ethUtils.publicFactoidToAddress(pubKey)
    assert.equal(r.toString('hex'), address)
  })
  it('shouldn\'t produce an address given an invalid SEC1 public key', function () {
    var pubKey = ''
    pubKey = Buffer.from(pubKey, 'hex')
    assert.throws(function () {
      ethUtils.publicToAddress(pubKey, true)
    })
  })
})


describe('privateToPublic', function () {
  it('should produce a public key given a private key', function () {
    var pubKey = '2314857370cf482610507b11f1ca3aaec0040021ac74b2531be97d3a42a6ad62'
    var privateKey = Buffer.from("2982d0278b8f12a86d3454205a4e92c22b37093e23f9f58e92e49ff0e3df5857", 'hex')
    var r = ethUtils.privateToPublic(privateKey).toString('hex')
    assert.equal(r.toString('hex'), pubKey)
  })
  it('shouldn\'t produce a public key given an invalid private key', function () {
    var privateKey1 = Buffer.from([234, 84, 189, 197, 45, 22, 63, 136, 201, 58, 176, 97, 87, 130, 207, 113, 138, 46, 251, 158, 81, 167, 152, 154, 171, 27, 8, 6, 126, 156, 28, 95, 42])
    var privateKey2 = Buffer.from([234, 84, 189, 197, 45, 22, 63, 136, 201, 58, 176, 97, 87, 130, 207, 113, 138, 46, 251, 158, 81, 167, 152, 154, 171, 27, 8, 6, 126, 156, 28])
    assert.throws(function () {
      ethUtils.privateToPublic(privateKey1)
    })
    assert.throws(function () {
      ethUtils.privateToPublic(privateKey2)
    })
  })
})

describe('hex prefix', function () {
  var string = 'd658a4b8247c14868f3c512fa5cbb6e458e4a989'
  it('should add', function () {
    assert.equal(ethUtils.addHexPrefix(string), '0x' + string)
  })
  it('should return on non-string input', function () {
    assert.equal(ethUtils.addHexPrefix(1), 1)
  })
})

describe('toBuffer', function () {
  it('should work', function () {
    // Buffer
    assert.deepEqual(ethUtils.toBuffer(Buffer.allocUnsafe(0)), Buffer.allocUnsafe(0))
    // Array
    assert.deepEqual(ethUtils.toBuffer([]), Buffer.allocUnsafe(0))
    // String
    assert.deepEqual(ethUtils.toBuffer('11'), Buffer.from([49, 49]))
    assert.deepEqual(ethUtils.toBuffer('0x11'), Buffer.from([17]))
    assert.deepEqual(ethUtils.toBuffer('1234').toString('hex'), '31323334')
    assert.deepEqual(ethUtils.toBuffer('0x1234').toString('hex'), '1234')
    // Number
    assert.deepEqual(ethUtils.toBuffer(1), Buffer.from([1]))
    // null
    assert.deepEqual(ethUtils.toBuffer(null), Buffer.allocUnsafe(0))
    // undefined
    assert.deepEqual(ethUtils.toBuffer(), Buffer.allocUnsafe(0))
    // 'toArray'
    assert.deepEqual(ethUtils.toBuffer(new BN(1)), Buffer.from([1]))
  })
  it('should fail', function () {
    assert.throws(function () {
      ethUtils.toBuffer({ test: 1 })
    })
  })
})

describe('baToJSON', function () {
  it('should turn a array of buffers into a pure json object', function () {
    var ba = [Buffer.from([0]), Buffer.from([1]), [Buffer.from([2])]]
    assert.deepEqual(ethUtils.baToJSON(ba), ['0x00', '0x01', ['0x02']])
  })
  it('should turn a buffers into string', function () {
    assert.deepEqual(ethUtils.baToJSON(Buffer.from([0])), '0x00')
  })
})

var echash = Buffer.from('82ff40c0a986c6a5cfad4ddf4c3aa6996f1a7837f9c398e17e5de5cbd5a12b28', 'hex')
var ecprivkey = Buffer.from('3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1', 'hex')

// describe('ecsign', function () {
//   it('should produce a signature', function () {
//     var sig = ethUtils.ecsign(echash, ecprivkey)
//     assert.deepEqual(sig.r, Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex'))
//     assert.deepEqual(sig.s, Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex'))
//     assert.equal(sig.v, 27)
//   })
// })


// describe('isValidSignature', function () {
//   it('should fail on an invalid signature (shorter r))', function () {
//     var r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1ab', 'hex')
//     var s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
//     assert.equal(ethUtils.isValidSignature(27, r, s), false)
//   })
//   it('should fail on an invalid signature (shorter s))', function () {
//     var r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
//     var s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca', 'hex')
//     assert.equal(ethUtils.isValidSignature(27, r, s), false)
//   })
//   it('should fail on an invalid signature (v = 21)', function () {
//     var r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
//     var s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
//     assert.equal(ethUtils.isValidSignature(21, r, s), false)
//   })
//   it('should fail on an invalid signature (v = 29)', function () {
//     var r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
//     var s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
//     assert.equal(ethUtils.isValidSignature(29, r, s), false)
//   })
//   it('should work otherwise', function () {
//     var r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
//     var s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
//     assert.equal(ethUtils.isValidSignature(27, r, s), true)
//   })
//   // FIXME: add homestead test
// })


describe('.isValidAddress()', function () {
  it('should return true', function () {
    assert.equal(ethUtils.isValidAddress('Fs1isBQNbuSz8vwptc2Kyi2RkhGuee6UX69oX8oPy2qZLwDGh72t'), true)
    assert.equal(ethUtils.isValidAddress('FA33syWbZthLiK5zV67ZWo5QXyrz272fTKrmohZQaA1vjPjPYkVB'), true)
    assert.equal(ethUtils.isValidAddress('Es2WHsvRx4AzTK8Sn3Ti7ZzVdd6Et1bwUTVqwL2LRbsFCzNmzPAj'), true)
    assert.equal(ethUtils.isValidAddress('EC2EvQzR53PkWfYYJSMETrVnfhSA5QKuTXQQm4TTsU9krxbGCNmY'), true)
  })
  it('should return false', function () {
    assert.equal(ethUtils.isValidAddress('Fs1isBQNbuSz8vwptc2Kyi2RkhGuee6UX69oX8oPy2qZLwDGh72a'), false)
    assert.equal(ethUtils.isValidAddress('FB33syWbZthLiK5zV67ZWo5QXyrz272fTKrmohZQaA1vjPjPYkVB'), false)
    assert.equal(ethUtils.isValidAddress('EC2EvQzR53PkWfYYJSMETrVnahSA5QKuTXQQm4TTsU9krxbGCNmY'), false)
    assert.equal(ethUtils.isValidAddress('FA33syWbZthLiK5zV67ZWo5QXyrz272fTKrmohZQaA1vjPjPYkV'), false)
    assert.equal(ethUtils.isValidAddress('33syWbZthLiK5zV67ZWo5QXyrz272fTKrmohZQaA1vjPjPYkVB'), false)
    assert.equal(ethUtils.isValidAddress('FA33syWbZthLaK5zV67ZWo5QXyrz272fTKrmohZQaA1vjPjPYkVB'), false)
    assert.equal(ethUtils.isValidAddress('FA33syWbZthLiK5zV67ZWo5QXyrz272fTKrmohZQaA1vjPjP0000'), false)
    assert.equal(ethUtils.isValidAddress('FA00000000000000000000000000000000000000000000000000'), false)
  })
})

// describe('message sig', function () {
//   const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
//   const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')

//   it('should return hex strings that the RPC can use', function () {
//     assert.equal(ethUtils.toRpcSig(27, r, s), '0x99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca6600')
//     assert.deepEqual(ethUtils.fromRpcSig('0x99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca6600'), {
//       v: 27,
//       r: r,
//       s: s
//     })
//   })

//   it('should throw on invalid length', function () {
//     assert.throws(function () {
//       ethUtils.fromRpcSig('')
//     })
//     assert.throws(function () {
//       ethUtils.fromRpcSig('0x99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca660042')
//     })
//   })

//   it('pad short r and s values', function () {
//     assert.equal(ethUtils.toRpcSig(27, r.slice(20), s.slice(20)), '0x00000000000000000000000000000000000000004a1579cf389ef88b20a1abe90000000000000000000000000000000000000000326fa689f228040429e3ca6600')
//   })

//   it('should throw on invalid v value', function () {
//     assert.throws(function () {
//       ethUtils.toRpcSig(1, r, s)
//     })
//   })
// })
