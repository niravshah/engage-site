var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    shortid: {type: String},
    location: {type: String},
    contact: {type: String},
    category: {type: Array, default: []},
    sDate: {type: Date},
    eDate: {type: Date},
    managingTeam: {type: String},
    volunteers: {type: String},
    skillsRequired: {type: Array, default: []},
    skillsGained: {type: Array, default: []},
    qualifications: {type: String},
    ngo: {type: mongoose.Schema.Types.ObjectId, ref: 'Ngo', required: true}
});

module.exports = mongoose.model('Project', projectSchema);