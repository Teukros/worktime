var db = require('orm').db,
    schedule = require('../models/schedule'),
    express = require('express'),
    apiRoutes = express.Router({
        mergeParams: true
    }),
    resp = require('../helpers/responser');

apiRoutes.route('/set')
    .post(function(req, res) {
        schedule.add(req.body, function(cb) {
            resp.send(cb, res);
        });
    });

apiRoutes.route('/get')
    .post(function(req, res) {
        schedule.getMany(req.body, function(cb) {
            resp.send(cb, res);
        });
    });

module.exports = apiRoutes;
