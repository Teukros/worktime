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
    query.customerid = data.customerid;
    query.id = data.payload.id;

    dbModel.add(query, payload, performedService, cb);
};


performedService.getMany = function(data, cb) {
    if (data.userid) {
        query.userid = data.userid
    }
    query.customerid = data.customerid;
    query.lastModified = data.lastModified;
    dbModel.getMany(query, "performedServices", cb);
};



// expose to app
module.exports = performedService;
