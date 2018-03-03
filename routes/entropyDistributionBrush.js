const DataProcesClain = require('../controllers/DataProcessChain.js');
const queryInDatabase = require('./../controllers/queryInDatabase');


const entropyDistributionDataProcess = function (req, res, next) {
    const queryProcessClain = new DataProcesClain(req.query);

    const sendToClientHandler = function () {
        res.send(data);
        res.end();
        return Promise.resolve();
    };

    // calKDE, kdeDataProcess
    queryProcessClain.addChain([queryVerify, generateSQLForMeal, queryInDatabase, storeMealData, generateSQLForShower, queryInDatabase, dataProcess, calKDE])
        .sendToClient(sendToClientHandler);

};

/**
 * 只会传输认同的数据;
 * @param query
 */
const queryVerify = function (query) {
    //只会传认可的白名单数据;
    return Promise.resolve(query);
};

/**
 * 根据数据来生成查询的SQL
 */
const generateSQLForMeal = function () {

    const sql = `select student_id,ae1s,ae2s,ae3s,ae4s,ae5s,ae6s from meal_times;`;
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

    const sql = `select student_id,ae1s,ae2s,ae3s,ae4s,ae5s,ae6s from shower_times;`;
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


/**
 * 计算kde
 */
const calKDE = function () {


    const kdeArray = [];

    Object.keys(dataFromDatabaseStorage).forEach(function (type) {
        dataFromDatabaseStorage[type].forEach(function (student) {
            Object.keys(student).forEach(function (eachEntropy) {
                if (eachEntropy !== 'student_id' && student[eachEntropy] > 0) {
                    kdeArray.push(student[eachEntropy])
                }
            })
        });

        returnDataStun[type]['entropyKDE'] = kde(kdeArray)
    });

    return Promise.resolve();

};


module.exports = entropyDistributionDataProcess;