
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var MusicCatalogProvider = require('./MusicCatalogProvider').MusicCatalogProvider;

var provider = new MusicCatalogProvider();

var app = module.exports = express.createServer();
app.enable('jsonp callback');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

app.get('/api/album/list', function(req, res){
    provider.findAll(function(err, data){
        if(err) throw err;
        res.json(data);
    });
});

app.get('/api/album/:id', function(req, res){
    provider.findById(req.params.id, function(err, album){
        if(err) throw err;
        res.json(album);
    });
});

app.get('/jqm', function(req, res){
    res.redirect('/jquerymobile/demos/index.html');
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
