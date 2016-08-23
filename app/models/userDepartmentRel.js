var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas'),
    dbModel = require('../helpers/dbModel.js');

var userDepartmentRel = {},
    query = {};

userDepartmentRel.schema = schemas.userDepartmentRels;


userDepartmentRel.add = function(data, cb) {
    var payload = data.payload,
        query = {};
    query.customerId = data.customerId;
    query.id = data.id;

    dbModel.add(query, payload, userDepartmentRel, cb);
};


userDepartmentRel.getMany = function(data, cb) {
    query.customerId = data.customerId;
    dbModel.getMany(query, userDepartmentRel, cb);
};



// expose to app
module.exports = userDepartmentRel;
