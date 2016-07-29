var orm = require('orm'),
    db = require('orm').db;

var schemas = require('./schemas');

var Customer = {};

Customer.schema = schemas.customerScheme;

// db.define('customers', //schemas.customerScheme
// {
//     id: Number,
//     username: String
// }
// ); //schemas.customerScheme);

Customer.add = function(data, cb) {
  console.log("!!!!" + schemas.customerScheme());
    Customer.schema.find({
            id: data.id
        }, function(err, results) {
          console.log(err);
            //check status
            if (results.length > 0) {
                return cb({
                    status: 409,
                    message: 'Provided id already in use'
                });
            }

            var newRecord = {};
            newRecord.id = data.id;
            newRecord.username = data.username;
            Customer.schema.create(newRecord, function(err, results) {
                return cb({
                    status: 201,
                    message: results
                });
            });

        //
        //     if (!data.id) {
        //         return cb({
        //             status: 400,
        //             message: 'Required fields are missing'
        //         });
        //     }
        //
        //
        //     // save an customer
        //     Customer.schema.create(data, function(err, data) {
        //         return cb({
        //             status: 201,
        //             message: data
        //         });
        //     });
        });
};


Customer.getMany = function(data, cb) {
    Customer.schema.find({
        or: [{
            id: data.id
        }, {
            username: data.username
        }]
    }, function(err, results) {
        return cb({
            status: 200,
            message: results
        });
    });
};



// add a row to the person table
// Customer.schema.create({
//     id: 151,
//     synchronized: "123",
//     username: "Abdullah"
// }, function(err) {
//     if (err) throw err;
//
//     // query the person table by surname
//     Customer.schema.find({
//         username: "Abdullah"
//     }, function(err, people) {
//         // SQL: "SELECT * FROM person WHERE surname = 'Doe'"
//         if (err) throw err;
//
//         console.log("People found: %d", people.length);
//         console.log("First person: %s, id %d", people[0], people[0].id);
//
//         people[0].id = 16;
//         people[0].save(function(err) {
//             // err.msg = "under-age";
//         });
//     });
// });


// expose to app
module.exports = Customer;
