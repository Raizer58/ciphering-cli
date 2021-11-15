const { Transform } = require('stream');
const { cesarCipher } = require('../utils/cesarCipher');

module.exports.CesarTransform = class CesarTransform extends Transform {
  constructor(flag) {
    super();
    this.flag = flag;
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = cesarCipher(chunk.toString('utf8'), this.flag);
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}
