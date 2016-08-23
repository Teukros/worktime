var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas'),
    dbModel = require('../helpers/dbModel.js');

var userDepartmentRel = {},
    query = {};

userDepartmentRel.schema = schemas.userDepartmentRels;


userDepartmentRel.add = function(data, cb) {
    query = {};
    query.customerid = data.customerid;
    //query.id = data.id;
    query.userid = data.userid;
    query.departmentid = data.payload.departmentid;
    var payload = data.payload;
    var deleteFlag = data.truedelete;

    if (deleteFlag === true) {
        userDepartmentRel.schema.find(query).remove(function(err) {

            userDepartmentRel.schema.create(payload, function(err, results) {
                if (err) {
                    console.log(err);
                    return cb({
                        status: 500,
                        message: err,
                        customerid: query.customerid
                    });
                }
                return cb({
                    status: 201,
                    message: results,
                    customerid: query.customerid
                });
            });
        });
    }
    if (deleteFlag === false) {
        userDepartmentRel.schema.create(payload, function(err, results) {
            if (err) {
                console.log(err);
                return cb({
                    status: 500,
                    message: err,
                    customerid: query.customerid
                });
            }
            return cb({
                status: 201,
                message: results,
                customerid: query.customerid
            });
        });
    } else {
        return;
    }
};

userDepartmentRel.getMany = function(data, cb) {
    if (data.userid) {
        query.userid = data.userid;
    }
    query.customerid = data.customerid;
    query.lastModified = data.lastModified;

    dbModel.getMany(query, "userDepartmentRels", cb);
};


// expose to app
module.exports = userDepartmentRel;
