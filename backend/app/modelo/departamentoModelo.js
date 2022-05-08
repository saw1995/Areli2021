const pool = require('../config/database');

// ------------> SELECT
function listaDepartamentoByEstado(estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT departamento, abreviatura FROM departamento WHERE estado = ? GROUP BY departamento, abreviatura;";
        pool.query(sql, [estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProvinciasByDepartamentoEstado(departamento,estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT provincia FROM departamento WHERE departamento = ? and estado = ? GROUP BY provincia;";
        pool.query(sql, [departamento,estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaMunicipiosByDepartamentoProvinciaEstado(departamento,provincia,estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, municipio, abreviatura, latitud, longitud FROM departamento WHERE departamento = ? and provincia = ? and estado = ?;";
        pool.query(sql, [departamento,provincia,estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    listaDepartamentoByEstado,
    listaProvinciasByDepartamentoEstado,
    listaMunicipiosByDepartamentoProvinciaEstado
}