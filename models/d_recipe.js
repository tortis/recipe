var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = mongoose.model('d_recipe', new Schema({}, {strict: false}));
