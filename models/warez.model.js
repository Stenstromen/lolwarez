const sqlDbFile = "./filez/filezDb.sqlite"
const sqlite3 = require("sqlite3").verbose();

const filezDb = new sqlite3.Database(sqlDbFile, (error) => {
    if (error) {
        console.error(error.message);
        throw error;
    }

    console.log("Connected to DB");

    const statement = `CREATE TABLE filez (id TEXT, filename TEXT)`

    filezDb.run(statement, (error) => {
        if (error) {
            console.log('Table "Filez already exists');
            return;
        }
    })
})

function addFile(id, name) {
    let insert = "INSERT INTO filez (id, filename) VALUES (?,?)";
    filezDb.run(insert, [`${id}`, `${name}`]);
}

function getFileName(id) {
    let sql = "SELECT filename FROM filez WHERE id = ?";

    return new Promise((resolve, reject) => {
        filezDb.get(sql, id, (error, rows) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(rows);
        });
    });
}

module.exports = {
    addFile,
    getFileName,
}