var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
    fName: String,
    lName: String,
    mobile: Number,
    empId: String
});

module.exports = mongoose.model('Contact', ContactSchema, 'Contact');