const con = require("../mysql/db.mysql");

function addFile(id, name) {
    let sql = `INSERT INTO filez (fileid, filename) VALUES ("${id}", "${name}")`
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Filename ${id} inserted into the database`);
    });
}

async function getFileName(id) {
    let sql = `SELECT filename FROM filez WHERE fileid = "${id}"`

    return new Promise((resolve, reject) => {
        con.query(sql, function (err, result) {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            Object.keys(result).forEach(function (key) {
                let row = result[key];
                resolve(row)
            })
        });
    });
}

module.exports = {
    addFile,
    getFileName,
}