var db = require('orm').db,
    Holiday = require('../models/holiday'),
    express = require('express'),
    acl = require('../middlewares/acl.js'),
    apiRoutes = express.Router({
        mergeParams: true
    }),
    resp = require('../helpers/responser');

apiRoutes.route('/set')
    .post(acl, function(req, res) {
        Holiday.add(req.body, function(cb) {
          console.log(cb)
            resp.send(cb, res);
        });
    });

apiRoutes.route('/get')
    .post(acl, function(req, res) {
        Holiday.getMany(req.body, function(cb) {
            resp.send(cb, res);
        });
    });

module.exports = apiRoutes;
