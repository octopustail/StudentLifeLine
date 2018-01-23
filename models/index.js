const mysqlClient = require('./mysql');
/**
 * 传入sql语句，返回数据
 * @param sql
 * @param res
 * @param rej
 */
module.exports = function (sql, res, rej) {

    const p = new Promise((resolve, reject) => {
        mysqlClient(sql, resolve, reject);
    });

    p.then((result) => {
        res(result);
    }, (error) => {
        rej(error);
    })
};
