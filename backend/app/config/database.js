const mysql = require("mysql");
const { promisify } = require('util');
const { database } = require('./config_db');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        console.error('DATABASE:'+err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION HAS REFUSED');
        }
    }
    if(connection){
        connection.release();
        console.log('La Base de Datos esta conectado');
        return;
    }
});

pool.query = promisify(pool.query)

module.exports = pool;