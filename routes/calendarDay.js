const config = require('./../configs/default');

const DataProcesClain = require('../controllers/DataProcessChain.js');
const queryInDatabase = require('./../controllers/queryInDatabase');

const calendarDataProcess = function (req, res, next) {
    const queryProcessClain = new DataProcesClain(req.query);

    const sendToClientHandler = function (data) {
        res.send(data);
        res.end();
        return Promise.resolve();
    };

    queryProcessClain.addChain([queryVerify,generateSQL, queryInDatabase, dataProcess])
        .sendToClient(sendToClientHandler);

};

/**
 * 只会传输认同的数据;
 * @param query
 */
const queryVerify = function (query) {
    //只会传认可的白名单数据;
    return Promise.resolve({
        dates:query.dates
    });
};

/**
 * 根据数据来生成查询的SQL
 */
const generateSQL = function(query){
    const dateWhereClause = '("'+query.dates.split(',').join('","')+ '")';
    //select student_id,date,time,type,cost from Student_Consumption where date in ("2010-02-01","2010-03-04");
    const sql = `select student_id,date,time,type,cost from Student_Consumption where date in ${dateWhereClause};`;
    return Promise.resolve(sql);
};


const dataProcess = function(data){
    return Promise.resolve(data);
};



module.exports = calendarDataProcess;