const DataProcesClain = require('../controllers/DataProcessChain.js');
const queryInDatabase = require('./../controllers/queryInDatabase');
const mealEntropyDistributionStudentId = require('../models/mealEntropyDistributionStudentId.json');
const showerEntropyDistributionStudentId = require('../models/showerEntropyDistributionStudentId.json');


let result;
const entropyDistributionDataProcess = function (req, res, next) {
    const queryProcessClain = new DataProcesClain(req.query);

    const sendToClientHandler = function () {
        res.send(result);
        res.end();
        return Promise.resolve();
    };

    // , queryInDatabase,dataProcess
    queryProcessClain.addChain([queryVerify, getStudentIdList])
        .sendToClient(sendToClientHandler);

};

/**
 * 只会传输认同的数据;
 * @param query
 */
const queryVerify = function (query) {
    //只会传认可的白名单数据;
    // const query.brushed = {Meal: ['1.43', '1.96'], Shower: ['1.22', '1.79']};
    console.log(query.brushed);
    return Promise.resolve(JSON.parse(query.brushed));
};


const getStudentIdList = function(data){
    let studentList = [];
    let start,end;
    if(Array.isArray(data['Meal'])){
        start = parseFloat(data['Meal'][0]);
        end = parseFloat(data['Meal'][1]);
        studentList = studentList.concat(getStudentList(mealEntropyDistributionStudentId,start,end))
    }
    if(Array.isArray(data['Shower'])){
        start = parseFloat(data['Shower'][0]);
        end = parseFloat(data['Shower'][1]);
        studentList = studentList.concat(getStudentList(showerEntropyDistributionStudentId,start,end))
    }
    result = studentList;
    return  Promise.resolve(studentList);
};
/**
 * 根据给定的dataset，选取start到end之间的数值的list
 * @param dataset
 * @param start
 * @param end
 * @returns {Array}
 */
const getStudentList = function(dataset,start,end){
    let studentList = [];
    let data;

    for(let i = start * 100; i<end *100 ; i++){
        data = dataset[i/100];
        if(data!= null){
            if(i === 69 && data.split(',').length === 1911){
                continue;
            }
            studentList = studentList.concat(data.split(','));
        }else{
            studentList = studentList.concat([]);
        }
    }
    return Array.from(new Set(studentList))
};


module.exports = entropyDistributionDataProcess;