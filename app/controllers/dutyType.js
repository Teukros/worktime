var db = require('orm').db,
    dutyType = require('../models/dutyType'),
    express = require('express'),
    apiRoutes = express.Router({
        mergeParams: true
    }),
    resp = require('../helpers/responser');

apiRoutes.route('/set')
    .post(function(req, res) {
        dutyType.add(req.body, function(cb) {
            resp.send(cb, res);
        });
    });

apiRoutes.route('/get')
    .post(function(req, res) {
        dutyType.getMany(req.body, function(cb) {
            resp.send(cb, res);
        });
    });

module.exports = apiRoutes;
