const pool = require('../config/database');

function ultimaLicencia(id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT licencia.id, licencia.nombre, licencia.modalidad, licencia.windows, licencia.android, licencia.usuarios, licencia.vehiculo, licencia.almacen, licencia.precio, licencia_empresa.fecha_inicio, licencia_empresa.fecha_final, licencia_empresa.estado "
        +"FROM licencia INNER JOIN licencia_empresa ON licencia.id = licencia_empresa.id_licencia "
        +"WHERE licencia.estado = 1 AND licencia_empresa.id_empresa = ? "
        +"ORDER by fecha_inicio DESC limit 1;";

        pool.query(sql, [id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    ultimaLicencia
}