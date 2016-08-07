var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas');

var user = {};

user.schema = schemas.users;


user.add = function(data, cb) {
  if (!data.payload.customerid) {
      return cb({
          status: 400,
          message: 'Required fields are missing'
      });
  }
  console.log(user.schema);
    user.schema.find({
            customerid: data.payload.customerid
        }, function(err, results) {
          console.log(err);
          if(error){
            return cb({
                status: 500,
                message: 'Error'
            });
          }
            //check status
            if (results.length > 1) {
                return cb({
                    status: 409,
                    message: 'Error: Provided id is multiplied in database'
                });
            }

            if (results.length == 1) {
              for (var elem in data.payload){
                results[0].elem = elem;
              }
              results[0].lastModified = Date.now();
                return cb({
                    status: 201,
                    message: 'User successfully updated!'
                });
            }

            var newRecord = {};
            newRecord.customerid = data.payload.customerid;
            newRecord.username = data.payload.username;
            user.schema.create(newRecord, function(err, results) {
              if(error){
                return cb({
                    status: 500,
                    message: 'Error'
                });
              }
                return cb({
                    status: 201,
                    message: results
                });
            });
        });
};


user.getMany = function(data, cb) {
    user.schema.find({
        or: [{
          customerid: data.payload.customerid
        }, {
            username: data.payload.username
        }]
    }, function(err, results) {
        return cb({
            status: 200,
            message: results
        });
    });
};


// expose to app
module.exports = user;
