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
            message: 'Required fields are missing',
            customerid: query.customerid
        });
    }

    model.schema.find(query, function(err, results) {
        console.log(query);
        if (err) {
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
                message: 'Error: Provided customerid is multiplied in database',
                customerid: query.customerid
            });
        }
        //UPDATE
        if (results.length === 1) {
            updatedRecord = results[0];
            for (var elem in payload) {
                updatedRecord[elem] = payload[elem];
            }

            updatedRecord.lastModified = new Date().toMysqlFormat();
            updatedRecord.customerid = query.customerid;
            updatedRecord.save(function(err) {
                if (err) {
                    console.log(err);
                    console.log(cb);
                    return cb({
                        status: 500,
                        message: err,
                        customerid: query.customerid
                    });
                }
                return cb({
                    status: 200,
                    message: updatedRecord,
                    customerid: query.customerid
                });
            });
        }

        //CREATE
        if (results.length === 0) {
            schemas.customers.find({
                id: query.customerid
            }, function(err, results) {
                if (results.length === 0) {
                  console.log(results);
                    return cb({
                        status: 409,
                        message: "Wrong customer Id",
                        customerid: query.customerid
                    });
                }
                newRecord.customerid = query.customerid;
                newRecord.dateDeactivated = "9999-12-31 00:00:00";
                newRecord.lastModified = new Date().toMysqlFormat();
                for (var field in payload) {
                    newRecord[field] = payload[field];
                }
                console.log(newRecord)
                console.log(payload)
                if (!newRecord.id) {
                    return cb({
                        status: 409,
                        message: "Adding to db failed - missing field id",
                        customerid: query.customerid
                    });
                }
                model.schema.create(newRecord, function(err, results) {
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
                        message: results,
                        customerid: query.customerid
                    });
                });
            });
        }
    });
};


dbModel.getMany = function(query, model, cb) {

    if (!query.lastModified || query.lastModified === "" ||query.lastModified === undefined) {
        query.lastModified = 0;
    }

    db.driver.execQuery("SELECT * FROM " + model + " WHERE customerid = ? AND lastModified >= ?", [Number(query.customerid), query.lastModified], function(err, results) {
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
                customerid: query.customerid
            });
        }
        if (results.length > 0) {
            return cb({
                status: 200,
                payload: results,
                customerid: query.customerid
            });
        }
    });
};

module.exports = dbModel;
