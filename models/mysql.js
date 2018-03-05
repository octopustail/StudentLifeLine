const mysql = require('mysql');
const config = require('../configs/default.js');

/**
 * 传入sql语句并且查询
 * @param sql
 * @param resolve
 * @param reject
 */
module.exports = function (sql, resolve, reject) {
    /**
     * login in with default config;
     */
    const connection = mysql.createConnection(config.mysql);
    connection.connect();
    connection.query(sql, function (error, results, fields) {
        if (error) {
            reject(error);
            throw error;
        }
        resolve(results);
    });
    connection.end();
};