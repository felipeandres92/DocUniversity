'use strict';

var PasswordModel = require('../../models/password');
var logger = require('../logger');

var PasswordsLib = function(){
  var self = this;

  self.getAll = function(callback){
    PasswordModel.find().exec(function(error, data){
        callback(error, data);
    });
  };

  self.getById = function(id, callback){
    PasswordModel.findOne({_id: id}).exec(function(error, data){
      if(!data){
        return callback(new Error('NOT_FOUND'));
      }
      callback(error, data);
    });
  };

  self.create = function(passwordData, callback){
    var newPassword = new PasswordModel(passwordData);

    // save user to database
    newPassword.save(function(error) {
      if (error) callback(error);
      // fetch user and test password verification
      newPassword.findOne({ username: passwordData.username }, function(error, pass) {
        if (error) callback(error);
        // test a matching password
        pass.comparePassword(passwordData.password, function(error, isMatch) {
            if (error) callback(error);
            //console.log(passwordData.password, isMatch); // -&gt; Password123: true
        });
     
        // test a failing password
        pass.comparePassword(passwordData.password, function(error, isMatch) {
            if (error) callback(error);
            //console.log(passwordData.password, isMatch); // -&gt; 123Password: false
        });
      });
    });
  };

  self.update = function(id, newData, callback){
    delete newData._id;

    PasswordModel.findOneAndUpdate({ _id: id }, newData, function(error, result){
      if(!result){
        return callback(new Error('NOT_FOUND'));
      }
      callback(error, result);
    });
  };

  self.delete = function(id, callback){
    PasswordModel.remove({_id: id}, function(error){
      callback(error, id);
    });
  };
};

module.exports = new PasswordsLib();
