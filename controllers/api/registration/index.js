'use strict';

var registrationLib = require('../../../lib/registrationLib');

module.exports = function (router) {

  router.get('/', function (req, res) {

    registrationLib.getAll(function(error, results){

      res.setHeader('Access-Control-Allow-Origin','*');

      if (error){
        return res.status(500).json(error).end();
      }

      res.status(200).json(results).end();

    });

  });

  router.get('/:id', function (req, res) {

    var id = req.params.id;

    registrationLib.getById(id, function(error, registration){

      if (error){
        if (error.message === 'NOT_FOUND'){
          return res.status(404).end();
        }
        return res.status(500).json(error).end();
      }

      res.status(200).json(registration).end();

    });
  });

  router.post('/', function (req, res) {

    var newRegistration = req.body;

    registrationLib.create(newRegistration, function(error){

      if (error){
        return res.status(500).json(error).end();
      }

      res.status(201).end();

    });
  });

  router.put('/:id', function (req, res) {

    var id = req.params.id;
    var newData = req.body;

    registrationLib.update(id, newData, function(error, registration){

      if (error){
        if (error.message === 'NOT_FOUND'){
          return res.status(404).end();
        }
        return res.status(500).json(error).end();
      }

      res.status(200).json(registration).end();

    });
  });

  router.delete('/:id', function (req, res) {

    var id = req.params.id;

    registrationLib.delete(id, function(error, registration){

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
