/**
 * Route分流
 * @param app
 */
module.exports = function (app) {

    // 这里是来获得calendar view数据
    app.get('/calendar',require('./calendar.js'));

    // 计算所有学生的kde
    app.get('/entropydistribution',require('./entropyDistribution'));

    app.get('/entropybystudents',require('./entropyByStudents'));

    // 通用数据接口
    app.get('/data',require('./data.js'));

    // 点击calendar中的某一天获得次数
    app.get('/calendarday',require('./calendarDay.js'));

    // 根据选择的数据情况来选择distinct的学生id;
    app.get('/calendardayfordistinctstudentid',require('./calendardayForDistinctStudentId.js'));

    // 获得学生的成绩数据;
    app.get('/parallelgap',require('./parallelgap.js'));

    app.get('/entropyDistributionBrush',require('./entropyDistributionBrush'));

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

};