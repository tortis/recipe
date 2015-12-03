var conn = new Mongo();
var db = conn.getDB('recipe');

var toProperCase = function (s) {
    return s.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

db.recipes.find({name: /^[^a-z]*$/}, {name: 1}).forEach(function(r) {
    db.recipes.update({_id: r._id}, {$set: {name: toProperCase(r.name)}});
});

db.recipes.find({author: /^[^a-z]*$/}, {author: 1}).forEach(function(r) {
    db.recipes.update({_id: r._id}, {$set: {author: toProperCase(r.author)}});
});

db.recipes.find({'ingredients.list.name': /^[^a-z]*$/}, {ingredients: 1}).forEach(function(r) {
    for (var i = 0; i < r.ingredients.length; i++) {
        for (var j = 0; j < r.ingredients[i].list.length; j++) {
            r.ingredients[i].list[j] = toProperCase(r.ingredients[i].list[j].name);
        }
    }
    db.recipes.update({_id: r._id}, {$set: {ingredients: r.ingredients}});
});
