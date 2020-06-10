const sql = require('mssql');
const config = require('../common/env.config');

const conn = {
    database : 'Company',
    user : config.User,
    server : config.Server,
    password : config.Password
};

const poolPromise = new sql.ConnectionPool(conn)
    .connect()
    .then(pool => {
        console.log("Connected to MSSQL")
        return pool
    }).catch(err => console.log("Database Connection Failed : ",err));

module.exports = {
    sql,poolPromise
}