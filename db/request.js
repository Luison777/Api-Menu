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

function dishCreate(tabla,item,callback){
    const keys=Object.keys(item);
    const columnas=keys.join(', ');
    const valores= keys.map(key=> `'${item[key]}'`).join(', ');
    db.any(`INSERT INTO ${tabla} (${columnas}) VALUES(${valores}) returning *`)
    .then(([resultado])=>{
        callback(null,resultado);
    })
    .catch(error=>{
        callback(error);
    });
}

function dishUpdate(tabla,id,item,callback){
    const keys=Object.keys(item);
    const actualizaciones= keys.map(key=> `${key}='${item[key]}'`).join(', ');
    const sql=`UPDATE ${tabla} set ${actualizaciones} WHERE id=${id} returning *`;
    db.any(sql)
    .then(([resultado])=>{
        callback(null,resultado);
    })
    .catch(error=>{
        callback(error);
    });
}

function dishDelete(tabla,id,callback){
    db.any(`DELETE FROM ${tabla} WHERE id=${id}`)
    .then(()=>{
        callback(null)
    })
    .catch(error=>{
        callback(error);
    });
}

    module.exports={
       dishesRequest,
       dishCreate,
       dishDelete,
       dishUpdate
    };