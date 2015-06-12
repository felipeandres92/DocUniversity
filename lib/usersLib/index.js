'use strict';
/*
var ProductModel = require('../../models/product');
var logger = require('../logger');

//'../../../models/user.js'

var ProductsLib = function(){
  var self = this;

  self.getAll = function(callback){
    ProductModel.find().exec(function(error, data){
        callback(error, data);
    });
  };

  self.getById = function(id, callback){
    ProductModel.findOne({_id: id}).exec(function(error, data){
      if(!data){
        return callback(new Error('NOT_FOUND'));
      }
      callback(error, data);
    });
  };

  self.create = function(productData, callback){
    var newProduct = new ProductModel(productData);

    newProduct.save(function(error, product, numAffected){
        callback(error, product);
    });
  };

  self.update = function(id, newData, callback){
    delete newData._id;

    ProductModel.findOneAndUpdate({ _id: id }, newData, function(error, result){
      if(!result){
        return callback(new Error('NOT_FOUND'));
      }
      callback(error, result);
    });
  };

  self.delete = function(id, callback){
    ProductModel.remove({_id: id}, function(error){
      callback(error, id);
    });
  };
};

module.exports = new ProductsLib();
*/
var mongoose = require('mongoose'),
    User = require('../../../models/user.js');

var connStr = 'mongodb://localhost:27017/mongoose-bcrypt-test';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

// create a user a new user
var testUser = new User({
    username: 'jmar777',
    password: 'Password123'
});

// save user to database
testUser.save(function(err) {
    if (err) throw err;

    // fetch user and test password verification
    User.findOne({ username: 'jmar777' }, function(err, user) {
        if (err) throw err;

        // test a matching password
        user.comparePassword('Password123', function(err, isMatch) {
            if (err) throw err;
            console.log('Password123:', isMatch); // -> Password123: true
        });

        // test a failing password
        user.comparePassword('123Password', function(err, isMatch) {
            if (err) throw err;
            console.log('123Password:', isMatch); // -> 123Password: false
        });
    });
});