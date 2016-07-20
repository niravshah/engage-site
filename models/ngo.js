var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ngoInfoSchema = new Schema({
    "name": {
        "title": "Name",
        "type": "string"
    },
     "sname": {
        "title": "Name",
        "type": "string"
    },
    "category": {
        "title": "Name",
        "type": "string"
    },
    "website": {
        "title": "Name",
        "type": "string"
    },
    "address": {
        "title": "Name",
        "type": "string"
    },
    "phone": {
        "title": "Name",
        "type": "string"
    },
    "banner": {
        "title": "Name",
        "type": "string"
    },
    "logo": {
        "title": "Name",
        "type": "string"
    }
});
module.exports = mongoose.model('Ngo', ngoInfoSchema);