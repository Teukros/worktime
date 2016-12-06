const db = require('orm').db,
    schemas = require('../models/schemas'),
    feiertagejs = require('feiertagejs'),
    holiday = {},
    holidayCalc = {},
    stateTranslate = [{
        "fullName": "National",
        "shortName": "BUND"
    }, {
        "fullName": "Bayern",
        "shortName": "BY"
    }, {
        "fullName": "Baden-Württemberg",
        "shortName": "BW"
    }, {
        "fullName": "Berlin",
        "shortName": "BE"
    }, {
        "fullName": "Brandenburg",
        "shortName": "BB"
    }, {
        "fullName": "Bremen",
        "shortName": "HB"
    }, {
        "fullName": "Hamburg",
        "shortName": "HH"
    }, {
        "fullName": "Hessen",
        "shortName": "HE"
    }, {
        "fullName": "Mecklenburg-Vorpommern",
        "shortName": "MV"
    }, {
        "fullName": "Nordrhein-Westfalen",
        "shortName": "NW"
    }, {
        "fullName": "Niedersachsen",
        "shortName": "NI"
    }, {
        "fullName": "Rheinland-Pfalz",
        "shortName": "RP"
    }, {
        "fullName": "Saarland",
        "shortName": "SL"
    }, {
        "fullName": "Sachsen",
        "shortName": "SN"
    }, {
        "fullName": "Sachsen-Anhalt",
        "shortName": "ST"
    }, {
        "fullName": "Schleswig-Holstein",
        "shortName": "SH"
    }, {
        "fullName": "Thüringen",
        "shortName": "TH"
    }];


holiday.schema = schemas.holidays;

holidayCalc.calc = (request, call) => {
    // curDate = new Date();
    // request.year = curDate.getFullYear();

    calculate(0, request.year, (err, cb) => {
        if (err) {
            return call({
                status: 500,
                message: err,
                customerId: request.customerid
            });
        }
        calculate(0, request.year + 1, (err, cb) => {
            if (err) {
                return call({
                    status: 500,
                    message: err,
                    customerId: request.customerid
                });
            }
            calculate(request.state, request.year, (err, cb) => {
                if (err) {
                    return call({
                        status: 500,
                        message: err,
                        customerId: request.customerid
                    });
                }
                calculate(request.state, request.year + 1, (err, cb) => {
                    if (err) {
                        return call({
                            status: 500,
                            message: err,
                            customerId: request.customerid
                        });
                    } else {
                        return call(null, {
                            status: 200,
                            message: "ready",
                            customerId: request.customerid
                        });
                    }
                });
            });
        });
    });
};

var calculate = function (state, year, cb) {
    db.driver.execQuery("SELECT * FROM holidays WHERE YEAR(date) = ? AND state = ?", [year, state], (err, result) => {
        if (err) {
            cb({
                status: 500,
                message: err,
                customerid: "???"
            });
        }
        if (results.length === 0) {
            arrayOfShortNames = [];
            for (var index in stateTranslate) {
                shortState = stateTranslate[index].shortName;
                arrayOfShortNames.push(shortState);
            }
            var holidaysList = feiertagejs.getHolidays(year, shortState);
            for (var i = 0; i < holidaysList.length; i++) {
                var dayToSave = {};
                dayToSave.name = holidaysList[i].name;
                dayToSave.date = holidaysList[i].date.toMysqlFormat();
                dayToSave.dateDeactivated = "9999-12-31 00:00:00";
                dayToSave.state = state;
                dayToSave.id = Date.now().toString() + i.toString();
                dayToSave.lastModified = new Date().toMysqlFormat();

                holiday.schema.create(dayToSave, function (err, dayToSave) {
                    if (err) {
                        return cb({
                            status: 500,
                            message: err,
                            customerid: "???"
                        });
                    }
                    return;
                });
            }
            return cb(null, {
                status: 200,
                message: "Holidays updated",
                customerid: "???"
            });
        }
        if (results.length > 0) {
            return cb(null, {
                status: 200,
                message: "Holidays already in db",
                customerid: "???"
            });
        }
    });
};


module.exports = holidayCalc;
