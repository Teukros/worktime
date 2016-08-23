var resp = require('../helpers/responser.js');

module.exports = function(req, res, next){
if (!req.body) {
  return resp.send({
                status: 409,
                message: 'Empty request'
            }, res);
}
if (!req.body.customerId) {
  return resp.send({
                status: 409,
                message: 'Missing field: customerId'
            }, res);
}
if (!req.body.userName) {
  return resp.send({
                status: 409,
                message: 'Missing field: userName'
            }, res);
}
// if (!req.body.password) {
//   return resp.send({
//                 status: 409,
//                 message: 'Missing field: password'
//             }, res);
// }

//|| !req.body.customerId || req.body. ||  )
return next();


};
