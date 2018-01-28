/**
 * Route分流
 * @param app
 */
module.exports = function (app) {

    app.get('/calendar',require('./calendar.js'));

    app.get('/data',require('./data.js'));

    app.get('/calendarday',require('./calendarDay.js'));

    app.get('/parallelgap',require('./parallelgap.js'));

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

};