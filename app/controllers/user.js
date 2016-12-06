const User = require('../models/user'),
    express = require('express'),
    apiRoutes = express.Router({
        mergeParams: true
    }),
    resp = require('../helpers/responser');

apiRoutes.route('/set')
    .post((req, res) => {
        User.add(req.body, (cb) => {
            resp.send(cb, res);
        });
    });

apiRoutes.route('/getuser')
    .post((req, res) => {
        User.getUserByName(req.body, (cb) => {
            resp.send(cb, res);
        });
    });

apiRoutes.route('/get')
    .post((req, res) => {
        User.getMany(req.body, (cb) => {
            resp.send(cb, res);
        });
    });
	
module.exports = apiRoutes;
