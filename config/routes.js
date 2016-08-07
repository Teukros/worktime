var app = require('../app'),
    express = require('express'),
    customer = require('../app/controllers/customer.js'),
    user = require('../app/controllers/user.js'),
    department = require('../app/controllers/department.js'),
    holiday = require('../app/controllers/holiday.js'),
    service = require('../app/controllers/service.js'),
    userDepartmentRel = require('../app/controllers/userDepartmentRel.js');


module.exports = function(app) {
    app.get('/', function(req, res) {
        res.end('Welcome on Board!');
    });

    app.use('/customer', customer);
    app.use('/user', user);
    app.use('/department', department);
    app.use('/holiday', holiday);
    app.use('/service', service);
    app.use('/userDepartmentRel', userDepartmentRel);


    app.use('/', function(req, res) {
        res.status('404').send('Url not found.');
    });
};
