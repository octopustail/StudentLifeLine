const DataProcesClain = require('../controllers/DataProcessChain.js');
const queryInDatabase = require('./../controllers/queryInDatabase');


/**
 * 临时存储数据;
 * @type {{}}
 */
const dataFromDatabaseStorage = {
    meal: null,
    shower: null
};

let queryForTemp = null;


const entropyDistributionDataProcess = function (req, res, next) {
    const queryProcessClain = new DataProcesClain(req.query);

    const sendToClientHandler = function () {
        res.send(dataFromDatabaseStorage);
        res.end();
        return Promise.resolve();
    };

    // calKDE, kdeDataProcess
    queryProcessClain.addChain([queryVerify, generateSQLForMeal, queryInDatabase, storeMealData, generateSQLForShower, queryInDatabase, dataProcess])
        .sendToClient(sendToClientHandler);

};

/**
 * 只会传输认同的数据;
 * @param query
 */
const queryVerify = function (query) {
    //只会传认可的白名单数据;

    // 保存到全局变量中
    queryForTemp = {
        studentid:query.studentid
    };
    return Promise.resolve(queryForTemp);
};

/**
 * 根据数据来生成查询的SQL
 */
const generateSQLForMeal = function (query) {

    const StudentIdWhereClause = '("' + query.studentid.split(',').join('","') + '")';
    //select student_id,date,time,type,cost from Student_Consumption where date in ("2010-02-01","2010-03-04");
    const sql = `select student_id,ae1s,ae2s,ae3s,ae4s,ae5s,ae6s from meal_times where student_id in ${StudentIdWhereClause};`;

    return Promise.resolve(sql);
};

const storeMealData = function (mealData) {
    dataFromDatabaseStorage.meal = mealData;
    return Promise.resolve('done');
};

/**
 *
 */
const generateSQLForShower = function () {

    const StudentIdWhereClause = '("' + queryForTemp.studentid.split(',').join('","') + '")';
    //select student_id,date,time,type,cost from Student_Consumption where date in ("2010-02-01","2010-03-04");

    const sql = `select student_id,ae1s,ae2s,ae3s,ae4s,ae5s,ae6s from shower_times where student_id in ${StudentIdWhereClause};`;
    return Promise.resolve(sql);
};

/**
 * 需要把数据处理成需要的样子;
 * @param showerData
 * @returns {Promise.<T>}
 */
const dataProcess = function (showerData) {
    dataFromDatabaseStorage.shower = showerData;
    return Promise.resolve(dataFromDatabaseStorage);
};




module.exports = entropyDistributionDataProcess;