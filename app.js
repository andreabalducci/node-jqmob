/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes');

var EventiProvider = require('./EventiProvider.js').EventiProvider;

var provider = new EventiProvider();

var app = module.exports = express.createServer();
app.enable('jsonp callback');

//CORS middleware
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

// Configuration
app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(allowCrossDomain);
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/api/eventi', function (req, res) {
    var timeout = req.param('timeout', 0);
    provider.findAll(function (err, data) {
        if (err) throw err;
        setTimeout(function () {
            res.json(data);
        }, timeout);
    });
});

app.get('/api/eventi/:id', function (req, res) {
    provider.findById(req.params.id, function (err, evento) {
        if (err) throw err;
        res.json(evento);
    });
});

app.get('/jqm', function (req, res) {
    res.redirect('/jquerymobile/demos/index.html');
});

app.post('/api/eventi/', function (req, res) {
    console.log(req.body);
    provider.save({title:req.body.title, location:req.body.location}, function (err, eventi) {
        if (err) throw err;
        res.json(eventi[eventi.length-1]);
    });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
