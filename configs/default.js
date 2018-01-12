/**
 * 默认参数
 * @type {{}}
 */
const config = {
    mysql: {
        host: 'localhost',
        user: 'root',
        password: 'vis',
        database: 'StudentsCardData'
    },
    env: "dev",//当前环境
    page: { //默认分页
        currPage: 1,
        pageSize: 10,
    },
    sql:{
        defaultDatabase:'StudentsCardData',
        defaultTable: 'meal_times',
        defaultColumn: ['student_id', 'meal_ae_1s']
    }
};

module.exports = config;