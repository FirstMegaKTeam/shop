const msql = require('mysql2/promise')

const pool = msql.createPool({
    connectionLimit: 100,
    host: '127.0.0.1',
    user:  process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: 'shopmegak'

})

module.exports = {
    select,
}

