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
async function createSubsection(subtabla, id, item, callback) {
    try {
        await db.tx(async (t) => {
            // Actualizar la tabla
            const keys = Object.keys(item);
            const actualizaciones = keys.map(key => `${key}='${item[key]}'`).join(', ');
            const sql = `UPDATE sections SET ${actualizaciones} WHERE id=${id} RETURNING *`;
            const resultadoActualizacion = await t.oneOrNone(sql);
    
            // Si la actualización fue exitosa, crear la tabla
            if (resultadoActualizacion) {
                await t.none(`CREATE TABLE ${subtabla} (
                    id SERIAL PRIMARY KEY,
                    dish VARCHAR (100),
                    ingredients TEXT,
                    price VARCHAR (40),
                    src VARCHAR(255)
                );`);
                callback(null, resultadoActualizacion);
            } else {
                throw new Error('La seccion no se pudo crear con exito.');
            }
        });
    } catch (error) {
        callback(error);
    }
}
async function createSection( item,sectionTable, callback) {
    try {
        await db.tx(async (t) => {
            // Actualizar la tabla
            const keys=Object.keys(item);
            const columnas=keys.join(', ');
            const valores= keys.map(key=> `'${item[key]}'`).join(', ');
            const sql = `INSERT INTO sections (${columnas}) VALUES(${valores}) RETURNING *`;
            const resultadoActualizacion = await t.oneOrNone(sql);
    
            // Si la actualización fue exitosa, crear la tabla
            if (resultadoActualizacion) {
                await t.none(`CREATE TABLE ${sectionTable} (
                    id SERIAL PRIMARY KEY,
                    dish VARCHAR (100),
                    ingredients TEXT,
                    price VARCHAR (40),
                    src VARCHAR(255)
                );`);
                callback(null, resultadoActualizacion);
            } else {
                throw new Error('La seccion no se pudo crear con exito.');
            }
        });
    } catch (error) {
        callback(error);
    }
}
async function updateSubsection(item,id,subtable,newSubtableName,callback){
    try{
        await db.tx(async (t)=>{
            const keys=Object.keys(item);
            const actualizaciones= keys.map(key=> `${key}='${item[key]}'`).join(', ');
            const sql=`UPDATE sections set ${actualizaciones} WHERE id=${id} returning *`;
            const resultadoActualizacion = await t.oneOrNone(sql);
            if(resultadoActualizacion){
                await t.none(`ALTER TABLE ${subtable} RENAME TO ${newSubtableName}`);
                callback(null, resultadoActualizacion);
            } else {
                throw new Error('La actualización no fue exitosa.');
            }
        })
    }catch(error){callback(error);}
}
async function updateSection(item,id,table,newTableName,callback){
    try{
        await db.tx(async (t)=>{
            const keys=Object.keys(item);
            const actualizaciones= keys.map(key=> `${key}='${item[key]}'`).join(', ');
            const sql=`UPDATE sections set ${actualizaciones} WHERE id=${id} returning *`;
            const resultadoActualizacion = await t.oneOrNone(sql);
            if(resultadoActualizacion){
                await t.none(`ALTER TABLE ${table} RENAME TO ${newTableName}`);
                callback(null, resultadoActualizacion);
            } else {
                throw new Error('La actualización no fue exitosa.');
            }
        })
    }catch(error){callback(error);}
}
async function deleteSubsection(id,item,subtable,callback){
    try{
        await db.tx(async(t)=>{
            const keys=Object.keys(item);
            const actualizaciones= keys.map(key=> `${key}='${item[key]}'`).join(', ');
            const sql=`UPDATE sections set ${actualizaciones} WHERE id=${id} returning *`;
            const resultadoActualizacion = await t.oneOrNone(sql);
            if(resultadoActualizacion){
                await t.none(`DROP TABLE ${subtable}`);
                callback(null, resultadoActualizacion);
            } else {
                throw new Error('La subseccion no pudo ser eliminada.');
            }
        })
    }catch(error){}
}
async function deleteSection(id, table, callback) {
    try {
        await db.tx(async (t) => {
            const deleteQuery = 'DELETE FROM sections WHERE id=$1'; // Utilizando consulta preparada
            await t.none(deleteQuery, [id]); // Ejecutando la consulta DELETE

            await t.none(`DROP TABLE ${table}`); // Eliminar la tabla
            callback(null, { message: 'Sección eliminada exitosamente.' });
        });
    } catch (error) {
        // Manejar el error, por ejemplo, lanzándolo nuevamente o registrándolo
        console.error('Error al eliminar la sección:', error);
        callback(error, null);
    }
}

    module.exports={
       dishesRequest,
       dishCreate,
       dishDelete,
       dishUpdate,
       createSubsection,
       createSection,
       updateSubsection,
       updateSection,
       deleteSection,
       deleteSubsection
    };