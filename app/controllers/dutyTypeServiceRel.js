var db = require('orm').db,
    dutyTypeServiceRel = require('../models/dutyTypeServiceRel'),
    express = require('express'),
    apiRoutes = express.Router({
        mergeParams: true
    }),
    resp = require('../helpers/responser');

apiRoutes.route('/set')
    .post(function(req, res) {
        dutyTypeServiceRel.add(req.body, function(cb) {
            resp.send(cb, res);
        });
    });

apiRoutes.route('/get')
    .post(function(req, res) {
        dutyTypeServiceRel.getMany(req.body, function(cb) {
            resp.send(cb, res);
        });
    });

module.exports = apiRoutes;
