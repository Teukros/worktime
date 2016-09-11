var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas'),
    dbModel = require('../helpers/dbModel.js');

var dutyTypeServiceRel = {},
    query = {};

dutyTypeServiceRel.schema = schemas.dutyTypeServiceRels;


dutyTypeServiceRel.add = function(data, cb) {
    query = {};
    query.customerId = data.customerid;
    query.serviceId = data.payload.serviceId;

    var payload = data.payload;
	payload.customerId = data.customerid;
    var deleteFlag = data.trueDelete;

    if (deleteFlag === true) {
        dutyTypeServiceRel.schema.find(query).remove(function(err) { console.log(err); });

		dutyTypeServiceRel.schema.create(payload, function(err, results) {
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
        dutyTypeServiceRel.schema.create(payload, function(err, results) {
            if (err) {
                console.log(err);
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

dutyTypeServiceRel.getMany = function(data, cb) {
    query.customerId = data.customerid;

    dbModel.getRelationships(query, "dutyTypeServiceRels", cb);
};


// expose to app
module.exports = dutyTypeServiceRel;
