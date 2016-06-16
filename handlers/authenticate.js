var restify  = require('restify');
var jwt      = require('jwt-simple');
var bcrypt   = require('bcrypt');
var moment   = require('moment');
var tokenKey = require('../tokenkey.js');
var User     = require('../models').User;

exports.authenticate = function(req, res, next) {
    if (!req.body.password) {
        res.send(400, "Invalid authentication request");
        return next();
    }

    User.findOne({username: 'system'}, function(error, result) {
        if (error) return res.send(500, 'Database error');

        if (bcrypt.compareSync(req.body.password, result.password)) {
            const payload = {
                exp: moment().add(30, 'days').valueOf() / 1000
            };

            res.send({
                token: jwt.encode(payload, tokenKey)
            });
            next();
        } else {
            res.send(401, "Incorrect password");
            next();
        }
    });
};

exports.changePassword = function(req, res, next) {
    if (!req.body.newpassword) {
        res.send(400, "Must provide a new password");
        return next();
    }

    var salt = bcrypt.genSaltSync(10);
    var newHashedPassword = bcrypt.hashSync(req.body.newpassword, salt);
    User.update({username: 'system'}, {$set: {password: newHashedPassword}}, function(error) {
        if (error) {
            res.send(500, 'Failed to update password');
            return next();
        }

        res.send(200);
        next();
    });
};
