const moment = require('moment');

const DataProcesClain = require('../controllers/DataProcessChain.js');
const dailyCount = require('./../models/dailyCount.json');


const calendarDataProcess = function (req, res, next) {
    const queryProcessClain = new DataProcesClain(req.query);

    const sendToClientHandler = function (data) {
        res.send(data);
        res.end();
        return Promise.resolve();
    };

    queryProcessClain.addChain([dataProcess])
        .sendToClient(sendToClientHandler);

};


const dataProcess = function (query) {
    const keys = Object.keys(dailyCount).sort();
    const fullKyes = [];
    let dayCount;
    const foodArray = [], showerArray = [], libraryArray = [], hotWaterArray = [];

    const countObject = {
        food: foodArray,
        shower: showerArray,
        library: libraryArray,
        hotwater: hotWaterArray
    };

    let day = moment(keys[0]);

    for (let i = 0; i < 3000; i++) {
        day = day.add(1, 'days').format('YYYY-MM-DD');

        fullKyes.push(day);

        dayCount = dailyCount[day];
        if (dayCount != null) {
            ['food', 'shower', 'library', 'hotwater'].forEach(function (keyword) {
                if (dayCount[keyword] != null) {
                    countObject[keyword].push(dayCount[keyword]);
                } else {
                    countObject[keyword].push(0);
                }
            });
        } else {
            Object.keys(countObject).forEach((place) => {
                countObject[place].push(0);
            })

        }

        day = moment(day);
    }

    return Promise.resolve({
        fullKyes,
        countObject
    })

};


module.exports = calendarDataProcess;
