var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas');

var schedule = {};

schedule.schema = schemas.schedules;


schedule.add = function(data, cb) {
  var newRecord = {};

    if (!data || !data.payload || !data.payload.id) {
        return cb({
            status: 400,
            message: 'Required fields are missing'
        });
    }
    console.log(schedule.schema);
    schedule.schema.find({
        id: data.payload.id
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
                message: 'Error: Provided id is multiplied in database'
            });
        }

        if (results.length === 1) {
            for (var elem in data.payload) {
                newRecord[elem] = data.payload[elem];
            }

            results[0].lastModified = new Date().toMysqlFormat();
            results[0].save(function(err, cb) {
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
        } if (results.length === 0) {


            newRecord.lastModified = new Date().toMysqlFormat();
            newRecord.id = data.payload.id;
            for (var field in data.payload) {
                newRecord[field] = data.payload[field];
            }
            schedule.schema.create(newRecord, function(err, results) {
                if (err) {
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
        }
    });
};


schedule.getMany = function(data, cb) {
    schedule.schema.find({
        or: [{
            id: data.payload.id
        }]
    }, function(err, results) {
        return cb({
            status: 200,
            message: results
        });
    });
};


// expose to app
module.exports = schedule;
