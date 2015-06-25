'use strict';

var UniversityModel = require('../../models/university');
var logger = require('../logger');

var UniversitysLib = function(){
  var self = this;

  self.getAll = function(callback){
    UniversityModel.find().exec(function(error, data){
        callback(error, data);
    });
  };

  self.getById = function(id, callback){
    UniversityModel.findOne({_id: id}).exec(function(error, data){
      if(!data){
        return callback(new Error('NOT_FOUND'));
      }
      callback(error, data);
    });
  };

  self.create = function(universityData, callback){
    var newUniversity = new UniversityModel(universityData);

    newUniversity.save(function(error, university, numAffected){
        callback(error, university);
    });
  };

  self.update = function(id, newData, callback){
    delete newData._id;

    UniversityModel.findOneAndUpdate({ _id: id }, newData, function(error, result){
      if(!result){
        return callback(new Error('NOT_FOUND'));
      }
      callback(error, result);
    });
  };

  self.delete = function(id, callback){
    UniversityModel.remove({_id: id}, function(error){
      callback(error, id);
    });
  };
};

module.exports = new UniversitysLib();
