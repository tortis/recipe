// Command line falgs
var flags    = require('flags');
flags.defineInteger('port', 8080, 'Port the app will run on.');
flags.defineString('meta', 'meta.json', 'File where metadata is saved');
flags.parse();

var restify  = require('restify');
var mongoose = require('mongoose');
var handlers = require('./handlers');

// Connect to mongodb
mongoose.connect('mongodb://localhost/recipe');

// Create a restify server
var server = restify.createServer({
    name: 'Findley Recipe API'
});

// Attach middleware
server.use(restify.queryParser());
server.use(restify.bodyParser());

// Recipe resource
server.post ( '/api/recipes'           , handlers.recipes.create);
server.get  ( '/api/recipes/meta'      , handlers.recipes.meta);
server.patch( '/api/recipes/:id'       , handlers.recipes.update);
server.del  ( '/api/recipes/:id'       , handlers.recipes.delete);
server.get  ( '/api/recipes/:id'       , handlers.recipes.get);
server.get  ( '/api/recipes'           , handlers.recipes.search);
server.get  ( '/api/recipes/:id/print' , handlers.recipes.print);

// Static file handler
server.get( '/.*', restify.serveStatic({
    directory: './public',
    default:   'index.html'
}));

// Start server
server.listen(flags.get('port'), function() {
    console.log('%s listening at %s', server.name, server.url);
});
