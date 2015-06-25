'use strict';

var universitysLib = require('../../../lib/universitysLib');

module.exports = function (router) {

  router.get('/', function (req, res) {

    universitysLib.getAll(function(error, results){

      res.setHeader('Access-Control-Allow-Origin','*');

      if (error){
        return res.status(500).json(error).end();
      }

      res.status(200).json(results).end();

    });

  });

  router.get('/:id', function (req, res) {

    var id = req.params.id;

    universitysLib.getById(id, function(error, university){

      if (error){
        if (error.message === 'NOT_FOUND'){
          return res.status(404).end();
        }
        return res.status(500).json(error).end();
      }

      res.status(200).json(university).end();

    });
  });

  router.post('/', function (req, res) {

    var newUniversity = req.body;

    universitysLib.create(newUniversity, function(error){

      if (error){
        return res.status(500).json(error).end();
      }

      res.status(201).end();

    });
  });

  router.put('/:id', function (req, res) {

    var id = req.params.id;
    var newData = req.body;

    universitysLib.update(id, newData, function(error, university){

      if (error){
        if (error.message === 'NOT_FOUND'){
          return res.status(404).end();
        }
        return res.status(500).json(error).end();
      }

      res.status(200).json(university).end();

    });
  });

  router.delete('/:id', function (req, res) {

    var id = req.params.id;

    universitysLib.delete(id, function(error, university){

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
