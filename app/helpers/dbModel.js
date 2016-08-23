var orm = require('orm'),
    db = require('orm').db;

var schemas = require('../models/schemas');
// var resp = require('./responser');

var dbModel = {};

dbModel.add = function(query, payload, model, cb) {

    var newRecord = {},
        updatedRecord = {};
    //! or undefined
    if (!query || !payload) {
        return cb({
            status: 400,
            message: 'Required fields are missing'
        });
    }


    model.schema.find({
        customerId: query.customerId,
        id: query.id
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
                message: 'Error: Provided customerId is multiplied in database'
            });
        }
        //UPDATE
        if (results.length === 1) {
            console.log("!!!")
            updatedRecord = results[0];
            for (var elem in payload) {
                updatedRecord[elem] = payload[elem];
            }

            updatedRecord.lastModified = new Date().toMysqlFormat();
            updatedRecord.customerId = query.customerId;
            updatedRecord.save(function(err) {
                if (err) {
                    console.log(err);
                    console.log(cb);
                    return cb({
                        status: 500,
                        message: err
                    });
                }
                return cb({
                    status: 200,
                    message: updatedRecord
                });
            });
        }

        //CREATE
        if (results.length === 0) {
            schemas.customers.find({
                id: query.customerId
            }, function(err, results) {
                if (results.length === 0) {
                    return cb({
                        status: 409,
                        message: "Wrong customer Id"
                    });
                }
                newRecord.customerId = query.customerId;
                newRecord.dateDeactivated = "9999-12-31 00:00:00";
                newRecord.lastModified = new Date().toMysqlFormat();
                for (var field in payload) {
                    newRecord[field] = payload[field];
                }
                if (!newRecord.id) {
                    return cb({
                        status: 409,
                        message: "Adding to db failed - missing field id"
                    });
                }
                model.schema.create(newRecord, function(err, results) {
                    if (err) {
                        console.log(err);
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
            });
        }
    });
};


dbModel.getMany = function(query, model, cb) {
    if (!query.lastModified) {
        query.lastModified = 0;
    }

    db.driver.execQuery("SELECT * FROM " + model + " WHERE customerId = ? AND lastModified >= ?", [Number(query.customerId), query.lastModified], function(err, results) {
        if (err) {
          console.log(err);
            return cb({
                status: 500,
                message: err
            });
        }
        if (results.length === 0) {
            return cb({
                status: 404,
                payload: results,
                customerId: query.customerId
            });
        }
        if (results.length > 0) {
            return cb({
                status: 200,
                payload: results,
                customerId: query.customerId
            });
        }
    });
};

module.exports = dbModel;
