const dutyType = require('../models/dutyType'),
    express = require('express'),
    apiRoutes = express.Router({
        mergeParams: true
    }),
    resp = require('../helpers/responser');

apiRoutes.route('/set')
    .post((req, res) => {
        dutyType.add(req.body, (cb) => {
            resp.send(cb, res);
        });
    });

apiRoutes.route('/get')
    .post((req, res) => {
        dutyType.getMany(req.body, (cb) => {
            resp.send(cb, res);
        });
    });

module.exports = apiRoutes;
