const { Transform } = require('stream');
const { cesarCipher } = require('../utils/cesarCipher');

module.exports.ShiftCipherTransform = class ShiftCipherTransform extends Transform {
  constructor(cipher, flag) {
    super();
    this.flag = flag;
    this.cipher = cipher;
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = cesarCipher(chunk.toString('utf8'), this.cipher, this.flag);
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}
