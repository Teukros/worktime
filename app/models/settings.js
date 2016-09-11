var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas');

var settings = {},
    query = {};

settings.schema = schemas.settings;


settings.add = function(data, cb) {
    var newRecord = {},
        updatedRecord = {},
        query = {};

    if (!data.key || !data.value) {
        return cb({
            status: 400,
            message: 'Required fields are missing (key, customerid, value)',
            customerid: query.customerid
        });
    }
    query.customerId = data.customerid;
    query.settingsKey = data.key;

    settings.schema.find(query, function(err, results) {
        if (err) {
            console.log(err)
            return cb({
                status: 500,
                message: err,
                customerid: query.customerId
            });
        }
        //check status
        if (results.length > 1) {
            return cb({
                status: 409,
                message: 'Error: Provided setting is multiplied in database',
                customerid: query.customerId
            });
        }
        //UPDATE
        if (results.length === 1) {
            updatedRecord = results[0];
            updatedRecord.settingsValue = data.value;
            updatedRecord.save(function(err) {
                if (err) {
                    console.log(err);
                    return cb({
                        status: 500,
                        message: err,
                        customerid: query.customerId
                    });
                }
                return cb({
                    status: 200,
                    message: data,
                    customerid: query.customerId
                });
            });
        }

        //CREATE
        if (results.length === 0) {
            newRecord = {};
            newRecord.settingsValue = data.value;
            newRecord.settingsKey = data.key;
            newRecord.customerId = data.customerid;

            settings.schema.create(newRecord, function(err, results) {
                if (err) {
                    console.log(err);
                    return cb({
                        status: 500,
                        message: err,
                        customerid: query.customerId
                    });
                }
                return cb({
                    status: 201,
                    message: data,
                    customerid: query.customerId
                });
            });
        }
    });
};

settings.getMany = function(data, cb) {
    query.customerId = data.customerid;
    query.settingsKey = data.key;

    settings.schema.find(query, function(err, results) {
        if (err) {
            console.log(err);
            return cb({
                status: 500,
                message: err,
                customerid: query.customerId
            });
        }
        var answer = {
            customerid: results[0].customerId,
            key: results[0].settingsKey,
            value: results[0].settingsValue
        }
        return cb({
            status: 200,
            payload: answer,
            customerid: query.customerId
        });
    });
};


// expose to app
module.exports = settings;
