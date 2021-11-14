const { Readable, Writable, Transform, pipeline } = require('stream');
const fs = require('fs');

class DataReader extends Readable {
  constructor(filename) {
    super();
    this.filename = filename;
    this.fd = null;
  }

  _construct(callback) {
    console.log('fs.open', this.filename)
    fs.open(this.filename, 'a+', (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _read(n) {
    console.log(n)
    const buf = Buffer.alloc(n);
    console.log('this.fd', this.fd)
    if(this.fd) {
      fs.read(this.fd, buf, 0, n, null, (err, bytesRead, data) => {
        console.log('ReadCallback', data)
        if (err) {
          this.destroy(err);
        } else {
          this.push(
            bytesRead > 0 ? buf.slice(0, bytesRead) : null
          );
          fs.close(this.fd, () => console.log('Close file'))
        }
      });
    }
  }

  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

class DataWriter extends Writable {
  _write(chunk, encoding, callback) {
    console.log(chunk.toString());
  }
}

class DataTransform extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      console.log('DataTransform', chunk.toString('utf8'));
      const resultString = `*${chunk.toString('utf8')}*`;

      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

const pipeCallback = (v) => {
  console.log('completed Pipe', v)
}

const counterReader = new DataReader('./input.txt');
const counterWriter = new DataWriter();
const counterTransform = new DataTransform();

counterReader.on('data', (chunk) => console.log(chunk))

module.exports.ciphering = async (arg) => {
  console.log('start ciphering', arg);
  await pipeline(
    counterReader,
    counterTransform,
    counterWriter,
    pipeCallback,
  );
}
