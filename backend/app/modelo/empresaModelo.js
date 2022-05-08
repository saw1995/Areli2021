const pool = require('../config/database');

// ------------> INSERT
function agregarEmpresa(id, nombre, propietario, descripcion, nit, sitio_web, logo, id_rubro,
            id_licencia, estado){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO empresa(id, nombre, propietario, descripcion, nit, sitio_web, logo, id_rubro," 
                + "id_licencia, estado) VALUES(?,?,?,?,?,?,?,?,?,?)";
        pool.query(sql, [id, nombre, propietario, descripcion, nit, sitio_web, logo, id_rubro, id_licencia, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

// ------------> UPDATE
function actualizarDatosEmpresa(nombre, propietario, descripcion, nit, sitio_web, logo, id_rubro, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE empresa SET nombre = ?, propietario = ?, descripcion = ?, nit = ?, "
         + "sitio_web = ?, logo = ?, id_rubro = ? WHERE id = ?";
        pool.query(sql, [nombre, propietario, descripcion, nit, sitio_web, logo, id_rubro, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstodoByIdEmpresa(estado, id)
{
    return new Promise((resolved, reject) =>
    {
        var sql = "UPDATE empresa SET estado=? WHERE id=?";
        pool.query(sql, [estado, id], function(error, resultado)
        {
            if(error) return reject(error);
            return resolved(resultado);
        })
    })
}
// ------------> DELETE

// ------------> SELECT
function listaEmpresaAleatorioByEstadoAreliShop(estado, arelishop){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT empresa.id as 'id_empresa', empresa.nombre as 'nombre_empresa', empresa.descripcion, empresa.logo, rubro.id as 'id_rubro', rubro.nombre as 'nombre_rubro' FROM empresa, rubro, sucursal WHERE empresa.id = sucursal.id_empresa and sucursal.estado = ? and empresa.estado = ? and sucursal.arelishop = ? and empresa.id_rubro = rubro.id GROUP BY empresa.id ORDER BY RAND();";
        pool.query(sql, [estado, estado, arelishop], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaEmpresaRubroByEstadoAreliShop(estado, arelishop){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT empresa.id, empresa.nombre, propietario, empresa.descripcion, nit, empresa.sitio_web, logo, empresa.estado, empresa.id_rubro, rubro.nombre as 'nombre_rubro', rubro.descripcion as 'descripcion_rubro' FROM empresa, rubro, sucursal WHERE empresa.id_rubro = rubro.id and sucursal.id_empresa = empresa.id and empresa.estado = ? and sucursal.arelishop = ? GROUP BY empresa.id ORDER BY empresa.id_rubro ASC;";
        pool.query(sql, [estado, arelishop], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaEmpresaRubroByEstadoAreliShopRubro(estado, arelishop, id_rubro){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT empresa.id, empresa.nombre, propietario, empresa.descripcion, nit, empresa.sitio_web, logo, empresa.estado, empresa.id_rubro, rubro.nombre as 'nombre_rubro', rubro.descripcion as 'descripcion_rubro', rubro.marker, sucursal.id as 'id_sucursal', sucursal.nombre as 'nombre_sucursal', sucursal.latitud, sucursal.longitud, sucursal.foto"
        + " FROM empresa, rubro, sucursal"
        + " WHERE empresa.id_rubro = rubro.id and sucursal.id_empresa = empresa.id and"
        + " empresa.estado = ? and sucursal.arelishop = ? and empresa.id_rubro IN (" + id_rubro + ") ORDER BY empresa.id_rubro ASC;";
        pool.query(sql, [estado, arelishop], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaEmpresaByEstado(estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT empresa.id, empresa.nombre, propietario, empresa.descripcion, nit, sitio_web, logo, empresa.estado, rubro.nombre as 'nombre_rubro', rubro.descripcion as 'descripcion_rubro' FROM empresa, rubro WHERE empresa.id_rubro = rubro.id and empresa.estado = ? ORDER BY empresa.id_rubro ASC;";
        pool.query(sql, [estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function empresaById(id){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT empresa.id, empresa.nombre, propietario, empresa.descripcion, nit, sitio_web, logo, empresa.estado, rubro.nombre as 'nombre_rubro' FROM empresa, rubro WHERE empresa.id_rubro = rubro.id and empresa.id=? ;";
        pool.query(sql, [id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function cabezeraReporteByIdEmpresa(id_sucursal, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT empresa.id, empresa.nombre as 'nombre_empresa', propietario, descripcion, logo, sucursal.nombre as 'nombre_sucursal' FROM empresa, sucursal WHERE sucursal.id_empresa = empresa.id and sucursal.id = ? and sucursal.id_empresa = ?;";
        pool.query(sql, [id_sucursal, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    agregarEmpresa,
    actualizarDatosEmpresa,
    actualizarEstodoByIdEmpresa,
    listaEmpresaRubroByEstadoAreliShop,
    listaEmpresaAleatorioByEstadoAreliShop,
    listaEmpresaRubroByEstadoAreliShopRubro,
    listaEmpresaByEstado,
    empresaById,
    cabezeraReporteByIdEmpresa
}