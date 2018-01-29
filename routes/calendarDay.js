const config = require('./../configs/default');

const DataProcesClain = require('../controllers/DataProcessChain.js');
const queryInDatabase = require('./../controllers/queryInDatabase');

const kde = require('./../controllers/kernelDensityEstimation');

let minuteMapDictForTempStore = require('./../models/minuteMapDict');

const calendarDataProcess = function (req, res, next) {
    const queryProcessClain = new DataProcesClain(req.query);

    const sendToClientHandler = function (data) {
        res.send(data);
        res.end();
        return Promise.resolve();
    };

    //kdeDataProcess
    queryProcessClain.addChain([queryVerify, generateSQL, queryInDatabase, dataProcess,calKDE,kdeDataProcess])
        .sendToClient(sendToClientHandler);

};

/**
 * 只会传输认同的数据;
 * @param query
 */
const queryVerify = function (query) {
    //只会传认可的白名单数据;
    return Promise.resolve({
        dates: query.dates
    });
};

/**
 * 根据数据来生成查询的SQL
 */
const generateSQL = function (query) {
    const dateWhereClause = '("' + query.dates.split(',').join('","') + '")';
    //select student_id,date,time,type,cost from Student_Consumption where date in ("2010-02-01","2010-03-04");
    const sql = `select student_id,date,time,type,cost from Student_Consumption where date in ${dateWhereClause};`;
    return Promise.resolve(sql);
};


/**
 * 需要把数据处理成需要的样子;
 * @param data
 * @returns {Promise.<T>}
 */
const dataProcess = function (data) {
    const dataStructureStun = prepareDataStructure();
    const resultDataStructure = processDataFromDatabase(data, dataStructureStun);

    const countData = dispatchCountData(resultDataStructure);
    const countDataWithoutZeroForKDE = processCountDataWithoutZeroForKDE(countData);
    storeMinuteMapDictToGlobal(resultDataStructure);

    return Promise.resolve(countDataWithoutZeroForKDE);
};

/**
 * 准备数据需要的数据结构; 这里是用来存储每个时段的数据的数据结构;
 * 使用这个数据结构,我可以获得每一分钟对应的数据是哪些.用来对应在entropy的选择之后对应的数据;
 * @returns {*} 结构化的数据
 */
const prepareDataStructure = function () {
    const minuteOriginalData = {};
    const minuteKey = config.minuteKey;

    //生成空的数据结构
    minuteKey.forEach((minute) => {
        minuteOriginalData[minute] = [];
    });

    //使用object.assign是为了深复制;
    return {
        library: {
            countArray: [], //存放每分钟的次数数据
            minuteMapDict: Object.assign({}, JSON.parse(JSON.stringify(minuteOriginalData))) //这里存放在每分钟对应的原始数据;需要深复制
        },
        hotwater: {
            countArray: [], //存放每分钟的次数数据
            minuteMapDict: Object.assign({}, JSON.parse(JSON.stringify(minuteOriginalData))) //这里存放在每分钟对应的原始数据;
        },
        food: {
            countArray: [], //存放每分钟的次数数据
            minuteMapDict: Object.assign({}, JSON.parse(JSON.stringify(minuteOriginalData))) //这里存放在每分钟对应的原始数据;
        },
        shower: {
            countArray: [], //存放每分钟的次数数据
            minuteMapDict: Object.assign({}, JSON.parse(JSON.stringify(minuteOriginalData))) //这里存放在每分钟对应的原始数据;
        }
    };
};


/**
 * 把数据库的数据分类计数计算到stun这个数据结构体
 * @param data 从数据库得到的数据
 * @param stun 数据体;
 */
const processDataFromDatabase = function (data, stun) {
    let studentId, date, time, type, cost;

    data.forEach(function (value) {
        //数据大概这个样子
        // {
        //     "student_id": "2010011010030",
        //     "date": "2010-03-04",
        //     "time": "13:13:31",
        //     "type": "library",
        //     "cost": 0
        // }
        type = value.type;
        time = value.time.split(':').slice(0, 2).join('');
        stun[type]['minuteMapDict'][time].push(value);
    });

    Object.keys(stun).forEach(function (type) {
        stun[type]['countArray'] = config.minuteKey.map(function (key) {
            return stun[type]['minuteMapDict'][key].length;
        });
    });

    return stun;
};

/**
 * 把其中的count数据分离出来,并用来计算kde;
 */
const dispatchCountData = function (resultDataStructure) {

    const countData = {};
    Object.keys(resultDataStructure).forEach((type) => {
        countData[type] = resultDataStructure[type]['countArray'];
    });

    return countData
};

/**
 * 其实计算出来的数据中的minuteMapDict不需要返回给用户;这个是后续用来根据数据查询再来作用的;
 * 所以这个数据需要传到global去,下次再使用;
 */
const storeMinuteMapDictToGlobal = function (resultDataStructure) {
    minuteMapDictForTempStore = resultDataStructure;
};

/**
 * 用来计算kde的数据需要把0排除掉;所以这个函数做这个事情;
 */
const processCountDataWithoutZeroForKDE = function(countData){

    const countDataWithoutZeroForKDE ={
        library: [],
        hotwater: [],
        shower: [],
        food: []
    };

    //需要把数据中的0去掉;
    Object.keys(countData).map(function (type) {
        countDataWithoutZeroForKDE[type] = countData[type].filter((value)=>{
            return value !== 0 ;
        });
    });

    return countDataWithoutZeroForKDE
};


/**
 * 根据数据来计算kde
 * @param countData 计算每分钟的次数;
 */
const calKDE = function (countData) {
    const result = {
        library: null,
        hotwater: null,
        shower: null,
        food: null
    };

    Object.keys(countData).forEach(function (type) {
        result[type] = kde(countData[type]);
    });

    return Promise.resolve(result)
};

/**
 * Kde array 提取数据;
 * @param kdeArray
 * @example {
 *      library:[[],[],[],[],[]...],
 *      hotwater:[[],[],[],[],[]...],
 *      shower:[[],[],[],[],[]...],
 *      food: [[],[],[],[],[]...]
 * }
 * @return Object {
 *      library:[1,2,3,4,5,6...],
 *      hotwater:[1,2,3,4,5,6...],
 *      shower:[1,2,3,4,5,6...],
 *      food: [1,2,3,4,5,6...]
 * }
 */
const kdeDataProcess = function (kdeArray) {

    //除了0之外的统计用来计算kde
    const resultObject = {
        library: {
            countArray:null,
            kdeObject:null
        },
        hotwater: {
            countArray:null,
            kdeObject:null
        },
        shower: {
            countArray:null,
            kdeObject:null
        },
        food: {
            countArray:null,
            kdeObject:null
        }
    };
    Object.keys(resultObject).forEach(function (type) {
        resultObject[type]['countArray'] =  minuteMapDictForTempStore[type]['countArray'];
        resultObject[type]['kdeObject']  = kdeArray[type];
    });

    return Promise.resolve(resultObject);

};

module.exports = calendarDataProcess;