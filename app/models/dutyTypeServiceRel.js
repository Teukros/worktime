const schemas = require('./schemas'),
    dbModel = require('../helpers/dbModel.js'),
    dutyTypeServiceRelModel = {};

let query = {};

dutyTypeServiceRelModel.schema = schemas.dutyTypeServiceRels;

class DutyTypeServiceRel {

    static add(data, cb) {
        query = {};
        query.customerId = data.customerid;
        query.serviceId = data.payload.serviceId;

        var payload = data.payload;
        payload.customerId = data.customerid;
        var deleteFlag = data.trueDelete;

        if (deleteFlag) {
            dutyTypeServiceRelModel.schema.find(query).remove(function () { });

            dutyTypeServiceRelModel.schema.create(payload, (err, result) => {
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
        if (!deleteFlag) {
            dutyTypeServiceRelModel.schema.create(payload, (err, result) => {
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

    static getMany(data, cb) {
        query.customerId = data.customerid;

        dbModel.getRelationships(query, "dutyTypeServiceRels", cb);
    };


}


// expose to app
module.exports = DutyTypeServiceRel;
