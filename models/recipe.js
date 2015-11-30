var mongoose = require('mongoose');
var schema   = mongoose.Schema;

var recipeSchema = new schema({
    name         : { type: String, required: true },
    linkName     : { type: String, unique: true },
    dateCreated  : { type: Date, default: Date.now },
    dateModified : { type: Date, default: Date.now },
    author       : String,
    category     : String,
    yield        : String,
    printCount   : { type: Number, default: 1 },
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

recipeSchema.pre('validate', function(next) {
    // Generate linkName
    if (this.name == null) return next();
    this.linkName = this.name.replace(/\W/g, '').toLowerCase();
    if (this.author) this.linkName += '-' + this.author.replace(/\W/g, '').toLowerCase();

    // Lower case
    this.category = this.category.toLowerCase();
    this.tags = this.tags.map(function(e) { return e.toLowerCase(); });

    next();
});

var Recipe = module.exports = mongoose.model('recipe', recipeSchema);
