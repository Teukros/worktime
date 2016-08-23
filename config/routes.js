var app = require('../app'),
    express = require('express'),
    customer = require('../app/controllers/customer.js'),
    department = require('../app/controllers/department.js'),
    dutyType = require('../app/controllers/dutyType.js'),
    dutyTypeServiceRel = require('../app/controllers/dutyTypeServiceRel.js'),
    holiday = require('../app/controllers/holiday.js'),
    login = require('../app/controllers/login.js'),
    performedService = require('../app/controllers/performedService.js'),
    service = require('../app/controllers/service.js'),
    schedule = require('../app/controllers/schedule.js'),
    user = require('../app/controllers/user.js'),
    userDepartmentRel = require('../app/controllers/userDepartmentRel.js');


module.exports = function(app) {
    app.get('/', function(req, res) {
        res.end('Welcome on Board!');
    });

    app.use('/customer', customer);
    app.use('/department', department);
    app.use('/dutyTypeServiceRel', dutyTypeServiceRel);
    app.use('/dutyType', dutyType);
    app.use('/holiday', holiday);
    app.use('/login', login);
    app.use('/performedService', performedService);
    app.use('/schedule', schedule);
    app.use('/service', service);
    app.use('/user', user);
    app.use('/userDepartmentRel', userDepartmentRel);



    app.use('/', function(req, res) {
        res.status('404').send('Url not found.');
    });
};
