const DataProcesClain = require('../controllers/DataProcessChain.js');
const queryInDatabase = require('./../controllers/queryInDatabase');
const fs = require('fs');
const path = require('path');

const calendarDataProcess = function (req, res, next) {
    const queryProcessClain = new DataProcesClain(req);

    const sendToClientHandler = function (data) {
        return Promise.resolve();
    };

    //kdeDataProcess
    queryProcessClain.addChain([generateSQL, queryInDatabase, dataProcess])
        .sendToClient(sendToClientHandler);

};

// const mockData = {Meal: ['1.43', '1.96'], Shower: ['1.22', '1.79']};



const generateSQL = function () {
    const sql = "select student_id,ae1s,ae2s,ae3s,ae4s,ae5s,ae6s from shower_times";
    return Promise.resolve(sql);
};

const dataProcess = function(data){
    let aeValue;
    let aeObject ={};
    data.forEach(function(studentInfo,index){
        ['ae1s','ae2s','ae3s','ae4s','ae5s','ae6s'].forEach(function(key){
            aeValue = parseFloat(studentInfo[key]).toFixed(2);
            if(aeObject[aeValue] == null){
                aeObject[aeValue] = [];
            }
            aeObject[aeValue].push(studentInfo['student_id'])
        });
        if(index === 1000){
            console.log('studentInfo',studentInfo)
        }
    });
    Object.keys(aeObject).forEach(function (aeKey) {
        aeObject[aeKey] = Array.from(new Set(aeObject[aeKey])).toString();
    });


    fs.writeFile('./showerEntropyDistributionStudentId.json', JSON.stringify(aeObject),{flag:'a'},function(){
        console.log('done');

    });


};

calendarDataProcess();
