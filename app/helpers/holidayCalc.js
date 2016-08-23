var orm = require('orm'),
    db = require('orm').db,
    schemas = require('../models/schemas'),
    feiertagejs = require('feiertagejs');

var stateTranslate = {
    0: {
        "fullName": "National",
        "shortName": "BUND"
    },
    1: {
        "fullName": "Bayern",
        "shortName": "BY"
    },
    2: {
        "fullName": "Baden-Württemberg",
        "shortName": "BW"
    },
    3: {
        "fullName": "Berlin",
        "shortName": "BE"
    },
    4: {
        "fullName": "Brandenburg",
        "shortName": "BB"
    },
    5: {
        "fullName": "Bremen",
        "shortName": "HB"
    },
    6: {
        "fullName": "Hamburg",
        "shortName": "HH"
    },
    7: {
        "fullName": "Hessen",
        "shortName": "HE"
    },
    8: {
        "fullName": "Mecklenburg-Vorpommern",
        "shortName": "MV"
    },
    9: {
        "fullName": "Nordrhein-Westfalen",
        "shortName": "NW"
    },
    10: {
        "fullName": "Niedersachsen",
        "shortName": "NI"
    },
    11: {
        "fullName": "Rheinland-Pfalz",
        "shortName": "RP"
    },
    12: {
        "fullName": "Saarland",
        "shortName": "SL"
    },
    13: {
        "fullName": "Sachsen",
        "shortName": "SN"
    },
    14: {
        "fullName": "Sachsen-Anhalt",
        "shortName": "ST"
    },
    15: {
        "fullName": "Schleswig-Holstein",
        "shortName": "SH"
    },
    16: {
        "fullName": "Thüringen",
        "shortName": "TH"
    }
};

var holiday = {};
holiday.schema = schemas.holidays;

var holidayCalc = {};

holidayCalc.calc = function(reqCustomerId, reqYear, reqState, cb) {
    console.log(reqState);

    var translatedState = stateTranslate[reqState].shortName;
    console.log(typeof(stateTranslate[reqState]));
    console.log(typeof(stateTranslate[reqState].shortName));
    console.log("are we here");
    db.driver.execQuery("SELECT * FROM holidays WHERE YEAR(date) = ?", [reqYear], function(err, results) {
        //  console.log(translatedState);

        if (results.length === 0) {
            var holidaysReqYear = feiertagejs.getHolidays(reqYear, translatedState);
            for (var i = 0; i < holidaysReqYear.length; i++) {
                var dayToSave = {};

                dayToSave.name = holidaysReqYear[i].name;
                dayToSave.date = holidaysReqYear[i].date.toMysqlFormat();
                dayToSave.customerid = reqCustomerId;
                dayToSave.state = reqState;
                dayToSave.lastModified = new Date().toMysqlFormat();

                holiday.schema.create(dayToSave, function(err, dayToSave) {
                    if (err) {
                        return cb(null, {
                            status: 500,
                            message: err
                        });
                    }
                });
            }
            return cb(null, {
                status: 200,
                message: "Holidays updated"
            });
        }
        if (results.length > 0) {
            return cb(null, {
                status: 200,
                message: "Holidays already in db"
            });
        }
    });
};


module.exports = holidayCalc;
