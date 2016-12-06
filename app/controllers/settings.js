const settings = require('../models/settings'),
    express = require('express'),
    apiRoutes = express.Router({
        mergeParams: true
    }),
    resp = require('../helpers/responser');

apiRoutes.route('/set')
    .post((req, res) => {
        settings.add(req.body, (cb) => {
            resp.send(cb, res);
        });
    });

apiRoutes.route('/get')
    .post((req, res) => {
        settings.getMany(req.body, (cb) => {
            resp.send(cb, res);
        });
    });

module.exports = apiRoutes;
