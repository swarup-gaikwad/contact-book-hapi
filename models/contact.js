var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  empId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Contact', ContactSchema);
