var fs  = require('fs');
var Set = require('collections/set');

function loadMetadata() {
    exports.data = {};
    fs.readFile('meta.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            console.log('Proceeding with empty metadata');
            exports.data.tags = new Set();
            exports.data.categories = new Set();
        } else {
            var d = JSON.parse(data);
            exports.data.tags = new Set(d.tags);
            exports.data.categories = new Set(d.categories);
            console.log('meta.json loaded');
        }
    });
}

function saveMetadata() {
    fs.writeFile('meta.json', JSON.stringify(exports.data, null, 4), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('meta.json saved');
        }
    });
}

exports.addMetadata = function(tags, category) {
    if (tags.constructor === Array) {
        var n = new Set(tags);
        exports.data.tags = exports.tags.union(n);
    }

    if (category) {
        exports.data.categories.add(category);    
    }

    saveMetadata();
};

loadMetadata();
