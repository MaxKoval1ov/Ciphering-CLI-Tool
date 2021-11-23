const { Readable, Writable, Transform } = require("stream");
const fs = require("fs");
const  {encryptA, encryptC, encryptR, decryptC, decryptR}  = require("../src/Encoder");




class MyReadStream extends Readable {
    constructor(filename, options = {}) {
        super(options);
        this.filename = filename;
        this.fd = null;
    }
    _construct(callback) {
        fs.open(this.filename, 'r', (err, fd) => {
            if (err) {
                callback(err);
            } else {
                this.fd = fd;
                callback();
            }
        });
    }
    _read(n) {
        let buf = Buffer.alloc(n, 0, 'utf8');
        fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
            if (err) {
                this.destroy(err);
            } else {
                this.push(
                    bytesRead > 0 ? buf.slice(0, bytesRead) : null
                );

            }
        });
    }
    _destroy(err, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => callback(er || err));
        } 
    }
}

class MyWriteStream extends Writable {
    constructor(filename) {
        super();
        this.filename = filename;
    }
    _construct(callback) {
        fs.open(this.filename, 'w', (err, fd) => {
            if (err) {
                callback(err);
            } else {
                this.fd = fd;
                callback();
            }
        });
    }
    _write(chunk, encoding, callback) {
        fs.write(this.fd, chunk, callback);
    }
    _destroy(err, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    }
}

class myTransformC extends Transform {
  constructor(encode, options = {}) {
    options = Object.assign({}, options, {
        decodeStrings: false
    });
    super(options);
    this.encode = encode;
  }

  _transform(chunk, callback) {
    if (chunk) {
      this.encode ? this.push(encryptC(chunk.toString("utf8"))) : this.push(decryptC(chunk.toString("utf8")));
    }
    // callback();
  }
}

class myTransformR extends Transform {
  constructor(encode, options = {}) {
    super(options);
    this.encode = encode;
  }

  _transform(chunk, callback) {
    if (chunk) {
        this.encode ? this.push(encryptR( chunk.toString("utf8"))) : this.push(decryptR( chunk.toString("utf8")));
    }
    // callback();
  }
}

class myTransformA extends Transform {
  constructor(funcAndArgsObj, options = {}) {
    super(options);
    this.funcAndArgsObj = funcAndArgsObj;
  }

  _transform(chunk, callback) {
    if (chunk) {
      this.push(encryptA(chunk.toString("utf8")));
    }
    // callback();
  }
}

function MyStreamFunction(){
    const read = new streams.MyReadStream(path.join(__dirname,"./input.txt"));
    const transform1 = new streams.myTransformC(true);
    const transform2 = new streams.myTransformR(true);
    const write = new streams.MyWriteStream(path.join(__dirname,"./output.txt"));
    pipeline(
        read,
        transform1,
        transform2,
        write,
        read,
        function(res){
            return res;
        }
    )
}

module.exports = {
  MyWriteStream,
  MyReadStream,
  myTransformC,
  myTransformR,
  myTransformA,
  MyStreamFunction
};
