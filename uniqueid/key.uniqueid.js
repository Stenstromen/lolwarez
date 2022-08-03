const crypto = require("crypto");

function getKey() {
  return crypto.randomBytes(32);
}

module.exports = getKey;
