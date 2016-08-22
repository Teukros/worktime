var orm = require('orm'),
    db = require('orm').db,
    schemas = require('./schemas'),
    holidayCalc = require('../helpers/holidayCalc');

var holiday = {};

holiday.schema = schemas.holidays;


holiday.add = function(data, cb) {
    var newRecord = {};

    var reqDate = data.payload.date,
        reqCustomerId = data.payload.customerId,
        reqState = data.payload.state,
        reqYear = reqDate.substring(0, 4);

    if (!data.payload.id || !data.payload.date || !data.payload.customerId || !data.payload.state) {
        return cb({
            status: 400,
            message: 'Required fields are missing (id, date, customerId or state)'
        });
    }

    holidayCalc.calc(reqCustomerId, reqYear, reqState, function(err, call) {
      console.log(call);
      console.log("call");
      console.log(err);
        if (cb.status === 500) {
            return cb({
                status: 500,
                message: err
            });
        }
        if (cb.status === 200) {
            holiday.schema.find({
                id: data.payload.id
            }, function(err, results) {
                if (err) {
                    return call({
                        status: 500,
                        message: err
                    });
                }
                //check status
                if (results.length > 1) {
                    return call({
                        status: 409,
                        message: 'Error: Provided id is multiplied in database'
                    });
                }

                if (results.length === 1) {
                    for (var elem in data.payload) {
                        newRecord[elem] = data.payload[elem];
                    }
                    results[0].lastModified = new Date().toMysqlFormat();
                    results[0].save(function(err) {
                        if (err) {
                            return call({
                                status: 500,
                                message: err
                            });
                        }
                        return call({
                            status: 200,
                            message: results[0]
                        });
                    });
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
                            return call({
                                status: 500,
                                message: err
                            });
                        }
                        return call({
                            status: 201,
                            message: results
                        });
                    });
                }
            });
        }
    });
    return cb({
        status: 200,
        message: 'Holidays updated'
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
