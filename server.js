// Command line falgs
var flags    = require('flags');
flags.defineInteger('port', 8080, 'Port the app will run on.');
flags.defineString('meta', 'meta.json', 'File where metadata is saved');
flags.parse();

var restify  = require('restify');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var handlers = require('./handlers');
var middleware = require('./middleware');

// Connect to mongodb
mongoose.connect('mongodb://localhost/recipe');

// Create a restify server
var server = restify.createServer({
    name: 'Findley Recipe API'
});

// Attach middleware
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(function(req, res, next) {
    if (res._responseTime) return next();
    res._responseTime = true;
    var start = new Date();
    res.on('header', function() {
        var duration = new Date - start;
        res.setHeader('Response-Time', duration + 'ms');
    });
    next();
});

server.get('/api/dash', handlers.dash.get);

// Recipe resource
server.post ('/api/recipes'               , middleware.authenticated, handlers.recipes.create);
server.get  ('/api/recipes/meta'          , handlers.recipes.meta);
server.get  ('/api/recipes/typeahead/:pre', handlers.recipes.typeahead);
server.patch('/api/recipes/:id'           , middleware.authenticated, handlers.recipes.update);
server.del  ('/api/recipes/:id'           , middleware.authenticated, handlers.recipes.delete);
server.get  ('/api/recipes/:id'           , handlers.recipes.get);
server.get  ('/api/recipes'               , handlers.recipes.search);
server.get  ('/api/recipes/:id/print'     , handlers.recipes.print);

server.post ('/api/authenticate',   handlers.authenticate.authenticate);
server.post ('/api/changepassword', middleware.authenticated, handlers.authenticate.changePassword);

// Static file handler
server.get( '/.*', restify.serveStatic({
    directory: './public',
    default:   'index.html'
}));

// Start server
server.listen(flags.get('port'), function() {
    console.log('%s listening at %s', server.name, server.url);
});
