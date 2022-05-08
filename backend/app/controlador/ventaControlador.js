const almacenModelo = require('../modelo/almacenModelo');
const sucursalModelo = require('../modelo/sucursalModelo');
const ventaModelo = require('../modelo/ventaModelo');
const productoModelo = require('../modelo/productoModelo');
const productoStockModelo = require('../modelo/productoStockModelo');
const tiendaModelo = require('../modelo/tiendaModelo');
const descuentoModelo = require('../modelo/descuentoModelo');
const usuarioModelo = require('../modelo/usuarioModelo');
var dateTime = require('node-datetime');
const meses = new Array ("","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

const PdfPrinter = require('pdfmake');
const fonts = require('../libreria/fonts');
const { header } = require('../pdfs/config_reporte');
const { notaEntregaVentaTermica } = require('../pdfs/nota_entrega_venta_termica');
const { notaEntregaVentaCarta } = require('../pdfs/nota_entrega_venta_carta');
const { reportePreVentaCliente } = require('../pdfs/reporte_pre_venta_cliente');
const { reportePreVentaProducto } = require('../pdfs/reporte_pre_venta_producto');
const { reporteVentaCliente } = require('../pdfs/reporte_venta_cliente');
const { reporteVentaProducto } = require('../pdfs/reporte_venta_producto');
const { reporteVentaDetalle } = require('../pdfs/reporte_venta_detalle');

function agregarVentaCarritoUsuario(id_usuario, id_sucursal, id_producto, cantidad, precio, id_descuento_cantidad, id_empresa, id_promocion){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_usuario !== undefined && id_sucursal !== undefined && id_producto !== undefined && cantidad !== undefined && precio !== undefined && id_promocion !== undefined){
                const id_generado_carrito = Date.now();
                var dt = dateTime.create();
                const fecha = dt.format('Y-m-d');
                const hora = dt.format('H:M:S');

                var resultado;

                var carrito = await ventaModelo.productoEmpresaCarritoByUsuarioSucursalProducto(id_usuario, id_sucursal, id_producto, id_empresa, id_promocion);
                    
                if(carrito.length > 0){
                    let cant = parseInt(cantidad) + parseInt(carrito[0]["cantidad"]);
                    resultado = await ventaModelo.actualizarCarritoCantidadById(cant, carrito[0]["id"]);
                }else{
                    resultado = await ventaModelo.agregarVentaCarritoUsuario(id_generado_carrito, id_usuario, id_sucursal, id_producto, cantidad, precio, id_descuento_cantidad, id_empresa, fecha, hora, id_promocion);
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

function agregarVentaCarritoTienda(id_tienda, id_sucursal, id_producto, cantidad, precio, id_descuento_cantidad, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tienda !== undefined && id_sucursal !== undefined && id_producto !== undefined && cantidad !== undefined && precio !== undefined){
                const id_generado_venta = Date.now();
                var dt = dateTime.create();
                const fecha = dt.format('Y-m-d');
                const hora = dt.format('H:M:S');

                var carrito = await ventaModelo.productoEmpresaCarritoByTiendaSucursalProducto(id_tienda, id_sucursal, id_producto, id_empresa);
                var resultado;
                if(carrito.length > 0){
                    let cant = parseInt(cantidad) + parseInt(carrito[0]["cantidad"]);
                    resultado = await ventaModelo.actualizarCarritoCantidadTiendaById(cant, carrito[0]["id"]);
                }else{
                    resultado = await ventaModelo.agregarVentaCarritoTienda(id_generado_venta, id_tienda, id_sucursal, id_producto, cantidad, precio, id_descuento_cantidad, id_empresa, fecha, hora);
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

function anularVentaById(estado, id_venta, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_venta !== undefined){
                var resultado = await ventaModelo.anularVentaById(estado, id_venta, id_empresa);
                
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

function generarFacturaBy(){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && id_tienda_empresa !== undefined && id_sucursal !== undefined && fecha_entrega !== undefined && venta !== undefined && factura !== undefined && id_descuento_ticket !== undefined && id_usuario !== undefined && id_empresa !== undefined){
                var dt = dateTime.create();
                const fecha = dt.format('Y-m-d');
                const hora = dt.format('H:M:S');
                var nro_factura = "1";

                

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

function agregarVenta(id_sucursal, razon_social, nit, observacion, credito, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, estado, id_tienda_empresa, id_tienda, id_pre_venta, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && razon_social !== undefined && nit !== undefined && id_pre_venta !== undefined && id_descuento_ticket !== undefined && id_usuario !== undefined && id_empresa !== undefined){
                const id_generado_venta = Date.now();
                var dt = dateTime.create();
                const fecha = dt.format('Y-m-d');
                const hora = dt.format('H:M:S');
                var nro_venta = "1";

                var almacen = await almacenModelo.almacenVentaSucursalBySucursalVenta(id_sucursal, id_empresa, "1", "1")
                var venta = await ventaModelo.ultimaVentaBySucursal(id_sucursal, id_empresa);
                if(venta.length > 0){
                    nro_venta = parseInt(venta[0]["nro_venta"]) + 1;
                }
                var resultado = await tiendaModelo.actualizarNitRazonSocialById(nit, razon_social, id_tienda);
                resultado = await ventaModelo.agregarVenta(id_generado_venta, nro_venta, id_sucursal, razon_social, nit, observacion, fecha, hora, credito, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, "1", estado, id_tienda_empresa, id_pre_venta, id_usuario, id_empresa);
                var descuentoTicket = await descuentoModelo.descuentoTicketById(id_descuento_ticket);
                if(id_pre_venta == "1"){
                    var carrito = await ventaModelo.listaCarritoByUsuarioSucursal(id_usuario, id_sucursal, id_empresa)
                    for(i=0;i<carrito.length;i++){
                        var productoStock = await productoStockModelo.listaProductoStockByProductoEmpresaAlmacen(carrito[i]["id_producto"], almacen[0]["id"], id_empresa, "1");
                        var cant = parseInt(carrito[i]["cantidad"]);
                        for(j=0;j<productoStock.length;j++){
                            var id_generado = Date.now() + "-" + j;
                            if(parseInt(productoStock[j]["stock"]) >= cant){
                                resultado = await ventaModelo.agregarVentaDetalle(id_generado, id_generado_venta, productoStock[j]["id"], carrito[i]["cantidad"], carrito[i]["precio"], carrito[i]["id_descuento_cantidad"], "1", id_empresa);
                                resultado = await ventaModelo.eliminarProductoCarritoById(carrito[i]["id"], id_empresa);
                                var nuevo_stock = parseInt(productoStock[j]["stock"]) - cant;
                                resultado = await productoStockModelo.actualizarStockById(nuevo_stock, productoStock[j]["id"]);
                                var detalle = "Venta Nro. " + nro_venta;
                                var precio = (parseFloat(carrito[i]["precio"]) - (parseFloat(carrito[i]["precio"]) * (parseFloat(carrito[i]["porcentaje_descuento"]) * 0.01)) );
                                precio = (precio - (precio * (parseFloat(descuentoTicket[0]["porcentaje_descuento"]) * 0.01)) );
                                resultado = await productoStockModelo.agregarKardexStock(id_generado, productoStock[j]["id"], "1", "Venta", carrito[i]["cantidad"], precio, detalle, "", fecha, hora, id_usuario, id_empresa);
                                break;
                            }else{
                                resultado = await ventaModelo.agregarVentaDetalle(id_generado, id_generado_venta, productoStock[j]["id"], productoStock[j]["stock"], carrito[i]["precio"], carrito[i]["id_descuento_cantidad"], "1", id_empresa);
                                resultado = await productoStockModelo.actualizarStockById(0, productoStock[j]["id"]);
                                cant = cant - parseInt(productoStock[j]["stock"]);
                                var detalle = "Venta Nro. " + nro_venta;
                                var precio = (parseFloat(carrito[i]["precio"]) - (parseFloat(carrito[i]["precio"]) * (parseFloat(carrito[i]["porcentaje_descuento"]) * 0.01)) );
                                precio = (precio - (precio * (parseFloat(descuentoTicket[0]["porcentaje_descuento"]) * 0.01)) );
                                resultado = await productoStockModelo.agregarKardexStock(id_generado, productoStock[j]["id"], "1", "Venta", productoStock[j]["stock"], precio, detalle, "", fecha, hora, id_usuario, id_empresa);
                            }
                        }
                    }
                    var resultado = await tiendaModelo.agregarTiendaVisita(Date.now(), id_tienda_empresa, "0999", "Venta directa", fecha, hora, id_usuario, "1", id_empresa)
                }else{
                    var preventa = await ventaModelo.listaPreVentaDetalleByEstadoPreVenta(id_pre_venta, "1", id_empresa);
                    resultado = await ventaModelo.actualizarIdVentaById(id_generado_venta, id_pre_venta);
                    for(i=0;i<preventa.length;i++){
                        var productoStock = await productoStockModelo.listaProductoStockByProductoEmpresaAlmacen(preventa[i]["id_producto"], almacen[0]["id"], id_empresa, "1");
                        var cant = parseInt(preventa[i]["cantidad"]);
                        for(j=0;j<productoStock.length;j++){
                            if(parseInt(productoStock[j]["stock"]) >= cant){
                                resultado = await ventaModelo.agregarVentaDetalle(preventa[i]["id"], id_generado_venta, productoStock[j]["id"], preventa[i]["cantidad"], preventa[i]["precio"], preventa[i]["id_descuento_cantidad"], "1", id_empresa);
                                resultado = await ventaModelo.eliminarProductoCarritoById(preventa[i]["id"], id_empresa);
                                var nuevo_stock = parseInt(productoStock[j]["stock"]) - cant;
                                resultado = await productoStockModelo.actualizarStockById(nuevo_stock, productoStock[j]["id"]);
                                var detalle = "Venta Nro. " + nro_venta;
                                var precio = (parseFloat(preventa[i]["precio"]) - (parseFloat(preventa[i]["precio"]) * (parseFloat(preventa[i]["porcentaje_descuento"]) * 0.01)) );
                                precio = (precio - (precio * (parseFloat(descuentoTicket[0]["porcentaje_descuento"]) * 0.01)) );
                                resultado = await productoStockModelo.agregarKardexStock(preventa[i]["id"], productoStock[j]["id"], "1", "Venta", preventa[i]["cantidad"], precio, detalle, "", fecha, hora, id_usuario, id_empresa);
                                break;
                            }else{
                                resultado = await ventaModelo.agregarVentaDetalle(preventa[i]["id"], id_generado_venta, productoStock[j]["id"], productoStock[j]["stock"], preventa[i]["precio"], preventa[i]["id_descuento_cantidad"], "1", id_empresa);
                                resultado = await productoStockModelo.actualizarStockById(0, productoStock[j]["id"]);
                                cant = cant - parseInt(productoStock[j]["stock"]);
                                var detalle = "Venta Nro. " + nro_venta;
                                var precio = (parseFloat(preventa[i]["precio"]) - (parseFloat(preventa[i]["precio"]) * (parseFloat(preventa[i]["porcentaje_descuento"]) * 0.01)) );
                                precio = (precio - (precio * (parseFloat(descuentoTicket[0]["porcentaje_descuento"]) * 0.01)) );
                                resultado = await productoStockModelo.agregarKardexStock(preventa[i]["id"], productoStock[j]["id"], "1", "Venta", productoStock[j]["stock"], precio, detalle, "", fecha, hora, id_usuario, id_empresa);
                            }
                        }
                    }
                    var resultado = await tiendaModelo.agregarTiendaVisita(Date.now(), id_tienda_empresa, "0999", "Venta directa", fecha, hora, id_usuario, "1", id_empresa)
                }

                resultado["id_venta"] = id_generado_venta;
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

function agregarVentaCreditoDetallePago(id_venta, monto, fecha, pago, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_venta !== undefined && monto !== undefined && fecha !== undefined && pago !== undefined && id_usuario !== undefined && id_empresa !== undefined){

                const id_generado = Date.now();

                var resultado = await ventaModelo.agregarVentaCreditoDetallePago(id_generado, id_venta, monto, fecha, pago, 1, id_usuario, id_empresa);
                
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

function agregarPreVenta(id_tienda_empresa, id_tienda, razon_social, nit, id_sucursal, fecha_entrega, observacion_inicio, observacion_fin, venta, factura, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, id_venta, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tienda_empresa !== undefined && id_sucursal !== undefined && fecha_entrega !== undefined && venta !== undefined && factura !== undefined && id_descuento_ticket !== undefined && id_usuario !== undefined && id_empresa !== undefined){
                const id_generado_pre_venta = Date.now();
                var dt = dateTime.create();
                const fecha = dt.format('Y-m-d');
                const hora = dt.format('H:M:S');
                var nro_pre_venta = "1";

                var pre_venta = await ventaModelo.ultimaPreVentaBySucursal(id_sucursal, id_empresa);
                if(pre_venta.length > 0){
                    nro_pre_venta = parseInt(pre_venta[0]["nro_pre_venta"]) + 1;
                }
                var resultado = await tiendaModelo.actualizarNitRazonSocialById(nit, razon_social, id_tienda);
                resultado = await ventaModelo.agregarPreVenta(id_generado_pre_venta, nro_pre_venta, id_tienda_empresa, razon_social, nit, id_sucursal, fecha, hora, fecha_entrega, observacion_inicio, observacion_fin, venta, factura, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, id_venta, id_usuario, id_empresa);
                
                var carrito = await ventaModelo.listaCarritoByUsuarioSucursal(id_usuario, id_sucursal, id_empresa)
                for(i=0;i<carrito.length;i++){
                    resultado = await ventaModelo.agregarPreVentaDetalle(carrito[i]["id"], id_generado_pre_venta, carrito[i]["id_producto"], carrito[i]["cantidad"], carrito[i]["precio"], carrito[i]["id_descuento_cantidad"], "1", id_empresa, "0");
                    resultado = await ventaModelo.eliminarProductoCarritoById(carrito[i]["id"], id_empresa);
                }
                
                var resultado = await tiendaModelo.agregarTiendaVisita(Date.now(), id_tienda_empresa, "1000", "Pre Venta por sistema", fecha, hora, id_usuario, "1", id_empresa)

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

function agregarPreVentaTienda(id_tienda_empresa, id_tienda, razon_social, nit, id_sucursal, fecha_entrega, observacion_inicio, observacion_fin, venta, factura, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, id_venta, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tienda_empresa !== undefined && id_sucursal !== undefined && fecha_entrega !== undefined && venta !== undefined && factura !== undefined && id_descuento_ticket !== undefined && id_usuario !== undefined && id_empresa !== undefined){
                const id_generado = Date.now();
                var dt = dateTime.create();
                const fecha = dt.format('Y-m-d');
                const hora = dt.format('H:M:S');
                var nro_pre_venta = "1";

                if(fecha_entrega == "0000-00-00"){
                    var f = new Date(fecha);
                    f.setDate(f.getDate() + 1);
                    fecha_entrega = f;
                }

                var pre_venta = await ventaModelo.ultimaPreVentaBySucursal(id_sucursal, id_empresa);
                if(pre_venta.length > 0){
                    nro_pre_venta = parseInt(pre_venta[0]["nro_pre_venta"]) + 1;
                }
                //var resultado = await tiendaModelo.actualizarNitRazonSocialById(nit, razon_social, id_tienda);
                resultado = await ventaModelo.agregarPreVenta(id_generado, nro_pre_venta, id_tienda_empresa, razon_social, nit, id_sucursal, fecha, hora, fecha_entrega, observacion_inicio, observacion_fin, venta, factura, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, id_venta, id_usuario, id_empresa);
                
                var carrito = await ventaModelo.listaCarritoByTiendaSucursal(id_tienda, id_sucursal)
                for(i=0;i<carrito.length;i++){
                    resultado = await ventaModelo.agregarPreVentaDetalle(carrito[i]["id"], id, carrito[i]["id_producto"], carrito[i]["cantidad"], carrito[i]["precio"], carrito[i]["id_descuento_cantidad"], "1", id_empresa, "0");
                    resultado = await ventaModelo.eliminarProductoCarritoTiendaById(carrito[i]["id"], id_tienda);
                }
                
                var resultado = await tiendaModelo.agregarTiendaVisita(id_generado, id_tienda_empresa, "1000", "Pre Venta por AreliShop", fecha, hora, id_usuario, "1", id_empresa)

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

function actualizarVentaById(id, venta, observacion, id_pre_venta, id_tienda_empresa, id_tienda_estado, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_pre_venta !== undefined){
                var dt = dateTime.create();
                const fecha = dt.format('Y-m-d');
                const hora = dt.format('H:M:S');

                if(venta == "1"){
                    var resultado = await ventaModelo.actualizarVentaById(venta, observacion, id_pre_venta, id_pre_venta);
                    var preventa = await ventaModelo.preVentaById(id_pre_venta);
                    await agregarVenta(preventa[0]["id"], preventa[0]["id_sucursal"], preventa[0]["razon_social"], preventa[0]["nit"], observacion, "0", preventa[0]["id_descuento_ticket"], preventa[0]["descuento_uno"], preventa[0]["detalle_descuento_uno"], preventa[0]["descuento_dos"], preventa[0]["detalle_descuento_dos"], "1", id_tienda_empresa, preventa[0]["id_tienda"], id_pre_venta, id_usuario, id_empresa);
                }else{
                    var resultado = await ventaModelo.actualizarVentaById(venta, observacion, "1", id_pre_venta);
                }

                var resultado = await tiendaModelo.agregarTiendaVisita(id, id_tienda_empresa, id_tienda_estado, observacion, fecha, hora, id_usuario, "1", id_empresa)

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

function actualizarEstadoPreVentaDetalleById(estado, id_pre_venta_detalle, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_pre_venta_detalle !== undefined){
                var dt = dateTime.create();
                const fecha = dt.format('Y-m-d');
                const hora = dt.format('H:M:S');

                var resultado = await ventaModelo.actualizarEstadoPreVentaDetalleById(estado, id_pre_venta_detalle);

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

function actualizarCantidadPreVentaDetalleById(cantidad, id_pre_venta_detalle, id_pre_venta, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_pre_venta_detalle !== undefined){
                var dt = dateTime.create();
                const fecha = dt.format('Y-m-d');
                const hora = dt.format('H:M:S');
                var id_generado = Date.now();

                var pre_venta_detalle = await ventaModelo.preVentaDetalleById(id_pre_venta_detalle);
                var resultado ;

                if(parseInt(cantidad) != 0 ){
                    var cant = parseInt(pre_venta_detalle[0]["cantidad"]) - parseInt(cantidad);

                    var resultado = await ventaModelo.agregarPreVentaDetalle(id_generado+"-1", id_pre_venta, pre_venta_detalle[0]["id_producto"], cantidad, pre_venta_detalle[0]["precio"], pre_venta_detalle[0]["id_descuento_cantidad"], "1", id_empresa, "0");
                    resultado = await ventaModelo.agregarPreVentaDetalle(id_generado+"-0", id_pre_venta, pre_venta_detalle[0]["id_producto"], cant, pre_venta_detalle[0]["precio"], pre_venta_detalle[0]["id_descuento_cantidad"], "0", id_empresa, "0");
                    
                    resultado = await ventaModelo.actualizarEstadoPreVentaDetalleById("2", id_pre_venta_detalle);
                }else{
                    resultado = await ventaModelo.actualizarEstadoPreVentaDetalleById("2", id_pre_venta_detalle);
                    resultado = await ventaModelo.agregarPreVentaDetalle(id_generado+"-0", id_pre_venta, pre_venta_detalle[0]["id_producto"], pre_venta_detalle[0]["cantidad"], pre_venta_detalle[0]["precio"], pre_venta_detalle[0]["id_descuento_cantidad"], "0", id_empresa, "0");
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

function eliminarProductoCarritoById(id, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && id_empresa !== undefined){

                var resultado = await ventaModelo.eliminarProductoCarritoById(id, id_empresa);
                
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

function eliminarProductoCarritoTiendaById(id, id_tienda){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && id_tienda !== undefined){
                var resultado = await ventaModelo.eliminarProductoCarritoTiendaById(id, id_tienda);
                
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

function listaCarritoByTienda(id_tienda){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tienda !== undefined){
                var carrito = await ventaModelo.listaCarritoByTienda(id_tienda);
                
                for (j=0;j<carrito.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(carrito[j]["id_producto"], "1")
                
                    var sto = carrito[j]["cantidad"];
                    carrito[j]["imagen"] = medida[0]["imagen"];
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]) ;
                        var stmod = sto % parseInt(medida[i]["unidad"]) ;
                        if(st > 0 && stmod == 0){
                            carrito[j]["cant_medida"] = st;
                            carrito[j]["medida"] = medida[i]["medida"];
                            
                            carrito[j]["precio_medida"] = parseFloat(carrito[j]["precio"]) * parseFloat(medida[i]["unidad"]);
                            carrito[j]["subTotal"] = parseFloat(carrito[j]["precio_medida"]) * parseFloat(carrito[j]["cant_medida"]);

                            carrito[j]["descuento"] = (parseFloat(carrito[j]["precio_medida"]) * (0.01*parseFloat(carrito[j]["porcentaje_descuento"]))) * parseFloat(carrito[j]["cant_medida"]);
                            carrito[j]["precio_descuento_medida"] = parseFloat(carrito[j]["precio_medida"]) - (parseFloat(carrito[j]["precio_medida"]) * (0.01*parseFloat(carrito[j]["porcentaje_descuento"])));
                            carrito[j]["subTotalDescuento"] = parseFloat(carrito[j]["subTotal"]) - parseFloat(carrito[j]["descuento"]);
                            break;
                        }
                    }

                }

                if(carrito.length == 0){
                    carrito = [];
                }
                respuesta = {"datos":carrito}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function listaCarritoByUsuarioSucursal(id_usuario, id_sucursal, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_usuario !== undefined && id_sucursal !== undefined && id_empresa !== undefined){
                var carrito = await ventaModelo.listaCarritoByUsuarioSucursal(id_usuario, id_sucursal, id_empresa);
                
                for (j=0;j<carrito.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(carrito[j]["id_producto"], "1")
                
                    var sto = carrito[j]["cantidad"];
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]) ;
                        var stmod = sto % parseInt(medida[i]["unidad"]) ;
                        if(st > 0 && stmod == 0){
                            carrito[j]["cant_medida"] = st;
                            carrito[j]["medida"] = medida[i]["medida"];
                            
                            carrito[j]["precio_medida"] = parseFloat(carrito[j]["precio"]).toFixed(2) * parseFloat(medida[i]["unidad"]);
                            carrito[j]["subTotal"] = parseFloat(carrito[j]["precio_medida"]) * parseFloat(carrito[j]["cant_medida"]);

                            carrito[j]["descuento"] = parseFloat( (parseFloat(carrito[j]["precio_medida"]).toFixed(2) * (0.01*parseFloat(carrito[j]["porcentaje_descuento"]))) * parseFloat(carrito[j]["cant_medida"]) ).toFixed(2);
                            carrito[j]["precio_descuento_medida"] = (parseFloat(carrito[j]["precio_medida"]) - (parseFloat(carrito[j]["precio_medida"]) * (0.01*parseFloat(carrito[j]["porcentaje_descuento"])))).toFixed(2);
                            carrito[j]["subTotalDescuento"] = parseFloat(carrito[j]["subTotal"]).toFixed(2) - parseFloat(carrito[j]["descuento"]).toFixed(2);
                            break;
                        }
                    }

                }

                if(carrito.length == 0){
                    carrito = [];
                }
                respuesta = {"datos":carrito}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function preVentaById(id_pre_venta){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_pre_venta !== undefined){
                var resultado = await ventaModelo.preVentaById(id_pre_venta);

                if(resultado[0]["venta_inicio"] == "10"){
                    resultado[0]["venta_inicio_estado"] = "Venta Directa";
                }
                if(resultado[0]["venta_inicio"] == "0"){
                    resultado[0]["venta_inicio_estado"] = "Pre Venta";
                }
                if(resultado[0]["venta_inicio"] == "5"){
                    resultado[0]["venta_inicio_estado"] = "Reserva (pedido)"
                }

                if(resultado[0]["venta"] == "0"){
                    resultado[0]["venta_estado"] = "Pendiente";
                }
                if(resultado[0]["venta"] == "1"){
                    resultado[0]["venta_estado"] = "Vendido";
                }
                if(resultado[0]["venta"] == "2"){
                    resultado[0]["venta_estado"] = "Cancelado";
                }
                if(resultado[0]["venta"] == "3"){
                    resultado[0]["venta_estado"] = "En Distribucion";
                }
                if(resultado[0]["venta"] == "4"){
                    resultado[0]["venta_estado"] = "Distribucion Rechazada";
                }
                if(resultado[0]["venta"] == "5"){
                    resultado[0]["venta_estado"] = "Reservado (recoger)";
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

function ventaById(id_venta){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_venta !== undefined){
                var resultado = await ventaModelo.ventaById(id_venta);
                if(resultado.length > 0){
                    if(resultado[0]["venta_inicio"] == "10"){
                        resultado[0]["venta_inicio_estado"] = "Venta Directa";
                    }
                    if(resultado[0]["venta_inicio"] == "0"){
                        resultado[0]["venta_inicio_estado"] = "Pre Venta";
                    }
                    if(resultado[0]["venta_inicio"] == "5"){
                        resultado[0]["venta_inicio_estado"] = "Reserva (pedido)"
                    }
    
                    if(resultado[0]["venta"] == "0"){
                        resultado[0]["venta_estado"] = "Pendiente";
                    }
                    if(resultado[0]["venta"] == "1"){
                        resultado[0]["venta_estado"] = "Vendido";
                    }
                    if(resultado[0]["venta"] == "2"){
                        resultado[0]["venta_estado"] = "Cancelado";
                    }
                    if(resultado[0]["venta"] == "3"){
                        resultado[0]["venta_estado"] = "En Distribucion";
                    }
                    if(resultado[0]["venta"] == "4"){
                        resultado[0]["venta_estado"] = "Distribucion Rechazada";
                    }
                    if(resultado[0]["venta"] == "5"){
                        resultado[0]["venta_estado"] = "Reservado (recoger)";
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

function listaPreVentaByFechaEntregaTiendaEmpresa(fecha_entrega, id_tienda_empresa, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(fecha_entrega !== undefined && id_tienda_empresa !== undefined && id_empresa !== undefined){
                var resultado = await ventaModelo.listaPreVentaByFechaEntregaTiendaEmpresa(fecha_entrega, id_tienda_empresa, id_empresa);
                
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

function listaPreVentaByVentaFechaEntregaSucursalUsuario(venta, fecha_entrega, id_sucursal, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(venta !== undefined && fecha_entrega !== undefined && id_sucursal !== undefined && id_usuario !== undefined && id_empresa !== undefined){
                
                if(id_usuario == "0"){
                    var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                    id_usuario = "'1',";
                    for(i=0;i<usuario.length;i++){
                        id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                        if(i+1 != usuario.length){
                            id_usuario = id_usuario + ",";
                        }
                    }
                }else{
                    id_usuario = "'" + id_usuario + "'";
                }

                var resultado = await ventaModelo.listaPreVentaByVentaFechaEntregaSucursalUsuario(venta, fecha_entrega, id_sucursal, id_usuario, id_empresa);
                
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

function listaPreVentaAgrupadoProductoByVentaFechaEntregaSucursalUsuario(venta, fecha_entrega, id_sucursal, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(venta !== undefined && fecha_entrega !== undefined && id_sucursal !== undefined && id_usuario !== undefined && id_empresa !== undefined){
                
                if(id_usuario == "0"){
                    var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                    id_usuario = "'1',";
                    for(i=0;i<usuario.length;i++){
                        id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                        if(i+1 != usuario.length){
                            id_usuario = id_usuario + ",";
                        }
                    }
                }else{
                    id_usuario = "'" + id_usuario + "'";
                }

                var preventa = await ventaModelo.listaPreVentaAgrupadoProductoByVentaFechaEntregaSucursalUsuario(venta, fecha_entrega, id_sucursal, id_usuario, id_empresa);

                for (j=0;j<preventa.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(preventa[j]["id_producto"], "1")

                    var sto = preventa[j]["cantidad"];
                    var cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = parseInt(sto) / parseInt(medida[i]["unidad"]);
                        st = parseInt(st);
                        var stmod = parseInt(sto) % parseInt(medida[i]["unidad"]);

                    
                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + ", ";
                        }

                        if(stmod == 0){
                            preventa[j]["cant_medida"] = cantidad;
                            break;
                        }else {
                            sto = stmod;
                        }
                    }
                }

                if(preventa.length == 0){
                    preventa = [];
                }
                respuesta = {"datos":preventa}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function listaPreVentaClienteByVentaFechaEntregaSucursalUsuarioProducto(venta, fecha_entrega, id_sucursal, id_usuario, id_empresa, id_producto){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(venta !== undefined && fecha_entrega !== undefined && id_sucursal !== undefined && id_usuario !== undefined && id_empresa !== undefined && id_producto !== undefined){
                
                if(id_usuario == "0"){
                    var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                    id_usuario = "'1',";
                    for(i=0;i<usuario.length;i++){
                        id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                        if(i+1 != usuario.length){
                            id_usuario = id_usuario + ",";
                        }
                    }
                }else{
                    id_usuario = "'" + id_usuario + "'";
                }

                var preventa = await ventaModelo.listaPreVentaClienteByVentaFechaEntregaSucursalUsuarioProducto(venta, fecha_entrega, id_sucursal, id_usuario, id_empresa, id_producto);

                for (j=0;j<preventa.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(preventa[j]["id_producto"], "1")

                    var sto = preventa[j]["cantidad"];
                    var cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = parseInt(sto) / parseInt(medida[i]["unidad"]);
                        st = parseInt(st);
                        var stmod = parseInt(sto) % parseInt(medida[i]["unidad"]);

                    
                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + ", ";
                        }

                        if(stmod == 0){
                            preventa[j]["cant_medida"] = cantidad;
                            break;
                        }else {
                            sto = stmod;
                        }
                    }
                }

                if(preventa.length == 0){
                    preventa = [];
                }
                respuesta = {"datos":preventa}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function listaPreVentaByFechaRutaCategoriaVenta(fecha, id_ruta, id_tienda_categoria, venta, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(fecha !== undefined && id_ruta !== undefined && id_tienda_categoria !== undefined && venta !== undefined && id_empresa !== undefined){
                var resultado = await ventaModelo.listaPreVentaByFechaRutaCategoriaVenta(fecha, id_ruta, id_tienda_categoria, venta, id_empresa);
                
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

function listaPreVentaDetalleByEstadoPreVenta(id_pre_venta, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_pre_venta !== undefined && estado !== undefined && id_empresa !== undefined){
                var preventa = await ventaModelo.listaPreVentaDetalleByEstadoPreVenta(id_pre_venta, estado, id_empresa);
                
                for (j=0;j<preventa.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(preventa[j]["id_producto"], "1")
                
                    var sto = preventa[j]["cantidad"];
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]) ;
                        var stmod = sto % parseInt(medida[i]["unidad"]) ;
                        if(st > 0 && stmod == 0){
                            preventa[j]["cant_medida"] = st;
                            preventa[j]["medida"] = medida[i]["medida"];
                            
                            preventa[j]["precio_medida"] = (parseFloat(preventa[j]["precio"]) * parseFloat(medida[i]["unidad"])).toFixed(2);
                            preventa[j]["subTotal"] = (parseFloat(preventa[j]["precio_medida"]) * parseFloat(preventa[j]["cant_medida"])).toFixed(2);

                            preventa[j]["descuento"] = ((parseFloat(preventa[j]["precio_medida"]) * (0.01*parseFloat(preventa[j]["porcentaje_descuento"]))) * parseFloat(preventa[j]["cant_medida"])).toFixed(2);
                            preventa[j]["precio_descuento_medida"] = (parseFloat(preventa[j]["precio_medida"]) - (parseFloat(preventa[j]["precio_medida"]) * (0.01*parseFloat(preventa[j]["porcentaje_descuento"])))).toFixed(2);
                            preventa[j]["subTotalDescuento"] = (parseFloat(preventa[j]["subTotal"]) - parseFloat(preventa[j]["descuento"])).toFixed(2);
                            break;
                        }
                    }
                }

                if(preventa.length == 0){
                    preventa = [];
                }
                respuesta = {"datos":preventa}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function listaVentaDetalleByEstadoVenta(id_venta, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_venta !== undefined && estado !== undefined && id_empresa !== undefined){
                var venta = await ventaModelo.listaVentaDetalleByEstadoVenta(id_venta, estado, id_empresa);
                
                for (j=0;j<venta.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(venta[j]["id_producto"], "1")
                
                    var sto = venta[j]["cantidad"];
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]) ;
                        var stmod = sto % parseInt(medida[i]["unidad"]) ;
                        if(st > 0 && stmod == 0){
                            venta[j]["cant_medida"] = st;
                            venta[j]["medida"] = medida[i]["medida"];
                            
                            venta[j]["precio_medida"] = (parseFloat(venta[j]["precio"]) * parseFloat(medida[i]["unidad"])).toFixed(2);
                            venta[j]["subTotal"] = (parseFloat(venta[j]["precio_medida"]) * parseFloat(venta[j]["cant_medida"])).toFixed(2);

                            venta[j]["descuento"] = ((parseFloat(venta[j]["precio_medida"]) * (0.01*parseFloat(venta[j]["porcentaje_descuento"]))) * parseFloat(venta[j]["cant_medida"])).toFixed(2);
                            venta[j]["precio_descuento_medida"] = (parseFloat(venta[j]["precio_medida"]) - (parseFloat(venta[j]["precio_medida"]) * (0.01*parseFloat(venta[j]["porcentaje_descuento"])))).toFixed(2);
                            venta[j]["subTotalDescuento"] = (parseFloat(venta[j]["subTotal"]) - parseFloat(venta[j]["descuento"])).toFixed(2);
                            break;
                        }
                    }

                }

                if(venta.length == 0){
                    venta = [];
                }
                respuesta = {"datos":venta}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function listaPreVentaByEmpresaTiendaVenta(id_empresa, id_tienda, venta){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tienda !== undefined && venta !== undefined){
                var pre_venta = await ventaModelo.listaPreVentaByEmpresaTiendaVenta(id_empresa, id_tienda, venta);
                const meses = new Array ("","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
                for(i=0;i<pre_venta.length;i++){
                    var arrayFechaEntrega = pre_venta[i]["fecha_entrega"].split("/");
                    var arrayFecha = pre_venta[i]["fecha"].split("/");
                    pre_venta[i]["fecha_entrega_literal"] = arrayFechaEntrega[0]+" de "+ meses[arrayFechaEntrega[1]] + " del " + arrayFechaEntrega[2];
                    pre_venta[i]["fecha_literal"] = arrayFecha[0]+" de "+ meses[arrayFecha[1]] + " del " + arrayFecha[2];

                    var dt = dateTime.create();
                    const fecha = dt.format('Y/m/d');

                    let fecha1 = new Date(fecha);
                    let fecha2 = new Date(arrayFechaEntrega[2]+"/"+arrayFechaEntrega[1]+"/"+arrayFechaEntrega[0])

                    let resta = fecha2.getTime() - fecha1.getTime()
                    let dias = Math.round(resta/ (1000*60*60*24))
                    pre_venta[i]["dias_restantes"] = " (para "+Math.round(resta/ (1000*60*60*24))+" dias)"
                    if(dias == 0){pre_venta[i]["dias_restantes"] = " (para Hoy)"}
                    if(dias == 1){pre_venta[i]["dias_restantes"] = " (para Mañana)"}
                    if(dias == 7){pre_venta[i]["dias_restantes"] = " (para 1 Semana)"}
                }
                resultado = pre_venta;
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

function listaPreVentaByTiendaVenta(id_tienda, venta){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tienda !== undefined && venta !== undefined){
                var pre_venta = await ventaModelo.listaPreVentaByTiendaVenta(id_tienda, venta);
                const meses = new Array ("","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
                for(i=0;i<pre_venta.length;i++){
                    var arrayFechaEntrega = pre_venta[i]["fecha_entrega"].split("/");
                    var arrayFecha = pre_venta[i]["fecha"].split("/");
                    pre_venta[i]["fecha_entrega_literal"] = arrayFechaEntrega[0]+" de "+ meses[arrayFechaEntrega[1]] + " del " + arrayFechaEntrega[2];
                    pre_venta[i]["fecha_literal"] = arrayFecha[0]+" de "+ meses[arrayFecha[1]] + " del " + arrayFecha[2];

                    var dt = dateTime.create();
                    const fecha = dt.format('Y/m/d');

                    let fecha1 = new Date(fecha);
                    let fecha2 = new Date(arrayFechaEntrega[2]+"/"+arrayFechaEntrega[1]+"/"+arrayFechaEntrega[0])

                    let resta = fecha2.getTime() - fecha1.getTime()
                    let dias = Math.round(resta/ (1000*60*60*24))
                    pre_venta[i]["dias_restantes"] = " (para "+Math.round(resta/ (1000*60*60*24))+" dias)"
                    if(dias == 0){pre_venta[i]["dias_restantes"] = " (para Hoy)"}
                    if(dias == 1){pre_venta[i]["dias_restantes"] = " (para Mañana)"}
                    if(dias == 7){pre_venta[i]["dias_restantes"] = " (para 1 Semana)"}

                    if(pre_venta[i]["venta"] == "0"){
                        pre_venta[i]["venta_estado"] = "Pendiente";
                    }
                    if(pre_venta[i]["venta"] == "1"){
                        pre_venta[i]["venta_estado"] = "Vendido";
                    }
                    if(pre_venta[i]["venta"] == "2"){
                        pre_venta[i]["venta_estado"] = "Cancelado";
                    }
                    if(pre_venta[i]["venta"] == "3"){
                        pre_venta[i]["venta_estado"] = "En Distribucion";
                    }
                    if(pre_venta[i]["venta"] == "4"){
                        pre_venta[i]["venta_estado"] = "Distribucion Rechazada";
                    }
                    if(pre_venta[i]["venta"] == "5"){
                        pre_venta[i]["venta_estado"] = "Reservado (recoger)";
                    }
                }
                resultado = pre_venta;
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

function listaEmpresaPreVentaByTiendaVenta(id_tienda, venta){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tienda !== undefined && venta !== undefined){
                var resultado = await ventaModelo.listaEmpresaPreVentaByTiendaVenta(id_tienda, venta);
                
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

function listaPreVentaBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && venta !== undefined && estado_venta !== undefined && id_empresa !== undefined){

                if(id_usuario == "0"){
                    var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                    id_usuario = "'1',";
                    for(i=0;i<usuario.length;i++){
                        id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                        if(i+1 != usuario.length){
                            id_usuario = id_usuario + ",";
                        }
                    }
                }else{
                    id_usuario = "'" + id_usuario + "'";
                }

                if(venta == "-1"){
                    venta = "'10','0','1','2','3','4','5'";
                }else{
                    venta = "'" + venta + "'";
                }

                if(estado_venta == "-1"){
                    estado_venta = "'10','0','1','2','3','4','5'";
                }else{
                    estado_venta = "'" + estado_venta + "'";
                }

                var resultado = await ventaModelo.listaPreVentaBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta);
                
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

function listaPreVentaProductoAgrupadoBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && venta !== undefined && estado_venta !== undefined && id_empresa !== undefined){

                if(id_usuario == "0"){
                    var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                    id_usuario = "'1',";
                    for(i=0;i<usuario.length;i++){
                        id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                        if(i+1 != usuario.length){
                            id_usuario = id_usuario + ",";
                        }
                    }
                }else{
                    id_usuario = "'" + id_usuario + "'";
                }

                if(venta == "-1"){
                    venta = "'10','0','1','2','3','4','5'";
                }else{
                    venta = "'" + venta + "'";
                }

                if(estado_venta == "-1"){
                    estado_venta = "'10','0','1','2','3','4','5'";
                }else{
                    estado_venta = "'" + estado_venta + "'";
                }

                var pre_venta = await ventaModelo.listaPreVentaProductoAgrupadoBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta);
                
                for (j=0;j<pre_venta.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(pre_venta[j]["id_producto"], "1");
    
                    var sto = parseInt(pre_venta[j]["cantidad"]);
                    var cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]);
                        st = Math.trunc(st);
                        var stmod = sto % parseInt(medida[i]["unidad"]);
    
                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                        }
    
                        if(stmod == 0){
                            pre_venta[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                            break;
                        }else {
                            sto = stmod;
                        }
                    }
                }

                if(pre_venta.length == 0){
                    pre_venta = [];
                }
                respuesta = {"datos":pre_venta}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function listaVentaBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, credito){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && estado !== undefined && id_empresa !== undefined){

                if(id_usuario == "0"){
                    var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                    id_usuario = "";
                    for(i=0;i<usuario.length;i++){
                        id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                        if(i+1 != usuario.length){
                            id_usuario = id_usuario + ",";
                        }
                    }
                }else{
                    id_usuario = "'" + id_usuario + "'";
                }

                if(id_usuario_pre_venta == "0"){
                    var usuario_pre = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                    id_usuario_pre_venta = "'1',";
                    for(i=0;i<usuario_pre.length;i++){
                        id_usuario_pre_venta = id_usuario_pre_venta + "'" + usuario_pre[i]["id"] + "'";
                        if(i+1 != usuario_pre.length){
                            id_usuario_pre_venta = id_usuario_pre_venta + ",";
                        }
                    }
                }else{
                    id_usuario_pre_venta = "'" + id_usuario_pre_venta + "'";
                }

                if(tipo_venta == "-1"){
                    tipo_venta = "'10','0','5'";
                }else{
                    tipo_venta = "'" + tipo_venta + "'";
                }

                var resultado = await ventaModelo.listaVentaBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, credito);
                
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

function listaVentaProductoAgrupadoBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && estado !== undefined && id_empresa !== undefined){

                if(id_usuario == "0"){
                    var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                    id_usuario = "";
                    for(i=0;i<usuario.length;i++){
                        id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                        if(i+1 != usuario.length){
                            id_usuario = id_usuario + ",";
                        }
                    }
                }else{
                    id_usuario = "'" + id_usuario + "'";
                }

                if(id_usuario_pre_venta == "0"){
                    var usuario_pre = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                    id_usuario_pre_venta = "'1',";
                    for(i=0;i<usuario_pre.length;i++){
                        id_usuario_pre_venta = id_usuario_pre_venta + "'" + usuario_pre[i]["id"] + "'";
                        if(i+1 != usuario_pre.length){
                            id_usuario_pre_venta = id_usuario_pre_venta + ",";
                        }
                    }
                }else{
                    id_usuario_pre_venta = "'" + id_usuario_pre_venta + "'";
                }

                if(tipo_venta == "-1"){
                    tipo_venta = "'10','0','5'";
                }else{
                    tipo_venta = "'" + tipo_venta + "'";
                }

                var venta = await ventaModelo.listaVentaProductoAgrupadoBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta);

                for (j=0;j<venta.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(venta[j]["id_producto"], "1");
    
                    var sto = parseInt(venta[j]["cantidad"]);
                    var cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]);
                        st = Math.trunc(st);
                        var stmod = sto % parseInt(medida[i]["unidad"]);
    
                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                        }
    
                        if(stmod == 0){
                            venta[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                            break;
                        }else {
                            sto = stmod;
                        }
                    }
                }

                if(venta.length == 0){
                    venta = [];
                }
                respuesta = {"datos":venta}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function reporteTNotaEntregaByNroPreVentaSucursal(nro_pre_venta_inicio, nro_pre_venta_final, id_sucursal, id_empresa, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var venta_detalle = await ventaModelo.listaPreVentaDetalleByNroPreVentaSucursal(nro_pre_venta_inicio, nro_pre_venta_final, id_sucursal, id_empresa);

            for (j=0;j<venta_detalle.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(venta_detalle[j]["id_producto"], "1");

                var sto = parseInt(venta_detalle[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        venta_detalle[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                        break;
                    }else {
                        sto = stmod;
                    }
                }
            }

            var docDefinition = {
                pageSize: {
                    width: 78 / 0.35277,
                    height: 350 / 0.35277
                },
                pageMargins: [ 10, 10, 10, 10 ],
                
                content: await notaEntregaVentaTermica(nro_pre_venta_inicio, nro_pre_venta_final, venta_detalle)
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

function reporteCNotaEntregaByNroPreVentaSucursal(nro_pre_venta_inicio, nro_pre_venta_final, id_sucursal, id_empresa, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var venta_detalle = await ventaModelo.listaPreVentaDetalleByNroPreVentaSucursal(nro_pre_venta_inicio, nro_pre_venta_final, id_sucursal, id_empresa);

            for (j=0;j<venta_detalle.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(venta_detalle[j]["id_producto"], "1");

                var sto = parseInt(venta_detalle[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        venta_detalle[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                        break;
                    }else {
                        sto = stmod;
                    }
                }
            }

            var docDefinition = {
                pageSize: 'LETTER',
                pageMargins: [ 80, 40, 40, 40 ],
                
                content: await notaEntregaVentaCarta(nro_pre_venta_inicio, nro_pre_venta_final, venta_detalle)
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

function reporteCCNotaEntregaByNroPreVentaSucursal(nro_pre_venta_inicio, nro_pre_venta_final, id_sucursal, id_empresa, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var venta_detalle = await ventaModelo.listaPreVentaDetalleByNroPreVentaSucursal(nro_pre_venta_inicio, nro_pre_venta_final, id_sucursal, id_empresa);

            for (j=0;j<venta_detalle.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(venta_detalle[j]["id_producto"], "1");

                var sto = parseInt(venta_detalle[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        venta_detalle[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
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
                            { text: '©ARELÍ Punto de Venta', italics: true, alignment: 'center' }
                        ],
                    };
                },
                content: await notaEntregaVentaCarta(nro_pre_venta_inicio, nro_pre_venta_final, venta_detalle)
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

function reporteTNotaPreVentaBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            if(id_usuario == "0"){
                var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                id_usuario = "";
                for(i=0;i<usuario.length;i++){
                    id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                    if(i+1 != usuario.length){
                        id_usuario = id_usuario + ",";
                    }
                }
            }else{
                if(id_usuario == "1"){
                    usuario_reporte = "App Arelí Shop";
                }else{
                    var res = await usuarioModelo.usuarioById(id_empresa,id_usuario);
                    usuario_reporte = res[0]["nombre"] + " " + res[0]["appat"] + " " + res[0]["apmat"];
                }
                id_usuario = "'" + id_usuario + "'";
            }

            if(venta == "-1"){
                venta = "'0','5'";
            }else{
                if(venta == "0") {venta_tipo = 'Pre Ventas'};
                if(venta == "5") {venta_tipo = 'Reservas'};
                venta = "'" + venta + "'";
            }

            if(estado_venta == "-1"){
                estado_venta = "'10','0','1','2','3','4','5'";
            }else{
                if(estado_venta == "0") estado_nombre = 'Pedidos';
                if(estado_venta == "1") estado_nombre = 'Vendido';
                if(estado_venta == "2") estado_nombre = 'Cancelado por el Usuario';
                if(estado_venta == "3") estado_nombre = 'En Distribucion';
                if(estado_venta == "4") estado_nombre = 'Cancelado por el Distribuidor';
                if(estado_venta == "5") estado_nombre = 'Pendiente';
                estado_venta = "'" + estado_venta + "'";
            }

            var pre_venta_detalle = await ventaModelo.listaPreVentaDetalleBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion);
            
            for (j=0;j<pre_venta_detalle.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(pre_venta_detalle[j]["id_producto"], "1");

                var sto = parseInt(pre_venta_detalle[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        pre_venta_detalle[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                        break;
                    }else {
                        sto = stmod;
                    }
                }
            }

            var docDefinition = {
                pageSize: {
                    width: 78 / 0.35277,
                    height: 350 / 0.35277
                },
                pageMargins: [ 10, 10, 10, 10 ],
                
                content: await notaEntregaVentaTermica(0, 0, pre_venta_detalle)
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

function reporteCNotaPreVentaBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            if(id_usuario == "0"){
                var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                id_usuario = "";
                for(i=0;i<usuario.length;i++){
                    id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                    if(i+1 != usuario.length){
                        id_usuario = id_usuario + ",";
                    }
                }
            }else{
                if(id_usuario == "1"){
                    usuario_reporte = "App Arelí Shop";
                }else{
                    var res = await usuarioModelo.usuarioById(id_empresa,id_usuario);
                    usuario_reporte = res[0]["nombre"] + " " + res[0]["appat"] + " " + res[0]["apmat"];
                }
                id_usuario = "'" + id_usuario + "'";
            }

            if(venta == "-1"){
                venta = "'0','5'";
            }else{
                if(venta == "0") {venta_tipo = 'Pre Ventas'};
                if(venta == "5") {venta_tipo = 'Reservas'};
                venta = "'" + venta + "'";
            }

            if(estado_venta == "-1"){
                estado_venta = "'10','0','1','2','3','4','5'";
            }else{
                if(estado_venta == "0") estado_nombre = 'Pedidos';
                if(estado_venta == "1") estado_nombre = 'Vendido';
                if(estado_venta == "2") estado_nombre = 'Cancelado por el Usuario';
                if(estado_venta == "3") estado_nombre = 'En Distribucion';
                if(estado_venta == "4") estado_nombre = 'Cancelado por el Distribuidor';
                if(estado_venta == "5") estado_nombre = 'Pendiente';
                estado_venta = "'" + estado_venta + "'";
            }

            var pre_venta_detalle = await ventaModelo.listaPreVentaDetalleBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion);
            
            for (j=0;j<pre_venta_detalle.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(pre_venta_detalle[j]["id_producto"], "1");

                var sto = parseInt(pre_venta_detalle[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        pre_venta_detalle[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                        break;
                    }else {
                        sto = stmod;
                    }
                }
            }

            var docDefinition = {
                pageSize: 'LETTER',
                pageMargins: [ 80, 40, 40, 40 ],
                
                content: await notaEntregaVentaCarta(0, 0, pre_venta_detalle)
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

function reporteCCNotaPreVentaBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            if(id_usuario == "0"){
                var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                id_usuario = "";
                for(i=0;i<usuario.length;i++){
                    id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                    if(i+1 != usuario.length){
                        id_usuario = id_usuario + ",";
                    }
                }
            }else{
                if(id_usuario == "1"){
                    usuario_reporte = "App Arelí Shop";
                }else{
                    var res = await usuarioModelo.usuarioById(id_empresa,id_usuario);
                    usuario_reporte = res[0]["nombre"] + " " + res[0]["appat"] + " " + res[0]["apmat"];
                }
                id_usuario = "'" + id_usuario + "'";
            }

            if(venta == "-1"){
                venta = "'0','5'";
            }else{
                if(venta == "0") {venta_tipo = 'Pre Ventas'};
                if(venta == "5") {venta_tipo = 'Reservas'};
                venta = "'" + venta + "'";
            }

            if(estado_venta == "-1"){
                estado_venta = "'10','0','1','2','3','4','5'";
            }else{
                if(estado_venta == "0") estado_nombre = 'Pedidos';
                if(estado_venta == "1") estado_nombre = 'Vendido';
                if(estado_venta == "2") estado_nombre = 'Cancelado por el Usuario';
                if(estado_venta == "3") estado_nombre = 'En Distribucion';
                if(estado_venta == "4") estado_nombre = 'Cancelado por el Distribuidor';
                if(estado_venta == "5") estado_nombre = 'Pendiente';
                estado_venta = "'" + estado_venta + "'";
            }

            var pre_venta_detalle = await ventaModelo.listaPreVentaDetalleBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion);
            
            for (j=0;j<pre_venta_detalle.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(pre_venta_detalle[j]["id_producto"], "1");

                var sto = parseInt(pre_venta_detalle[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        pre_venta_detalle[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
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
                            { text: '©ARELÍ Punto de Venta', italics: true, alignment: 'center' }
                        ],
                    };
                },
                content: await notaEntregaVentaCarta(0, 0, pre_venta_detalle)
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

function reporteTNotaEntregaByNroVentaSucursal(nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var venta_detalle = await ventaModelo.listaVentaDetalleByNroVentaSucursal(nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa);

            for (j=0;j<venta_detalle.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(venta_detalle[j]["id_producto"], "1");

                var sto = parseInt(venta_detalle[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        venta_detalle[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                        break;
                    }else {
                        sto = stmod;
                    }
                }
            }

            var docDefinition = {
                pageSize: {
                    width: 78 / 0.35277,
                    height: 350 / 0.35277
                },
                pageMargins: [ 10, 10, 10, 10 ],
                
                content: await notaEntregaVentaTermica(nro_venta_inicio, nro_venta_final, venta_detalle)
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

function reporteCNotaEntregaByNroVentaSucursal(nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var venta_detalle = await ventaModelo.listaVentaDetalleByNroVentaSucursal(nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa);

            for (j=0;j<venta_detalle.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(venta_detalle[j]["id_producto"], "1");

                var sto = parseInt(venta_detalle[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        venta_detalle[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                        break;
                    }else {
                        sto = stmod;
                    }
                }
            }

            var docDefinition = {
                pageSize: 'LETTER',
                pageMargins: [ 80, 40, 40, 40 ],
                
                content: await notaEntregaVentaCarta(nro_venta_inicio, nro_venta_final, venta_detalle)
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

function reporteCCNotaEntregaByNroVentaSucursal(nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var venta_detalle = await ventaModelo.listaVentaDetalleByNroVentaSucursal(nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa);

            for (j=0;j<venta_detalle.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(venta_detalle[j]["id_producto"], "1");

                var sto = parseInt(venta_detalle[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        venta_detalle[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
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
                            { text: '©ARELÍ Punto de Venta', italics: true, alignment: 'center' }
                        ],
                    };
                },
                content: await notaEntregaVentaCarta(nro_venta_inicio, nro_venta_final, venta_detalle)
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

function reporteMCNotaEntregaByNroVentaSucursal(nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var venta_detalle = await ventaModelo.listaVentaDetalleByNroVentaSucursal(nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa);

            for (j=0;j<venta_detalle.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(venta_detalle[j]["id_producto"], "1");

                var sto = parseInt(venta_detalle[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        venta_detalle[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                        break;
                    }else {
                        sto = stmod;
                    }
                }
            }

            var docDefinition = {
                pageSize: 'LETTER',
                pageMargins: [ 80, 100, 40, 60 ],
                
                content: await notaEntregaVentaTermica(nro_venta_inicio, nro_venta_final, venta_detalle)
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


function reporteListaPreVentaBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var usuario_reporte = "Todos los usuarios";
            var venta_tipo = "Pre Ventas y Reservas";
            var estado_nombre = "Todos";

            if(id_usuario == "0"){
                var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                id_usuario = "";
                for(i=0;i<usuario.length;i++){
                    id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                    if(i+1 != usuario.length){
                        id_usuario = id_usuario + ",";
                    }
                }
            }else{
                if(id_usuario == "1"){
                    usuario_reporte = "App Arelí Shop";
                }else{
                    var res = await usuarioModelo.usuarioById(id_empresa,id_usuario);
                    usuario_reporte = res[0]["nombre"] + " " + res[0]["appat"] + " " + res[0]["apmat"];
                }
                id_usuario = "'" + id_usuario + "'";
            }

            if(venta == "-1"){
                venta = "'0','5'";
            }else{
                if(venta == "0") {venta_tipo = 'Pre Ventas'};
                if(venta == "5") {venta_tipo = 'Reservas'};
                venta = "'" + venta + "'";
            }

            if(estado_venta == "-1"){
                estado_venta = "'10','0','1','2','3','4','5'";
            }else{
                if(estado_venta == "0") estado_nombre = 'Pedidos';
                if(estado_venta == "1") estado_nombre = 'Vendido';
                if(estado_venta == "2") estado_nombre = 'Cancelado por el Usuario';
                if(estado_venta == "3") estado_nombre = 'En Distribucion';
                if(estado_venta == "4") estado_nombre = 'Cancelado por el Distribuidor';
                if(estado_venta == "5") estado_nombre = 'Pendiente';
                estado_venta = "'" + estado_venta + "'";
            }

            var arrayFecInicio = fecha_inicio.split("-");
            var arrayFecFin = fecha_final.split("-");
            var fecha = arrayFecInicio[2]+" de "+ meses[arrayFecInicio[1]] + " del " + arrayFecInicio[0] + " al " + arrayFecFin[2]+" de "+ meses[arrayFecFin[1]] + " del " + arrayFecFin[0] ;
            if(arrayFecInicio[0] == arrayFecFin[0]){
                if(arrayFecInicio[1] == arrayFecFin[1]){
                    if(arrayFecInicio[2] == arrayFecFin[2]){
                        fecha = arrayFecInicio[2] + " de " + meses[arrayFecInicio[1]] + " del " + arrayFecInicio[0];
                    }else{
                        if(arrayFecInicio[2] == "01"){
                            var dias_mes = new Date(arrayFecInicio[0], arrayFecInicio[1], 0).getDate()
                            if(arrayFecFin[2] == dias_mes){
                                fecha = "Mes de " + meses[arrayFecInicio[1]] + " del " + arrayFecInicio[0];
                            }
                        }
                    }
                } 
            }

            var pre_venta = await ventaModelo.listaPreVentaBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion);
            
            var res_sucursal = await sucursalModelo.SucursalById(id_empresa, id_sucursal);
            var sucursal = res_sucursal[0]["nombre"];

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
                            { text: '©ARELÍ Punto de Venta', italics: true },
                            { text: 'Pagina ' + currentPage.toString() + ' de ' + pageCount, italics: true, alignment: 'right' }
                        ],
                    };
                },
                content: await reportePreVentaCliente(sucursal, fecha, venta, venta_tipo, estado_nombre, usuario_reporte, pre_venta)
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

function reporteListaPreVentaProductoAgrupadoBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var usuario_reporte = "Todos los usuarios";
            var venta_tipo = "Pre Ventas y Reservas";
            var estado_nombre = "Todos";

            if(id_usuario == "0"){
                var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                id_usuario = "";
                for(i=0;i<usuario.length;i++){
                    id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                    if(i+1 != usuario.length){
                        id_usuario = id_usuario + ",";
                    }
                }
            }else{
                if(id_usuario == "1"){
                    usuario_reporte = "App Arelí Shop";
                }else{
                    var res = await usuarioModelo.usuarioById(id_empresa,id_usuario);
                    usuario_reporte = res[0]["nombre"] + " " + res[0]["appat"] + " " + res[0]["apmat"];
                }
                id_usuario = "'" + id_usuario + "'";
            }

            if(venta == "-1"){
                venta = "'0','5'";
            }else{
                if(venta == "0") {venta_tipo = 'Pre Ventas'};
                if(venta == "5") {venta_tipo = 'Reservas'};
                venta = "'" + venta + "'";
            }

            if(estado_venta == "-1"){
                estado_venta = "'10','0','1','2','3','4','5'";
            }else{
                if(estado_venta == "0") estado_nombre = 'Pedidos';
                if(estado_venta == "1") estado_nombre = 'Vendido';
                if(estado_venta == "2") estado_nombre = 'Cancelado por el Usuario';
                if(estado_venta == "3") estado_nombre = 'En Distribucion';
                if(estado_venta == "4") estado_nombre = 'Cancelado por el Distribuidor';
                if(estado_venta == "5") estado_nombre = 'Pendiente';
                estado_venta = "'" + estado_venta + "'";
            }

            var arrayFecInicio = fecha_inicio.split("-");
            var arrayFecFin = fecha_final.split("-");
            var fecha = arrayFecInicio[2]+" de "+ meses[arrayFecInicio[1]] + " del " + arrayFecInicio[0] + " al " + arrayFecFin[2]+" de "+ meses[arrayFecFin[1]] + " del " + arrayFecFin[0] ;
            if(arrayFecInicio[0] == arrayFecFin[0]){
                if(arrayFecInicio[1] == arrayFecFin[1]){
                    if(arrayFecInicio[2] == arrayFecFin[2]){
                        fecha = arrayFecInicio[2] + " de " + meses[arrayFecInicio[1]] + " del " + arrayFecInicio[0];
                    }else{
                        if(arrayFecInicio[2] == "01"){
                            var dias_mes = new Date(arrayFecInicio[0], arrayFecInicio[1], 0).getDate()
                            if(arrayFecFin[2] == dias_mes){
                                fecha = "Mes de " + meses[arrayFecInicio[1]] + " del " + arrayFecInicio[0];
                            }
                        }
                    }
                } 
            }

            var pre_venta = await ventaModelo.listaPreVentaProductoAgrupadoBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion);
            
            for (j=0;j<pre_venta.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(pre_venta[j]["id_producto"], "1");

                var sto = parseInt(pre_venta[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        pre_venta[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                        break;
                    }else {
                        sto = stmod;
                    }
                }
            }

            var res_sucursal = await sucursalModelo.SucursalById(id_empresa, id_sucursal);
            var sucursal = res_sucursal[0]["nombre"];

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
                            { text: '©ARELÍ Punto de Venta', italics: true },
                            { text: 'Pagina ' + currentPage.toString() + ' de ' + pageCount, italics: true, alignment: 'right' }
                        ],
                    };
                },
                content: await reportePreVentaProducto(sucursal, fecha, venta, venta_tipo, estado_nombre, usuario_reporte, pre_venta)
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

function reporteTNotaVentaBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            if(id_usuario == "0"){
                var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                id_usuario = "";
                for(i=0;i<usuario.length;i++){
                    id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                    if(i+1 != usuario.length){
                        id_usuario = id_usuario + ",";
                    }
                }
            }else{
                id_usuario = "'" + id_usuario + "'";
            }

            if(id_usuario_pre_venta == "0"){
                var usuario_pre = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                id_usuario_pre_venta = "'1',";
                for(i=0;i<usuario_pre.length;i++){
                    id_usuario_pre_venta = id_usuario_pre_venta + "'" + usuario_pre[i]["id"] + "'";
                    if(i+1 != usuario_pre.length){
                        id_usuario_pre_venta = id_usuario_pre_venta + ",";
                    }
                }
            }else{
                id_usuario_pre_venta = "'" + id_usuario_pre_venta + "'";
            }

            if(tipo_venta == "-1"){
                tipo_venta = "'10','0','5'";
            }else{
                tipo_venta = "'" + tipo_venta + "'";
            }

            var venta_detalle = await ventaModelo.listaVentaDetalleBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta);

            for (j=0;j<venta_detalle.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(venta_detalle[j]["id_producto"], "1");

                var sto = parseInt(venta_detalle[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        venta_detalle[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                        break;
                    }else {
                        sto = stmod;
                    }
                }
            }

            var docDefinition = {
                pageSize: {
                    width: 78 / 0.35277,
                    height: 350 / 0.35277
                },
                pageMargins: [ 10, 10, 10, 10 ],
                
                content: await notaEntregaVentaTermica(0, 0, venta_detalle)
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

function reporteCNotaVentaBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            if(id_usuario == "0"){
                var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                id_usuario = "";
                for(i=0;i<usuario.length;i++){
                    id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                    if(i+1 != usuario.length){
                        id_usuario = id_usuario + ",";
                    }
                }
            }else{
                id_usuario = "'" + id_usuario + "'";
            }

            if(id_usuario_pre_venta == "0"){
                var usuario_pre = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                id_usuario_pre_venta = "'1',";
                for(i=0;i<usuario_pre.length;i++){
                    id_usuario_pre_venta = id_usuario_pre_venta + "'" + usuario_pre[i]["id"] + "'";
                    if(i+1 != usuario_pre.length){
                        id_usuario_pre_venta = id_usuario_pre_venta + ",";
                    }
                }
            }else{
                id_usuario_pre_venta = "'" + id_usuario_pre_venta + "'";
            }

            if(tipo_venta == "-1"){
                tipo_venta = "'10','0','5'";
            }else{
                tipo_venta = "'" + tipo_venta + "'";
            }

            var venta_detalle = await ventaModelo.listaVentaDetalleBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta);

            for (j=0;j<venta_detalle.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(venta_detalle[j]["id_producto"], "1");

                var sto = parseInt(venta_detalle[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        venta_detalle[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                        break;
                    }else {
                        sto = stmod;
                    }
                }
            }

            var docDefinition = {
                pageSize: 'LETTER',
                pageMargins: [ 80, 40, 40, 40 ],
                
                content: await notaEntregaVentaCarta(0, 0, venta_detalle)
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

function reporteCCNotaVentaBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            if(id_usuario == "0"){
                var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                id_usuario = "";
                for(i=0;i<usuario.length;i++){
                    id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                    if(i+1 != usuario.length){
                        id_usuario = id_usuario + ",";
                    }
                }
            }else{
                id_usuario = "'" + id_usuario + "'";
            }

            if(id_usuario_pre_venta == "0"){
                var usuario_pre = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                id_usuario_pre_venta = "'1',";
                for(i=0;i<usuario_pre.length;i++){
                    id_usuario_pre_venta = id_usuario_pre_venta + "'" + usuario_pre[i]["id"] + "'";
                    if(i+1 != usuario_pre.length){
                        id_usuario_pre_venta = id_usuario_pre_venta + ",";
                    }
                }
            }else{
                id_usuario_pre_venta = "'" + id_usuario_pre_venta + "'";
            }

            if(tipo_venta == "-1"){
                tipo_venta = "'10','0','5'";
            }else{
                tipo_venta = "'" + tipo_venta + "'";
            }

            var venta_detalle = await ventaModelo.listaVentaDetalleBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta);

            for (j=0;j<venta_detalle.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(venta_detalle[j]["id_producto"], "1");

                var sto = parseInt(venta_detalle[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        venta_detalle[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
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
                            { text: '©ARELÍ Punto de Venta', italics: true, alignment: 'center' }
                        ],
                    };
                },
                content: await notaEntregaVentaCarta(0, 0, venta_detalle)
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

function reporteListaVentaBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var usuario_reporte = "Todos los usuarios";
            var usuario_pre_venta_reporte = "Todos los usuarios";
            var venta_tipo = "Todas la ventas";

            if(id_usuario == "0"){
                var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                id_usuario = "";
                for(i=0;i<usuario.length;i++){
                    id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                    if(i+1 != usuario.length){
                        id_usuario = id_usuario + ",";
                    }
                }
            }else{
                var res = await usuarioModelo.usuarioById(id_empresa,id_usuario);
                usuario_reporte = res[0]["nombre"] + " " + res[0]["appat"] + " " + res[0]["apmat"];
                id_usuario = "'" + id_usuario + "'";
            }

            if(id_usuario_pre_venta == "0"){
                var usuario_pre_venta = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                id_usuario_pre_venta = "'1',";
                for(i=0;i<usuario_pre_venta.length;i++){
                    id_usuario_pre_venta = id_usuario_pre_venta + "'" + usuario_pre_venta[i]["id"] + "'";
                    if(i+1 != usuario_pre_venta.length){
                        id_usuario_pre_venta = id_usuario_pre_venta + ",";
                    }
                }
            }else{
                var res = await usuarioModelo.usuarioById(id_empresa,id_usuario_pre_venta);
                usuario_pre_venta_reporte = res[0]["nombre"] + " " + res[0]["appat"] + " " + res[0]["apmat"];
                id_usuario_pre_venta = "'" + id_usuario_pre_venta + "'";
            }

            if(tipo_venta == "-1"){
                tipo_venta = "'10','0','5'";
            }else{
                tipo_venta = "'" + tipo_venta + "'";
                if(tipo_venta == "10") venta_tipo = 'Ventas Directas';
                if(tipo_venta == "0") venta_tipo = 'Pre Ventas';
                if(tipo_venta == "5") venta_tipo = 'Ventas con Reserva';
            }

            var arrayFecInicio = fecha_inicio.split("-");
            var arrayFecFin = fecha_final.split("-");
            var fecha = arrayFecInicio[2]+" de "+ meses[arrayFecInicio[1]] + " del " + arrayFecInicio[0] + " al " + arrayFecFin[2]+" de "+ meses[arrayFecFin[1]] + " del " + arrayFecFin[0] ;
            if(arrayFecInicio[0] == arrayFecFin[0]){
                if(arrayFecInicio[1] == arrayFecFin[1]){
                    if(arrayFecInicio[2] == arrayFecFin[2]){
                        fecha = arrayFecInicio[2] + " de " + meses[arrayFecInicio[1]] + " del " + arrayFecInicio[0];
                    }else{
                        if(parseInt(arrayFecInicio[2]) == 1){
                            var dias_mes = new Date(arrayFecInicio[0], arrayFecInicio[1], 0).getDate()
                            if(arrayFecFin[2] == dias_mes){
                                fecha = "Mes de " + meses[arrayFecInicio[1]] + " del " + arrayFecInicio[0];
                            }
                        }
                    }
                } 
            }

            var venta = await ventaModelo.listaVentaBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta);
            
            var res_sucursal = await sucursalModelo.SucursalById(id_empresa, id_sucursal);
            var sucursal = res_sucursal[0]["nombre"];

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
                            { text: '©ARELÍ Punto de Venta', italics: true },
                            { text: 'Pagina ' + currentPage.toString() + ' de ' + pageCount, italics: true, alignment: 'right' }
                        ],
                    };
                },
                content: await reporteVentaCliente(sucursal, fecha, tipo_venta, venta_tipo, usuario_reporte, usuario_pre_venta_reporte, venta),
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

function reporteListaVentaProductoAgrupadoBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var usuario_reporte = "Todos los usuarios";
            var usuario_pre_venta_reporte = "Todos los usuarios";
            var venta_tipo = "Todas la ventas";

            if(id_usuario == "0"){
                var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                id_usuario = "";
                for(i=0;i<usuario.length;i++){
                    id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                    if(i+1 != usuario.length){
                        id_usuario = id_usuario + ",";
                    }
                }
            }else{
                var res = await usuarioModelo.usuarioById(id_empresa,id_usuario);
                usuario_reporte = res[0]["nombre"] + " " + res[0]["appat"] + " " + res[0]["apmat"];
                id_usuario = "'" + id_usuario + "'";
            }

            if(id_usuario_pre_venta == "0"){
                var usuario_pre_venta = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                id_usuario_pre_venta = "'1',";
                for(i=0;i<usuario_pre_venta.length;i++){
                    id_usuario_pre_venta = id_usuario_pre_venta + "'" + usuario_pre_venta[i]["id"] + "'";
                    if(i+1 != usuario_pre_venta.length){
                        id_usuario_pre_venta = id_usuario_pre_venta + ",";
                    }
                }
            }else{
                var res = await usuarioModelo.usuarioById(id_empresa,id_usuario_pre_venta);
                usuario_pre_venta_reporte = res[0]["nombre"] + " " + res[0]["appat"] + " " + res[0]["apmat"];
                id_usuario_pre_venta = "'" + id_usuario_pre_venta + "'";
            }

            if(tipo_venta == "-1"){
                tipo_venta = "'10','0','5'";
            }else{
                tipo_venta = "'" + tipo_venta + "'";
                if(tipo_venta == "10") venta_tipo = 'Ventas Directas';
                if(tipo_venta == "0") venta_tipo = 'Pre Ventas';
                if(tipo_venta == "5") venta_tipo = 'Ventas con Reserva';
            }

            var arrayFecInicio = fecha_inicio.split("-");
            var arrayFecFin = fecha_final.split("-");
            var fecha = arrayFecInicio[2]+" de "+ meses[arrayFecInicio[1]] + " del " + arrayFecInicio[0] + " al " + arrayFecFin[2]+" de "+ meses[arrayFecFin[1]] + " del " + arrayFecFin[0] ;
            if(arrayFecInicio[0] == arrayFecFin[0]){
                if(arrayFecInicio[1] == arrayFecFin[1]){
                    if(arrayFecInicio[2] == arrayFecFin[2]){
                        fecha = arrayFecInicio[2] + " de " + meses[arrayFecInicio[1]] + " del " + arrayFecInicio[0];
                    }else{
                        if(parseInt(arrayFecInicio[2]) == 1){
                            var dias_mes = new Date(arrayFecInicio[0], arrayFecInicio[1], 0).getDate()
                            if(arrayFecFin[2] == dias_mes){
                                fecha = "Mes de " + meses[arrayFecInicio[1]] + " del " + arrayFecInicio[0];
                            }
                        }
                    }
                } 
            }

            var venta = await ventaModelo.listaVentaProductoAgrupadoBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta);
            
            for (j=0;j<venta.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(venta[j]["id_producto"], "1");

                var sto = parseInt(venta[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        venta[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                        break;
                    }else {
                        sto = stmod;
                    }
                }
            }

            var res_sucursal = await sucursalModelo.SucursalById(id_empresa, id_sucursal);
            var sucursal = res_sucursal[0]["nombre"];

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
                            { text: '©ARELÍ Punto de Venta', italics: true },
                            { text: 'Pagina ' + currentPage.toString() + ' de ' + pageCount, italics: true, alignment: 'right' }
                        ],
                    };
                },
                content: await reporteVentaProducto(sucursal, fecha, tipo_venta, venta_tipo, usuario_reporte, usuario_pre_venta_reporte, venta),
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


function reporteListaVentaDetalleByFechaSucursalUsuarioEstado(fecha, id_sucursal, id_usuario, estado, id_empresa, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var venta = await ventaModelo.listaVentaDetalleByFechaSucursalUsuarioEstado(fecha, id_sucursal, id_usuario, estado, id_empresa);

            for (j=0;j<venta.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(venta[j]["id_producto"], "1");

                var sto = parseInt(venta[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        venta[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
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
                            { text: '©ARELÍ Punto de Venta', italics: true },
                            { text: 'Pagina ' + currentPage.toString() + ' de ' + pageCount, italics: true, alignment: 'right' }
                        ],
                    };
                },
                content: await reporteVentaDetalle(venta),
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
    agregarVentaCarritoUsuario,
    agregarVentaCarritoTienda,
    agregarVenta,
    agregarVentaCreditoDetallePago,
    agregarPreVenta,
    agregarPreVentaTienda,
    anularVentaById,
    actualizarVentaById,
    actualizarEstadoPreVentaDetalleById,
    actualizarCantidadPreVentaDetalleById,
    eliminarProductoCarritoById,
    eliminarProductoCarritoTiendaById,
    ventaById,
    preVentaById,
    listaCarritoByTienda,
    listaCarritoByUsuarioSucursal,
    listaPreVentaByFechaEntregaTiendaEmpresa,
    listaPreVentaByVentaFechaEntregaSucursalUsuario,
    listaPreVentaAgrupadoProductoByVentaFechaEntregaSucursalUsuario,
    listaPreVentaClienteByVentaFechaEntregaSucursalUsuarioProducto,
    listaPreVentaByFechaRutaCategoriaVenta,
    listaPreVentaDetalleByEstadoPreVenta,
    listaPreVentaByEmpresaTiendaVenta,
    listaPreVentaByTiendaVenta,
    listaEmpresaPreVentaByTiendaVenta,
    listaVentaBySucursalFechaUsuario,
    listaVentaProductoAgrupadoBySucursalFechaUsuario,
    listaVentaDetalleByEstadoVenta,
    listaPreVentaBySucursalFechaVentaEstado,
    listaPreVentaProductoAgrupadoBySucursalFechaVentaEstado,

    reporteTNotaEntregaByNroPreVentaSucursal,
    reporteCNotaEntregaByNroPreVentaSucursal,
    reporteCCNotaEntregaByNroPreVentaSucursal,
    reporteTNotaPreVentaBySucursalFechaVentaEstado,
    reporteCNotaPreVentaBySucursalFechaVentaEstado,
    reporteCCNotaPreVentaBySucursalFechaVentaEstado,
    reporteTNotaEntregaByNroVentaSucursal,
    reporteCNotaEntregaByNroVentaSucursal,
    reporteCCNotaEntregaByNroVentaSucursal,
    reporteMCNotaEntregaByNroVentaSucursal,
    reporteTNotaVentaBySucursalFechaUsuario,
    reporteCNotaVentaBySucursalFechaUsuario,
    reporteCCNotaVentaBySucursalFechaUsuario,
    reporteListaVentaBySucursalFechaUsuario,
    reporteListaVentaProductoAgrupadoBySucursalFechaUsuario,
    reporteListaVentaDetalleByFechaSucursalUsuarioEstado,
    reporteListaPreVentaBySucursalFechaVentaEstado,
    reporteListaPreVentaProductoAgrupadoBySucursalFechaVentaEstado
}