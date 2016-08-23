var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas'),
    dbModel = require('../helpers/dbModel.js');

var department = {},
    query = {};

department.schema = schemas.departments;


department.add = function(data, cb) {
    var payload = data.payload,
        query = {};
    query.customerId = data.customerId;
    query.id = data.id;

    dbModel.add(query, payload, department, cb);
};


department.getMany = function(data, cb) {
    query.customerId = data.customerId;
    dbModel.getMany(query, "departments", cb);
};



// expose to app
module.exports = department;
