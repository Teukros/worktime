var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas'),
    dbModel = require('../helpers/dbModel.js');

var dutyType = {},
    query = {};

dutyType.schema = schemas.dutyTypes;


dutyType.add = function(data, cb) {
    var payload = data.payload,
        query = {};
    query.customerId = data.customerId;
    query.id = data.id;

    dbModel.add(query, payload, dutyType, cb);
};


dutyType.getMany = function(data, cb) {
    query.customerId = data.customerId;
    dbModel.getMany(query, "dutyTypes", cb);
};



// expose to app
module.exports = dutyType;
