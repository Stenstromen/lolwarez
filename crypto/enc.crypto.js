const crypto = require("crypto");
const fs = require("fs");
const filez = "/usr/src/app/filez/"
const model = require("../models/warez.model");

function enc(id, filePath, fileName, key) {
  const cipher = crypto.createCipher("aes-256-cbc", key.toString("hex"));
  const fcipher = crypto.createCipher("aes-256-cbc", key.toString("hex"));
  const tmpFile = filePath;
  const cryptFile = filez + id;
  const encfileName = Buffer.concat([
    cipher.update(fileName),
    cipher.final(),
  ]).toString("hex");

  const input = fs.createReadStream(tmpFile);
  const output = fs.createWriteStream(cryptFile);

  model.addFile(id, encfileName);

  input.pipe(fcipher).pipe(output);

  setTimeout(() => {
    fs.unlink(filePath, function (err) {
      if (err) throw err;
      console.log("File deleted!");
    });
  }, 500);
}

module.exports = enc;
