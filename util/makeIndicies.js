var conn = new Mongo();
var db = conn.getDB('recipe');

// Recipe linkName index
db.recipes.createIndex( {linkName: 1});

// Recipe text search index
db.recipes.createIndex({
    name: 'text',
    author: 'text',
    category: 'text',
    tags: 'text',
    notes: 'text',
    'sections.instructions': 'text',
    'sections.ingredients.name': 'text'
},{
    name: 'RecipeSearch',
    weights: {
        name: 10,
        author: 4,
        category: 3,
        tags: 3,
        notes: 1,
        'sections.instructions': 1,
        'sections.ingredients.name': 1
    }
});
