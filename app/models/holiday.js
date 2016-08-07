var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas');

var holiday = {};

holiday.schema = schemas.holidays;


holiday.add = function(data, cb) {
    if (!data.payload.id) {
        return cb({
            status: 400,
            message: 'Required fields are missing'
        });
    }
    holiday.schema.find({
        id: data.payload.id
    }, function(err, results) {

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
                message: 'Error: Provided id is multiplied in database'
            });
        }

        if (results.length > 0) {
            for (var elem in data.payload) {
                results[0].elem = elem;
            }
            //results[0].lastModified = new Date().toISOString();
            results[0].save(function(err) {
                console.log(err, results[0]);

                if (err) {
                    return cb({
                        status: 500,
                        message: err
                    });
                }
                return cb({
                    status: 201,
                    message: results[0]
                });
            });
            return;
        }

        var newRecord = {};
        newRecord.id = data.payload.id;
        for (var field in data.payload) {
            newRecord.field = field;
        }
        holiday.schema.create(newRecord, function(err, results) {
            if (err) {
                console.log(err);
                return cb({
                    status: 500,
                    message: err
                });
            }
            return cb({
                status: 201,
                message: newRecord
            });
        });
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
