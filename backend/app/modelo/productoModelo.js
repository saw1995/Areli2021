const pool = require('../config/database');

// ------------> INSERT
function agregarProducto(id, codigo_barra_qr, codigo, id_producto_grupo, nombre, descripcion, imagen, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO producto(id, codigo_barra_qr, codigo, id_producto_grupo, nombre, descripcion, imagen, estado, id_empresa) VALUES(?,?,?,?,?,?,?,?,?);";
        pool.query(sql, [id, codigo_barra_qr, codigo, id_producto_grupo, nombre, descripcion, imagen, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarProductoGrupo(id, grupo, descripcion, imagen, estado, id_categoria, id_marca, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO producto_grupo(id, grupo, descripcion, imagen, estado, id_categoria, id_marca, id_empresa) VALUES(?,?,?,?,?,?,?,?);";
        pool.query(sql, [id, grupo, descripcion, imagen, estado, id_categoria, id_marca, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarProductoMedida(id, id_producto, unidad, medida, rango, peso, ancho, alto, largo, estado){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO producto_medida(id, id_producto, unidad, medida, rango, peso, ancho, alto, largo, estado) VALUES(?,?,?,?,?,?,?,?,?,?);";
        pool.query(sql, [id, id_producto, unidad, medida, rango, peso, ancho, alto, largo, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarProductoById(codigo_barra_qr, codigo, id_producto_grupo, nombre, descripcion, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto SET codigo_barra_qr = ?, codigo = ?, id_producto_grupo = ?, nombre = ?, descripcion = ? WHERE id = ?;";
        pool.query(sql, [codigo_barra_qr, codigo, id_producto_grupo, nombre, descripcion, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarImagenById(imagen,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto SET imagen = ? WHERE id = ?;";
        pool.query(sql, [imagen,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarImagenGrupoById(imagen, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto_grupo SET imagen = ? WHERE id = ?;";
        pool.query(sql, [imagen, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function productoById(id){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto.id, codigo_barra_qr, codigo, producto.nombre, producto.descripcion, imagen FROM producto WHERE producto.id = ?;";
        pool.query(sql, [id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoByGrupoEmpresa(id_producto_grupo, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM producto WHERE id_producto_grupo = ? and estado = ? and id_empresa = ?;";
        pool.query(sql, [id_producto_grupo, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoGrupoByMarcaEmpresa(id_marca, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto_grupo.id, grupo, producto_grupo.descripcion, producto_grupo.imagen, categoria.nombre as 'nombre_categoria', categoria.id as 'id_categoria' FROM producto_grupo, categoria WHERE producto_grupo.id_categoria = categoria.id and id_marca = ? and producto_grupo.estado = ? and producto_grupo.id_empresa = ? ORDER BY grupo ASC;";
        pool.query(sql, [id_marca, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaMedidaByProductoEstado(id_producto, estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, unidad, medida, rango, peso, alto, ancho, largo FROM producto_medida WHERE id_producto = ? and estado = ? ORDER BY rango ASC;";
        pool.query(sql, [id_producto, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}








































function agregarProductoEmpresa(id,id_producto,id_empresa,codigo,id_categoria,imagenes,descripcion,estado){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO producto_empresa(id,id_producto,id_empresa,codigo,id_categoria,imagenes,descripcion,estado) " 
                + "VALUES(?,?,?,?,?,?,?,?)";
        pool.query(sql, [id,id_producto,id_empresa,codigo,id_categoria,imagenes,descripcion,estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}
// ------------> UPDATE
function actualizarDatosProducto(codigo_barra_qr,codigo,nombre,descripcion,id_marca,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto SET codigo_barra_qr=?,codigo=?,nombre=?,descripcion=?,id_marca=? WHERE id=?";
        pool.query(sql, [codigo_barra_qr,codigo,nombre,descripcion,id_marca,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoByIdProducto(estado,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto SET estado=? WHERE id=?";
        pool.query(sql, [estado,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarDatosProductoMedida(id_producto,unidad,medida,rango,presentacion,imagen,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto_medida SET id_producto=?,unidad=?,medida=?,rango=?,presentacion=?,imagen=? WHERE id=?";
        pool.query(sql, [id_producto,unidad,medida,rango,presentacion,imagen,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoByIdProductoMedida(estado,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto_medida SET estado=? WHERE id=?";
        pool.query(sql, [estado,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarProductoGrupoById(nombre, descripcion, id_categoria, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto_grupo SET grupo = ?, descripcion = ?, id_categoria = ? WHERE id = ?;";
        pool.query(sql, [nombre, descripcion, id_categoria, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarDatosProductoEmpresa(id_producto,codigo,id_categoria,imagenes,descripcion,id_empresa,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto_empresa SET "
                + "id_producto=?,codigo=?,id_categoria=?,imagenes=?,descripcion=? WHERE id_empresa=? AND id=?";
        pool.query(sql, [id_producto,codigo,id_categoria,imagenes,descripcion,id_empresa,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoByIdProductoEmpresa(estado,id_empresa,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto_empresa SET estado=? WHERE id_empresa=? AND id=?";
        pool.query(sql, [estado,id_empresa,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}
// ------------> DELETE

// ------------> SELECT


function productoMedidaById(id){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM producto_medida WHERE producto_medida.id = ?;";
        pool.query(sql, [id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function productoGrupoById(id){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto_grupo.id, categoria.id as 'id_categoria', grupo, producto_grupo.descripcion, producto_grupo.imagen, categoria.nombre as 'nombre_categoria' FROM producto_grupo, categoria WHERE producto_grupo.id_categoria = categoria.id and producto_grupo.id = ?;";
        pool.query(sql, [id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoByEstado(estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto.id, producto.codigo_barra_qr,producto.codigo, producto.nombre, producto.descripcion, marca.id as 'id_marca', marca.nombre  as 'marca', producto.estado "
                + "FROM producto inner join marca ON producto.id_marca = marca.id WHERE producto.estado=?";
        pool.query(sql, [estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoMedidaSeleccionadoByGrupoEstadoEmpresa(id_producto_grupo, estado_producto, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto.id as 'id_producto', codigo_barra_qr, producto.codigo, nombre, producto.descripcion, producto_medida.id as 'id_presentacion', unidad,medida,rango,presentacion,imagen FROM producto_empresa, producto, producto_medida WHERE producto.id = producto_medida.id_producto and producto_empresa.id_producto = producto.id and producto.id_producto_grupo=? AND producto.estado = ? and producto_medida.estado = ? and producto_empresa.id_empresa = ? ORDER BY nombre ASC, rango ASC;";
        pool.query(sql, [id_producto_grupo,estado_producto, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoMedidaNoSeleccionadoByGrupoEstadoEmpresa(id_producto_grupo, estado_producto, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto.id as 'id_producto', codigo_barra_qr, codigo, nombre, descripcion, producto_medida.id as 'id_presentacion', unidad,medida,rango,presentacion,imagen FROM producto, producto_medida WHERE producto.id = producto_medida.id_producto and producto.id_marca = ? AND producto.estado = ? and producto_medida.estado = ? and producto.id NOT IN (SELECT id_producto FROM producto_empresa, producto WHERE producto_empresa.id_producto = producto.id and producto.id_producto_grupo = ? and id_empresa = ?) ORDER BY nombre ASC, rango ASC;";
        pool.query(sql, [id_producto_grupo,estado_producto, estado, id_marca, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoMedidaSeleccionadoByMarcaEstadoEmpresa(id_marca, estado_producto, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto.id as 'id_producto', codigo_barra_qr, producto.codigo, nombre, producto.descripcion, producto_medida.id as 'id_presentacion', unidad,medida,rango,presentacion,imagen FROM producto_empresa, producto, producto_medida WHERE producto.id = producto_medida.id_producto and producto_empresa.id_producto = producto.id and producto.id_marca=? AND producto.estado = ? and producto_medida.estado = ? and producto_empresa.id_empresa = ? ORDER BY nombre ASC, rango ASC;";
        pool.query(sql, [id_marca,estado_producto, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoMedidaNoSeleccionadoByMarcaEstadoEmpresa(id_marca, estado_producto, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto.id as 'id_producto', codigo_barra_qr, codigo, nombre, descripcion, producto_medida.id as 'id_presentacion', unidad,medida,rango,presentacion,imagen FROM producto, producto_medida WHERE producto.id = producto_medida.id_producto and producto.id_marca = ? AND producto.estado = ? and producto_medida.estado = ? and producto.id NOT IN (SELECT id_producto FROM producto_empresa, producto WHERE producto_empresa.id_producto = producto.id and producto.id_marca = ? and id_empresa = ?) ORDER BY nombre ASC, rango ASC;";
        pool.query(sql, [id_marca,estado_producto, estado, id_marca, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoGrupoSeleccionadoByMarcaEstadoEmpresa(id_marca, estado_producto, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto_grupo.id, producto_grupo.grupo, producto_grupo.descripcion, producto_grupo.imagen FROM producto_empresa, producto, producto_grupo WHERE producto_empresa.id_producto = producto.id and producto.id_producto_grupo = producto_grupo.id and producto.id_marca= ? AND producto.estado = ? AND producto_grupo.estado = ? AND producto_empresa.estado = ? and producto_empresa.id_empresa = ? GROUP BY producto_grupo.id ORDER BY producto_grupo.grupo ASC;";
        pool.query(sql, [id_marca,estado_producto, estado, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoGrupoNoSeleccionadoByMarcaEstadoEmpresa(id_marca, estado_producto, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto_grupo.id, producto_grupo.grupo, producto_grupo.descripcion, producto_grupo.imagen FROM producto, producto_grupo WHERE producto.id_producto_grupo = producto_grupo.id and producto.id_marca = ? AND producto.estado = ? and producto_grupo.estado = ? and producto.id NOT IN (SELECT id_producto FROM producto_empresa, producto WHERE producto_empresa.id_producto = producto.id and producto.id_marca = ? and id_empresa = ?) ORDER BY grupo ASC;";
        pool.query(sql, [id_marca, estado_producto, estado, estado, id_marca, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoEmpresaVistaSencillaByIdEmpresa(id_empresa)
{
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id,id_producto,id_empresa,codigo,id_categoria,imagenes,descripcion,estado "
                + "FROM producto_empresa WHERE id_empresa=? ";
        pool.query(sql, [id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoGrupoByCategoriaEmpresa(id_categoria, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto_grupo.id, grupo, producto_grupo.descripcion, producto_grupo.imagen, categoria.nombre as 'nombre_categoria' FROM producto_grupo, categoria WHERE producto_grupo.id_categoria = categoria.id and producto_grupo.id_categoria = ? and producto_grupo.estado = ? and producto_grupo.id_empresa = ? ORDER BY producto_grupo.grupo ASC";
        pool.query(sql, [id_categoria, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}


module.exports = {
    agregarProducto,
    agregarProductoGrupo,
    actualizarProductoById,
    actualizarImagenById,
    actualizarImagenGrupoById,
    productoById,
    listaProductoByGrupoEmpresa,
    listaProductoGrupoByMarcaEmpresa,
    listaMedidaByProductoEstado,
    listaProductoGrupoByCategoriaEmpresa,





    agregarProductoMedida,
    agregarProductoEmpresa,
    actualizarDatosProducto,
    actualizarEstadoByIdProducto,
    actualizarDatosProductoMedida,
    actualizarEstadoByIdProductoMedida,
    actualizarDatosProductoEmpresa,
    actualizarEstadoByIdProductoEmpresa,
    actualizarProductoGrupoById,
    productoMedidaById,
    productoGrupoById,
    listaProductoByEstado,
    listaProductoMedidaSeleccionadoByGrupoEstadoEmpresa,
    listaProductoMedidaNoSeleccionadoByGrupoEstadoEmpresa,
    listaProductoMedidaSeleccionadoByMarcaEstadoEmpresa,
    listaProductoMedidaNoSeleccionadoByMarcaEstadoEmpresa,
    listaProductoGrupoSeleccionadoByMarcaEstadoEmpresa,
    listaProductoGrupoNoSeleccionadoByMarcaEstadoEmpresa,
    listaProductoEmpresaVistaSencillaByIdEmpresa
}