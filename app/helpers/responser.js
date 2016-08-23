var resp = {};

resp.send = function(data, res) {
    // console.log(data);
    var respObj = {};
    respObj.customerid = data.customerid;
    respObj.payload = data.payload;
    if(!data.payload){
      respObj.payload = {}
    }
    respObj.resultcode = data.status;
    //respObj.message = data.message;
console.log(respObj);
    res.status(data.status)
        .set('Content-Type', 'application/json')
        .send(respObj);
};

module.exports = resp;
