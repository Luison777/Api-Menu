var express = require('express');
const { dishesRequest, dishCreate, dishUpdate, dishDelete} = require('../db/request');
var router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: 'public/images' });
var path = require('path');
const fs = require('fs');


router.get('/:tableName', function(req, res, next) {
  const tableName = req.params.tableName;
  dishesRequest(tableName,(err,dishes)=>{
    if(err){
      return next(err);
    }
    res.send(dishes);
  });
});

router.post('/:tableName', upload.single('src'), function (req, res, next) {
  const tableName = req.params.tableName;
  const dish = req.body.dish; 
  const price = req.body.price;
  const ingredients=req.body.ingredients;
  const ext = path.extname(req.file.originalname); 
  const src = req.file.filename + ext;

  const newDish = {
    dish: dish,
    price: price,
    ingredients: ingredients,
    src: src
  };

  fs.renameSync('public/images/' + req.file.filename, 'public/images/'+ src);

  dishCreate(tableName,newDish,(err,dishes)=>{
    if(err){
      return next(err);
    }
    res.send(dishes);
  });
});

router.put('/:tableName/:index', upload.single('src'), function (req, res, next) {
  const tableName = req.params.tableName;
  const index = req.params.index;
  const dish = req.body.dish; 
  const price = req.body.price;
  const ingredients=req.body.ingredients;

  let newDish = {
    dish: dish,
    price: price,
    ingredients: ingredients
  };
  
  if (req.file && req.file.size > 0) {
    const ext = path.extname(req.file.originalname); 
    const src = req.file.filename + ext;
    
    newDish = {
      ...newDish,
      src: src
    };

    fs.renameSync('public/images/' + req.file.filename, 'public/images/' + src);
  }

  dishUpdate(tableName,index,newDish,(err,actualizada)=>{
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
    res.send(deleted);
  });
});


module.exports = router;
