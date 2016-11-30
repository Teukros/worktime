var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas'),
    dbModel = require('../helpers/dbModel.js');

var userDepartmentRel = {},
    query = {};

userDepartmentRel.schema = schemas.userDepartmentRels;


userDepartmentRel.add = function(data, cb) {
    query = {};
    query.customerId = data.customerid;
    query.userId = data.payload.userId;

    var payload = data.payload;
	payload.customerId = data.customerid;
    var deleteFlag = data.trueDelete;

    if (deleteFlag === true) {
        userDepartmentRel.schema.find(query).remove(function(err) { console.log(err); });

		userDepartmentRel.schema.create(payload, function(err, results) {
			if (err) {
				return cb({
					status: 500,
					message: err,
					customerid: query.customerId
				});
			}
			return cb({
				status: 201,
				message: results,
				customerid: query.customerId
			});
		});
    }
    if (deleteFlag === false) {
        userDepartmentRel.schema.create(payload, function(err, results) {
            if (err) {
                return cb({
                    status: 500,
                    message: err,
                    customerid: query.customerId
                });
            }
            return cb({
                status: 201,
                message: results,
                customerid: query.customerId
            });
        });
    } else {
        return;
    }
};

userDepartmentRel.getMany = function(data, cb) {
    query.customerId = data.customerid;

    dbModel.getRelationships(query, "userDepartmentRels", cb);
};


// expose to app
module.exports = userDepartmentRel;
