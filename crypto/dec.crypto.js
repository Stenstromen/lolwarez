var crypto = require('crypto');
var fs = require('fs');

var password = '1234';
var decipher = crypto.createDecipher('aes-256-cbc', password);

var input = fs.createReadStream('secret.enc');
var output = fs.createWriteStream('secret.txt');

input.pipe(decipher).pipe(output);