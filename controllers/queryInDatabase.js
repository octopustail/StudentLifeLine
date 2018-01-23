const mysql = require('../models/index');

/**
 * This function will query the sql in the database;
 * @param sql
 * @returns {Promise.<TResult>}
 */
const queryInDatabase = function (sql) {
    /**
     * 这里来处理 mysql 逻辑
     * @type {Promise}
     */
    const p = new Promise(function (resolve, reject) {
        mysql(sql, resolve, reject)
    });

    console.log(sql);
    return p.then(function (data) {
        return Promise.resolve(data)
    },function (error) {
        Promise.reject(error);
        throw new Error(error);
    })
};

module.exports = queryInDatabase;