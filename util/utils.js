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

exports.iconFromCategory = function(category) {
    switch(category) {
        case 'dessert':
        case 'desserts':
        case 'candies':
        case 'candy':
        case 'muffins':
        case 'pies':
        case 'cakes':
        case 'cake':
            return 'dessert';
        case 'breads':
        case 'bread':
            return 'bread';
        case 'asian':
        case 'chinese':
        case 'vietnamese':
            return 'asian';
        case 'poultry':
            return 'poultry';
        case 'meat':
        case 'meats':
        case 'steak':
            return 'meat';
        case 'main dish':
            return 'main';
        case 'salad':
        case 'salads':
            return 'salad';
        case 'seafood':
        case 'fish':
            return 'seafood';
        case 'soup':
        case 'soups':
        case 'stew':
            return 'soup';
        case 'vegetables':
            return 'vegetables';
        case 'appetizer':
        case 'appetizers':
        case 'dips':
            return 'appetizer';
        default:
            return 'default';
    }
};


exports.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.listProjection = {
    name: 1,
    author: 1,
    category: 1,
    icon: 1,
    tags: 1,
    printCount:1,
    linkName: 1,
    dateCreated: 1,
    dateModified: 1,
    score: {$meta: 'textScore'}
};
