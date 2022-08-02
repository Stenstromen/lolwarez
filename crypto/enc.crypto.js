const crypto = require('crypto');
const fs = require('fs');
const filez = "../public/filez"
const tmp = "../public/filez/tmp"

/*var password = 'abcdefg';
var inputFile = './test.txt';
var outputFile = './test-encrypted.txt';

var cipher = crypto.createCipher('aes-256-cbc', password);

var input = fs.createReadStream(inputFile);
var output = fs.createWriteStream(outputFile);

input.pipe(cipher).pipe(output);*/

function enc(id, file, key) {
    const cipher = crypto.createCipher("aes-256-cbc", key);
    const tmpFile = tmp + "/" + file;
    const cryptFile = filez + "/" + id + "-" + key;
    
    const input = fs.createReadStream(tmpFile);
    const output = fs.createWriteStream(cryptFile);

    input.pipe(cipher).pipe(output);
}

module.exports = enc;