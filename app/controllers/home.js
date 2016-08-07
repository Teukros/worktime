var db = require('orm').db,
  dbCustomers = db.models.customers,
  CustomerModel = require('../models/customer');


exports.index = function(req, res){
  console.log("customers: " + dbCustomers);

dbCustomers.find(function(err, dbCustomers){
    if(err) throw new Error(err);
    res.render('home/index', {
      title: 'Generator-Express MVC',
      customers: dbCustomers
    });
  });
};
