'use strict';

var mongoose = require('mongoose');

var universitySchema = mongoose.Schema({
  name:  {type: String, required:true}
});

module.exports = mongoose.model('University', universitySchema );
