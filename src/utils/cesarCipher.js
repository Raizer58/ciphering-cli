const { ALPHABET } = require('../constants/alphabet');

const SHIFT_CIPHER = {
  // Сдвиг 2, так как учетываются символы верхнего и нижнего регистров(Фактический сдвиг шифрования - 1)
  C: 2,
  // Сдвиг 16, так как учетываются символы верхнего и нижнего регистров(Фактический сдвиг шифрования - 8)
  R: 16,
}

module.exports.cesarCipher = (data, cipher, flag) => data
    .split('')
    .map(el => {
      const symbolPosition = ALPHABET.findIndex((v) => v === el);

      if (symbolPosition === -1) return el;

      let calcPosition;
      const countSymbols = ALPHABET.length;

      if (Number(flag) === 1) {
        calcPosition = symbolPosition + SHIFT_CIPHER[cipher];

        // -2 с учетом того, что сдвиг происходит на 2 символа(из-за нижнего и верхнего регистра)
        const positionLastSymbol = ALPHABET.length - SHIFT_CIPHER[cipher]; 
        if (symbolPosition >= positionLastSymbol) calcPosition = calcPosition - countSymbols;
      } else {
        calcPosition = symbolPosition - SHIFT_CIPHER[cipher];

        // 1 с учетом того, что сдвиг происходит на 2 символа(из-за нижнего и верхнего регистра)
        const positionFirstSymbol = SHIFT_CIPHER[cipher] - 1;

        if (symbolPosition <= positionFirstSymbol) calcPosition = countSymbols - Math.abs(calcPosition);
      }

      return ALPHABET[calcPosition];
    })
    .join('');

