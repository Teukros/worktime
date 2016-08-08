var resp = {};

resp.send = function(data, res) {
    // console.log(data);
var respObj = {};
console.log('!!!');
console.log(data.message);
console.log('!!!');

    respObj.id = data.message.id;
    respObj.resultcode = data.status;
    respObj.payload = [data.message];
    // if( typeof data.message === "string") {
    //     data.message = {message: data.message};
    // }
    res.status(data.status)
        // .set('Content-Type', 'application/json')
        .send(respObj);
};

module.exports = resp;
