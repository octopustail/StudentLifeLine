const config = require('./../configs/default');

const moment = require('moment');

const DataProcesClain = require('../controllers/DataProcessChain.js');
const dailyCount = require('./../models/dailyCount.json');
const queryInDatabase = require('./../controllers/queryInDatabase');


const calendarDataProcess = function (req, res, next) {
    const queryProcessClain = new DataProcesClain(req.query);


    const sendToClientHandler = function (data) {
        res.send(data);
        res.end();
        return Promise.resolve();
    };

    queryProcessClain.addChain([queryByTerm, dataProcess, queryInDatabaseOptional])
        .sendToClient(sendToClientHandler);

};

/**
 * 根据 query 传入的 year & term &StudentId来去定是多少时间范围内的数据
 * @param query
 */
const queryByTerm = function (query) {

    const key = (query.year || config.calendar.defaultYear) + '-' + (query.term || config.calendar.defaultTerm);
    const dateSection = config.dateSection[key];

    const param = {
        start: dateSection.start,
        end: dateSection.end
    };

    if (query.studentid != null) {
        param['studentid'] = query.studentid.split(',');
    }

    return Promise.resolve(param)
};



/**
 * 根据选择的时间区间来返回数据
 * @param dateRange
 * @returns {Promise.<{fullKeys: Array, countObject: {food: Array, shower: Array, library: Array, hotwater: Array}}>}
 */
const dataProcess = function (dateRange) {
    //计算其中差距多少天
    const dateRangeCount = moment(dateRange.end).diff(moment(dateRange.start)) / 86400000;

    const fullKeys = [];
    let dayCount;

    //存放这个学期的次数数据
    const foodArray = [], showerArray = [], libraryArray = [], hotWaterArray = [];
    const countObject = {
        food: foodArray,
        shower: showerArray,
        library: libraryArray,
        hotwater: hotWaterArray
    };


    //开始第一天的时间
    let day = moment(dateRange.start);

    //遍历中间的天数，然后取得天数返回
    for (let i = 0; i < dateRangeCount; i++) {
        day = day.format('YYYY-MM-DD');

        fullKeys.push(day);

        //如果是没有传学生列表过来的话
        if (!dateRange.studentid) {
            dayCount = dailyCount[day];
            if (dayCount != null) {
                ['food', 'shower', 'library', 'hotwater'].forEach(function (keyword) {
                    if (dayCount[keyword] != null) {
                        countObject[keyword].push(dayCount[keyword]);
                    } else {
                        countObject[keyword].push(0);
                    }
                });
            } else {
                Object.keys(countObject).forEach((place) => {
                    countObject[place].push(0);
                })
            }
        }

        day = moment(day);
        day = day.add(1, 'days').format('YYYY-MM-DD');
        day = moment(day);

    }
    let result;


    //如果是有传学生列表过来的话
    if (dateRange.studentid) {

        const studentIdWhereClause = '("' + dateRange.studentid.join('","') + '")';
        const dateWhereClause = '("' + fullKeys.join('","') + '")';

        let sql = `select date,type,count(*) from Student_Consumption where date in ${dateWhereClause} and (student_id in ${studentIdWhereClause}) group by date,type;`
        result = {
            fullKeys,
            sql
        }

    } else {
        result = {
            fullKeys,
            countObject
        }
    }
    return Promise.resolve(result)
};


const queryInDatabaseOptional = function (result) {
    if (!result.sql) {
        return Promise.resolve(result)
    }



    return queryInDatabase(result.sql).then(function (data) {
        console.log(data);

        return Promise.resolve({
            fullKeys: result.fullKeys,
            countObject: dateProcessForStudentId({
                data,
                fullKeys:result.fullKeys
            })
        })
    })

};

/**
 *
 */
const dateProcessForStudentId = function (result) {
    const fullKeys = result.fullKeys;
    const resultObj = {};

    result.data.forEach(function (line) {
        if (!resultObj[line['date']]) {
            resultObj[line['date']] = {}
        }
        resultObj[line['date']][line['type']] = line['count(*)'] || 0;
    });


    //存放这个学期的次数数据
    const foodArray = [], showerArray = [], libraryArray = [], hotWaterArray = [];

    const countObject = {
        food: foodArray,
        shower: showerArray,
        library: libraryArray,
        hotwater: hotWaterArray
    };

    fullKeys.forEach(function(date){
        ['food', 'shower', 'library', 'hotwater'].forEach(function (keyword) {
            if (resultObj[date] != null && resultObj[date][keyword] != null) {
                countObject[keyword].push(resultObj[date][keyword]);
            } else {
                countObject[keyword].push(0);
            }

        });
    })

    return countObject;



};


module.exports = calendarDataProcess;
