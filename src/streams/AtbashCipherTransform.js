const { Transform } = require('stream');
const { atbashCipher } = require('../utils/atbashCipher');

module.exports.AtbashCipherTransform = class AtbashCipherTransform extends Transform {
  constructor(cipher, flag) {
    super();
    this.flag = flag;
    this.cipher = cipher;
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = atbashCipher(chunk.toString('utf8'));
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}
