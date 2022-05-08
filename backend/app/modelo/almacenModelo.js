const pool = require('../config/database');

// ------------> INSERT
function agregarAlmacen(id,id_sucursal,nombre,descripcion,latitud,longitud,estado,venta,id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO almacen(id,id_sucursal,nombre,descripcion,latitud,longitud,estado,venta,id_empresa) " 
                + "VALUES(?,?,?,?,?,?,?,?,?)";
        pool.query(sql, [id,id_sucursal,nombre,descripcion,latitud,longitud,estado,venta,id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarAlmacenSeccion(id,id_almacen,nombre,descripcion,estado,id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO almacen_seccion(id,id_almacen,nombre,descripcion,estado,id_empresa) " 
                + "VALUES(?,?,?,?,?,?)";
        pool.query(sql, [id,id_almacen,nombre,descripcion,estado,id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarAlmacenRol(id, id_almacen, id_rol, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO almacen_rol(id, id_almacen, id_rol, id_empresa) VALUES (?,?,?,?);";
        pool.query(sql, [id, id_almacen, id_rol, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}
// ------------> UPDATE
function actualizarVentaAlmacenBySucursal(venta, id_sucursal, id_empresa, estado){
    return new Promise((resolved, reject) =>{

        var sql = "UPDATE almacen SET venta = ? WHERE id_sucursal = ? and id_empresa = ? and estado = ?";

        pool.query(sql, [venta, id_sucursal, id_empresa, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarVentaAlmacenByAlmacen(venta, id_almacen, id_empresa, estado){
    return new Promise((resolved, reject) =>{

        var sql = "UPDATE almacen SET venta = ? WHERE id = ? and id_empresa = ? and estado = ?";

        pool.query(sql, [venta, id_almacen, id_empresa, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarDatosAlmacen(id_sucursal,nombre,descripcion,latitud,longitud,id_empresa,id){
    return new Promise((resolved, reject) =>{

        var sql = "UPDATE almacen SET id_sucursal=?,nombre=?,descripcion=?,latitud=?,longitud=? WHERE id_empresa=? AND id=?";

        pool.query(sql, [id_sucursal,nombre,descripcion,latitud,longitud,id_empresa,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoByIdAlmacen(estado, id_empresa, id)
{
    return new Promise((resolved, reject) =>
    {
        var sql = "UPDATE almacen SET estado=? WHERE id_empresa=? AND id=?";
        pool.query(sql, [estado, id_empresa, id], function(error, resultado)
        {
            if(error) return reject(error);
            return resolved(resultado);
        })
    })
}

function actualizarDatosAlmacenSeccion(id_almacen,nombre,descripcion,id_empresa,id){
    return new Promise((resolved, reject) =>{

        var sql = "UPDATE almacen_seccion SET id_almacen=?,nombre=?,descripcion=? WHERE id_empresa=? AND id=?";

        pool.query(sql, [id_almacen,nombre,descripcion,id_empresa,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoAlmacenSeccionById(estado, id_empresa, id)
{
    return new Promise((resolved, reject) =>
    {
        var sql = "UPDATE almacen_seccion SET estado=? WHERE id_empresa=? AND id=?";
        pool.query(sql, [estado, id_empresa, id], function(error, resultado)
        {
            if(error) return reject(error);
            return resolved(resultado);
        })
    })
}
// ------------> DELETE
function eliminarAlmacenRolById(id_almacen, id_rol, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "DELETE FROM almacen_rol WHERE id_almacen = ? and id_rol = ? and id_empresa = ?;";
        pool.query(sql, [id_almacen, id_rol, id_empresa], function(error, resultado){
            if(error) return reject(error);
            return resolved(resultado);
        })
    })
}

// ------------> SELECT
function listaAlmacenByIdEmpresaEstado(id_empresa,id_sucursal,estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT almacen.id, almacen.nombre, almacen.descripcion, almacen.latitud, almacen.longitud, sucursal.nombre as 'sucursal', almacen.id_sucursal FROM almacen, sucursal WHERE almacen.id_sucursal = sucursal.id and almacen.id_empresa = ? and id_sucursal = ? and almacen.estado = ?;";
        pool.query(sql, [id_empresa,id_sucursal,estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaAlmacenBySucursalEmpresa(id_empresa,id_sucursal){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT almacen.id, almacen.nombre, almacen.descripcion, almacen.latitud, almacen.longitud, sucursal.nombre as 'sucursal', almacen.id_sucursal FROM almacen, sucursal WHERE almacen.id_sucursal = sucursal.id and almacen.id_empresa = ? and id_sucursal = ?;";
        pool.query(sql, [id_empresa,id_sucursal], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaAlmacenByEmpresa(id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT almacen.id, almacen.nombre, almacen.descripcion, almacen.latitud, almacen.longitud, sucursal.nombre as 'sucursal', almacen.id_sucursal FROM almacen, sucursal WHERE almacen.id_sucursal = sucursal.id and almacen.id_empresa = ?;";
        pool.query(sql, [id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function almacenById(id_empresa,id){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT almacen.id, almacen.nombre, almacen.descripcion, almacen.latitud, almacen.longitud, almacen.estado, sucursal.nombre as 'sucursal', almacen.id_sucursal FROM almacen, sucursal WHERE almacen.id_sucursal = sucursal.id and almacen.id_empresa = ? and almacen.id = ?;";
        pool.query(sql, [id_empresa,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaAlmacenSeccionByIdAlmacenEstado(id_empresa,id_almacen, estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id,id_almacen,nombre,descripcion,estado,id_empresa FROM almacen_seccion "
                + "WHERE id_empresa=? AND id_almacen=? AND estado=?";
        pool.query(sql, [id_empresa,id_almacen, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaAlmacenVentaSucursalBySucursal(id_sucursal, id_empresa, estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, nombre, descripcion, venta FROM almacen WHERE id_sucursal = ? and id_empresa = ? and estado = ?;";
        pool.query(sql, [id_sucursal, id_empresa, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function almacenVentaSucursalBySucursalVenta(id_sucursal, id_empresa, venta, estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, nombre, descripcion, venta FROM almacen WHERE id_sucursal = ? and id_empresa = ? and venta = ? and estado = ?;";
        pool.query(sql, [id_sucursal, id_empresa,  venta, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaAlmacenRolByRol(estado, id_sucursal, id_rol, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT almacen_rol.id, id_almacen, almacen.nombre as 'nombre_almacen', almacen.descripcion, id_sucursal, sucursal.nombre as 'nombre_sucursal', almacen.latitud, almacen.longitud FROM almacen_rol, almacen, sucursal WHERE almacen.id_sucursal = sucursal.id and almacen_rol.id_almacen = almacen.id and almacen.estado = ? and almacen.id_sucursal = ? and almacen_rol.id_rol = ? and almacen_rol.id_empresa = ?;";
        pool.query(sql, [estado, id_sucursal, id_rol, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaAlmacenRolNoRegistradoByRol(estado, id_rol, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT almacen.id, almacen.nombre as 'nombre_almacen', almacen.descripcion, id_sucursal, sucursal.nombre as 'nombre_sucursal' FROM almacen, sucursal WHERE almacen.id_sucursal = sucursal.id and almacen.estado = ? and almacen.id NOT IN (SELECT id_almacen FROM almacen_rol WHERE id_rol = ? and id_empresa = ?) and (id_sucursal IN (SELECT id_sucursal FROM sucursal_rol WHERE id_rol = ? and id_empresa = ?) or almacen.id_sucursal = '1') and  almacen.id_empresa = ?;";
        pool.query(sql, [estado, id_rol, id_empresa, id_rol, id_empresa, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    agregarAlmacen,
    agregarAlmacenRol,
    actualizarVentaAlmacenBySucursal,
    actualizarVentaAlmacenByAlmacen,
    actualizarDatosAlmacen,
    actualizarEstadoByIdAlmacen,
    listaAlmacenByEmpresa,
    listaAlmacenBySucursalEmpresa,
    listaAlmacenByIdEmpresaEstado,
    agregarAlmacenSeccion,
    actualizarDatosAlmacenSeccion,
    actualizarEstadoAlmacenSeccionById,
    eliminarAlmacenRolById,
    listaAlmacenSeccionByIdAlmacenEstado,
    almacenById,
    listaAlmacenVentaSucursalBySucursal,
    almacenVentaSucursalBySucursalVenta,
    listaAlmacenRolByRol,
    listaAlmacenRolNoRegistradoByRol
}