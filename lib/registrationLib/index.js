'use strict';

var RegistrationModel = require('../../models/registration');
var logger = require('../logger');

var RegistrationsLib = function(){
  var self = this;

  self.getAll = function(callback){
    RegistrationModel.find().exec(function(error, data){
        callback(error, data);
    });
  };

  self.getById = function(id, callback){
    RegistrationModel.findOne({_id: id}).exec(function(error, data){
      if(!data){
        return callback(new Error('NOT_FOUND'));
      }
      callback(error, data);
    });
  };

  self.create = function(registrationData, callback){
    var newRegistration = new RegistrationModel(registrationData);

    newRegistration.save(function(error, registration, numAffected){
        callback(error, registration);
    });
  };

  self.update = function(id, newData, callback){
    delete newData._id;

    RegistrationModel.findOneAndUpdate({ _id: id }, newData, function(error, result){
      if(!result){
        return callback(new Error('NOT_FOUND'));
      }
      callback(error, result);
    });
  };

  self.delete = function(id, callback){
    RegistrationModel.remove({_id: id}, function(error){
      callback(error, id);
    });
  };
};

module.exports = new RegistrationsLib();
