const pool = require('../config/database');

// ------------> INSERT
function agregarProductoStock(id, id_producto, id_almacen, stock, fecha_vencimiento, costo_adquisicion, precio_sugerido, stock_minimo, cantidad_minima,id_empresa,estado){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO producto_stock(id, id_producto, id_almacen, stock, fecha_vencimiento, costo_adquisicion, precio_sugerido, stock_minimo, cantidad_minima, id_empresa, estado) VALUES(?,?,?,?,?,?,?,?,?,?,?);";
        pool.query(sql, [id,id_producto,id_almacen,stock,fecha_vencimiento,costo_adquisicion,precio_sugerido,stock_minimo,cantidad_minima,id_empresa,estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

// ------------> UPDATE
function actualizarStockById(stock, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto_stock SET stock = ? WHERE id = ?;";
        pool.query(sql, [stock, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarStockFecVenById(stock, fecha_vencimiento, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto_stock SET stock = ?, fecha_vencimiento = ? WHERE id = ?;";
        pool.query(sql, [stock, fecha_vencimiento, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarPrecioSugeridoByProductoEmpresaAlmacen(precio, id_producto, id_almacen, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto_stock SET precio_sugerido = ? WHERE id_producto IN ("+id_producto+") and id_almacen = ? and id_empresa = ?";
        pool.query(sql, [precio, id_almacen, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarStockMinimoCantidadMinimaByProductoEmpresaAlmacen(stock_minimo, cantidad_minima, id_producto, id_almacen, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto_stock SET stock_minimo = ?, cantidad_minima = ? WHERE id_producto IN ("+id_producto+") and id_almacen = ? and id_empresa = ?";
        pool.query(sql, [stock_minimo, cantidad_minima, id_almacen, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function precioSugeridoByProductoEmpresaAlmacen(id_producto_empresa, id_almacen, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, precio_sugerido FROM producto_stock WHERE id_producto_empresa = ? and id_almacen = ? and id_empresa = ?"
        pool.query(sql, [id_producto_empresa, id_almacen, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function precioSugeridoByProductoGrupoAlmacen(id_producto_grupo, id_almacen, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id_producto, precio_sugerido FROM producto_stock, producto WHERE producto_stock.id_producto = producto.id and producto.id_producto_grupo = ? and producto_stock.id_almacen = ? and producto_stock.id_empresa = ?"
        pool.query(sql, [id_producto_grupo, id_almacen, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function stockMinimoCantidadMinimaByProductoGrupoAlmacen(id_producto_grupo, id_almacen, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id_producto, stock_minimo, cantidad_minima FROM producto_stock, producto WHERE producto_stock.id_producto = producto.id and producto.id_producto_grupo = ? and producto_stock.id_almacen = ? and producto_stock.id_empresa = ?"
        pool.query(sql, [id_producto_grupo, id_almacen, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoStockByProductoEmpresaAlmacen(id_producto, id_almacen, id_empresa, estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM producto_stock WHERE id_producto = ? and id_almacen = ? and id_empresa = ? and estado = ? ORDER BY fecha_vencimiento ASC"
        pool.query(sql, [id_producto, id_almacen, id_empresa, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoStockByProductoEmpresaAlmacenCosto(id_producto, id_almacen, costo_adquisicion, id_empresa, estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM producto_stock WHERE id_producto = ? and id_almacen = ? and costo_adquisicion = ? and id_empresa = ? and estado = ? ORDER BY fecha_vencimiento ASC"
        pool.query(sql, [id_producto, id_almacen, costo_adquisicion, id_empresa, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaStockProductoEmpresaByAlmacenEmpresa(id_almacen, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto_empresa.id as 'id_producto_empresa', categoria.nombre as 'nombre_categoria', producto_empresa.id_producto, producto.codigo, producto.nombre, producto_empresa.descripcion, SUM(stock) as 'stock', producto_empresa.imagenes FROM producto_stock, producto_empresa, producto, categoria WHERE producto_stock.id_producto_empresa = producto_empresa.id and producto_empresa.id_producto = producto.id and producto_empresa.id_categoria = categoria.id and producto_stock.id_almacen = ? and producto_stock.id_empresa = ? GROUP BY producto_empresa.id ORDER BY producto.nombre ASC;"
        pool.query(sql, [id_almacen, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoEmpresaStockCeroByAlmacenGrupoProductoEmpresa(id_almacen, id_producto_grupo, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id_producto, producto.codigo, producto.codigo_barra_qr, producto.nombre, producto.descripcion, producto.imagen, SUM(stock) as 'stock_fisico', ROUND(precio_sugerido+0.0000000001, 2) as 'precio_sugerido' FROM producto_stock, producto WHERE producto_stock.id_producto = producto.id and producto_stock.id_almacen = ? and producto.id_producto_grupo = ? and producto_stock.estado = ? and producto_stock.id_empresa = ? GROUP BY producto.id, precio_sugerido ORDER BY producto.nombre ASC;"
        pool.query(sql, [id_almacen, id_producto_grupo, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoEmpresaStockCeroByAlmacenProductoEmpresa(id_almacen, id_producto, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto_stock.id as 'id_producto_stock', id_producto, producto.codigo, producto.codigo_barra_qr, producto.nombre, producto.descripcion, producto.imagen, stock as 'stock_fisico', ROUND(costo_adquisicion + 0.0000000001, 2) as 'costo_adquisicion', ROUND(precio_sugerido + 0.0000000001, 2) as 'precio_sugerido', ROUND((costo_adquisicion * stock) + 0.0000000001, 2) as 'total_costo_adquisicion', ROUND((precio_sugerido * stock) + 0.0000000001, 2) as 'total_precio_sugerido', (ROUND(precio_sugerido + 0.0000000001, 2) - ROUND(costo_adquisicion + 0.0000000001, 2)) as 'utilidad', ((ROUND(precio_sugerido + 0.0000000001, 2) - ROUND(costo_adquisicion + 0.0000000001, 2)) * stock) as 'total_utilidad', ROUND((((ROUND(precio_sugerido + 0.0000000001, 2) - ROUND(costo_adquisicion + 0.0000000001, 2)) / ROUND(costo_adquisicion + 0.0000000001, 2)) * 100) + 0.0000000001, 2) as 'utilidad_porcentaje' FROM producto_stock, producto WHERE producto_stock.id_producto = producto.id and producto_stock.id_almacen = ? and producto_stock.id_producto = ? and producto_stock.estado = ? and producto_stock.id_empresa = ? ORDER BY stock ASC;"
        pool.query(sql, [id_almacen, id_producto, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaKardexStockByProductoStockEmpresa(id_producto_stock, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id_producto_stock, id_producto, entrada_salida, tipo, cantidad, ROUND(precio + 0.0000000001, 2) as 'precio', ROUND(precio + 0.0000000001, 2) * cantidad as 'total', detalle, observacion,  DATE_FORMAT(fecha,'%d/%m/%Y') as 'fecha', hora, CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario' FROM kardex_stock, usuario, producto_stock, producto WHERE kardex_stock.id_usuario = usuario.id and kardex_stock.id_producto_stock = producto_stock.id and producto_stock.id_producto = producto.id and id_producto_stock = ? and producto_stock.id_empresa = ? ORDER BY fecha DESC, hora DESC;"
        pool.query(sql, [id_producto_stock, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}












































function agregarKardexStock(id, id_producto_stock, entrada_salida, tipo, cantidad, precio, detalle, observacion, fecha, hora, id_usuario, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO kardex_stock(id, id_producto_stock, entrada_salida, tipo, cantidad, precio, detalle, observacion, fecha, hora, id_usuario, id_empresa) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);";
        pool.query(sql, [id, id_producto_stock, entrada_salida, tipo, cantidad, precio, detalle, observacion, fecha, hora, id_usuario, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarProductoPrecio(id,precio,fecha,hora,id_usuario,id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO producto_precio(id,precio,fecha,hora,id_usuario,id_empresa) " 
                + "VALUES(?,?,?,?,?,?)";
        pool.query(sql, [id,precio,fecha,hora,id_usuario,id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarProductoPromocion(id,codigo,nombre,descripcion,fecha_inicio,fecha_limite,
    precio_promocion,estado,id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO producto_promocion(id,codigo,nombre,descripcion,fecha_inicio,fecha_limite, "
                + "precio_promocion,estado,id_empresa) " 
                + "VALUES(?,?,?,?,?,?,?,?,?)";
        pool.query(sql, [id,codigo,nombre,descripcion,fecha_inicio,fecha_limite,
            precio_promocion,estado,id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarProductoPromocionDetalle(id,id_producto_promocion,id_producto_stock,cantidad,precio_promocion,estado){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO producto_promocion_detalle(id,id_producto_promocion,id_producto_stock,cantidad,precio_promocion,estado) " 
                + "VALUES(?,?,?,?,?,?)";
        pool.query(sql, [id,id_producto_promocion,id_producto_stock,cantidad,precio_promocion,estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarProductoDescuentoCantidad(id,id_producto_stock,fecha_inicio,fecha_limite,cantidad,porcentaje_descuento,estado,id_usuario,id_empresa)
{
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO producto_descuento_cantidad(id,id_producto_stock,fecha_inicio,fecha_limite,cantidad,porcentaje_descuento,estado,id_usuario,id_empresa) " 
                + "VALUES(?,?,?,?,?,?,?,?,?)";
        pool.query(sql, [id,id_producto_stock,fecha_inicio,fecha_limite,cantidad,porcentaje_descuento,estado,id_usuario,id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarProductoDescuentoTicket(id,id_almacen,fecha_inicio,fecha_limite,monto,porcentaje_descuento,estado,id_usuario,id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO producto_descuento_ticket(id,id_producto_promocion,id_producto_stock,cantidad,precio_promocion,estado) " 
                + "VALUES(?,?,?,?,?,?,?,?,?)";
        pool.query(sql, [id,id_almacen,fecha_inicio,fecha_limite,monto,porcentaje_descuento,estado,id_usuario,id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}



function actualizarDatosProductoStockById(id_producto_empresa,id_almacen,stock,id_producto_precio,stock_minimo,cantidad_minima,id_empresa,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto_stock SET id_producto_empresa=?,id_almacen=?,stock=?,id_producto_precio=?, "
                + "stock_minimo=?,cantidad_minima=? WHERE id_empresa=? AND id=?";
        pool.query(sql, [id_producto_empresa,id_almacen,stock,id_producto_precio,
            stock_minimo,cantidad_minima,id_empresa,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoByIdProductoStock(estado,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto_stock SET estado=? WHERE id=?";
        pool.query(sql, [estado,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoByProductoPromocion(estado,id_empresa,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto_promocion SET estado=? WHERE id_empresa=? AND id=?";
        pool.query(sql, [estado,id_empresa,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoByProductoPromocionDetalle(estado,id_producto_promocion,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto_promocion_detalle SET estado=? WHERE id_producto_promocion=? AND id=?";
        pool.query(sql, [estado,id_producto_promocion,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoByProductoDescuentoCantidad(estado,id_empresa,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto_descuento_cantidad SET estado=? WHERE id_empresa=? AND id=?";
        pool.query(sql, [estado,id_empresa,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoByProductoDescuentoTicket(estado,id_empresa,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE producto_descuento_ticket SET estado=? WHERE id_empresa=? AND id=?";
        pool.query(sql, [estado,id_empresa,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}


// ------------> DELETE

// ------------> SELECT


function productoStockById(id_producto_stock, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM producto_stock WHERE id = ? and estado = ? and id_empresa = ?;"
        pool.query(sql, [id_producto_stock, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoStockByEstadoByIdEmpresa(id_empresa,estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id,id_producto_empresa,id_almacen,stock,id_producto_precio, "
                + "stock_minimo,cantidad_minima,id_empresa,estado "
                + "FROM producto_stock WHERE id_empresa=? AND estado=?";
        pool.query(sql, [id_empresa,estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoStockByProductoEmpresa(id_producto_empresa, id_empresa, estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, id_almacen, stock, DATE_FORMAT(fecha_vencimiento,'%d/%m/%Y') as 'fecha_vencimiento', costo_adquisicion, precio_sugerido, stock_minimo, cantidad_minima FROM producto_stock WHERE id_producto_empresa = ? and id_empresa = ? and estado = ? ORDER BY fecha_vencimiento ASC"
        pool.query(sql, [id_producto_empresa, id_empresa, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoStockByProductoEmpresaAlmacenFecVencimiento(id_producto_empresa, id_almacen, costo_adquisicion, fecha_vencimiento, id_empresa, estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM producto_stock WHERE id_producto_empresa = ? and id_almacen = ? and costo_adquisicion = ? and fecha_vencimiento = ? and id_empresa = ? and estado = ?"
        pool.query(sql, [id_producto_empresa, id_almacen, costo_adquisicion, fecha_vencimiento, id_empresa, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function buscaListaGrupoProductoEmpresaStockByPalabra(estado, palabra){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT empresa.id as 'id_empresa', sucursal.id as 'id_sucursal', almacen.id as 'id_almacen', producto_grupo.id as 'id_producto_grupo', grupo, producto_grupo.descripcion, producto_grupo.imagen, sucursal.nombre as 'nombre_sucursal', empresa.nombre as 'nombre_empresa'"
        + " FROM producto_stock, producto, producto_medida, producto_grupo, almacen, sucursal, empresa"
        + " WHERE producto.id_producto_grupo = producto_grupo.id and producto.id = producto_stock.id_producto and producto.id = producto_medida.id_producto and producto_stock.id_almacen = almacen.id and almacen.id_sucursal = sucursal.id and sucursal.id_empresa = empresa.id and"
        + " producto_empresa.estado = ? and producto_stock.estado = ? and sucursal.arelishop = ? and empresa.estado = ? and producto_stock.stock > 0 and (producto.codigo LIKE '%"+palabra+"%' or producto.nombre LIKE '%"+palabra+"%' or producto.descripcion LIKE '%"+palabra+"%') GROUP BY producto_grupo.id, sucursal.id, empresa.id, almacen.id"
        + " ORDER BY producto_grupo.grupo ASC;"
        pool.query(sql, [estado, estado, estado, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaGrupoProductoAleatorioEmpresaStockByEstado(estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT empresa.id as 'id_empresa', sucursal.id as 'id_sucursal', almacen.id as 'id_almacen', producto_grupo.id as 'id_producto_grupo', grupo, producto_grupo.descripcion, producto_grupo.imagen, sucursal.nombre as 'nombre_sucursal', empresa.nombre as 'nombre_empresa'"
        + " FROM producto_stock, producto, producto_medida, producto_grupo, almacen, sucursal, empresa"
        + " WHERE producto.id_producto_grupo = producto_grupo.id and producto.id = producto_stock.id_producto and producto.id = producto_medida.id_producto and producto_stock.id_almacen = almacen.id and almacen.id_sucursal = sucursal.id and sucursal.id_empresa = empresa.id and"
        + " producto.estado = ? and producto_stock.estado = ? and sucursal.arelishop = ? and empresa.estado = ? and producto_stock.stock > 0"
        + " GROUP BY producto_grupo.id, sucursal.id, empresa.id, almacen.id"
        + " ORDER BY RAND() LIMIT 50;"
        pool.query(sql, [estado, estado, estado, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaGrupoProductoEmpresaStockByCategoriaAlmacenEmpresa(id_categoria, id_almacen, id_empresa, estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto_grupo.id, grupo, producto_grupo.descripcion, producto_grupo.imagen FROM producto_stock, producto, producto_grupo WHERE producto.id_producto_grupo = producto_grupo.id and producto.id = producto_stock.id_producto and producto_grupo.id_categoria = ? and producto_stock.id_almacen = ? and producto.id_empresa = ? and producto.estado = ? and producto_stock.estado = ? and producto_stock.stock > 0 GROUP BY producto_grupo.id ORDER BY producto_grupo.grupo ASC;"
        pool.query(sql, [id_categoria, id_almacen, id_empresa, estado, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaGrupoProductoEmpresaStockCeroByCategoriaAlmacenEmpresa(id_categoria, id_almacen, id_empresa, estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto_grupo.id, grupo, producto_grupo.descripcion, producto_grupo.imagen FROM producto, producto_stock, producto_grupo WHERE producto.id_producto_grupo = producto_grupo.id and producto.id = producto_stock.id_producto and producto_grupo.id_categoria = ? and producto_stock.id_almacen = ? and producto.id_empresa = ? and producto.estado = ? and producto_stock.estado = ? GROUP BY producto_grupo.id ORDER BY producto_grupo.grupo ASC;"
        pool.query(sql, [id_categoria, id_almacen, id_empresa, estado, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoEmpresaStockByCategoriaAlmacenEmpresa(id_categoria, id_almacen, id_empresa, estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto_empresa.id as 'id_producto_empresa', producto_empresa.id_producto, producto_empresa.codigo, producto.codigo_barra_qr, producto.nombre, producto_empresa.descripcion, producto_empresa.imagenes, GROUP_CONCAT(producto_medida.imagen SEPARATOR ',') as 'imagen' FROM producto_empresa, producto_stock, producto, producto_medida WHERE producto_empresa.id = producto_stock.id_producto_empresa and producto_empresa.id_producto = producto.id and producto_empresa.id_producto = producto_medida.id_producto  and producto_empresa.id_categoria = ? and producto_stock.id_almacen = ? and producto_empresa.id_empresa = ? and producto_empresa.estado = ? and producto_stock.estado = ? and producto_stock.stock > 0 GROUP BY producto_empresa.id, producto_empresa.codigo ORDER BY producto_empresa.codigo ASC;"
        pool.query(sql, [id_categoria, id_almacen, id_empresa, estado, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoEmpresaStockByAlmacenGrupoProductoEmpresa(id_almacen, id_producto_grupo, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto.id as 'id_producto', producto.codigo, producto.codigo_barra_qr, producto.nombre, producto.descripcion, SUM(stock) as 'stock',  GROUP_CONCAT(DATE_FORMAT(fecha_vencimiento,'%d/%m/%Y') SEPARATOR ',') as 'fecha_vencimiento', precio_sugerido, cantidad_minima, imagen FROM producto_stock, producto WHERE producto_stock.id_producto = producto.id and producto_stock.id_almacen = ? and producto.id_producto_grupo = ? and producto_stock.estado = ? and stock > 0 and producto_stock.id_empresa = ? GROUP BY producto.id, precio_sugerido, cantidad_minima ORDER BY producto.nombre ASC, fecha_vencimiento ASC;"
        pool.query(sql, [id_almacen, id_producto_grupo, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoEmpresaImagenByAlmacenGrupoProductoEmpresa(id_almacen, id_producto_grupo, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id_producto_empresa, producto_empresa.id_producto, producto.nombre, GROUP_CONCAT(producto_medida.imagen SEPARATOR ',') as 'imagen' FROM producto_stock, producto_empresa, producto, producto_medida WHERE producto_stock.id_producto_empresa = producto_empresa.id and producto_empresa.id_producto = producto.id and producto_empresa.id_producto = producto_medida.id_producto and producto_stock.id_almacen = ? and producto.id_producto_grupo = ? and producto_stock.estado = ? and stock > 0 and producto_stock.id_empresa = ? GROUP BY id_producto_empresa, producto_empresa.id_producto ORDER BY producto.nombre ASC"
        pool.query(sql, [id_almacen, id_producto_grupo, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoEmpresaImagenCeroByAlmacenGrupoProductoEmpresa(id_almacen, id_producto_grupo, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id_producto_empresa, producto_empresa.id_producto, producto.nombre, GROUP_CONCAT(producto_medida.imagen SEPARATOR ',') as 'imagen' FROM producto_stock, producto_empresa, producto, producto_medida WHERE producto_stock.id_producto_empresa = producto_empresa.id and producto_empresa.id_producto = producto.id and producto_empresa.id_producto = producto_medida.id_producto and producto_stock.id_almacen = ? and producto.id_producto_grupo = ? and producto_stock.estado = ? and producto_stock.id_empresa = ? GROUP BY id_producto_empresa, producto_empresa.id_producto ORDER BY producto.nombre ASC"
        pool.query(sql, [id_almacen, id_producto_grupo, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaStockProductoEmpresaByAlmacenesEmpresa(id_almacen, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT categoria.nombre as 'nombre_categoria', producto_empresa.codigo, producto_empresa.id_producto, producto.nombre, SUM(stock) as 'stock', DATE_FORMAT(fecha_vencimiento,'%d/%m/%Y') as 'fecha_vencimiento', costo_adquisicion, precio_sugerido FROM producto_stock, producto_empresa, producto, categoria WHERE producto_stock.id_producto_empresa = producto_empresa.id and producto_empresa.id_producto = producto.id and producto_empresa.id_categoria = categoria.id and stock > 0 and producto_stock.id_almacen IN ("+id_almacen+") and producto_stock.id_empresa = ? GROUP BY categoria.nombre, producto_empresa.codigo, producto.nombre, producto_stock.id ORDER BY categoria.nombre ASC, producto.nombre ASC;"
        pool.query(sql, [id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaStockProductoEmpresaByCategoriaAlmacenEmpresa(id_almacen, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT categoria.nombre as 'nombre_categoria', producto_empresa.id_producto, producto.codigo, producto.nombre, producto_empresa.descripcion, SUM(stock) as 'stock', GROUP_CONCAT(fecha_vencimiento SEPARATOR ',') as 'fecha_vencimiento', producto_empresa.imagenes FROM producto_stock, producto_empresa, producto, categoria WHERE producto_stock.id_producto_empresa = producto_empresa.id and producto_empresa.id_producto = producto.id and producto_empresa.id_categoria = categoria.id and producto_empresa.id_categoria = ? and producto_stock.id_almacen = ? and producto_stock.id_empresa = ? GROUP BY producto_empresa.id_producto, producto_empresa.descripcion, producto_empresa.imagenes, categoria.nombre ORDER BY producto.nombre ASC;"
        pool.query(sql, [id_almacen, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    agregarProductoStock,
    actualizarStockById,
    actualizarStockFecVenById,
    actualizarPrecioSugeridoByProductoEmpresaAlmacen,
    actualizarStockMinimoCantidadMinimaByProductoEmpresaAlmacen,
    precioSugeridoByProductoEmpresaAlmacen,
    precioSugeridoByProductoGrupoAlmacen,
    stockMinimoCantidadMinimaByProductoGrupoAlmacen,
    listaProductoStockByProductoEmpresaAlmacen,
    listaProductoStockByProductoEmpresaAlmacenCosto,
    listaProductoEmpresaStockCeroByAlmacenProductoEmpresa,
    listaKardexStockByProductoStockEmpresa,





    
    agregarKardexStock,
    agregarProductoPrecio,
    agregarProductoPromocion,
    agregarProductoPromocionDetalle,
    agregarProductoDescuentoCantidad,
    agregarProductoDescuentoTicket,

    actualizarDatosProductoStockById,
    actualizarEstadoByIdProductoStock,
    actualizarEstadoByProductoPromocion,
    actualizarEstadoByProductoPromocionDetalle,
    actualizarEstadoByProductoDescuentoCantidad,
    actualizarEstadoByProductoDescuentoTicket,

    productoStockById,
    listaGrupoProductoAleatorioEmpresaStockByEstado,
    listaProductoStockByEstadoByIdEmpresa,
    listaProductoStockByProductoEmpresa,
    listaProductoStockByProductoEmpresaAlmacenFecVencimiento,
    listaProductoEmpresaStockByCategoriaAlmacenEmpresa,
    listaProductoEmpresaStockByAlmacenGrupoProductoEmpresa,
    listaProductoEmpresaImagenByAlmacenGrupoProductoEmpresa,
    listaProductoEmpresaImagenCeroByAlmacenGrupoProductoEmpresa,
    buscaListaGrupoProductoEmpresaStockByPalabra,
    listaGrupoProductoEmpresaStockByCategoriaAlmacenEmpresa,
    listaGrupoProductoEmpresaStockCeroByCategoriaAlmacenEmpresa,
    listaProductoEmpresaStockCeroByAlmacenGrupoProductoEmpresa,
    listaStockProductoEmpresaByAlmacenesEmpresa,
    listaStockProductoEmpresaByAlmacenEmpresa,
    listaStockProductoEmpresaByCategoriaAlmacenEmpresa
}