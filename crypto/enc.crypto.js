var crypto = require('crypto');
var fs = require('fs');

var password = 'abcdefg';
var inputFile = './test.txt';
var outputFile = './test-encrypted.txt';

var cipher = crypto.createCipher('aes-256-cbc', password);

var input = fs.createReadStream(inputFile);
var output = fs.createWriteStream(outputFile);

input.pipe(cipher).pipe(output);