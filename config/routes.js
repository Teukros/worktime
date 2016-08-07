var app = require('../app'),
    express = require('express'),
    customer = require('../app/controllers/customer.js');
    user = require('../app/controllers/user.js');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.end('Welcome on Board!');
    });

    app.use('/customer', customer);
    app.use('/user', user);


    app.use('/', function(req, res) {
        res.status('404').send('Url not found.');
    });
};
