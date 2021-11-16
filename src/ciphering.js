const { pipeline } = require('stream');
const { DataReader } = require('./streams/DataReader');
const { DataWriter } = require('./streams/DataWriter');
const { ShiftCipherTransform } = require('./streams/ShiftCipherTransform');
const { AtbashCipherTransform } = require('./streams/AtbashCipherTransform');

const pipeCallback = (v) => {
  if (v ) console.log('ERROR:', v);
  else console.log('Success ciphering')
}

const dataReader = (path) => new DataReader(path);
const dataWriter = (path) => new DataWriter(path);
const cesarDataTransform = (cipher, flag) => new ShiftCipherTransform(cipher, flag);

module.exports.ciphering = async (arg) => {
  const inputPathKeyPosition = arg.findIndex((el) => el === '-i' || el === '--input');
  const inputPath = inputPathKeyPosition !== -1 ? arg[inputPathKeyPosition + 1] : undefined;
  const outputPathKeyPosition = arg.findIndex((el) => el === '-o' || el === '--output');
  const outputPath = inputPathKeyPosition !== -1 ? arg[outputPathKeyPosition + 1] : undefined;
  const readStream =  inputPath ? dataReader(inputPath) : process.stdin;
  const writeStream = outputPath ? dataWriter(outputPath) : process.stdout;
  const cipherKeyPosition = arg.findIndex((el) => el === '-c' || el === '--config');
  const cipherData = (cipherKeyPosition !== -1 ? arg[cipherKeyPosition + 1] : '')
    .replace('"', '')
    .split('-')
    .map((el) => {
      if (el.includes('C') || el.includes('R')) {
        const flag = el.slice(1);
        const cipher = el.slice(0, 1);

        return cesarDataTransform(cipher, flag);
      }
      if (el.includes('A')) return new AtbashCipherTransform();
    });

  await pipeline(
    readStream,
    ...cipherData,
    writeStream,
    pipeCallback,
  );
}
