var fs    = require('fs');
var Set   = require('collections/set');
var flags = require('flags');

function loadMetadata() {
    exports.data = {};
    fs.readFile(flags.get('meta'), 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            console.log('Proceeding with empty metadata');
            exports.data.tags = new Set();
            exports.data.categories = new Set();
        } else {
            var d = JSON.parse(data);
            exports.data.tags = new Set(d.tags);
            exports.data.categories = new Set(d.categories);
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
