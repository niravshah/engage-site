var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    uname: {type: String},
    pword: {type: String},
    role: {type: String},
    orgId: {type: String}
});
module.exports = mongoose.model('User', userSchema);