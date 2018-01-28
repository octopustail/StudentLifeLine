/**
 * 提出来公用的函数,用来把数据传回前台;
 */
const sendToClientHandler = function (data) {
    res.send(data);
    res.end();
    return Promise.resolve();
};

module.export = sendToClientHandler;