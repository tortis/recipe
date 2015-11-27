var restify  = require('restify');
var mongoose = require('mongoose');

exports.parseError = function(err) {
    if (err == null) return null;
    if (err && err.name == 'MongoError') {
        if (err.code === 11000) return new restify.ConflictError('This recipe name+author is already taken');
        console.log(err);
        return new restify.InternalServerError('Database error');
    } else if (err && err.name == 'ValidationError') {
        err.errors.code = 'ValidationError';
        var e = new restify.MissingParameterError({body: err.errors});
        return e;
    } else if (err) {
        console.log('Unknkown error:');
        console.log(err);
        return new restify.InternalServerError('Unknown error');
    }
};

exports.isObjectId = function(n) {
    return mongoose.Types.ObjectId.isValid(n);
};
