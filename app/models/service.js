var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas'),
    dbModel = require('../helpers/dbModel.js');

var service = {},
    query = {};

service.schema = schemas.services;


service.add = function(data, cb) {
    var payload = data.payload,
        query = {};
    query.customerId = data.customerid;
    query.id = data.payload.id;

    dbModel.add(query, payload, service, cb);
};


service.getMany = function(data, cb) {
    query.customerId = data.customerid;
    query.lastModified = data.lastModified;

    dbModel.getMany(query, "services", cb);
};



// expose to app
module.exports = service;
