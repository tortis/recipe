var conn = new Mongo();
var db = conn.getDB('recipe');

function getIcon(category) {
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
}

db.recipes.find({icon: 'default'}, {category: 1}).forEach(function(r) {
    db.recipes.update({_id: r._id}, {$set: {icon: getIcon(r.category)}});
});

//db.recipes.find({icon: 'default'}, {tags: 1}).forEach(function(r) {
//    var newIcon = 'default';
//    for (var i = 0; i < r.tags.length; i++) {
//        newIcon = getIcon(r.tags[i]);
//        if (newIcon !== 'default') {
//            break;
//        }
//    }
//
//    db.recipes.update({_id: r._id}, {$set: {icon: newIcon}});
//});
