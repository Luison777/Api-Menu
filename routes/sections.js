var express = require('express');
const {  createSubsection, createSection, updateSubsection, updateSection, deleteSubsection, deleteSection} = require('../db/request');
var router = express.Router();

router.post('/subsection/:id', async function(req, res, next) {
    const id = req.params.id;
    const value = req.body.value;
    const subsections = req.body.subsections;
    const subTable = req.body.subTable;
    const newSubsections = {
        value: value,
        subsections: subsections
    };

    createSubsection(subTable, id, newSubsections, (err, resultado) => {
        if (err) {
            next(err);
        } else {
            res.send({ actualizada: resultado });
        }
    });
});
router.post('/section', async function(req, res, next) {
    const value = req.body.value;
    const subsections = req.body.subsections;
    const name= req.body.name;
    const newSubsections = {
        name:name,
        value: value,
        subsections: subsections
    };

    createSection( newSubsections, name, (err, resultado) => {
        if (err) {
            next(err);
        } else {
            res.send({ actualizada: resultado });
        }
    });
});
router.put('/subsection/:id', async function(req, res, next) {
    const id=req.params.id;
    const value = req.body.value;
    const subsections = req.body.subsections;
    const name= req.body.name;
    const newName=req.body.newName;

    const newSubsections = {
        value: value,
        subsections: subsections
    };

    updateSubsection( newSubsections,id, name,newName, (err, resultado) => {
        if (err) {
            next(err);
        } else {
            res.send({ actualizada: resultado });
        }
    });
});
router.put('/section/:id', async function(req, res, next) {
    const id=req.params.id;
    const value = req.body.value;
    const subsections = req.body.subsections;
    const name= req.body.name;
    const newName=req.body.newName;
    
    const newSubsections = {
        name:newName,
        value: value,
        subsections: subsections
    };

    updateSection( newSubsections,id, name,newName, (err, resultado) => {
        if (err) {
            next(err);
        } else {
            res.send({ actualizada: resultado });
        }
    });
});
router.delete('/section/:id/:name', async function(req, res, next) {
    const id = req.params.id;
    const name = req.params.name;

    deleteSection(id, name, (err, resultado) => {
        if (err) {
            next(err);
        } else {
            res.send({ eliminada: resultado });
        }
    });
});
router.delete('/subsection/:id', async function(req, res, next) {
    const id=req.params.id;
    const value = req.body.value;
    const subsections = req.body.subsections;
    const name= req.body.name;


    const newSubsections = {
        value: value,
        subsections: subsections
    };

    deleteSubsection(id,newSubsections,name, (err, resultado) => {
        if (err) {
            next(err);
        } else {
            res.send({ actualizada: resultado });
        }
    });
});


module.exports = router;