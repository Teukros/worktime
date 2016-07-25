var resp = {};

resp.send = function(data, res) {
    // console.log(data);
    if( typeof data.message === "string") {
        data.message = {message: data.message};
    }
    res.status(data.status)
        // .set('Content-Type', 'application/json')
        .send(data.message);
};

module.exports = resp;
