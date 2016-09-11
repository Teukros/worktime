var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas'),
    dbModel = require('../helpers/dbModel.js');

var schedule = {},
    query = {};

schedule.schema = schemas.schedules;


schedule.add = function(data, cb) {
    var payload = data.payload,
        query = {};
    query.customerId = data.customerid;
    query.id = data.payload.id;
	
	dbModel.add(query, payload, schedule, cb);
};


schedule.getMany = function(data, cb) {
    query.customerId = data.customerid;
    query.lastModified = data.lastModified;
    dbModel.getMany(query, "schedules", cb);
};



// expose to app
module.exports = schedule;
