var mongoose = require('mongoose');
var utils    = require('../util/utils.js');
var schema   = mongoose.Schema;

var recipeSchema = new schema({
    name         : { type: String, required: true, index: true },
    linkName     : { type: String, unique: true },
    dateCreated  : { type: Date, default: Date.now, index: true },
    dateModified : { type: Date, default: Date.now },
    author       : String,
    category     : String,
    icon         : String,
    yield        : String,
    printCount   : { type: Number, default: 0 , index: true },
    tags         : [String],
    notes        : String,
    ingredients  : [{
        name: String,
        list: [{
            name: {type: String, required: true},
            qty: {type: String, required: true},
            unit: {type: String}
        }]
    }],
    instructions : [{
        name: String,
        content: String
    }]
});

recipeSchema.index({
    name: 'text',                                                                                                                                              
    author: 'text',
    category: 'text',
    tags: 'text',
    notes: 'text',
    'instructions.content': 'text',
    'ingredients.list.name': 'text'
}, {
    name: 'RecipeSearch',
    weights: {
        name: 10,
        author: 4,
        category: 3,
        tags: 3,
        notes: 1,
        'instructions.content': 1,
        'ingredients.list.name': 1
    }
});

recipeSchema.pre('validate', function(next) {
    // Generate linkName
    if (this.name == null) return next();
    this.linkName = this.name.replace(/\W/g, '').toLowerCase();
    if (this.author) this.linkName += '-' + this.author.replace(/\W/g, '').toLowerCase();

    // Lower case
    this.category = this.category.toLowerCase();
    this.tags = this.tags.map(function(e) { return e.toLowerCase(); });

    // If no icon is selected, try to pick one based on the category
    if (this.icon == null) {
        this.icon = utils.iconFromCategory(this.category);
    }

    next();
});

var Recipe = module.exports = mongoose.model('recipe', recipeSchema);
