const Userdepartmentrel = require('../models/userDepartmentRel'),
    express = require('express'),
    apiRoutes = express.Router({
        mergeParams: true
    }),
    resp = require('../helpers/responser');

apiRoutes.route('/set')
    .post((req, res) => {
        Userdepartmentrel.add(req.body, (cb) => {
            resp.send(cb, res);
        });
    });

apiRoutes.route('/get')
    .post((req, res) => {
        Userdepartmentrel.getMany(req.body, (cb) => {
            resp.send(cb, res);
        });
    });

module.exports = apiRoutes;
