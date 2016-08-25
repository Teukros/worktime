var resp = require('../helpers/responser.js');

module.exports = function(req, res, next){
if (!req.body) {
  return resp.send({
                status: 409,
                message: 'Empty request'
            }, res);
}
if (!req.body.customerid) {
  return resp.send({
                status: 409,
                message: 'Missing field: customerid'
            }, res);
};
// if (!req.body.password) {
//   return resp.send({
//                 status: 409,
//                 message: 'Missing field: password'
//             }, res);
// }

//|| !req.body.customerid || req.body. ||  )
return next();


};
