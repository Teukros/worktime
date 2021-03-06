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
            customerid: query.customerId
        });
    }

    model.schema.find(query, function(err, results) {

//console.log(err);
//console.log(results);
        if (err) {
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
                message: 'Error: Provided customerid is multiplied in database',
                customerid: query.customerId
            });
        }
        //UPDATE
        if (results.length === 1) {
            updatedRecord = results[0];
            for (var elem in payload) {
                updatedRecord[elem] = payload[elem];
            }

            updatedRecord.lastModified = new Date().toMysqlFormat();
            updatedRecord.customerId = query.customerId;
            updatedRecord.save(function(err) {
                if (err) {
                    return cb({
                        status: 500,
                        message: err,
                        customerid: query.customerId
                    });
                }
                return cb({
                    status: 200,
                    message: updatedRecord,
                    customerid: query.customerId
                });
            });
        }

        //CREATE
        if (results.length === 0) {
            schemas.customers.find({
                id: query.customerId
            }, function(err, results) {
//console.log(err);
//console.log(results);
				
                if (results.length === 0) {
                    return cb({
                        status: 409,
                        message: "Wrong customer Id",
                        customerid: query.customerId
                    });
                }
                newRecord.customerId = query.customerId;
                newRecord.dateDeactivated = "9999-12-31 00:00:00";
                newRecord.lastModified = new Date().toMysqlFormat();
                for (var field in payload) {
console.log(field + ": " + payload[field]);
                    newRecord[field] = payload[field];
                }
                if (!newRecord.id) {
                    return cb({
                        status: 409,
                        message: "Adding to db failed - missing field id",
                        customerid: query.customerId
                    });
                }
                model.schema.create(newRecord, function(err, results) {
console.log(err);
console.log(results);
                    if (err) {
                        return cb({
                            status: 500,
                            message: err,
                            customerid: query.customerId
                        });
                    }
                    return cb({
                        status: 201,
                        message: results,
                        customerid: query.customerId
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
console.log(query.customerId);
console.log(query.lastModified);
console.log(query.userId);
	
	var sql = "SELECT * FROM " + model + " WHERE customerid = ? AND lastModified >= ? AND dateDeactivated = ?";
	var selectionArgs = [query.customerId, query.lastModified, "9999-12-31 23:59:59"];
	
	if (!(query.userId === undefined) && !(query.userId === ""))
	{	
		sql = "SELECT * FROM " + model + " WHERE customerid = ? AND lastModified >= ? AND dateDeactivated = ? AND userId = ?";
		selectionArgs = [query.customerId, query.lastModified, "9999-12-31 23:59:59", query.userId];
	}
console.log(sql);
console.log(selectionArgs);
	
    db.driver.execQuery(sql, selectionArgs, function(err, results) {
        if (err) {
            return cb({
                status: 500,
                message: err
            });
        }
        if (results.length === 0) {
            return cb({
                status: 404,
                payload: results,
                customerid: query.customerId
            });
        }
        if (results.length > 0) {
            return cb({
                status: 200,
                payload: results,
                customerid: query.customerId
            });
        }
    });
};

dbModel.getRelationships = function(query, model, cb) {

    db.driver.execQuery("SELECT * FROM " + model + " WHERE customerId = ?", [query.customerId], function(err, results) {
        if (err) {
            return cb({
                status: 500,
                message: err
            });
        }
        if (results.length === 0) {
            return cb({
                status: 404,
                payload: results,
                customerid: query.customerId
            });
        }
        if (results.length > 0) {
            return cb({
                status: 200,
                payload: results,
                customerid: query.customerId
            });
        }
    });
};

dbModel.getUserByName = function(query, model, cb) {

    db.driver.execQuery("SELECT * FROM " + model + " WHERE username = ? AND customerid = ?", [query.username, query.customerId], function(err, results) {
        if (err) {
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
