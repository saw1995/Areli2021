const pool = require('../config/database');

// ------------> SELECT
function listaRubroByEstado(estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, nombre, descripcion, imagen, marker FROM rubro WHERE estado = ?";
        pool.query(sql, [estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaRubroEmpresaByEstado(estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT rubro.id, rubro.nombre, rubro.descripcion, rubro.imagen, marker FROM rubro, empresa WHERE rubro.id = empresa.id_rubro and empresa.estado = ? and rubro.estado = ?";
        pool.query(sql, [estado, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}
module.exports = {
    listaRubroByEstado,
    listaRubroEmpresaByEstado
}