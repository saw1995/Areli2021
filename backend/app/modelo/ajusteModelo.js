const pool = require('../config/database');

function agregarAjuste(id, ruta, stock, fecha, hora, id_usuario, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO ajuste(id,ruta,stock,fecha,hora,id_usuario,id_empresa) VALUES(?,?,?,?,?,?,?)";
        pool.query(sql, [id, ruta, stock, fecha, hora, id_usuario, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaAjusteByEmpresa(id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT ajuste.id, ajuste.ruta, ajuste.stock, "
            + "DATE_FORMAT(ajuste.fecha,'%d/%m/%Y') as 'fecha',  ajuste.hora, "
            + "concat_ws(' ',usuario.nombre,usuario.appat,usuario.apmat) as 'usuario' "
            + "FROM ajuste INNER JOIN usuario ON ajuste.id_usuario = usuario.id "
            + "WHERE ajuste.id_empresa=? ORDER BY ajuste.id DESC";

        pool.query(sql, [id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    agregarAjuste,
    listaAjusteByEmpresa
    
}