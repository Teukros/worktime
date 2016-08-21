var orm = require('orm'),
    db = require('orm').db,
    schemas = require('./schemas'),
    holidayCalc = require('../helpers/holidayCalc');

var holiday = {};

holiday.schema = schemas.holidays;


holiday.add = function(data, cb) {
    var newRecord = {};

    var reqDate = data.payload.date,

        //state int > name translating
        reqState = 'BE';
    //  reqState = data.payload.state;
    var reqYear = reqDate.substring(0, 4);

    if (!data.payload.id || !data.payload.date || !data.payload.customerId) {
        return cb({
            status: 400,
            message: 'Required fields are missing'
        });
    }

    db.driver.execQuery("SELECT * FROM holidays WHERE YEAR(date) = ?", [reqDate], function(err, results) {
        console.log(results);
        if (results.length === 0) {
            holidayCalc.calc(data.payload.customerId, reqYear, reqState, function(err, cb) {
                if (cb.status === 500) {
                    return cb({
                        status: 500,
                        message: cb.message
                    });
                }
                if (cb.status === 200) {
                    holiday.schema.find({
                        or: [{
                            id: data.payload.id
                        }, {
                            date: data.payload.date
                        }]
                    }, function(err, results) {
                        console.log(err);
                        if (err) {
                            return cb({
                                status: 500,
                                message: err
                            });
                        }
                        //check status
                        if (results.length > 1) {
                            return cb({
                                status: 409,
                                message: 'Error: Provided id or date is multiplied in database'
                            });
                        }

                        if (results.length === 1) {
                            for (var elem in data.payload) {
                                newRecord[elem] = data.payload[elem];
                            }
                            results[0].lastModified = new Date().toMysqlFormat();
                            results[0].save(function(err) {
                                console.log(err);

                                if (err) {
                                    return cb({
                                        status: 500,
                                        message: err
                                    });
                                }
                                return cb({
                                    status: 200,
                                    message: results[0]
                                });
                            });
                            console.log(cb);

                            return;
                        }
                        if (results.length === 0) {

                            newRecord.lastModified = new Date().toMysqlFormat();
                            //newRecord.id = data.payload.id;
                            for (var field in data.payload) {
                                newRecord[field] = data.payload[field];
                            }
                            holiday.schema.create(newRecord, function(err, results) {
                                if (err) {
                                    console.log(err);
                                    console.log(newRecord);

                                    return cb({
                                        status: 500,
                                        message: err
                                    });
                                }
                                return cb({
                                    status: 201,
                                    message: results
                                });
                            });
                            console.log(cb);
                        }
                    });
                }

            });
        }
    });
    return cb({
        status: 200,
        message: 'finished'
    });
};


holiday.getMany = function(data, cb) {
    holiday.schema.find({
        id: data.payload.id
    }, function(err, results) {
        return cb({
            status: 200,
            message: results
        });
    });
};


// expose to app
module.exports = holiday;
