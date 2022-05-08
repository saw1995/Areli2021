const pool = require('../config/database');

// ------------> INSERT
function agregarSucursal(id, nombre, sitio_web,id_departamento, zona,avenida,calle,numero,referencia,latitud,
longitud,telefono_uno,telefono_dos,telefono_tres,foto,arelishop,estado,id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO sucursal(id,nombre,sitio_web,id_departamento,zona,avenida,calle,numero,referencia,latitud, "
                + "longitud,telefono_uno,telefono_dos,telefono_tres,foto,arelishop,estado,id_empresa,info_servicio,imagen_servicio) " 
                + "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'','')";
        pool.query(sql, [id, nombre, sitio_web,id_departamento, zona,avenida,calle,numero,referencia,latitud,
            longitud,telefono_uno,telefono_dos,telefono_tres,foto,arelishop,estado,id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarSucursalRol(id, id_sucursal, id_rol, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO sucursal_rol(id, id_sucursal, id_rol, id_empresa) VALUES (?,?,?,?);";
        pool.query(sql, [id, id_sucursal, id_rol, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarHorarioSucursal(id, id_sucursal, indice, dia, hora_inicio_uno, hora_final_uno, hora_inicio_dos, hora_final_dos, estado, fecha, hora, id_usuario, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO sucursal_horario(id, id_sucursal, indice, dia, hora_inicio_uno, hora_final_uno, hora_inicio_dos, hora_final_dos, estado, fecha, hora, id_usuario, id_empresa) "
            + "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);";
        pool.query(sql, [id, id_sucursal, indice, dia, hora_inicio_uno, hora_final_uno, hora_inicio_dos, hora_final_dos, estado, fecha, hora, id_usuario, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

// ------------> UPDATE
function actualizarDatosSucursal(nombre,sitio_web,id_departamento,zona,avenida,calle,numero,referencia,latitud,
    longitud,telefono_uno,telefono_dos,telefono_tres,id_empresa,id){
    return new Promise((resolved, reject) =>{

        var sql = "UPDATE sucursal SET nombre=?, sitio_web=?, id_departamento=?, zona=?,avenida=?, "
                + "calle=?, numero=?, referencia=?, latitud=?, "
                + "longitud=?, telefono_uno=?, telefono_dos=?, telefono_tres=? WHERE id_empresa=? AND id=?";

        pool.query(sql, [nombre,sitio_web,id_departamento,zona,avenida,calle,numero,referencia,latitud,
            longitud,telefono_uno,telefono_dos,telefono_tres,id_empresa,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarImagenById(foto, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE sucursal SET foto = ? WHERE id = ?;";
        pool.query(sql, [foto, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarImagenServiciosById(imagen,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE sucursal SET imagen_servicio = ? WHERE id = ?;";
        pool.query(sql, [imagen,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoByIdSucursal(estado, id_empresa, id)
{
    return new Promise((resolved, reject) =>
    {
        var sql = "UPDATE sucursal SET estado=? WHERE id_empresa=? AND id=?";
        pool.query(sql, [estado, id_empresa, id], function(error, resultado)
        {
            if(error) return reject(error);
            return resolved(resultado);
        })
    })
}

function actualizarAreliShopBySucursalEmpresa(areli_shop, id_sucursal, id_empresa)
{
    return new Promise((resolved, reject) =>
    {
        var sql = "UPDATE sucursal SET arelishop = ? WHERE id = ? and id_empresa = ?";
        pool.query(sql, [areli_shop, id_sucursal, id_empresa], function(error, resultado)
        {
            if(error) return reject(error);
            return resolved(resultado);
        })
    })
}

function actualizarInformacionServicioSucursal(info_servicio, id_sucursal, id_empresa)
{
    return new Promise((resolved, reject) =>
    {
        var sql = "UPDATE sucursal SET info_servicio=? WHERE id=? AND id_empresa=? ";
        pool.query(sql, [info_servicio, id_sucursal, id_empresa], function(error, resultado)
        {
            if(error) return reject(error);
            return resolved(resultado);
        })
    })
}

function actualizarHorarioSucursalById(hora_inicio_uno, hora_final_uno, hora_inicio_dos, hora_final_dos, fecha, hora, id_usuario, id)
{
    return new Promise((resolved, reject) =>
    {
        var sql = "UPDATE sucursal_horario SET hora_inicio_uno=?, hora_final_uno=?, hora_inicio_dos=?, hora_final_dos=?, "
            + "fecha=?, hora=?, id_usuario=? WHERE id=? ";
        pool.query(sql, [hora_inicio_uno, hora_final_uno, hora_inicio_dos, hora_final_dos, fecha, hora, id_usuario, id], function(error, resultado)
        {
            if(error) return reject(error);
            return resolved(resultado);
        })
    })
}


// ------------> DELETE
function eliminarSucursalRolById(id_sucursal, id_rol, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "DELETE FROM sucursal_rol WHERE id_sucursal = ? and id_rol = ? and id_empresa = ?;";
        pool.query(sql, [id_sucursal, id_rol, id_empresa], function(error, resultado){
            if(error) return reject(error);
            return resolved(resultado);
        })
    })
}

// ------------> SELECT
function listaSucursalByIdEmpresaEstado(id_empresa, estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT sucursal.id, sucursal.nombre, sucursal.sitio_web,sucursal.id_departamento, "
                + "departamento.departamento,departamento.provincia,departamento.municipio, "
                + "sucursal.zona,sucursal.avenida,sucursal.calle,sucursal.numero,sucursal.referencia,sucursal.latitud,  "
                + "sucursal.longitud,sucursal.telefono_uno,sucursal.telefono_dos,sucursal.telefono_tres,sucursal.foto, "
                + "sucursal.estado,sucursal.id_empresa "
                + "FROM sucursal inner join departamento ON sucursal.id_departamento = departamento.id "
                + "WHERE sucursal.id_empresa=? AND sucursal.estado=?";
        pool.query(sql, [id_empresa, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaSucursalByEmpresa(id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT sucursal.id, sucursal.nombre, sucursal.sitio_web,sucursal.id_departamento, "
                + "departamento.departamento,departamento.provincia,departamento.municipio, "
                + "sucursal.zona,sucursal.avenida,sucursal.calle,sucursal.numero,sucursal.referencia,sucursal.latitud,  "
                + "sucursal.longitud,sucursal.telefono_uno,sucursal.telefono_dos,sucursal.telefono_tres,sucursal.foto, "
                + "sucursal.estado,sucursal.id_empresa "
                + "FROM sucursal inner join departamento ON sucursal.id_departamento = departamento.id "
                + "WHERE sucursal.id_empresa = ?;";
        pool.query(sql, [id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaSucursalByEmpresaEstadoArelishop(id_empresa, estado, arelishop){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT sucursal.id, sucursal.nombre, sucursal.sitio_web,sucursal.id_departamento, "
                + "departamento.departamento,departamento.provincia,departamento.municipio, "
                + "sucursal.zona,sucursal.avenida,sucursal.calle,sucursal.numero,sucursal.referencia,sucursal.latitud,  "
                + "sucursal.longitud,sucursal.telefono_uno,sucursal.telefono_dos,sucursal.telefono_tres,sucursal.foto, "
                + "sucursal.estado,sucursal.id_empresa, almacen.id as 'id_almacen'"
                + "FROM sucursal, departamento, almacen "
                + "WHERE sucursal.id_departamento = departamento.id and sucursal.id = almacen.id_sucursal and almacen.venta = '1' and sucursal.id_empresa=? AND sucursal.estado=? and sucursal.arelishop = ?";
        pool.query(sql, [id_empresa, estado, arelishop], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function SucursalById(id_empresa, id){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT sucursal.id, sucursal.nombre, sucursal.sitio_web,sucursal.id_departamento, "
                + "departamento.departamento,departamento.provincia,departamento.municipio, "
                + "sucursal.zona,sucursal.avenida,sucursal.calle,sucursal.numero,sucursal.referencia,sucursal.latitud,  "
                + "sucursal.longitud,sucursal.telefono_uno,sucursal.telefono_dos,sucursal.telefono_tres,sucursal.foto, "
                + "sucursal.estado,sucursal.id_empresa, arelishop, sucursal.info_servicio, sucursal.imagen_servicio  "
                + "FROM sucursal inner join departamento ON sucursal.id_departamento = departamento.id "
                + "WHERE sucursal.id_empresa=? AND sucursal.id=?";
        pool.query(sql, [id_empresa, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaSucursalRolByRol(estado, id_rol, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT sucursal_rol.id, id_sucursal, nombre, sitio_web, departamento.departamento, departamento.provincia, departamento.municipio, zona, avenida, calle, numero, referencia, sucursal.latitud, sucursal.longitud, telefono_uno, telefono_dos, telefono_tres, sucursal.foto FROM sucursal_rol, sucursal, departamento WHERE sucursal_rol.id_sucursal = sucursal.id and sucursal.id_departamento = departamento.id and sucursal.estado = ? and sucursal_rol.id_rol = ? and sucursal_rol.id_empresa = ?;";
        pool.query(sql, [estado, id_rol, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaSucursalAlmacenVentaRolByRol(estado, id_rol, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT sucursal_rol.id, sucursal_rol.id_sucursal, sucursal.nombre, almacen.id as 'id_almacen', sitio_web, departamento.departamento, departamento.provincia, departamento.municipio, zona, avenida, calle, numero, referencia, sucursal.latitud, sucursal.longitud, telefono_uno, telefono_dos, telefono_tres, sucursal.foto FROM sucursal_rol, sucursal, departamento, almacen WHERE sucursal_rol.id_sucursal = sucursal.id and sucursal.id_departamento = departamento.id and sucursal.id = almacen.id_sucursal and almacen.venta = '1' and sucursal.estado = ? and sucursal_rol.id_rol = ? and sucursal_rol.id_empresa = ?;";
        pool.query(sql, [estado, id_rol, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaSucursalRolNoRegistradoByRol(estado, id_rol, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT sucursal.id, nombre, sitio_web, departamento.departamento, departamento.provincia, departamento.municipio, zona, avenida, calle, numero, referencia, sucursal.latitud, sucursal.longitud FROM sucursal, departamento WHERE sucursal.id_departamento = departamento.id and sucursal.id <> '1' and sucursal.estado = ? and sucursal.id NOT IN (SELECT id_sucursal FROM sucursal_rol WHERE id_rol = ? and id_empresa = ?) and  id_empresa = ?;";
        pool.query(sql, [estado, id_rol, id_empresa, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaHorarioSucursalByIdSucursal(id_sucursal, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, id_sucursal, indice, dia, hora_inicio_uno, hora_final_uno, "
            + "hora_inicio_dos, hora_final_dos, estado, fecha, hora, id_usuario, id_empresa "
            + "FROM sucursal_horario WHERE id_sucursal=? AND estado=? AND id_empresa=? "
            + "ORDER BY indice ASC; "
        pool.query(sql, [id_sucursal, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    agregarSucursal,
    agregarSucursalRol,
    agregarHorarioSucursal,

    actualizarImagenById,
    actualizarImagenServiciosById,
    actualizarDatosSucursal,
    actualizarEstadoByIdSucursal,
    actualizarAreliShopBySucursalEmpresa,
    actualizarHorarioSucursalById,
    actualizarInformacionServicioSucursal,

    eliminarSucursalRolById,

    listaSucursalByIdEmpresaEstado,
    listaSucursalByEmpresa,
    listaSucursalByEmpresaEstadoArelishop,
    SucursalById,
    listaSucursalAlmacenVentaRolByRol,
    listaSucursalRolByRol,
    listaSucursalRolNoRegistradoByRol,
    listaHorarioSucursalByIdSucursal
}