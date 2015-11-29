var restify  = require('restify');
var mongoose = require('mongoose');

var objectIdRegEx = /^[a-f\d]{24}$/i;

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
    return objectIdRegEx.test(n);
};

exports.processIngData = function(ings) {
    var r = {names: [], units: []};
    if (ings.constructor !== Array) return r
    for (var i = 0; i < ings.length; i++) {
        for (var j = 0; j < ings[i].list.length; j++) {
            r.names.push(ings[i].list[j].name);
            r.units.push(ings[i].list[j].unit);
        }
    }

    return r;
};
