const pool = require('../config/database');

function version(){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM sistema ORDER BY fecha DESC, hora DESC LIMIT 1;";
        pool.query(sql, function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function versionAreliShop(){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM sistema ORDER BY fecha_arelishop DESC, hora_arelishop DESC LIMIT 1;";
        pool.query(sql, function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    version,
    versionAreliShop
}