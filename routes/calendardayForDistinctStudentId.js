
const DataProcesClain = require('../controllers/DataProcessChain.js');
const queryInDatabase = require('./../controllers/queryInDatabase');

const calendarDataProcess = function (req, res, next) {
    const queryProcessClain = new DataProcesClain(req.query);

    const sendToClientHandler = function (data) {
        res.send(data);
        res.end();
        return Promise.resolve();
    };

    //kdeDataProcess
    queryProcessClain.addChain([queryVerify, generateSQL, queryInDatabase, dataProcess])
        .sendToClient(sendToClientHandler);

};

/**
 * 只会传输认同的数据;
 * @param query
 */
const queryVerify = function (query) {
    //只会传认可的白名单数据;
    return Promise.resolve({
        dates: query.dates,
        time:query.time,
        location:query.location
    });
};

/**
 * 根据数据来生成查询的SQL
 */
const generateSQL = function (query) {
    const dateWhereClause = '("' + query.dates.split(',').join('","') + '")';
    let sql = `select distinct student_id from Student_Consumption where (date in ${dateWhereClause})`;

    if(query.location != null){
        sql += ` and (type ="${query.location}")`;
    }
    if(query.time != null){
        const timeArray = query.time.split(',');
        let time,timeEnd;
        if(timeArray.length === 1){
            time = timeArray[0].split('-');
            sql += ` and (time between "${time[0]}" and "${time[1]}")`
        }else{

            time = timeArray[0].split('-');
            timeEnd = timeArray[1].split('-');
            sql += ` and (time between "${time[0]}" and "${time[1]}" or time between "${timeEnd[0]}" and "${timeEnd[1]}")`
        }
    }
    sql += `;`;
    return Promise.resolve(sql);
};


/**
 * 需要把数据处理成需要的样子;
 * @param data
 * @returns {Promise.<T>}
 */
const dataProcess = function (data) {
    const result = extractStudentId(data);

    return Promise.resolve(result);
};

// 把数据转化成为array
const extractStudentId = function(data){

    return data.map(function(studentInfo){
        return studentInfo.student_id;
    })

};


module.exports = calendarDataProcess;