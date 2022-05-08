const pool = require('../config/database');

// ------------> INSERT
function agregarRegistroHistorial(id,tipo,observacion,informacion,hora,fecha,
    latitud,longitud,dispositivo,id_empresa,id_usuario,id_modulo,modulo){

    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO hr_" + modulo
                + "(id,tipo,observacion,informacion,hora,fecha,"
                + "latitud,longitud,dispositivo,id_empresa,id_usuario,id_"+modulo+",estado) "
                + "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,1)";

        pool.query(sql, [id,tipo,observacion,informacion,hora,fecha,
                        latitud,longitud,dispositivo,id_empresa,id_usuario,id_modulo], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    agregarRegistroHistorial
}