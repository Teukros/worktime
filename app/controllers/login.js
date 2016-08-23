var db = require('orm').db,
    login = require('../models/login'),
    express = require('express'),
    apiRoutes = express.Router({
        mergeParams: true
    }),
    resp = require('../helpers/responser');

apiRoutes.route('')
    .post(function(req, res) {
        login.check(req.body, function(cb) {
            resp.send(cb, res);
        });
    });

module.exports = apiRoutes;
