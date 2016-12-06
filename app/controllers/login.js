const login = require('../models/login'),
    express = require('express'),
    apiRoutes = express.Router({
        mergeParams: true
    }),
    resp = require('../helpers/responser');

apiRoutes.route('')
    .post((req, res) => {
        login.check(req.body, (cb) => {
            resp.send(cb, res);
        });
    });

module.exports = apiRoutes;
