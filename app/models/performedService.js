var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas'),
    dbModel = require('../helpers/dbModel.js');

var performedService = {},
    query = {};

performedService.schema = schemas.performedServices;


performedService.add = function(data, cb) {
    var payload = data.payload,
        query = {};
    query.customerId = data.customerId;
    query.id = data.id;

    dbModel.add(query, payload, performedService, cb);
};


performedService.getMany = function(data, cb) {
    query.customerId = data.customerId;
    query.lastModified = data.lastModified;
    dbModel.getMany(query, "performedServices", cb);
};



// expose to app
module.exports = performedService;
