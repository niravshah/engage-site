var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {type: String},
    uname: {type: String},
    pword: {type: String},
    role: {type: String},
    orgId: {type: String},
    resetPassword:{type:Boolean,default:true}
});
module.exports = mongoose.model('User', userSchema);