var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas');

var Customer = {};

Customer.schema = schemas.customers;


Customer.add = function(data, cb) {
    var newRecord = {};

    if (!data || !data.payload || !data.payload.id) {
        return cb({
            status: 400,
            message: 'Required fields are missing'
        });
    }
    Customer.schema.find({
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

        //update
        if (results.length === 1) {
            for (var elem in data.payload) {
                newRecord[elem] = data.payload[elem];
            }
            results[0].lastModified = new Date().toMysqlFormat();
            results[0].save(function(err, customer) {
                if (err) {
                    return cb({
                        status: 500,
                        message: err
                    });
                }
                return cb({
                    status: 200,
                    message: customer
                        //message: results[0]
                });
            });
        }

        //create
        if (results.length === 0) {
            newRecord.id = data.payload.id;
            newRecord.dateDeactivated = "9999-12-31 00:00:00";
            for (var field in data.payload) {
                newRecord[field] = data.payload[field];
            }
            newRecord.lastModified = new Date().toMysqlFormat();

            Customer.schema.create(newRecord, function(err, results) {
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


Customer.getMany = function(query, cb) {
    Customer.schema.find({id: query.customerId}, function(err, results) {
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

// expose to app
module.exports = Customer;
