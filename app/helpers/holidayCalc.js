var orm = require('orm'),
    db = require('orm').db,
    schemas = require('../models/schemas'),
    feiertagejs = require('feiertagejs');


var holiday = {};
holiday.schema = schemas.holidays;

var holidayCalc = {};

holidayCalc.calc = function(customerId, year, state, cb) {
  console.log(cb);

    console.log("are we here");
    var holidaysReqYear = feiertagejs.getHolidays(year, state);
    for (var i = 0; i < holidaysReqYear.length; i++) {
      var dayToSave = {};

        dayToSave.name = holidaysReqYear[i].name;
        dayToSave.date = holidaysReqYear[i].date.toMysqlFormat();
        dayToSave.customerId = customerId;
        dayToSave.state = "1";
        dayToSave.lastModified = new Date().toMysqlFormat();

        holiday.schema.create(dayToSave, function(err, dayToSave) {
            if (err) {
                return cb({
                  status: 500,
                    message: err
                });
            }
        });
    }
    console.log(cb);
    return cb({
      status: 200,
        message: dayToSave
    });
};

module.exports = holidayCalc;
