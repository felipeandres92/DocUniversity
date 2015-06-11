'use strict';

var passwordsLib = require('../../../lib/passwordsLib');

module.exports = function (router) {

  router.get('/', function (req, res) {

    passwordsLib.getAll(function(error, results){

      res.setHeader('Access-Control-Allow-Origin','*');

      if (error){
        return res.status(500).json(error).end();
      }

      res.status(200).json(results).end();

    });

  });

  router.get('/:id', function (req, res) {

    var id = req.params.id;

    passwordsLib.getById(id, function(error, password){

      if (error){
        if (error.message === 'NOT_FOUND'){
          return res.status(404).end();
        }
        return res.status(500).json(error).end();
      }

      res.status(200).json(password).end();

    });
  });

  router.post('/', function (req, res) {

    var newPassword = req.body;

    passwordsLib.create(newPassword, function(error){

      if (error){
        return res.status(500).json(error).end();
      }

      res.status(201).end();

    });
  });

  router.put('/:id', function (req, res) {

    var id = req.params.id;
    var newData = req.body;

    passwordsLib.update(id, newData, function(error, password){

      if (error){
        if (error.message === 'NOT_FOUND'){
          return res.status(404).end();
        }
        return res.status(500).json(error).end();
      }

      res.status(200).json(password).end();

    });
  });

  router.delete('/:id', function (req, res) {

    var id = req.params.id;

    passwordsLib.delete(id, function(error, password){

      if (error){
        if (error.message === 'NOT_FOUND'){
          return res.status(404).end();
        }
        return res.status(500).json(error).end();
      }

      res.status(204).end();

    });
  });


};
