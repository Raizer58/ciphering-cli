const { ATBASH_ALPHABET } = require('../constants/alphabet');

module.exports.atbashCipher = (data) => data
  .split('')
  .map((symbol) => {
    const elPosition = ATBASH_ALPHABET.findIndex((el) => el === symbol);

    if (elPosition === -1) return symbol;

    return ATBASH_ALPHABET[ATBASH_ALPHABET.length - 1 - elPosition];
  })
  .join('');
