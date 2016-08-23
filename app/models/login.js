var orm = require('orm'),
    db = require('orm').db,
    schemas = require('./schemas');

var login = {};
var user = {};

user.schema = schemas.users;

login.check = function(query, cb) {

    user.schema.find({
        username: query.userId,
        customerId: query.customerId
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
                customerId: query.customerId
            });
        }
        if (results.length > 0) {
            return cb({
                status: 200,
                payload: results,
                customerId: query.customerId
            });
        }
    });
};

module.exports = login;
