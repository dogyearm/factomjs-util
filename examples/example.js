var fctUtils = require('../index.js')

console.log("Generating a keypair with all zeros private key")
// FactoidPapermill Example, using all 0s as private key
var priv = fctUtils.zeros(32) // or choose a random with fctUtils.randomPrivateKey()
console.log("PrivateAddress:", fctUtils.privateFactoidKeyToHumanAddress(priv)) // Fs1KWJrpLdfucvmYwN2nWrwepLn8ercpMbzXshd1g8zyhKXLVLWj
var public = fctUtils.privateKeyToPublicKey(priv)
console.log("PublicAddress:", fctUtils.publicFactoidKeyToHumanAddress(priv)) // FA2CTnt3GqhKuDKAVnKfyeGrLmbKTvBFhcPyL6i1HAstKJbJT78V

console.log("Importing a private key address")
// Taking a private address ('Fs...') and going to a private key
var privKey = fctUtils.privateHumanAddressStringToPrivate("Fs1KWJrpLdfucvmYwN2nWrwepLn8ercpMbzXshd1g8zyhKXLVLWj")
console.log("PrivateKey:", fctUtils.bufferToHex(privKey)) // 0x0000000000000000000000000000000000000000000000000000000000000000