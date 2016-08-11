var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uiErrorSchema = new Schema({
    reason: {type: String},
    exception: {type: Object},
    date:{type:Date}
});
module.exports = mongoose.model('_ui_error', uiErrorSchema);