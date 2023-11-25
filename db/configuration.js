const initOptions={};
const pgp = require('pg-promise')(initOptions);

const cn={
    user: 'postgres',
    password: 'Lapf80204318#',
    host: 'localhost',
    port: 5433,
    database:'postgres',
};

const db = pgp(cn);

module.exports=db;