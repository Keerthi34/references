var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({

  stid: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
  },
  fathername: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  mailid: {
    type: String,
    unique: true,
    required: true,
    trim: true
  }
});

module.exports=mongoose.model('create-account',UserSchema);
