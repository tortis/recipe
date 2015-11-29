var restify = require('restify');
var Recipe  = require('../models/index.js').Recipe;
var utils   = require('../util/utils.js');
var meta    = require('../util/meta.js');

exports.create = function(req, res, next) {
    Recipe.create(req.body, function(err, r) {
        if (err) return res.send(utils.parseError(err));
        res.send(r);

        var ai = utils.processIngData(r.ingredients);
        meta.addMetadata(r.tags, r.category, ai.names, ai.units);
    });
};

exports.update = function(req, res, next) {
    var h = function(err, r) {
        if (err) return res.send(utils.parseError(err));
        if (r == null) return res.send(new restify.NotFoundError('No recipe with this id exists'));
        res.send(r);

        var ai = utils.processIngData(r.ingredients);
        meta.addMetadata(req.body.tags, req.body.category, api.names, api.units);
    };

    if (utils.isObjectId(req.params.id)) {
        Recipe.findByIdAndUpdate(req.params.id, {$set: req.body}, h);
    } else {
        Recipe.update({linkName: req.params.id.toLowerCase()}, {$set: req.body}, h);
    }
};

exports.delete = function(req, res, next) {
    var h = function(err, r) {
        if (err) return res.send(parseError(err));
        if (r == null) return res.send(new restify.NotFoundError('No recipe with this id exists'));
        return res.send({success: true});
    };
    
    if (utils.isObjectId(req.params.id)) {
        Recipe.findByIdAndRemove(req.params.id, h);
    } else {
        Recipe.findOneAndRemove({linkName: req.params.id.toLowerCase()}, h);
    }
};

// Look up a recipe using either the linkName or the _id
exports.get = function(req, res, next) {
    var h = function(err, r) {
        if (err) return res.send(utils.parseError(err));
        if (r == null) return res.send(new restify.NotFoundError('No recipe with this id exists'));
        return res.send(r);
    };

    if (utils.isObjectId(req.params.id)) {
        Recipe.findById(req.params.id, h);
    } else {
        Recipe.findOne({linkName: req.params.id.toLowerCase()}, h);
    }
};

exports.search = function(req, res, next) {
    // Sanitize query variables
    if (req.params.limit && req.params.limit > 50) req.params.limit = 50;
    if (req.params.limit == null) req.params.limit = 50;
    if (req.params.limit < 0) req.params.limit = -req.params.limit;
    if (req.params.dir == null ) req.params.dir = 'asc';
    if (req.params.dir != 'asc' && req.params.dir != 'desc') req.params.dir = 'asc';
    if (req.params.page == null) req.params.page = 1;
    if (req.params.page < 1) req.params.page = 1;
    if (req.params.orderby == null) req.params.orderby = 'name';
    if (req.params.tags) {
        req.params.tags = req.params.tags.split(',');
        req.params.tags = req.params.tags.map(function(e) { return e.toLowerCase(); });
    }

    var sort = {};
    sort[req.params.orderby] = req.params.dir;

    var select = {
        name: 1,
        author: 1,
        category: 1,
        tags: 1,
        printCount:1,
        linkName: 1,
        dateCreated: 1,
        dateModified: 1
    };

    var filter = {};
    if (req.params.category) filter.category = req.params.category;
    if (req.params.q) {
        filter.$text = {$search: req.params.q};
        select.score = {$meta: "textScore"};
        sort.score = {$meta: "textScore"};
    }
    if (req.params.tags) filter.tags = {$in: req.params.tags};

    var q = Recipe.find(filter);
    q.skip( (req.params.page-1)*req.params.limit )
    .limit(req.params.limit)
    .sort(sort)
    .select(select)
    .exec()
    .then(function(r) {
        return [r, q.count()];
    })
    .spread(function(r, c) {
        res.setHeader('result-count', c);
        res.setHeader('result-limit', req.params.limit);
        res.setHeader('result-page', req.params.page);
        if (req.params.q) res.setHeader('result-q', req.params.q);
        return res.send(r);
    })
    .catch(function(err) {
        return res.send(utils.parseError(err));
    });
};

exports.print = function(req, res, next) {
    var h = function(err, r) {
        if (err) {
            console.log(err);
            res.send(500, {success: false});
        } else {
            res.send({success: true});
        }
    };
    if (utils.isObjectId(req.params.id)) {
        Recipe.findByIdAndUpdate(req.params.id, {$inc: {printCount: 1}}, h);
    } else {
        Recipe.update({linkName: req.params.id.toLowerCase()}, {$inc: {printCount: 1}}, h);
    }
};

exports.meta = function(req, res, next) {
    res.send(meta.data);
};
