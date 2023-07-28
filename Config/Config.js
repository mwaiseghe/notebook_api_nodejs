const mssql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: "localhost",
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: false,
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
};

module.exports = {
    sqlConfig,
    mssql
}