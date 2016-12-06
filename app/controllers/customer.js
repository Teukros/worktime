const Customer = require('../models/customer.js'),
    express = require('express'),
    apiRoutes = express.Router({
        mergeParams: true
    }),
    resp = require('../helpers/responser');

apiRoutes.route('/set')
    .post((req, res) => {
        Customer.add(req.body, (cb) => {
            resp.send(cb, res);
        });
    });

apiRoutes.route('/get')
    .post((req, res) => {
        Customer.getMany(req.body, (cb) => {
            resp.send(cb, res);
        });
    });

module.exports = apiRoutes;
