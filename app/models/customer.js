// Example model

var orm = require('orm'),
    db = require('orm').db;

var Customer = {};

Customer.schema = db.define('customers', {
    synchronized: String,
    id: Number,
    username: Number
});

Customer.add = function(data, cb) {
    if (!data.id) {
        return cb({
            status: 400,
            message: 'Required fields are missing'
        });
    }

    Customer.schema.find({
            id: data.id
        },
        function(err, custmr) {
            //check status
            if (custmr.length > 0) {
                return cb({
                    status: 409,
                    message: 'Provided id already in use'
                });
            }

            // save an customer
            Customer.schema.create(data, function(err, data) {
                return cb({
                    status: 201,
                    message: data
                });
            });
        });
};


Customer.getMany = function(data, cb) {
    if (data.id) {
        Customer.schema.find({
                id: data.id,
            },
            function(err, custmr) {
                if (custmr.length < 1) {
                    return cb({
                        status: 404,
                        message: 'Nothing found'
                    });
                }
                return cb({
                    status: 200,
                    message: custmr
                });
            });
    }
    if (data.username) {
        Customer.schema.find({
                username: data.username,
            },
            function(err, custmr) {
                if (custmr.length < 1) {
                    return cb({
                        status: 404,
                        message: 'Nothing found'
                    });
                }
                return cb({
                    status: 200,
                    message: custmr
                });
            });
    }
    else {
    return cb({
        status: 400,
        message: 'Bad request'
    });
  }
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
