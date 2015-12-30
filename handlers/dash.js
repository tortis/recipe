var Recipe  = require('../models/index.js').Recipe;
var utils   = require('../util/utils.js');

const FAV_LIMIT = 50;
const NEW_LIMIT = 50
const FAV_COUNT = 5;
const NEW_COUNT = 5;

// Get a short random list of favorites, and a short random list of new recipes
// This handler is slow as balls, need to figure out why.
exports.get = function(req, res, next) {
    // Get the top 100 most printed recipes, then randomly pick 10
    Recipe.find().select(utils.listProjection).sort({printCount: -1}).limit(FAV_LIMIT).exec()
    .then(function(r) {
        var favs = [];
        for (var i = 0; i < FAV_COUNT; i++) {
            favs.push(r[utils.getRandomInt(0, r.length-1)]);
        }
        return [Recipe.find().select(utils.listProjection).sort({dateCreated: 'desc'}).limit(NEW_LIMIT).exec(), favs];
    })
    .spread(function(r, favs) {
        var newest = [];
        for (var i = 0; i < NEW_COUNT; i++) {
            newest.push(r[utils.getRandomInt(0, r.length-1)]);
        }
        return res.send({
            favorites: favs,
            newest: newest
        });
    })
    .catch(function(err) {
        return res.send(utils.parseError(err));
    });
};
