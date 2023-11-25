const db=require('./configuration');

function dishesRequest(tabla,callback){
    db.any(`SELECT * FROM ${tabla}`)
        .then(resultado=>{
                callback(null,resultado);
        })
        .catch(error=>{
            callback(error);
        });
    };

    module.exports={
       dishesRequest,
    };