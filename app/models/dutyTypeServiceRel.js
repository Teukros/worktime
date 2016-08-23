var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas'),
    dbModel = require('../helpers/dbModel.js');

var dutyTypeServiceRel = {},
    query = {};

dutyTypeServiceRel.schema = schemas.dutyTypeServiceRels;


dutyTypeServiceRel.add = function(data, cb) {
    query = {};
    query.customerid = data.customerid;
    //query.id = data.id;
    query.serviceid = data.payload.serviceid;
    query.dutyTypeid = data.payload.dutyTypeid;
    var payload = data.payload;
    var deleteFlag = data.truedelete;

    if (deleteFlag === true) {
        dutyTypeServiceRel.schema.find(query).remove(function(err) {

            dutyTypeServiceRel.schema.create(payload, function(err, results) {
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
    if (deleteFlag === false) {
        dutyTypeServiceRel.schema.create(payload, function(err, results) {
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
    } else {
        return;
    }
};

dutyTypeServiceRel.getMany = function(data, cb) {
    query.customerid = data.customerid;
    query.lastModified = data.lastModified;

    dbModel.getMany(query, "dutyTypeServiceRels", cb);
};


// expose to app
module.exports = dutyTypeServiceRel;
