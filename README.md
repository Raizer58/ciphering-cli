# Ciphering-cli

Application to encode and decode text using:

- [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)
- [Atbash cipher](https://en.wikipedia.org/wiki/Atbash)
- [ROT-8 as variation of ROT-13](https://en.wikipedia.org/wiki/ROT13)

## Installation

Dillinger requires [Node.js](https://nodejs.org/) LTS to run.

Start this program:
```sh
node index.js --input input.txt --output output.txt --config "C1-C0-R1-R0"
```

Where:

-c, --config: config for ciphers Config is a string with pattern {XY(-)}n, where:
  * X is a cipher mark:
    * C is for Caesar cipher;
    * A is for Atbash cipher;
    * R is for ROT-8 cipher; 
  * Y is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher):
    * 1 is for encoding;
    * 0 is for decoding;

-i, --input: a path to input file
-o, --output: a path to output file
