var orm = require('orm'),
    db = require('orm').db,
    schemas = require('./schemas'),
    holidayCalc = require('../helpers/holidayCalc');

var holiday = {},
    customer = {};

holiday.schema = schemas.holidays;
customer.schema = schemas.customers;


holiday.add = function(data, cb) {
    if (!data.customerid) {
        return cb({
            status: 409,
            message: "Missing field customerid",
            customerid: data.customerid
        });
    }
    if (!data.payload.id) {
        return cb({
            status: 409,
            message: "Missing field id",
            customerid: data.customerid
        });
    }

    customer.schema.find({
        id: data.customerid
    }, function(err, results) {

        if (results.length === 0) {
            return cb({
                status: 409,
                message: "Customer doesn't exist"
            });
        }

        holiday.schema.find({
            id: data.payload.id
        }, function(err, results) {

            //update
            if (results.length === 1) {
                var updatedRecord = results[0];

                if (!data.dateDeactivated) {
                    data.dateDeactivated = "9999-12-31 00:00:00";
                }

                updatedRecord.date = data.payload.date;
                updatedRecord.dateDeactivated = data.dateDeactivated;
                updatedRecord.lastModified = new Date().toMysqlFormat();
                updatedRecord.save(function(err) {
                    if (err) {
                        console.log(err);
                        return cb({
                            status: 500,
                            message: err,
                            customerid: data.customerid
                        });
                    }
                    return cb({
                        status: 200,
                        message: updatedRecord,
                        customerid: data.customerid
                    });
                });

            }

            //create
            if (!data.payload.state) {
                return cb({
                    status: 409,
                    message: "Missing field state for new customer",
                    customerid: data.customerid
                });
            }
            if (results.length === 0) {
                var newRecord = {};
                newRecord.state = data.payload.state;

                if (!data.payload.date) {
                    return cb({
                        status: 409,
                        message: "Missing field in payload: date",
                        customerid: data.customerid
                    });
                }

                newRecord.id = data.payload.id;
                newRecord.date = data.payload.date;
                newRecord.customerId = data.customerid;
                newRecord.dateDeactivated = "9999-12-31 00:00:00";
                newRecord.lastModified = new Date().toMysqlFormat();
                holiday.schema.create(newRecord, function(err, results) {
                    if (err) {
                        console.log(err);
                        return cb({
                            status: 500,
                            message: err,
                            customerid: data.customerid
                        });
                    }
                    return cb({
                        status: 200,
                        message: results,
                        customerid: data.customerid
                    });
                });
            }
        });
    });
};


holiday.getMany = function(query, cb) {
    var reqCustomerState;
    if (!query.customerid) {
        return cb({
            status: 409,
            message: "Missing field in payload: customerid",
            customerid: query.customerid
        });
    }

    if (!query.lastModified) {
        query.lastModified = new Date().toMysqlFormat();
    }

    customer.schema.find(
		{
			id: query.customerid
		},
		function(err, results)
		{
			reqCustomerState = results[0].state;
			query.state = reqCustomerState;
			holidayCalc.calc(query, function(err)
			{
				var date = new Date(query.lastModified);
				
				console.log(query.customerid);
				console.log(date.getFullYear());
				console.log(reqCustomerState);
				console.log(query.lastModified);
				
				db.driver.execQuery("SELECT * FROM holidays WHERE (customerid = ? OR customerid = '') AND YEAR(date) >= ? AND (state = ? OR state = 0) AND lastModified >= ?", 
					[query.customerid, date.getFullYear(), reqCustomerState, query.lastModified],
					function(err, results) {
						
						console.log("query: " + err);
						console.log("query: " + results);
						
						return cb({
							status: 200,
							payload: results,
							message: results.length + " datasets",
							customerid: query.customerid
						});
					}
				);
			});
		}
	);
};

// expose to app
module.exports = holiday;
