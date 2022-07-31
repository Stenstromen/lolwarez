const crypto = require('crypto');
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function getKey() {
    return crypto.randomBytes(32);
}

function getIv() {
    return crypto.randomBytes(16);
}

module.exports = getKey;