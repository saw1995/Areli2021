const pool = require('../config/database');

// ------------> SELECT
function agregarCargaUsuario(id, nro_carga, id_pre_venta, fecha_entrega, id_usuario, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO carga(id, nro_carga, id_pre_venta, fecha_entrega, id_usuario, estado, id_empresa) VALUES(?,?,?,?,?,?,?);";
        pool.query(sql, [id, nro_carga, id_pre_venta, fecha_entrega, id_usuario, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function cargaByPreVenta(id_pre_venta){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT carga.id nro_carga, CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', usuario.foto as 'foto_usuario', usuario.celular, fecha_entrega FROM carga, usuario WHERE carga.id_usuario = usuario.id and carga.id_pre_venta = ?;";
        pool.query(sql, [id_pre_venta], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaVentaCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT categoria.nombre as 'nombre_categoria', producto.id as 'id_producto', producto.codigo, producto.nombre as 'nombre_producto', SUM(cantidad) as 'cantidad' FROM carga, pre_venta, usuario, pre_venta_detalle, producto_empresa, producto, descuento_cantidad, categoria WHERE carga.id_pre_venta = pre_venta.id and pre_venta.id_usuario = usuario.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_producto_empresa = producto_empresa.id and producto_empresa.id_producto = producto.id and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and producto_empresa.id_categoria = categoria.id and pre_venta_detalle.estado = '1' and carga.id_usuario = ? and pre_venta.fecha_entrega = ? and pre_venta.id_sucursal = ? and carga.estado = '1' and carga.id_empresa = ? and pre_venta.venta = '1' GROUP BY categoria.nombre, producto.id, producto.codigo, producto.nombre ORDER BY categoria.nombre ASC, producto.nombre ASC;";
        pool.query(sql, [id_usuario, fecha, id_sucursal, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaVentaDetalleCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT nro_pre_venta, nro_carga, producto.id as 'id_producto', producto.codigo, producto.nombre as 'nombre_producto', pre_venta_detalle.cantidad, (precio - (precio * (descuento_cantidad.porcentaje_descuento * 0.01))) as 'precio', (cantidad * (precio - (precio * (descuento_cantidad.porcentaje_descuento * 0.01)))) as 'subtotal' FROM carga, pre_venta, usuario, pre_venta_detalle, producto_empresa, producto, descuento_cantidad, categoria WHERE carga.id_pre_venta = pre_venta.id and pre_venta.id_usuario = usuario.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_producto_empresa = producto_empresa.id and producto_empresa.id_producto = producto.id and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and producto_empresa.id_categoria = categoria.id and pre_venta_detalle.estado = '1' and carga.id_usuario = ? and pre_venta.fecha_entrega = ? and pre_venta.id_sucursal = ? and carga.estado = '1' and carga.id_empresa = ? and pre_venta.venta = '1' ORDER BY nro_pre_venta ASC;";
        pool.query(sql, [id_usuario, fecha, id_sucursal, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaDevolucionCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT categoria.nombre as 'nombre_categoria', producto.id as 'id_producto', producto.codigo, producto.nombre as 'nombre_producto', SUM(cantidad) as 'cantidad' FROM carga, pre_venta, usuario, pre_venta_detalle, producto_empresa, producto, descuento_cantidad, categoria WHERE carga.id_pre_venta = pre_venta.id and pre_venta.id_usuario = usuario.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_producto_empresa = producto_empresa.id and producto_empresa.id_producto = producto.id and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and producto_empresa.id_categoria = categoria.id and carga.id_usuario = ? and pre_venta.fecha_entrega = ? and pre_venta.id_sucursal = ? and carga.estado = '1' and carga.id_empresa = ? and pre_venta.venta IN (3,4) GROUP BY categoria.nombre, producto.id, producto.codigo, producto.nombre ORDER BY categoria.nombre ASC, producto.nombre ASC;";
        pool.query(sql, [id_usuario, fecha, id_sucursal, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaDevolucionCargaParcializacionByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT categoria.nombre as 'nombre_categoria', producto.id as 'id_producto', producto.codigo, producto.nombre as 'nombre_producto', SUM(cantidad) as 'cantidad' FROM carga, pre_venta, usuario, pre_venta_detalle, producto_empresa, producto, descuento_cantidad, categoria WHERE carga.id_pre_venta = pre_venta.id and pre_venta.id_usuario = usuario.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_producto_empresa = producto_empresa.id and producto_empresa.id_producto = producto.id and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and producto_empresa.id_categoria = categoria.id and pre_venta_detalle.estado = '0' and carga.id_usuario = ? and pre_venta.fecha_entrega = ? and pre_venta.id_sucursal = ? and carga.estado = '1' and carga.id_empresa = ? and pre_venta.venta = '1' GROUP BY categoria.nombre, producto.id, producto.codigo, producto.nombre ORDER BY categoria.nombre ASC, producto.nombre ASC;";
        pool.query(sql, [id_usuario, fecha, id_sucursal, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT categoria.nombre as 'nombre_categoria', pre_venta_detalle.id_producto_empresa, producto.id as 'id_producto', producto.codigo, producto.nombre as 'nombre_producto', SUM(cantidad) as 'cantidad' FROM carga, pre_venta, usuario, pre_venta_detalle, producto_empresa, producto, descuento_cantidad, categoria WHERE carga.id_pre_venta = pre_venta.id and pre_venta.id_usuario = usuario.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_producto_empresa = producto_empresa.id and producto_empresa.id_producto = producto.id and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and producto_empresa.id_categoria = categoria.id and carga.id_usuario = ? and pre_venta.fecha_entrega = ? and pre_venta.id_sucursal = ? and carga.estado = '1' and carga.id_empresa = ? GROUP BY categoria.nombre, id_producto_empresa, producto.id, producto.codigo, producto.nombre ORDER BY categoria.nombre ASC, producto.nombre ASC;";
        pool.query(sql, [id_usuario, fecha, id_sucursal, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaCargaByUsuarioFecha(id_usuario, fecha_inicio, fecha_final, estado_venta, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT carga.nro_carga, DATE_FORMAT(carga.fecha_entrega,'%d/%m/%Y') as 'fecha', concat_ws(' ', usuario.nombre, usuario.appat, usuario.apmat) as 'usuario', "
            + "ROUND(SUM((ROUND(pre_venta_detalle.precio+0.0000000001,2) - (ROUND(pre_venta_detalle.precio+0.0000000001,2) * (porcentaje_descuento*0.01))) * cantidad)+0.0000000001, 2) as 'total' "
            + "FROM carga INNER JOIN pre_venta ON pre_venta.id = carga.id_pre_venta "
            + "INNER JOIN pre_venta_detalle ON pre_venta_detalle.id_pre_venta = pre_venta.id "
            + "INNER JOIN descuento_cantidad ON descuento_cantidad.id = pre_venta_detalle.id_descuento_cantidad "
            + "INNER JOIN usuario ON usuario.id = carga.id_usuario "
            + "WHERE carga.fecha_entrega>=? AND carga.fecha_entrega<=? AND carga.estado=? AND carga.id_empresa=? "
            + "AND pre_venta.venta IN ("+estado_venta+") AND carga.id_usuario IN ("+id_usuario+") AND pre_venta_detalle.estado=1 "
            + "GROUP BY carga.nro_carga, carga.fecha_entrega, usuario "
            + "ORDER BY carga.fecha_entrega DESC, carga.nro_carga DESC";
        pool.query(sql, [fecha_inicio, fecha_final, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaCargaProductoAgrupadoByUsuarioFecha(id_usuario, fecha_inicio, fecha_final, estado_venta, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT pre_venta_detalle.id_producto, producto.id as 'id_producto', categoria.nombre as 'nombre_categoria', "
            + "producto.codigo, producto.nombre, producto.descripcion, SUM(pre_venta_detalle.cantidad) as 'cantidad', pre_venta_detalle.precio, "
            + "ROUND(pre_venta_detalle.precio * SUM(pre_venta_detalle.cantidad)) as 'subtotal', producto.imagen, "
            + "ROUND(SUM((ROUND(pre_venta_detalle.precio+0.0000000001,2) - (ROUND(pre_venta_detalle.precio+0.0000000001,2) * (porcentaje_descuento*0.01))) * cantidad)+0.0000000001, 2) as 'total' "
            + "FROM carga, pre_venta, pre_venta_detalle, descuento_cantidad, producto, producto_grupo, categoria "
            + "WHERE carga.id_pre_venta = pre_venta.id and pre_venta.id = pre_venta_detalle.id_pre_venta "
            + "and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id "
            + "and pre_venta_detalle.id_producto = producto.id and producto_grupo.id = producto.id_producto_grupo "
            + "and producto_grupo.id_categoria = categoria.id and carga.id_usuario IN (" + id_usuario + ") "
            + "and carga.fecha_entrega >= ? and carga.fecha_entrega <= ?  "
            + "and carga.id_empresa = ? and pre_venta.venta IN ("+estado_venta+") "
            + "GROUP BY producto.id, pre_venta_detalle.precio ORDER BY categoria.nombre ASC, producto.nombre DESC;";
        pool.query(sql, [fecha_inicio, fecha_final, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaCargaDetalleByUsuarioFechaSucursalProductoEmpresa(id_usuario, fecha, id_sucursal, id_empresa, id_producto_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto.id as 'id_producto', cantidad, nro_pre_venta, carga.nro_carga, DATE_FORMAT(pre_venta.fecha,'%d/%m/%Y') as 'fecha', pre_venta.hora, tienda.nombre as 'nombre_tienda', pre_venta.nit, pre_venta.razon_social, CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario' FROM carga, pre_venta, usuario, pre_venta_detalle, producto_empresa, producto, descuento_cantidad, categoria, tienda, tienda_empresa WHERE carga.id_pre_venta = pre_venta.id and pre_venta.id_usuario = usuario.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_producto_empresa = producto_empresa.id and producto_empresa.id_producto = producto.id and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and producto_empresa.id_categoria = categoria.id and tienda_empresa.id = pre_venta.id_tienda_empresa and tienda.id = tienda_empresa.id_tienda and carga.id_usuario = ? and pre_venta.fecha_entrega = ? and pre_venta.id_sucursal = ? and carga.estado = '1' and carga.id_empresa = ? and pre_venta_detalle.id_producto_empresa = ? ORDER BY pre_venta.fecha ASC;";
        pool.query(sql, [id_usuario, fecha, id_sucursal, id_empresa, id_producto_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaVentaNroCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT nro_carga, DATE_FORMAT(pre_venta.fecha_entrega,'%d/%m/%Y') as 'fecha_entrega', CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', usuario.ci, usuario.ci_exp, rol.nombre as 'nombre_rol' FROM carga, pre_venta, usuario, rol WHERE carga.id_usuario = usuario.id and usuario.id_rol = rol.id and carga.id_pre_venta = pre_venta.id and carga.id_usuario = ? and pre_venta.fecha_entrega = ? and pre_venta.id_sucursal = ? and carga.estado = '1' and carga.id_empresa = ? and pre_venta.venta = '1' GROUP BY nro_carga, usuario.nombre, usuario.appat, usuario.apmat ORDER BY nro_carga ASC;";
        pool.query(sql, [id_usuario, fecha, id_sucursal, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaDevolucionNroCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT nro_carga, DATE_FORMAT(pre_venta.fecha_entrega,'%d/%m/%Y') as 'fecha_entrega', CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', usuario.ci, usuario.ci_exp, rol.nombre as 'nombre_rol' FROM carga, pre_venta, usuario, rol WHERE carga.id_usuario = usuario.id and usuario.id_rol = rol.id and carga.id_pre_venta = pre_venta.id and carga.id_usuario = ? and pre_venta.fecha_entrega = ? and pre_venta.id_sucursal = ? and carga.estado = '1' and carga.id_empresa = ? and pre_venta.venta IN (3,4) GROUP BY nro_carga, usuario.nombre, usuario.appat, usuario.apmat ORDER BY nro_carga ASC;";
        pool.query(sql, [id_usuario, fecha, id_sucursal, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaDevolucionNroCargaParcializacionByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT nro_carga, DATE_FORMAT(pre_venta.fecha_entrega,'%d/%m/%Y') as 'fecha_entrega', CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', usuario.ci, usuario.ci_exp, rol.nombre as 'nombre_rol' FROM carga, pre_venta, usuario, rol, pre_venta_detalle WHERE carga.id_usuario = usuario.id and usuario.id_rol = rol.id and carga.id_pre_venta = pre_venta.id and pre_venta_detalle.id_pre_venta = pre_venta.id and carga.id_usuario = ? and pre_venta.fecha_entrega = ? and pre_venta.id_sucursal = ? and carga.estado = '1' and carga.id_empresa = ? and pre_venta.venta = '1' and pre_venta_detalle.estado = '0' GROUP BY nro_carga, usuario.nombre, usuario.appat, usuario.apmat ORDER BY nro_carga ASC;";
        pool.query(sql, [id_usuario, fecha, id_sucursal, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaNroCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT nro_carga, DATE_FORMAT(pre_venta.fecha_entrega,'%d/%m/%Y') as 'fecha_entrega', CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', usuario.ci, usuario.ci_exp, rol.nombre as 'nombre_rol' FROM carga, pre_venta, usuario, rol WHERE carga.id_usuario = usuario.id and usuario.id_rol = rol.id and carga.id_pre_venta = pre_venta.id and carga.id_usuario = ? and pre_venta.fecha_entrega = ? and pre_venta.id_sucursal = ? and carga.estado = '1' and carga.id_empresa = ? GROUP BY nro_carga, usuario.nombre, usuario.appat, usuario.apmat ORDER BY nro_carga ASC;";
        pool.query(sql, [id_usuario, fecha, id_sucursal, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function ultimaCargaByEmpresa(id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT nro_carga FROM carga WHERE id_empresa = ? ORDER BY nro_carga DESC LIMIT 1;";
        pool.query(sql, [id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaDetallePreventaClienteByNroCarga(nro_carga, id_sucursal, estado_venta, estado_detalle, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT pre_venta.nro_pre_venta, DATE_FORMAT(pre_venta.fecha, '%d/%m/%Y') as 'fecha', pre_venta.hora, DATE_FORMAT(pre_venta.fecha_entrega, '%d/%m/%Y') as 'fecha_entrega', "
        + "tipo_tienda.nombre as 'tipo_tienda', tienda_categoria.nombre as 'categoria_tienda', tienda.nombre as 'tienda_cliente', "
        + "CONCAT_WS(' ', tienda.zona, tienda.avenida, tienda.calle, tienda.numero) as 'tienda_direccion', tienda.nombre_contacto, tienda.celular_contacto, "
        + "pre_venta.nit, pre_venta.razon_social, pre_venta.venta, pre_venta.factura, pre_venta.observacion_inicio, pre_venta.observacion_fin, "
        + "producto.codigo, producto.nombre as 'producto_nombre', producto.descripcion as 'producto_descripcion', producto.imagen, "
        + "pre_venta_detalle.cantidad, pre_venta_detalle.precio, round(pre_venta_detalle.cantidad * pre_venta_detalle.precio) as 'subtotal', "
        + "(ROUND(pre_venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * pre_venta_detalle.precio)+0.0000000001, 2) * pre_venta_detalle.cantidad) as 'total_descuento', "
        + "CONCAT_WS(' ', usuario.nombre, usuario.appat, usuario.apmat) as 'usuario', rol.nombre as 'rol_usuario' "
        + "FROM pre_venta INNER JOIN pre_venta_detalle ON pre_venta.id = pre_venta_detalle.id_pre_venta "
        + "INNER JOIN carga ON carga.id_pre_venta = pre_venta.id "
        + "INNER JOIN descuento_cantidad ON descuento_cantidad.id = pre_venta_detalle.id_descuento_cantidad  "
        + "INNER JOIN producto ON producto.id = pre_venta_detalle.id_producto "
        + "INNER JOIN tienda_empresa ON pre_venta.id_tienda_empresa = tienda_empresa.id "
        + "INNER JOIN tienda ON tienda.id = tienda_empresa.id_tienda "
        + "INNER JOIN tienda_categoria ON tienda_categoria.id = tienda_empresa.id_tienda_categoria "
        + "INNER JOIN tipo_tienda ON tipo_tienda.id = tienda.id_tipo_tienda "
        + "INNER JOIN usuario ON usuario.id = pre_venta.id_usuario INNER JOIN rol ON rol.id = usuario.id_rol "
        + "WHERE carga.nro_carga=? AND pre_venta.id_sucursal=? AND pre_venta.venta IN ("+ estado_venta +") "
        + "AND pre_venta_detalle.estado=? AND pre_venta.id_empresa=? "
        + "GROUP BY pre_venta.nro_pre_venta, pre_venta_detalle.id "
        + "ORDER BY pre_venta.nro_pre_venta DESC, producto.nombre ASC;";

        pool.query(sql, [nro_carga, id_sucursal, estado_detalle, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaDetallePreventaClienteByDistribuidorFecha(fecha_entrega, id_usuario, id_sucursal, estado_venta, estado_detalle, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT carga.nro_carga, pre_venta.nro_pre_venta, DATE_FORMAT(pre_venta.fecha, '%d/%m/%Y') as 'fecha', pre_venta.hora, DATE_FORMAT(pre_venta.fecha_entrega, '%d/%m/%Y') as 'fecha_entrega', "
        + "tipo_tienda.nombre as 'tipo_tienda', tienda_categoria.nombre as 'categoria_tienda', tienda.nombre as 'tienda_cliente', "
        + "CONCAT_WS(' ', tienda.zona, tienda.avenida, tienda.calle, tienda.numero) as 'tienda_direccion', tienda.nombre_contacto, tienda.celular_contacto, "
        + "pre_venta.nit, pre_venta.razon_social, pre_venta.venta, pre_venta.factura, pre_venta.observacion_inicio, pre_venta.observacion_fin, "
        + "producto.codigo, producto.nombre as 'producto_nombre', producto.descripcion as 'producto_descripcion', producto.imagen, "
        + "pre_venta_detalle.cantidad, pre_venta_detalle.precio, round(pre_venta_detalle.cantidad * pre_venta_detalle.precio) as 'subtotal', "
        + "(ROUND(pre_venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * pre_venta_detalle.precio)+0.0000000001, 2) * pre_venta_detalle.cantidad) as 'total_descuento', "
        + "CONCAT_WS(' ', usuario.nombre, usuario.appat, usuario.apmat) as 'usuario', rol.nombre as 'rol_usuario' "
        + "FROM pre_venta INNER JOIN pre_venta_detalle ON pre_venta.id = pre_venta_detalle.id_pre_venta "
        + "INNER JOIN carga ON carga.id_pre_venta = pre_venta.id "
        + "INNER JOIN descuento_cantidad ON descuento_cantidad.id = pre_venta_detalle.id_descuento_cantidad  "
        + "INNER JOIN producto ON producto.id = pre_venta_detalle.id_producto "
        + "INNER JOIN tienda_empresa ON pre_venta.id_tienda_empresa = tienda_empresa.id "
        + "INNER JOIN tienda ON tienda.id = tienda_empresa.id_tienda "
        + "INNER JOIN tienda_categoria ON tienda_categoria.id = tienda_empresa.id_tienda_categoria "
        + "INNER JOIN tipo_tienda ON tipo_tienda.id = tienda.id_tipo_tienda "
        + "INNER JOIN usuario ON usuario.id = pre_venta.id_usuario INNER JOIN rol ON rol.id = usuario.id_rol "
        + "WHERE carga.fecha_entrega=? AND carga.id_usuario=? AND pre_venta.id_sucursal=? AND pre_venta.venta IN ("+ estado_venta +") "
        + "AND pre_venta_detalle.estado=? AND pre_venta.id_empresa=? "
        + "GROUP BY carga.nro_carga, pre_venta.nro_pre_venta, pre_venta_detalle.id "
        + "ORDER BY pre_venta.nro_pre_venta DESC, producto.nombre ASC;";

        pool.query(sql, [fecha_entrega, id_usuario, id_sucursal, estado_detalle, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}
module.exports = {
    agregarCargaUsuario,
    cargaByPreVenta,
    listaVentaCargaByUsuarioFechaSucursal,
    listaVentaDetalleCargaByUsuarioFechaSucursal,
    listaDevolucionCargaByUsuarioFechaSucursal,
    listaDevolucionCargaParcializacionByUsuarioFechaSucursal,
    listaCargaByUsuarioFecha,
    listaCargaProductoAgrupadoByUsuarioFecha,
    listaCargaByUsuarioFechaSucursal,
    listaCargaDetalleByUsuarioFechaSucursalProductoEmpresa,
    listaVentaNroCargaByUsuarioFechaSucursal,
    listaDevolucionNroCargaByUsuarioFechaSucursal,
    listaDevolucionNroCargaParcializacionByUsuarioFechaSucursal,
    listaNroCargaByUsuarioFechaSucursal,
    ultimaCargaByEmpresa,
    listaDetallePreventaClienteByNroCarga,
    listaDetallePreventaClienteByDistribuidorFecha
}