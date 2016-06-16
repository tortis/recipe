var mongoose = require('mongoose');
var schema   = mongoose.Schema;

var userSchema = new schema({
    username: { type: String, required: true, index: true},
    password: { type: String, required: true}
});

module.exports = mongoose.model('user', userSchema);
