const { ALPHABET } = require('../constants/alphabet');

// Сдвиг 2, так как учетываются символы верхнего и нижнего регистров
const SHIFT_CIPHER = 2;

module.exports.cesarCipher = (data, flag) => data
    .split('')
    .map(el => {
      const symbolPosition = ALPHABET.findIndex((v) => v === el);

      if (symbolPosition === -1) return el;

      let calcPosition;
      const countSymbols = ALPHABET.length;

      if (Number(flag) === 1) {
        calcPosition = symbolPosition + SHIFT_CIPHER;
        // -2 с учетом того, что сдвиг происходит на 2 символа(из-за нижнего и верхнего регистра)
        const positionLastSymbol = ALPHABET.length - 2; 
        if (symbolPosition >= positionLastSymbol) calcPosition = calcPosition - countSymbols;
      } else {
        calcPosition = symbolPosition - SHIFT_CIPHER;

        // 1 с учетом того, что сдвиг происходит на 2 символа(из-за нижнего и верхнего регистра)
        const positionFirstSymbol = 1;

        if (symbolPosition <= positionFirstSymbol) calcPosition = countSymbols - Math.abs(calcPosition);
      }

      return ALPHABET[calcPosition];
    })
    .join('');

