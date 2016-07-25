var db = require('orm').db,
    //app = require('../app.js'),
    //customers = db.models.customers,
    Customer = require('../models/customer'),
    express = require('express'),
    apiRoutes = express.Router({
        mergeParams: true
    }),
    resp = require('../helpers/responser');

apiRoutes.route('/set')
    .post(function(req, res) {
        Customer.add(req.body, function(cb) {
            resp.send(cb, res);
        });
    });

apiRoutes.route('/get')
    .post(function(req, res) {
        Customer.getMany(req.body, function(cb) {
            resp.send(cb, res);
        });
    });

module.exports = apiRoutes;
