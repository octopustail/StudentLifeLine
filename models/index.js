const mysql = require('mysql');
const mysqlClient = require('./mysql');
const cleanData = require('./../controllers/cleandata');
/**
 * 传入sql语句，返回数据
 * @param sql
 * @param res
 * @param rej
 */
module.exports = function (sql, res, rej) {


    const p = new Promise((resolve,reject)=>{
        mysqlClient(sql, resolve, reject);
    });

    p.then((result)=>{

        result = cleanData(result);

        res(result)
    },(error)=>{
        rej(error);
    })
};
