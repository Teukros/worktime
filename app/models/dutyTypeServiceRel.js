var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas'),
    dbModel = require('../helpers/dbModel.js');

var dutyTypeServiceRel = {},
    query = {};

dutyTypeServiceRel.schema = schemas.dutyTypeServiceRels;


dutyTypeServiceRel.add = function(data, cb) {
    query = {};
    query.customerId = data.customerId;
    query.id = data.id;
    query.serviceId = data.payload.serviceId;
    var payload = data.payload;
    var deleteFlag = data.truedelete;
    if (deleteFlag === true) {
        dutyTypeServiceRel.schema.find(query).remove(function(err) {
            dutyTypeServiceRel.schema.create(data.payload, function(err, results) {
                if (err) {
                    console.log(err);
                    return cb({
                        status: 500,
                        message: err
                    });
                }
                return cb({
                    status: 201,
                    message: results
                });
            });
        });
    }
    if (deleteFlag === false){
      dutyTypeServiceRel.schema.create(data.payload, function(err, results) {
          if (err) {
              console.log(err);
              return cb({
                  status: 500,
                  message: err
              });
          }
          return cb({
              status: 201,
              message: results
          });
      });
    }
};


dutyTypeServiceRel.getMany = function(data, cb) {
    query.customerId = data.customerId;
    query.lastModified = data.lastModified;

    dbModel.getMany(query, "dutyTypeServiceRel", cb);
};


// expose to app
module.exports = dutyTypeServiceRel;
