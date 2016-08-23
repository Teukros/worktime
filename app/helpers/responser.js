var resp = {};

resp.send = function(data, res) {
    // console.log(data);
    var respObj = {};
    respObj.customerId = data.customerId;
    respObj.payload = data.payload;
    respObj.resultcode = data.status;
    respObj.message = data.message;

    res.status(data.status)
        .set('Content-Type', 'application/json')
        .send(respObj);
};

module.exports = resp;
