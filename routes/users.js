var express = require('express');
const { dishesRequest, dishCreate, dishUpdate, dishDelete} = require('../db/request');
var router = express.Router();

router.get('/:tableName', function(req, res, next) {
  const tableName = req.params.tableName;
  dishesRequest(tableName,(err,dishes)=>{
    if(err){
      return next(err);
    }
    res.send(dishes);
  });
});

router.post('/:tableName', function(req, res, next) {
  const tableName = req.params.tableName;
  const newDish = req.body; 
  dishCreate(tableName,newDish,(err,dishes)=>{
    if(err){
      return next(err);
    }
    res.send(dishes);
  });
});

router.put('/:nombre_tabla/:index', function(req, res, next) {
  const nombreTabla = req.params.nombre_tabla; 
  const index = req.params.index;
  const updatedDish = req.body; 

      dishUpdate(nombreTabla,index,updatedDish,(err,actualizada)=>{
        if(err){
          return next(err);
        }
        res.send(actualizada);
      });
    });



router.delete('/:nombre_tabla/:index', function(req, res, next) {
  const nombreTabla = req.params.nombre_tabla; 
  const index = req.params.index;
  dishDelete(nombreTabla,index,(err,deleted)=>{
    if(err){
      return next(err);
    }
    res.send('dish deleted');
  });
});

module.exports = router;
