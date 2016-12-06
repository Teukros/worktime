
const schemas = require('./schemas'),
  commonData = require('../../config/commonData'),
  customerModel = {};

  customerModel.schema = schemas.customers;

class Customer {

  static add(data, cb) {
    const newRecord = {},
      areFieldsMissing = !data || !data.payload || !data.payload.id;

    if (areFieldsMissing) {
      return cb({
        status: 400,
        message: 'Required fields are missing',
      });
    }

    customerModel.schema.find({ id: data.payload.id, }, (err, result) => {
      if (err) {
        return cb({
          status: 500,
          message: err,
        });
      }
      // check status
      if (results.length > 1) {
        return cb({
          status: 409,
          message: 'Error: Provided id is multiplied in database',
        });
      }

      // update
      if (results.length === 1) {
        for (const elem in data.payload) {
          results[0][elem] = data.payload[elem];
        }
        results[0].lastModified = new Date().toMysqlFormat();
        results[0].save(function (err, customer) {
          if (err) {
            return cb({
              status: 500,
              message: err,
              customerid: data.payload.id,
            });
          }
          return cb({
            status: 200,
            message: customer,
            customerid: data.payload.id,
          });
        });
      }

      // create
      if (results.length === 0) {
        newRecord.id = data.payload.id;
        newRecord.dateDeactivated = commonData.MAXDATE;
        for (const field in data.payload) {
          newRecord[field] = data.payload[field];
        }
        newRecord.lastModified = new Date().toMysqlFormat();

        customerModel.schema.create(newRecord, (err, results) => {
          if (err) {
            return cb({
              status: 500,
              message: err,
              customerid: newRecord.id,
            });
          }
          return cb({
            status: 201,
            message: results,
            customerid: newRecord.id,
          });
        });
      }
    });
  }

  static getMany(query, cb) {
    customerModel.schema.find({ id: query.customerid }, (err, results) => {
      if (err) {
        return cb({
          status: 500,
          message: err,
        });
      }
      if (results.length === 0) {
        return cb({
          status: 404,
          payload: results,
          customerid: query.customerid,
        });
      }
      if (results.length > 0) {
        return cb({
          status: 200,
          payload: results,
          customerid: query.customerid,
        });
      }
    });
  }

}

// expose to app
module.exports = Customer;
