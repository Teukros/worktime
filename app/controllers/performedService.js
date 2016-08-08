var db = require('orm').db,
    performedService = require('../models/performedService'),
    express = require('express'),
    apiRoutes = express.Router({
        mergeParams: true
    }),
    resp = require('../helpers/responser');

apiRoutes.route('/set')
    .post(function(req, res) {
        performedService.add(req.body, function(cb) {
            resp.send(cb, res);
        });
    });

apiRoutes.route('/get')
    .post(function(req, res) {
        performedService.getMany(req.body, function(cb) {
            resp.send(cb, res);
        });
    });

module.exports = apiRoutes;
