var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas');

var Customer = {};

Customer.schema = schemas.customers;


Customer.add = function(data, cb) {
    if (!data.payload.id) {
        return cb({
            status: 400,
            message: 'Required fields are missing'
        });
    }
    Customer.schema.find({
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

        if (results.length == 1) {
            for (var elem in data.payload) {
                results[0].elem = elem;
            }
            results[0].save(function(err, cb) {
                if (err) {
                    return cb({
                        status: 500,
                        message: err
                    });
                }
                return cb({
                    status: 201,
                    message: 'Customer successfully updated!'
                });
            });
        }

        var newRecord = {};
        newRecord.id = data.payload.id;
        for (var field in data.payload) {
            newRecord.field = field;
        }
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
    });
};


Customer.getMany = function(data, cb) {
    Customer.schema.find({
        or: [{
            id: data.id
        }, {
            username: data.username
        }]
    }, function(err, results) {
        return cb({
            status: 200,
            message: results
        });
    });
};

// expose to app
module.exports = Customer;
