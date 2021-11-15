const { pipeline } = require('stream');
const { DataReader } = require('./streams/DataReader');
const { DataWriter } = require('./streams/DataWriter');
const { CesarTransform } = require('./streams/CesarTransform');
const { stdin } = require('process');

const pipeCallback = (v) => {
  if (v ) console.log('ERROR:', v);
  else console.log('Success ciphering')
}

const dataReader = (path) => new DataReader(path);
const dataWriter = (path) => new DataWriter(path);
const cesarDataTransform = (flag) => new CesarTransform(flag);

module.exports.ciphering = async (arg) => {
  const inputPathKeyPosition = arg.findIndex((el) => el === '-i' || el === '--input');
  const inputPath = inputPathKeyPosition !== -1 ? arg[inputPathKeyPosition + 1] : undefined;
  const outputPathKeyPosition = arg.findIndex((el) => el === '-o' || el === '--output');
  const outputPath = inputPathKeyPosition !== -1 ? arg[outputPathKeyPosition + 1] : undefined;
  const cipherKeyPosition = arg.findIndex((el) => el === '-c' || el === '--config');
  const cipherData = (inputPathKeyPosition !== -1 ? arg[cipherKeyPosition + 1] : '')
    .replace('"', '')
    .split('-')
    .map((el) => {
      if (el.includes('C')) {
        const flag = el.slice(1);
        
        return cesarDataTransform(flag);
      }
    });

  await pipeline(
    dataReader(inputPath),
    ...cipherData,
    dataWriter(outputPath),
    pipeCallback,
  );
}
