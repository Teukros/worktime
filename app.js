global.app = {};
global.app.rootPath = __dirname + '/';

var express = require('express'),
    bodyParser = require('body-parser'),
    orm = require('orm'),
    fs = require('fs'),
    app = express(),
    config = require('./config/config'),
    port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '500mb'
}));


function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

/*
Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};
*/
Date.prototype.toMysqlFormat = function() {
    return this.getFullYear() + "-" + twoDigits(1 + this.getMonth()) + "-" + twoDigits(this.getDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getMinutes()) + ":" + twoDigits(this.getSeconds());
};


orm.db = orm.connect(config.db, function(err, db) {
    if (err) {
        console.log("Something is wrong with the connection", err);
        return;
    } else {
        console.log("connected!");
    }
});

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function(file) {
    if (file.indexOf('.js') >= 0) {
        require(modelsPath + '/' + file);
    }
});


//require('./config/express')(app, config);
require('./config/routes')(app);

app.listen(config.port);
