var orm = require('orm'),
    db = require('orm').db,
    schemas = require('./schemas');

var login = {};
var user = {};

user.schema = schemas.users;

login.check = function(query, cb) {

    user.schema.find({
        username: query.userid,
        customerid: query.customerid
    }, function(err, results) {
      console.log(err);
        if (err) {
            return cb({
                status: 500,
                message: err
            });
        }
        if (results.length === 0) {
            return cb({
                status: 404,
                payload: results,
                customerid: query.customerid
            });
        }
        if (results.length > 0) {
            return cb({
                status: 200,
                payload: results,
                customerid: query.customerid
            });
        }
    });
};

module.exports = login;
