'use strict';

var mongoose = require('mongoose');

var registrationSchema = mongoose.Schema({
  firstname:  {type: String, required:true},
  lastname: {type: String, required:true},
  username: {type: String, required:true},
  email: {type: String, required:true},
  pass: {type: String, required:true},
});

module.exports = mongoose.model('Registration', registrationSchema );
