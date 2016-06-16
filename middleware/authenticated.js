var jwt      = require('jwt-simple');
var restify  = require('restify');
var tokenKey = require('../tokenkey.js');

module.exports = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.send(new restify.UnauthorizedError('No authentication token was provided'));
    }

    const authParts = req.headers.authorization.split(' ');
    if (authParts.length != 2) {
        return res.send(new restify.UnauthorizedError('Invalid token provided.'));
    }

    try {
        var token = jwt.decode(authParts[1], tokenKey);
        req.authorized = true;
    } catch(e) {
        return res.send(new restify.UnauthorizedError('Invalid token provided'));
    }
    next();
};
