var fs    = require('fs');
var Set   = require('collections/set');
var flags = require('flags');

var dirty = false;

function loadMetadata() {
    exports.data = {};
    fs.readFile(flags.get('meta'), 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            console.log('Proceeding with empty metadata');
            exports.data.tags = new Set();
            exports.data.categories = new Set();
            exports.data.units = new Set();
            exports.data.ingredients = new Set();
        } else {
            var d = JSON.parse(data);
            exports.data.tags = new Set(d.tags);
            exports.data.categories = new Set(d.categories);
            exports.data.units = new Set(d.units);
            exports.data.ingredients = new Set(d.ingredients);
            console.log(flags.get('meta')+' loaded');
        }
    });
}

function saveMetadata() {
    fs.writeFile(flags.get('meta'), JSON.stringify(exports.data, null, 4), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log(flags.get('meta')+' saved');
        }
    });
}

exports.addMetadata = function(tags, category, ingredients, units) {
    if (tags.constructor === Array) {
        var n = new Set(tags);
        exports.data.tags = exports.data.tags.union(n);
    }

    if (category) {
        exports.data.categories.add(category);    
    }

    if (ingredients.constructor === Array) {
        var ingSet = new Set(ingredients);
        exports.data.ingredients = exports.data.ingredients.union(ingSet);
    }

    if (units.constructor === Array) {
        var unitSet = new Set(units);
        exports.data.units = exports.data.units.union(unitSet);
    }

    dirty = true;
};

setInterval(function() {
    if (dirty === true) {
        saveMetadata();
        dirty = false;
        console.log('saved new metadata');
    } else {
    }
}, 60000);

loadMetadata();
