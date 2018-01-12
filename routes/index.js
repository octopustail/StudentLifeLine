/**
 * Route分流
 * @param app
 */
module.exports = function (app) {
    app.get('/data',require('./data.js'));
    // app.use('/common', require('./common'));
    // app.use('/user', require('./user'));

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

};