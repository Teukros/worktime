const Holiday = require('../models/holiday'),
    express = require('express'),
    acl = require('../middlewares/acl.js'),
    apiRoutes = express.Router({
        mergeParams: true
    }),
    resp = require('../helpers/responser');

apiRoutes.route('/set')
    .post(acl, (req, res) => {
        Holiday.add(req.body, (cb) => {
            resp.send(cb, res);
        });
    });

apiRoutes.route('/get')
    .post(acl, (req, res) => {
        Holiday.getMany(req.body, (cb) => {
            resp.send(cb, res);
        });
    });

module.exports = apiRoutes;
