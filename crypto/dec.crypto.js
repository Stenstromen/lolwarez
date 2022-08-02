const crypto = require('crypto');
const fs = require('fs');
const filez = "../public/filez"
const tmp = "../public/filez/tmp"

/*var password = '1234';
var decipher = crypto.createDecipher('aes-256-cbc', password);

var input = fs.createReadStream('secret.enc');
var output = fs.createWriteStream('secret.txt');

input.pipe(decipher).pipe(output);*/

function dec(id, file, key) {
    const decipher = crypto.createCipher("aes-256-cbc", key);
    const tmpFile = tmp + "/" + file + ".decrypted";
    const cryptFile = filez + "/" + id + "-" + key;
    
    const input = fs.createReadStream(cryptFile);
    const output = fs.createWriteStream(tmpFile);

    input.pipe(decipher).pipe(output);
}

module.exports = dec;