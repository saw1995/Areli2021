const ventaModelo = require('../modelo/ventaModelo');
const productoStockModelo = require('../modelo/productoStockModelo');
const productoModelo = require('../modelo/productoModelo');
const almacenModelo = require('../modelo/almacenModelo');
var dateTime = require('node-datetime');

const PdfPrinter = require('pdfmake');
const fonts = require('../libreria/fonts');
const { header } = require('../pdfs/config_reporte');
const { reporteStock } = require('../pdfs/reporte_stock_producto');

// ------------> INSERT
function agregarProductoStock(id,id_producto_empresa,id_almacen,stock,id_producto_precio,stock_minimo,cantidad_minima,id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && id_producto_empresa !== undefined && id_almacen !== undefined && stock !== undefined &&
                id_producto_precio !== undefined && stock_minimo !== undefined && cantidad_minima !== undefined && id_empresa !== undefined){
                    
                var resultado = await productoStockModelo.agregarProductoStock(id,id_producto_empresa,id_almacen,stock,id_producto_precio,stock_minimo,cantidad_minima,id_empresa,1);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function actualizarPrecioSugeridoByProductoGrupoAlmacen(precio, id_producto_grupo, id_almacen, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(precio !== undefined && id_producto_grupo !== undefined && id_almacen !== undefined && id_empresa !== undefined){

                var producto_empresa = await productoStockModelo.precioSugeridoByProductoGrupoAlmacen(id_producto_grupo, id_almacen, id_empresa);
                var id_producto = "";
                for(i=0;i<producto_empresa.length;i++){
                    id_producto = id_producto + "'" + producto_empresa[i]["id_producto"] + "'";
                    if(i+1 != producto_empresa.length){
                        id_producto = id_producto + ",";
                    }
                }

                var resultado = await productoStockModelo.actualizarPrecioSugeridoByProductoEmpresaAlmacen(precio, id_producto, id_almacen, id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function actualizarStockMinimoCantidadMinimaByProductoGrupoAlmacen(stock_minimo, cantidad_minima, id_producto_grupo, id_almacen, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(stock_minimo !== undefined && id_producto_grupo !== undefined && id_almacen !== undefined && id_empresa !== undefined){

                var producto_empresa = await productoStockModelo.stockMinimoCantidadMinimaByProductoGrupoAlmacen(id_producto_grupo, id_almacen, id_empresa);
                var id_producto = "";
                for(i=0;i<producto_empresa.length;i++){
                    id_producto = id_producto + "'" + producto_empresa[i]["id_producto"] + "'";
                    if(i+1 != producto_empresa.length){
                        id_producto = id_producto + ",";
                    }
                }

                var resultado = await productoStockModelo.actualizarStockMinimoCantidadMinimaByProductoEmpresaAlmacen(stock_minimo, cantidad_minima, id_producto, id_almacen, id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function listaProductoEmpresaStockCeroByAlmacenGrupoProductoEmpresa(id_almacen, id_producto_grupo, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_almacen !== undefined && id_producto_grupo !== undefined && id_empresa !== undefined && estado !== undefined){

                var resultado = await productoStockModelo.listaProductoEmpresaStockCeroByAlmacenGrupoProductoEmpresa(id_almacen, id_producto_grupo, estado, id_empresa);
                
                for(i=0;i<resultado.length;i++){
                   var reserva = await ventaModelo.listaProductoEmpresaByVentaAlmacen(resultado[i]["id_producto"], "5", id_almacen, id_empresa);
                   var pre_venta = await ventaModelo.listaProductoEmpresaByVentaAlmacen(resultado[i]["id_producto"], "0", id_almacen, id_empresa);
                   
                   if(reserva.length > 0){
                       resultado[i]["reserva"] = reserva[0]["cantidad"];
                   }else{
                       resultado[i]["reserva"] = "0";
                   }

                   if(pre_venta.length > 0){
                       resultado[i]["pre_venta"] = pre_venta[0]["cantidad"];
                   }else{
                       resultado[i]["pre_venta"] = "0";
                   }

                   resultado[i]["stock"] = parseInt(resultado[i]["stock_fisico"]) - (parseInt(resultado[0]["pre_venta"]) + parseInt(resultado[0]["reserva"]));
                }

                for (j=0;j<resultado.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(resultado[j]["id_producto"], "1");
                    var sto = parseInt(resultado[j]["stock_fisico"]);
                    resultado[j]["cant_stock_fisico"] = "0 Unidades";
                    var cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]);
                        st = Math.trunc(st);
                        var stmod = sto % parseInt(medida[i]["unidad"]);
    
                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                        }
    
                        if(stmod == 0){
                            resultado[j]["cant_stock_fisico"] = cantidad.substring(0, cantidad.length - 2);
                            if(resultado[j]["stock_fisico"] == "0"){
                                resultado[j]["cant_stock_fisico"] = "0 Unidades";
                            }
                            break;
                        }else {
                            sto = stmod;
                        }
                    }

                    sto = parseInt(resultado[j]["stock"]);
                    resultado[j]["cant_stock"] = "0 Unidades";
                    cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]);
                        st = Math.trunc(st);
                        var stmod = sto % parseInt(medida[i]["unidad"]);
    
                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                        }
    
                        if(stmod == 0){
                            resultado[j]["cant_stock"] = cantidad.substring(0, cantidad.length - 2);
                            if(resultado[j]["stock"] == "0"){
                                resultado[j]["cant_stock"] = "0 Unidades";
                            }
                            break;
                        }else {
                            sto = stmod;
                        }
                    }

                    sto = parseInt(resultado[j]["reserva"]);
                    resultado[j]["cant_reserva"] = "0 Unidades";
                    cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]);
                        st = Math.trunc(st);
                        var stmod = sto % parseInt(medida[i]["unidad"]);
    
                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                        }
    
                        if(stmod == 0){
                            resultado[j]["cant_reserva"] = cantidad.substring(0, cantidad.length - 2);
                            if(resultado[j]["reserva"] == "0"){
                                resultado[j]["cant_reserva"] = "0 Unidades";
                            }
                            break;
                        }else {
                            sto = stmod;
                        }
                    }

                    sto = parseInt(resultado[j]["pre_venta"]);
                    resultado[j]["cant_pre_venta"] = "0 Unidades";
                    cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]);
                        st = Math.trunc(st);
                        var stmod = sto % parseInt(medida[i]["unidad"]);
    
                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                        }
    
                        if(stmod == 0){
                            resultado[j]["cant_pre_venta"] = cantidad.substring(0, cantidad.length - 2);
                            if(resultado[j]["pre_venta"] == "0"){
                                resultado[j]["cant_pre_venta"] = "0 Unidades";
                            }
                            break;
                        }else {
                            sto = stmod;
                        }
                    }
                }

                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function listaProductoEmpresaStockCeroByAlmacenProductoEmpresa(id_almacen, id_producto, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_almacen !== undefined && id_producto !== undefined && id_empresa !== undefined && estado !== undefined){

                var resultado = await productoStockModelo.listaProductoEmpresaStockCeroByAlmacenProductoEmpresa(id_almacen, id_producto, estado, id_empresa);

                var medida = await productoModelo.listaMedidaByProductoEstado(resultado[0]["id_producto"], "1");
                for (j=0;j<resultado.length;j++) {
                    var sto = parseInt(resultado[j]["stock_fisico"]);
                    resultado[j]["cant_stock_fisico"] = "0 Unidades";
                    var cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]);
                        st = Math.trunc(st);
                        var stmod = sto % parseInt(medida[i]["unidad"]);
    
                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                        }
    
                        if(stmod == 0){
                            resultado[j]["cant_stock_fisico"] = cantidad.substring(0, cantidad.length - 2);
                            if(resultado[j]["stock_fisico"] == "0"){
                                resultado[j]["cant_stock_fisico"] = "0 Unidades";
                            }
                            break;
                        }else {
                            sto = stmod;
                        }
                    }
                }

                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function listaKardexStockByProductoStockEmpresa(id_producto_stock, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto_stock !== undefined && id_empresa !== undefined){

                var resultado = await productoStockModelo.listaKardexStockByProductoStockEmpresa(id_producto_stock, id_empresa);

                var medida = await productoModelo.listaMedidaByProductoEstado(resultado[0]["id_producto"], "1");
                for (j=0;j<resultado.length;j++) {
                    var swImagen = true;
                    var imagen = [];
                    for(k=0;k<medida.length;k++){
                        if(medida[k]["imagen"] != "sin_imagen_presentacion.jpg"){
                            imagen.push(medida[k]["imagen"]);
                        }else{
                            if(swImagen){
                                swImagen = false;
                                imagen.push(medida[k]["imagen"]);
                            }
                        }
                    }
                    resultado[j]["imagen"] = imagen;

                    var sto = parseInt(resultado[j]["cantidad"]);
                    resultado[j]["cant_movimiento"] = "0 Unidades";
                    var cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]);
                        st = Math.trunc(st);
                        var stmod = sto % parseInt(medida[i]["unidad"]);
    
                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                        }
    
                        if(stmod == 0){
                            resultado[j]["cant_movimiento"] = cantidad.substring(0, cantidad.length - 2);
                            if(resultado[j]["cantidad"] == "0"){
                                resultado[j]["cant_movimiento"] = "0 Unidades";
                            }
                            break;
                        }else {
                            sto = stmod;
                        }
                    }
                }

                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function precioSugeridoByProductoEmpresaAlmacen(id_producto_empresa, id_almacen, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto_empresa !== undefined && id_almacen !== undefined && id_empresa !== undefined){

                var resultado = await productoStockModelo.precioSugeridoByProductoEmpresaAlmacen(id_producto_empresa, id_almacen, id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function precioSugeridoByProductoGrupoAlmacen(id_producto_grupo, id_almacen, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto_grupo !== undefined && id_almacen !== undefined && id_empresa !== undefined){

                var resultado = await productoStockModelo.precioSugeridoByProductoGrupoAlmacen(id_producto_grupo, id_almacen, id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function stockMinimoCantidadMinimaByProductoGrupoAlmacen(id_producto_grupo, id_almacen, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto_grupo !== undefined && id_almacen !== undefined && id_empresa !== undefined){

                var resultado = await productoStockModelo.stockMinimoCantidadMinimaByProductoGrupoAlmacen(id_producto_grupo, id_almacen, id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}
















































function agregarProductoPrecio(id,precio,fecha,hora,id_usuario,id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && precio !== undefined && fecha !== undefined && hora !== undefined &&
                id_usuario !== undefined && id_empresa !== undefined){

                var resultado = await productoStockModelo.agregarProductoPrecio(id,precio,fecha,hora,id_usuario,id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function agregarProductoPromocion(id,codigo,nombre,descripcion,fecha_inicio,fecha_limite,
    precio_promocion,id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && codigo !== undefined && nombre !== undefined && descripcion !== undefined &&
                fecha_inicio !== undefined && fecha_limite !== undefined && precio_promocion !== undefined && id_empresa !== undefined){

                var resultado = await productoStockModelo.agregarProductoPromocion(id,codigo,nombre,descripcion,fecha_inicio,fecha_limite,
                    precio_promocion,1,id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function agregarProductoPromocionDetalle(id,id_producto_promocion,id_producto_stock,cantidad,precio_promocion){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && id_producto_promocion !== undefined && id_producto_stock !== undefined && 
                cantidad !== undefined && precio_promocion !== undefined){

                var resultado = await productoStockModelo.agregarProductoPromocionDetalle(id,id_producto_promocion,id_producto_stock,cantidad,precio_promocion,1);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function agregarProductoDescuentoCantidad(id,id_producto_stock,fecha_inicio,fecha_limite,cantidad,porcentaje_descuento,id_usuario,id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && id_producto_stock !== undefined && fecha_inicio !== undefined && fecha_limite !== undefined &&
                cantidad !== undefined && porcentaje_descuento !== undefined && id_usuario !== undefined && id_empresa !== undefined){

                var resultado = await productoStockModelo.agregarProductoDescuentoCantidad(id,id_producto_stock,fecha_inicio,fecha_limite,cantidad,porcentaje_descuento,1,id_usuario,id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function agregarProductoDescuentoTicket(id,id_almacen,fecha_inicio,fecha_limite,monto,porcentaje_descuento,id_usuario,id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && id_almacen !== undefined && fecha_inicio !== undefined && fecha_limite !== undefined &&
                monto !== undefined && porcentaje_descuento !== undefined && id_usuario !== undefined && id_empresa !== undefined){

                var resultado = await productoStockModelo.agregarProductoDescuentoTicket(id,id_almacen,fecha_inicio,fecha_limite,monto,porcentaje_descuento,1,id_usuario,id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

// ------------> UPDATE
function  actualizarStockById(stock, id, observacion, estado, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(stock !== undefined && id_usuario !== undefined && id !== undefined && id_empresa !== undefined){
                var dt = dateTime.create();
                const fecha = dt.format('Y-m-d');
                const hora = dt.format('H:M:S');
                const id_generado = Date.now();

                var productoStock = await productoStockModelo.productoStockById(id, estado, id_empresa);
                var stockRestante = 0;
                stockRestante = parseInt(stock) - parseInt(productoStock[0]["stock"]);

                var salida_entrada = "1";
                if(parseInt(stockRestante) > 0){
                    salida_entrada = "0";
                }
                var resultado = await productoStockModelo.actualizarStockById(stock, id);
                var detalle = "Ajuste de Inventario";
                var precio = productoStock[0]["precio_sugerido"]
                resultado = await productoStockModelo.agregarKardexStock(id_generado, id, salida_entrada, "Ajuste de Inventario", stockRestante, precio, detalle, observacion, fecha, hora, id_usuario, id_empresa);

                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}


function actualizarDatosProductoStockById(id_producto_empresa,id_almacen,stock,id_producto_precio,
    stock_minimo,multiplo,cantidad_minima,id_empresa,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto_empresa !== undefined && id_almacen !== undefined && stock !== undefined && 
                id_producto_precio !== undefined && stock_minimo !== undefined && multiplo !== undefined && 
                cantidad_minima !== undefined && id_empresa !== undefined && id !== undefined){

                var resultado = await productoStockModelo.actualizarDatosProductoStockById(id_producto_empresa,id_almacen,stock,id_producto_precio,
                    stock_minimo,multiplo,cantidad_minima,id_empresa,id);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function actualizarEstadoByIdProductoStock(estado,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id !== undefined){

                var resultado = await productoStockModelo.actualizarEstadoByIdProductoStock(estado,id);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function actualizarEstadoByProductoPromocion(estado,id_empresa,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_empresa !== undefined && id !== undefined){

                var resultado = await productoStockModelo.actualizarEstadoByProductoPromocion(estado,id_empresa,id);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function actualizarEstadoByProductoPromocionDetalle(estado,id_producto_promocion,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_producto_promocion !== undefined && id !== undefined){

                var resultado = await productoStockModelo.actualizarEstadoByProductoPromocionDetalle(estado,id_producto_promocion,id);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function actualizarEstadoByProductoDescuentoCantidad(estado,id_empresa,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_empresa !== undefined && id !== undefined){

                var resultado = await productoStockModelo.actualizarEstadoByProductoDescuentoCantidad(estado,id_empresa,id);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function actualizarEstadoByProductoDescuentoTicket(estado,id_empresa,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_empresa !== undefined && id !== undefined){

                var resultado = await productoStockModelo.actualizarEstadoByProductoDescuentoTicket(estado,id_empresa,id);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}
// ------------> DELETE

// ------------> SELECT


function listaProductoStockByEstadoByIdEmpresa(id_empresa,estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined && estado !== undefined){

                var resultado = await productoStockModelo.listaProductoStockByEstadoByIdEmpresa(id_empresa,estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function listaProductoStockByProductoEmpresa(id_producto_empresa, id_empresa, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto_empresa !== undefined && id_empresa !== undefined && estado !== undefined){

                var resultado = await productoStockModelo.listaProductoStockByProductoEmpresa(id_producto_empresa, id_empresa, estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function listaProductoStockByProductoEmpresaAlmacen(id_producto_empresa, id_almacen, id_empresa, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto_empresa !== undefined && id_almacen !== undefined && id_empresa !== undefined && estado !== undefined){

                var resultado = await productoStockModelo.listaProductoStockByProductoEmpresaAlmacen(id_producto_empresa, id_almacen, id_empresa, estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function listaProductoStockByProductoEmpresaAlmacenFecVencimiento(id_producto_empresa, id_almacen, fecha_vencimiento, id_empresa, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto_empresa !== undefined && id_almacen !== undefined && fecha_vencimiento !== undefined && id_empresa !== undefined && estado !== undefined){

                var resultado = await productoStockModelo.listaProductoStockByProductoEmpresaAlmacenFecVencimiento(id_producto_empresa, id_almacen, fecha_vencimiento, id_empresa, estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function listaProductoEmpresaStockByCategoriaAlmacenEmpresa(id_categoria, id_almacen, id_empresa, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_categoria !== undefined && id_empresa !== undefined && estado !== undefined){

                var resultado = await productoStockModelo.listaProductoEmpresaStockByCategoriaAlmacenEmpresa(id_categoria, id_almacen, id_empresa, estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function listaProductoEmpresaStockByAlmacenGrupoProductoEmpresa(id_almacen, id_producto_grupo, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_almacen !== undefined && id_producto_grupo !== undefined && id_empresa !== undefined && estado !== undefined){

                var resultado = await productoStockModelo.listaProductoEmpresaStockByAlmacenGrupoProductoEmpresa(id_almacen, id_producto_grupo, estado, id_empresa);

                for (j=0;j<resultado.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(resultado[j]["id_producto"], "1");
                    var sto = parseInt(resultado[j]["stock"]);
                    var cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]);
                        st = Math.trunc(st);
                        var stmod = sto % parseInt(medida[i]["unidad"]);
    
                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                        }
    
                        if(stmod == 0){
                            resultado[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                            break;
                        }else {
                            sto = stmod;
                        }
                    }
                }

                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function buscaListaGrupoProductoEmpresaStockByPalabra(estado, palabra){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && palabra !== undefined){

                var resultado_palabra = [];
                var arraypalabra = palabra.split(" ");
                for(i=0;i<arraypalabra.length;i++){
                    resultado_array_palabra = await productoStockModelo.buscaListaGrupoProductoEmpresaStockByPalabra(estado, arraypalabra[i]);
                    resultado_palabra = resultado_palabra.concat(resultado_array_palabra);
                }
                resultado = resultado_palabra;
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function listaGrupoProductoAleatorioEmpresaStockByEstado(estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined){
                var resultado = await productoStockModelo.listaGrupoProductoAleatorioEmpresaStockByEstado(estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}


function listaGrupoProductoEmpresaStockByCategoriaAlmacenEmpresa(id_categoria, id_almacen, id_empresa, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_categoria !== undefined && id_empresa !== undefined && estado !== undefined){

                var resultado = await productoStockModelo.listaGrupoProductoEmpresaStockByCategoriaAlmacenEmpresa(id_categoria, id_almacen, id_empresa, estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function listaGrupoProductoEmpresaStockCeroByCategoriaAlmacenEmpresa(id_categoria, id_almacen, id_empresa, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_categoria !== undefined && id_empresa !== undefined && estado !== undefined){

                var resultado = await productoStockModelo.listaGrupoProductoEmpresaStockCeroByCategoriaAlmacenEmpresa(id_categoria, id_almacen, id_empresa, estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function listaStockProductoEmpresaByAlmacenEmpresa(id_almacen, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_almacen !== undefined && id_empresa !== undefined){

                var producto = await productoStockModelo.listaStockProductoEmpresaByAlmacenEmpresa(id_almacen, id_empresa);
                listaProductoEmpresaByVentaAlmacen


                for (j=0;j<producto.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(producto[j]["id_producto"], "1")

                    var sto = producto[j]["stock"];
                    var cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = parseInt(sto) / parseInt(medida[i]["unidad"]);
                        st = parseInt(st);
                        var stmod = parseInt(sto) % parseInt(medida[i]["unidad"]);

                    
                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + ", ";
                        }

                        if(stmod == 0){
                            producto[j]["stock_medida"] = cantidad;
                            break;
                        }else {
                            sto = stmod;
                        }
                    }
                }
                
                if(producto.length == 0){
                    producto = [];
                }
                respuesta = {"datos":producto}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function listaStockProductoEmpresaByCategoriaAlmacenEmpresa(id_categoria, id_almacen, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_categoria !== undefined && id_almacen !== undefined && id_empresa !== undefined){

                var producto = await productoStockModelo.listaStockProductoEmpresaByCategoriaAlmacenEmpresa(id_categoria, id_almacen, id_empresa);
                
                for (j=0;j<producto.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(producto[j]["id_producto"], "1")

                    var sto = producto[j]["stock"];
                    var cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = parseInt(sto) / parseInt(medida[i]["unidad"]);
                        st = parseInt(st);
                        var stmod = parseInt(sto) % parseInt(medida[i]["unidad"]);

                    
                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + ", ";
                        }

                        if(stmod == 0){
                            producto[j]["stock_medida"] = cantidad;
                            break;
                        }else {
                            sto = stmod;
                        }
                    }
                }
                
                if(producto.length == 0){
                    producto = [];
                }
                respuesta = {"datos":producto}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function reporteListaStockBySucursal(id_sucursal, id_rol, id_empresa, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var almacen = await almacenModelo.listaAlmacenRolByRol("1", id_sucursal, id_rol, id_empresa);
            var id_almacen = "";
            var almacenes = "";
            for(i=0;i<almacen.length;i++){
                id_almacen = id_almacen + "," + almacen[i]["id_almacen"];
                almacenes = almacenes + ", " + almacen[i]["nombre_almacen"]
            }
            id_almacen = id_almacen.substring(1, id_almacen.length);
            var stock = await productoStockModelo.listaStockProductoEmpresaByAlmacenesEmpresa(id_almacen, id_empresa);

            for (j=0;j<stock.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(stock[j]["id_producto"], "1");

                var sto = parseInt(stock[j]["stock"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        stock[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                        break;
                    }else {
                        sto = stmod;
                    }
                }
            }
            
            var docDefinition = {
                pageSize: 'LETTER',
                pageMargins: [ 80, 100, 40, 60 ],
                header: {
                    stack: await header(id_sucursal, id_empresa, id_usuario_impresion),
                    margin: [ 80, 25, 40, 20 ],
                },
                footer: function(currentPage, pageCount) {
                    return {
                        margin: [ 80, 10, 40, 40 ],
                        fontSize: 8,
                        columns: [
                            { text: '©NovaPOS', italics: true },
                            { text: 'Pagina ' + currentPage.toString() + ' de ' + pageCount, italics: true, alignment: 'right' }
                        ],
                    };
                },
                content: await reporteStock(almacenes, almacen[0]["nombre_sucursal"], stock),
            };
    
            const printer = new PdfPrinter(fonts);
    
            let pdfDoc = printer.createPdfKitDocument(docDefinition);

            var chunks = [];
            pdfDoc.on('data', chunk => chunks.push(chunk));
            pdfDoc.on('end', () => resolved(Buffer.concat(chunks)));
            pdfDoc.end();

        }catch(error){
            console.log(error)
            return reject({"mysql":error});
        }
    })
}

//export
module.exports = {
    agregarProductoStock,
    actualizarPrecioSugeridoByProductoGrupoAlmacen,
    actualizarStockMinimoCantidadMinimaByProductoGrupoAlmacen,
    precioSugeridoByProductoEmpresaAlmacen,
    precioSugeridoByProductoGrupoAlmacen,
    stockMinimoCantidadMinimaByProductoGrupoAlmacen,
    listaProductoEmpresaStockCeroByAlmacenProductoEmpresa,
    listaKardexStockByProductoStockEmpresa,






    agregarProductoPrecio,
    agregarProductoPromocion,
    agregarProductoPromocionDetalle,
    agregarProductoDescuentoCantidad,
    agregarProductoDescuentoTicket,

    actualizarStockById,
    actualizarDatosProductoStockById,
    actualizarEstadoByIdProductoStock,
    actualizarEstadoByProductoPromocion,
    actualizarEstadoByProductoPromocionDetalle,
    actualizarEstadoByProductoDescuentoCantidad,
    actualizarEstadoByProductoDescuentoTicket,
    listaGrupoProductoAleatorioEmpresaStockByEstado,
    listaProductoStockByEstadoByIdEmpresa,
    listaProductoStockByProductoEmpresa,
    listaProductoStockByProductoEmpresaAlmacen,
    listaProductoStockByProductoEmpresaAlmacenFecVencimiento,
    listaProductoEmpresaStockByCategoriaAlmacenEmpresa,
    listaProductoEmpresaStockByAlmacenGrupoProductoEmpresa,
    listaProductoEmpresaStockCeroByAlmacenGrupoProductoEmpresa,
    buscaListaGrupoProductoEmpresaStockByPalabra,
    listaGrupoProductoEmpresaStockByCategoriaAlmacenEmpresa,
    listaGrupoProductoEmpresaStockCeroByCategoriaAlmacenEmpresa,
    listaStockProductoEmpresaByAlmacenEmpresa,
    listaStockProductoEmpresaByCategoriaAlmacenEmpresa,
    
    reporteListaStockBySucursal
}