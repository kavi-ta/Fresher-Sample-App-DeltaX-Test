const mysql = require('mysql')
const config = {
    host:'localhost',
    user:'root',
    password:'',
    port:'3306',
    database:'FresherSampleApp'
}

module.exports = {con:mysql.createConnection(config)}