const DataProcesClain = require('../controllers/DataProcessChain.js');
const config = require('./../configs/default');
const kde = require('./../controllers/kernelDensityEstimation');
const queryInDatabase = require('./../controllers/queryInDatabase');


const dataProcessFunc = function (req, res, next) {

    const queryProcessClain = new DataProcesClain(req.query);

    const sendToClientHandler = function (data) {
        res.send(data);
        res.end();
        return Promise.resolve();
    };

    queryProcessClain.addChain([queryVerify, generateSQL, queryInDatabase,cleanData,calKDE])
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

    return Promise.resolve(sql)
};

/**
 * To transform the Array into other version;
 * @param data
 */
const cleanData = (data)=>{
    const actualEntropyList = [];
    const keys = Object.keys(data[0]);
    const studentIdIndex = keys.indexOf('student_id');
    keys.splice(studentIdIndex,1);

    const keyName = keys[0];
    data.forEach((line)=>{
        actualEntropyList.push(line[keyName]);
    });
    return actualEntropyList;
};



/**
 * 计算 KDE 分布[（x1,y1）,(x2,y2)....]
 * @param data a array with number
 */
const calKDE = function (data) {
    return Promise.resolve(kde(data))
};

module.exports = dataProcessFunc;
