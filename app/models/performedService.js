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
    query.customerId = data.customerid;
    query.id = data.payload.id;
console.log(query);	
    dbModel.add(query, payload, performedService, cb);
};


performedService.getMany = function(data, cb) {
    if (data.userid) {
        query.userId = data.userid
    }
    query.customerId = data.customerid;
    query.lastModified = data.lastModified;
console.log("-------------performedService.getMany-----------");
console.log(query);	
    dbModel.getMany(query, "performedServices", cb);
};



// expose to app
module.exports = performedService;
