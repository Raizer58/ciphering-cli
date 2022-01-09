const { Readable } = require('stream');
const fs = require('fs');

module.exports.DataReader = class DataReader extends Readable {
  constructor(filename) {
    super();
    this.filename = filename;
    this.fd = null;
  }

  _construct(callback) {
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
    const buf = Buffer.alloc(n);

    if(this.fd) {
      fs.read(this.fd, buf, 0, n, null, (err, bytesRead, data) => {
        if (err) {
          this.destroy(err);
        } else {
          this.push(
            bytesRead > 0 ? buf.slice(0, bytesRead) : null
          );
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
