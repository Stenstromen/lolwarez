const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
const enc = require("../crypto/enc.crypto");
const dec = require("../crypto/dec.crypto");
const fileId = require("../uniqueid/fid.uniqueid");
const getKey = require("../uniqueid/key.uniqueid");
const tmp = "../filez/";
const mkdirp = require("mkdirp");

function sendIndex(req, res) {
  res.render("index.ejs");
}

async function sendFile(req, res) {
  const request = req.params.id.split("-");
  const fileId = request[0];
  const key = request[1];
  const iosPreview = req
    .get("User-Agent")
    .includes("facebookexternalhit/1.1 Facebot Twitterbot/1.0");

  if (iosPreview) {
    res.render("share.ejs");
    return;
  } else {
    if (fileId === "favicon.ico" || undefined) {
      return;
    } else {
      const decryptedFile = await dec(fileId, key);
      const fileToSend = path.resolve(decryptedFile);
      res.download(fileToSend);

      setTimeout(() => {
        fs.unlink(fileToSend, function (err) {
          if (err) throw err;
          console.log("File deleted!");
        });
      }, 2000);
    }
  }
}

function getFile(req, res) {
  let form = new formidable.IncomingForm();
  const fid = fileId();

  form.parse(req, function (error, fileds, file) {
    if (error) {
      console.log(error);
    }

    const origFilename = file.fileupload.originalFilename;

    let filepath = file.fileupload.filepath;
    let newpath = __dirname + "/" + tmp;
    newpath += fid + ".orig";

    fs.rename(filepath, newpath, function () {
      const key = getKey();
      enc(fid, newpath, origFilename, key);
      res.end(fid + "-" + key.toString("hex"));
    });
  });
}

module.exports = {
  sendIndex,
  sendFile,
  getFile,
};
