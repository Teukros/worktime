var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas');

var service = {};

service.schema = schemas.services;


service.add = function(data, cb) {
  var newRecord = {};

    if (!data || !data.payload || !data.payload.id) {
        return cb({
            status: 400,
            message: 'Required fields are missing'
        });
    }
    service.schema.find({
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
            service.schema.create(newRecord, function(err, results) {
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


service.getMany = function(data, cb) {
    service.schema.find({
        or: [{
            id: data.payload.id
        }, {
            departmentId: data.payload.departmentId
        }]
    }, function(err, results) {
        return cb({
            status: 200,
            message: results
        });
    });
};


// expose to app
module.exports = service;
