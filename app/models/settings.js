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
    query.customerid = data.customerid;
    query.settingskey = data.key;

    settings.schema.find(query, function(err, results) {
        if (err) {
            console.log(err)
            return cb({
                status: 500,
                message: err,
                customerid: query.customerid
            });
        }
        //check status
        if (results.length > 1) {
            return cb({
                status: 409,
                message: 'Error: Provided setting is multiplied in database',
                customerid: query.customerid
            });
        }
        //UPDATE
        if (results.length === 1) {
            updatedRecord = results[0];
            updatedRecord.settingsvalue = data.value;
            updatedRecord.save(function(err) {
                if (err) {
                    console.log(err);
                    return cb({
                        status: 500,
                        message: err,
                        customerid: query.customerid
                    });
                }
                return cb({
                    status: 200,
                    message: data,
                    customerid: query.customerid
                });
            });
        }

        //CREATE
        if (results.length === 0) {
            newRecord = {};
            newRecord.settingsvalue = data.value;
            newRecord.settingskey = data.key;
            newRecord.customerid = data.customerid;

            settings.schema.create(newRecord, function(err, results) {
                if (err) {
                    console.log(err);
                    return cb({
                        status: 500,
                        message: err,
                        customerid: query.customerid
                    });
                }
                return cb({
                    status: 201,
                    message: data,
                    customerid: query.customerid
                });
            });
        }
    });
};

settings.getMany = function(data, cb) {
    query.customerid = data.customerid;
    query.settingskey = data.key;

    settings.schema.find(query, function(err, results) {
        if (err) {
            console.log(err);
            return cb({
                status: 500,
                message: err,
                customerid: query.customerid
            });
        }
        var answer = {
            customerid: results[0].customerid,
            key: results[0].settingskey,
            value: results[0].settingsvalue
        }
        return cb({
            status: 200,
            payload: answer,
            customerid: query.customerid
        });
    });
};


// expose to app
module.exports = settings;
