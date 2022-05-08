const pool = require('../config/database');

function listaUsuarios(estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM usuario WHERE estado = ?";
        pool.query(sql, [estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    listaUsuarios
}