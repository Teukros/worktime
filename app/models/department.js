const schemas = require('./schemas'),
    dbModel = require('../helpers/dbModel.js'),
    departmentModel = {},
    query = {};

departmentModel.schema = schemas.departments;

class Department {
    static add(data, cb) {
        const payload = data.payload;

        query.customerId = data.customerid;
        query.id = data.payload.id;

        dbModel.add(query, payload, departmentModel, cb);
    };

    static getMany(data, cb) {
        query.customerId = data.customerid;
        query.lastModified = data.lastModified;
        dbModel.getMany(query, "departments", cb);
    };
}

// expose to app
module.exports = Department;
