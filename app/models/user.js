var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas'),
    dbModel = require('../helpers/dbModel.js');

var user = {},
    query = {};

user.schema = schemas.users;


user.add = function(data, cb) {
    var payload = data.payload,
        query = {};
    query.customerId = data.customerid;
    query.id = data.payload.id;

    dbModel.add(query, payload, user, cb);
};


user.getUserByName = function(data, cb) {
    query.customerId = data.customerid;
    query.username = data.userName;
    dbModel.getUserByName(query, 'users', cb);
};

user.getMany = function(data, cb) {
    query.customerId = data.customerid;
    query.lastModified = data.lastModified;

    dbModel.getMany(query, "users", cb);
};


// expose to app
module.exports = user;
