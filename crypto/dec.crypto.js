const crypto = require("crypto");
const fs = require("fs");
const { resolve } = require("path");
const filez = "../filez/";
const model = require("../models/warez.model");

function decFile(id, key) {
  return new Promise((resolve, reject) => {
    const decipher = crypto.createDecipher("aes-256-cbc", key);
    const fdecipher = crypto.createDecipher("aes-256-cbc", key);
    const tmpFile = __dirname + "/" + filez;
    const cryptFile = __dirname + "/" + filez + id + "-" + key;

    const foundFilename = model.fileNames.find((nm) => nm.id === id);

    const decrpytedFilename = Buffer.concat([
      decipher.update(Buffer.from(foundFilename.fileName, "hex")),
      decipher.final(),
    ]);

    const input = fs.createReadStream(cryptFile);
    const output = fs.createWriteStream(tmpFile + decrpytedFilename);

    input.pipe(fdecipher).pipe(output);

    setTimeout(() => {
      return resolve(tmpFile + decrpytedFilename);
    }, 200);
  });
}

async function dec(id, key) {
  console.log("Running decrypt");
  return await decFile(id, key);
}

module.exports = dec;
