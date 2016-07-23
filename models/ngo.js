var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ngoInfoSchema = new Schema({
    name: {type: String},
    sname: {type: String},
    category: {type: String},
    website: {type: String},
    address: {type: String},
    phone: {type: String},
    banner: {type: String},
    logo: {type: String},
    teamMembers: {type: Array, default:[]}
});
module.exports = mongoose.model('Ngo', ngoInfoSchema);