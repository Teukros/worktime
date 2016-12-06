const schemas = require('./schemas'),
    dbModel = require('../helpers/dbModel.js'),
    dutyTypeModel = {},
    query = {};

dutyTypeModel.schema = schemas.dutyTypes;

class DutyType {

    static add (data, cb) {
        var payload = data.payload;
        
        query.customerId = data.customerid;
        query.id = data.payload.id;

        dbModel.add(query, payload, dutyTypeModel, cb);
    };

    static getMany(data, cb) {
        query.customerId = data.customerid;
        query.lastModified = data.lastModified;
        dbModel.getMany(query, "dutyTypes", cb);
    };

}

// expose to app
module.exports = DutyType;
