const mysql = require('../models/index');

const DataProcesClain = require('../controllers/DataProcessChain.js');

const config = require('./../configs/default');

const dataProcessFunc = function (req, res, next) {

    const queryProcessClain = new DataProcesClain(req.query);

    const sendToClientHandler = function (data) {
        console.log('send',data);
        res.send(data);
        res.end();
        return Promise.resolve();
    };

    queryProcessClain.addChain([queryVerify, generateSQL, queryInDatabase])
        .sendToClient(sendToClientHandler);
};


/**
 * In this section, those functions are chain member with promise interface.
 * which need to use Promise.resolve(data) to pass the data to the next function;
 */

/**
 * This func is to verify the query;
 */
const queryVerify = function (payload) {
    // console.log('queryVerify', payload);
    return Promise.resolve(payload)
};

/**
 * This func is to generate a sql according to the query;
 * @returns {string}
 */
const generateSQL = function (payload) {

    let start = payload.currPage || config.page.currPage,
        end = payload.pageSize || config.page.pageSize,
        table = payload.table || config.sql.defaultTable,
        columns = payload.column;

    const sql = `select ${columns} from ${table} limit ${start},${end};`;
    console.log('generateSQL', sql);
    return Promise.resolve(sql)
};

const queryInDatabase = function (sql) {

    /**
     * 这里来处理 mysql 逻辑
     * @type {Promise}
     */
    const p = new Promise(function (resolve, reject) {
        mysql(sql, resolve, reject)
    });

    return p.then(function (data) {
        return Promise.resolve(data)
    },function (error) {
        Promise.reject(error);
        throw new Error(error);
    })
};

module.exports = dataProcessFunc;
