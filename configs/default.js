/**
 * 默认参数
 * @type {{}}
 */
const config = {
    /**
     * 数据库查询的默认登录配置
     */
    mysql: {
        host: 'localhost',
        user: 'root',
        // password: 'vis',
        password:'visvisvis',//我的笔记本中的数据库密码是这个
        database: 'StudentsCardData'
    },
    env: "dev",//当前环境
    /**
     * 分页的默认
     */
    page: { //默认分页
        currPage: 1,
        pageSize: 10
    },
    /**
     * 默认的 Sql 语句生成的数据查询配置项
     */
    sql: {
        defaultDatabase: 'StudentsCardData',
        defaultTable: 'meal_times',
        defaultColumn: ['student_id', 'meal_ae_1s']
    },
    /**
     * key 是年 + 1/2 其中1，2分别指的是3月开学到7月份的时间区间；2指的是8月到明年的2月左右时间区间
     * @type {{20092: {start: string, end: string}, 20101}}
     */
    dateSection: {
        '2009-1': {
            start: '2009-09-01',
            end: '2010-01-31'
        },
        '2009-2': {
            start: '2010-02-01',
            end: '2010-08-31'
        },
        '2010-1': {
            start: '2010-09-01',
            end: '2011-01-31'
        },
        '2010-2': {
            start: '2011-02-01',
            end: '2011-08-31'
        },
        '2011-1': {
            start: '2011-09-01',
            end: '2012-01-31'
        },
        '2011-2': {
            start: '2012-02-01',
            end: '2012-08-31'
        },
        '2012-1': {
            start:'2012-09-01',
            end:'2013-01-31'
        },
        '2012-2': {
            start:'2013-02-01',
            end:'2013-08-31'
        },
        '2013-1': {
            start:'2013-09-01',
            end:'2014-01-31'
        },
        '2013-2': {
            start:'2014-02-01',
            end:'2014-08-31'
        },
        '2014-1': {
            start:'2014-09-01',
            end:'2015-01-31'
        },
        '2014-2': {
            start:'2015-02-01',
            end:'2015-08-31'
        }
    },
    calendar:{
        defaultYear:'2009',
        defaultTerm:'2'
    }
};

module.exports = config;