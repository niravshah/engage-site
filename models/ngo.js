var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ngoInfoSchema = new Schema({
    name: {type: String},
    sname: {type: String},
    bio: {type: String},
    addDescription: {type: String},
    activityType:{type: String},
    orientation:{type: String},
    level:{type: String},
    category: {type: String},
    website: {type: String},
    email: {type: String},
    address: {type: String},
    phone: {type: String},
    banner: {type: String},
    logo: {type: String},
    teamMembers: {type: Array, default:[]},
    projects: {type: Array, default:[]},
    status:{type:String, default:'active'}
});
module.exports = mongoose.model('Ngo', ngoInfoSchema);