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
  // for (var i = 0; i < data.payload.length; i++) {
    var payload = data.payload;
    dbModel.add(query, payload, dutyTypeServiceRel, cb);
// }
};

dutyTypeServiceRel.getMany = function(data, cb) {
    query.customerId = data.customerId;
    dbModel.getMany(query, dutyTypeServiceRel, cb);
};



// expose to app
module.exports = dutyTypeServiceRel;
