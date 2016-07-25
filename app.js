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
