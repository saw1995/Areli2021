const cargaModelo = require('../modelo/cargaModelo');
const sucursalModelo = require('../modelo/sucursalModelo');
const usuarioModelo = require('../modelo/usuarioModelo');
const ventaModelo = require('../modelo/ventaModelo');
const productoModelo = require('../modelo/productoModelo');

var dateTime = require('node-datetime');
const meses = new Array ("","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

const PdfPrinter = require('pdfmake');
const fonts = require('../libreria/fonts');
const { header } = require('../pdfs/config_reporte');
const { reporteCargaCliente } = require('../pdfs/reporte_carga_cliente');
const { reporteCargaProducto } = require('../pdfs/reporte_carga_producto');
const { picklist } = require('../pdfs/reporte_carga_salida');
const { devolucion } = require('../pdfs/reporte_carga_devolucion');
const { liquidacion } = require('../pdfs/reporte_carga_venta');
const { ticketPreVenta } = require('../pdfs/ticket_pre_venta');
// ------------> SELECT
function agregarCargaUsuario(id_pre_venta, fecha_entrega, id_usuario, id_usuario_distribucion, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_pre_venta !== undefined && fecha_entrega !== undefined && id_usuario !== undefined && id_usuario_distribucion !== undefined && id_empresa !== undefined){
                const id_generado_carga = Date.now();
                var resultado;
                var arrayIdPreVenta = id_pre_venta.split(",");
                var nro_carga = "1";

                var carga = await cargaModelo.ultimaCargaByEmpresa(id_empresa);
                if(carga.length > 0){
                    nro_carga = parseInt(carga[0]["nro_carga"]) + 1;
                }

                for(i=0;i<arrayIdPreVenta.length;i++){
                    resultado = await cargaModelo.agregarCargaUsuario(id_generado_carga + "-" + i, nro_carga, arrayIdPreVenta[i], fecha_entrega, id_usuario_distribucion, estado, id_empresa);
                    resultado = await ventaModelo.actualizarVentaById("3", "", "1", arrayIdPreVenta[i]);
                }
                resultado["nro_carga"] = nro_carga;
                
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

function cargaByPreVenta(id_pre_venta){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_pre_venta !== undefined){

                var resultado = await cargaModelo.cargaByPreVenta(id_pre_venta);
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

function listaCargaByUsuarioFecha(id_usuario, fecha_inicio, fecha_final, estado_venta, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_usuario !== undefined && fecha_inicio !== undefined && estado_venta !== undefined && estado !== undefined && id_empresa !== undefined){

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

                var carga = await cargaModelo.listaCargaByUsuarioFecha(id_usuario, fecha_inicio, fecha_final, estado_venta, estado, id_empresa);

                respuesta = {"datos":carga}
                
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function listaCargaProductoAgrupadoByUsuarioFecha(id_usuario, fecha_inicio, fecha_final, estado_venta, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_usuario !== undefined && fecha_inicio !== undefined && id_empresa !== undefined){

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

                var carga = await cargaModelo.listaCargaProductoAgrupadoByUsuarioFecha(id_usuario, fecha_inicio, fecha_final, estado_venta, id_empresa);

                for (j=0;j<carga.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(carga[j]["id_producto"], "1");
                    var sto = parseInt(carga[j]["cantidad"]);
                    var cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]);
                        st = Math.trunc(st);
                        var stmod = sto % parseInt(medida[i]["unidad"]);

                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                        }

                        if(stmod == 0){
                            carga[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                            break;
                        }else {
                            sto = stmod;
                        }
                    }
                }

                if(carga.length == 0){
                    carga = [];
                }
                respuesta = {"datos":carga}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error);
            return resolved({"mysql":error});
        }
    })
}

function listaCargaDetalleByUsuarioFechaSucursalProductoEmpresa(id_usuario, fecha, id_sucursal, id_empresa, id_usuario_impresion, id_producto_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_usuario !== undefined && fecha !== undefined && id_sucursal !== undefined && id_empresa !== undefined && id_producto_empresa !== undefined ){
                var carga = await cargaModelo.listaCargaDetalleByUsuarioFechaSucursalProductoEmpresa(id_usuario, fecha, id_sucursal, id_empresa, id_producto_empresa);

                for (j=0;j<carga.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(carga[j]["id_producto"], "1");
                    var sto = parseInt(carga[j]["cantidad"]);
                    var cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]);
                        st = Math.trunc(st);
                        var stmod = sto % parseInt(medida[i]["unidad"]);

                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                        }

                        if(stmod == 0){
                            carga[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                            break;
                        }else {
                            sto = stmod;
                        }
                    }
                }

                if(carga.length == 0){
                    carga = [];
                }
                respuesta = {"datos":carga}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error);
            return resolved({"mysql":error});
        }
    })
}

function listaDevolucionCargaByUsuarioFecha(id_usuario, fecha, id_sucursal, id_empresa, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_usuario !== undefined && fecha !== undefined && id_sucursal !== undefined && id_empresa !== undefined){

                var carga = await cargaModelo.listaDevolucionCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa);
                var nrocarga = await cargaModelo.listaDevolucionNroCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa);

                for (j=0;j<carga.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(carga[j]["id_producto"], "1");
                    var sto = parseInt(carga[j]["cantidad"]);
                    var cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]);
                        st = Math.trunc(st);
                        var stmod = sto % parseInt(medida[i]["unidad"]);

                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                        }

                        if(stmod == 0){
                            carga[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                            break;
                        }else {
                            sto = stmod;
                        }
                    }
                }
            
                if(carga.length == 0){
                    carga = [];
                }
                respuesta = {"datos":carga}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error);
            return resolved({"mysql":error});
        }
    })
}

function listaVentaCargaByUsuarioFecha(id_usuario, fecha, id_sucursal, id_empresa, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_usuario !== undefined && fecha !== undefined && id_sucursal !== undefined && id_empresa !== undefined){

                var carga = await cargaModelo.listaVentaCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa);
                var nrocarga = await cargaModelo.listaVentaNroCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa);
                var cargaDetalle = await cargaModelo.listaVentaDetalleCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa);
                
                for (j=0;j<carga.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(carga[j]["id_producto"], "1");
                    var sto = parseInt(carga[j]["cantidad"]);
                    var cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]);
                        st = Math.trunc(st);
                        var stmod = sto % parseInt(medida[i]["unidad"]);

                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                        }

                        if(stmod == 0){
                            carga[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                            break;
                        }else {
                            sto = stmod;
                        }
                    }
                }
            
                if(carga.length == 0){
                    carga = [];
                }
                respuesta = {"datos":carga}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error);
            return resolved({"mysql":error});
        }
    })
}

function listaDetallePreventaClienteByNroCarga(nro_carga, id_sucursal, estado_venta, estado_detalle, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(nro_carga !== undefined && id_sucursal !== undefined && estado_venta !== undefined 
                && estado_detalle !== undefined && id_empresa !== undefined){

                var carga = await cargaModelo.listaDetallePreventaClienteByNroCarga(nro_carga, id_sucursal, estado_venta, estado_detalle, id_empresa);
            
                var indice = 'null';

                var resultados = [];
                for(let i = 0 ; i<= carga.length - 1; i++){
                    if(carga[i].nro_pre_venta != indice){
                        indice = carga[i].nro_pre_venta;
                        resultados.push({ 
                            'nro_pre_venta': carga[i].nro_pre_venta,
                            "fecha": carga[i].fecha,
                            "hora": carga[i].hora,
                            "fecha_entrega": carga[i].fecha_entrega,
                            "tipo_tienda": carga[i].tipo_tienda,
                            "categoria_tienda": carga[i].categoria_tienda,
                            "tienda_cliente":carga[i].tienda_cliente,
                            "tienda_direccion":carga[i].tienda_direccion,
                            "nombre_contacto":carga[i].nombre_contacto,
                            "celular_contacto":carga[i].celular_contacto,
                            "nit":carga[i].nit,
                            "venta": carga[i].venta,
                            "razon_social":carga[i].razon_social,
                            "factura":carga[i].factura,
                            "factura_estado": carga[i].factura== '1' ? 'Sí': 'No',
                            "observacion_inicio":carga[i].observacion_inicio,
                            "observacion_fin":carga[i].observacion_fin,
                            "usuario":carga[i].usuario,
                            "rol_usuario":carga[i].rol_usuario
                            }
                        );
                    }
                }

                var detalle = [];

                for(let i = 0 ;i<= resultados.length-1;i++)
                {
                    detalle = [];
                    let total_pre_venta = 0;
                    for(let j =0;j<= carga.length-1;j++)
                    {
                        if(resultados[i].nro_pre_venta === carga[j].nro_pre_venta)
                        {
                            total_pre_venta = total_pre_venta + carga[j].total_descuento;

                            detalle.push({
                                "nro_pre_venta": carga[j].nro_pre_venta,
                                "codigo": carga[j].codigo,
                                "producto_nombre": carga[j].producto_nombre,
                                "producto_descripcion": carga[j].producto_descripcion,
                                "imagen": carga[j].imagen.split(","),
                                "cantidad": carga[j].cantidad,
                                "precio": carga[j].precio,
                                "subtotal": carga[j].subtotal,
                                "total_descuento": carga[j].total_descuento
                            });
                        }
                    }

                    resultados[i].detalle = detalle;
                    resultados[i].total_pre_venta = total_pre_venta;
                }

                if(carga.length == 0){
                    respuesta = {"datos":carga }
                }
                else{
                    respuesta = {"datos":resultados }
                }

                respuesta = {"datos":resultados }
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error);
            return resolved({"mysql":error});
        }
    })
}

function listaDetallePreventaClienteByDistribuidorFecha(fecha_entrega, id_usuario, id_sucursal, estado_venta, estado_detalle, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(fecha_entrega !== undefined && id_usuario !== undefined && id_sucursal !== undefined && estado_venta !== undefined 
                && estado_detalle !== undefined && id_empresa !== undefined){

                if(estado_venta == "-1"){
                    estado_venta = "'0','1','2','3','4','5'";
                }else{
                    estado_venta = "'" + estado_venta + "'";
                }
console.log(estado_venta)
                var carga = await cargaModelo.listaDetallePreventaClienteByDistribuidorFecha(fecha_entrega, id_usuario, id_sucursal, estado_venta, estado_detalle, id_empresa);
            
                var indice = 'null';

                var resultados = [];
                for(let i = 0 ; i<= carga.length - 1; i++){
                    if(carga[i].nro_pre_venta != indice){
                        indice = carga[i].nro_pre_venta;

                        if(carga[i].venta == "0"){
                            carga[i]["venta_estado"] = "Pendiente";
                        }
                        if(carga[i].venta == "1"){
                            carga[i]["venta_estado"] = "Vendido";
                        }
                        if(carga[i].venta == "2"){
                            carga[i]["venta_estado"] = "Cancelado";
                        }
                        if(carga[i].venta == "3"){
                            carga[i]["venta_estado"] = "En Distribucion";
                        }
                        if(carga[i].venta == "4"){
                            carga[i]["venta_estado"] = "Distribucion Rechazada";
                        }
                        if(carga[i].venta == "5"){
                            carga[i]["venta_estado"] = "Reservado (recoger)";
                        }
                        
                        resultados.push({ 
                            'nro_carga': carga[i].nro_carga,
                            'nro_pre_venta': carga[i].nro_pre_venta,
                            "fecha": carga[i].fecha,
                            "hora": carga[i].hora,
                            "fecha_entrega": carga[i].fecha_entrega,
                            "tipo_tienda": carga[i].tipo_tienda,
                            "categoria_tienda": carga[i].categoria_tienda,
                            "tienda_cliente":carga[i].tienda_cliente,
                            "tienda_direccion":carga[i].tienda_direccion,
                            "nombre_contacto":carga[i].nombre_contacto,
                            "celular_contacto":carga[i].celular_contacto,
                            "nit":carga[i].nit,
                            "venta": carga[i].venta,
                            "venta_estado": carga[i].venta_estado,
                            "razon_social":carga[i].razon_social,
                            "factura":carga[i].factura,
                            "factura_estado": carga[i].factura== '1' ? 'Sí': 'No',
                            "observacion_inicio":carga[i].observacion_inicio,
                            "observacion_fin":carga[i].observacion_fin,
                            "usuario":carga[i].usuario,
                            "rol_usuario":carga[i].rol_usuario
                            }
                        );
                    }
                }

                var detalle = [];

                for(let i = 0 ;i<= resultados.length-1;i++)
                {
                    detalle = [];
                    let total_pre_venta = 0;
                    for(let j =0;j<= carga.length-1;j++)
                    {
                        if(resultados[i].nro_pre_venta === carga[j].nro_pre_venta)
                        {
                            total_pre_venta = total_pre_venta + carga[j].total_descuento;

                            detalle.push({
                                "nro_pre_venta": carga[j].nro_pre_venta,
                                "codigo": carga[j].codigo,
                                "producto_nombre": carga[j].producto_nombre,
                                "producto_descripcion": carga[j].producto_descripcion,
                                "imagen": carga[j].imagen.split(","),
                                "cantidad": carga[j].cantidad,
                                "precio": carga[j].precio,
                                "subtotal": carga[j].subtotal,
                                "total_descuento": carga[j].total_descuento
                            });
                        }
                    }

                    resultados[i].detalle = detalle;
                    resultados[i].total_pre_venta = total_pre_venta;
                }

                if(carga.length == 0){
                    respuesta = {"datos":carga }
                }
                else{
                    respuesta = {"datos":resultados }
                }

                respuesta = {"datos":resultados }
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error);
            return resolved({"mysql":error});
        }
    })
}

function reporteListaCargaByUsuarioFechaSucursal(id_usuario, fecha_inicio, fecha_final, id_sucursal, estado_venta, id_empresa, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var res = await usuarioModelo.usuarioById(id_empresa, id_usuario);
            var usuario_reporte = res[0]["nombre"] + " " + res[0]["appat"] + " " + res[0]["apmat"];

            let estado = "Carga Total";
            if(estado_venta == "'1'"){estado = "Venta Realizada";}
            if(estado_venta == "'3','4'"){estado = "Devolucion Pendiente";}
            if(estado_venta == "'6'"){estado = "Devolucion Aceptada";}
            
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

            var carga = await cargaModelo.listaCargaByUsuarioFecha(id_usuario, fecha_inicio, fecha_final, estado_venta, id_empresa);

            for (j=0;j<carga.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(carga[j]["id_producto"], "1");
                var sto = parseInt(carga[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        carga[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                        break;
                    }else {
                        sto = stmod;
                    }
                }
            }

            var res_sucursal = await await sucursalModelo.SucursalById(id_empresa, id_sucursal);
            var sucursal = res_sucursal[0]["nombre"];

            if(id_sucursal == "1"){
                sucursal = "Almacen Independiente"
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
                content: await reporteCargaCliente(sucursal, fecha, usuario_reporte, estado, carga),
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

function reporteListaCargaProductoAgrupadoByUsuarioFechaSucursal(id_usuario, fecha_inicio, fecha_final, id_sucursal, estado_venta, id_empresa, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var res = await usuarioModelo.usuarioById(id_empresa, id_usuario);
            var usuario_reporte = res[0]["nombre"] + " " + res[0]["appat"] + " " + res[0]["apmat"];
            
            let estado = "Carga Total";
            if(estado_venta == "'1'"){estado = "Venta Realizada";}
            if(estado_venta == "'3','4'"){estado = "Devolucion Pendiente";}
            if(estado_venta == "'6'"){estado = "Devolucion Aceptada";}

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

            var carga = await cargaModelo.listaCargaProductoAgrupadoByUsuarioFecha(id_usuario, fecha_inicio, fecha_final, estado_venta, id_empresa);

            for (j=0;j<carga.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(carga[j]["id_producto"], "1");
                var sto = parseInt(carga[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        carga[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                        break;
                    }else {
                        sto = stmod;
                    }
                }
            }

            var res_sucursal = await await sucursalModelo.SucursalById(id_empresa, id_sucursal);
            var sucursal = res_sucursal[0]["nombre"];

            if(id_sucursal == "1"){
                sucursal = "Almacen Independiente"
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
                content: await reporteCargaProducto(sucursal, fecha, usuario_reporte, estado, carga),
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

function reporteListaCargaByUsuarioFecha(id_usuario, fecha, id_sucursal, id_empresa, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var carga = await cargaModelo.listaCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa);
            var nrocarga = await cargaModelo.listaNroCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa);

            for (j=0;j<carga.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(carga[j]["id_producto"], "1");
                var sto = parseInt(carga[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        carga[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
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
                content: await picklist(carga, nrocarga),
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

function reporteListaDevolucionCargaByUsuarioFecha(id_usuario, fecha, id_sucursal, id_empresa, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var carga = await cargaModelo.listaDevolucionCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa);
            var nrocarga = await cargaModelo.listaDevolucionNroCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa);

            var carga_parcializacion = await cargaModelo.listaDevolucionCargaParcializacionByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa);
            
            var nrocarga_parcializacion = await cargaModelo.listaDevolucionNroCargaParcializacionByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa);

            if(nrocarga.length > 0){
                //llenar, continuar con el codigo
            }else{
                nrocarga = nrocarga_parcializacion;
            }

            for (k=0;k<carga_parcializacion.length;k++) {
                var swParcializacion = true;
                for (j=0;j<carga.length;j++) {
                    if(carga[j]["id_producto"] == carga_parcializacion[k]["id_producto"]){
                        carga[j]["cantidad"] = parseInt(carga[j]["cantidad"]) + parseInt(carga_parcializacion[k]["cantidad"]);
                        swParcializacion = false;
                        break;
                    }
                }

                if(swParcializacion){
                    carga[carga.length] = carga_parcializacion[k];
                }
            }

            for (j=0;j<carga.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(carga[j]["id_producto"], "1");
                var sto = parseInt(carga[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        carga[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
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
                content: await devolucion(carga, nrocarga),
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

function reporteListaVentaCargaByUsuarioFecha(id_usuario, fecha, id_sucursal, id_empresa, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var carga = await cargaModelo.listaVentaCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa);
            var nrocarga = await cargaModelo.listaVentaNroCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa);
            var cargaDetalle = await cargaModelo.listaVentaDetalleCargaByUsuarioFechaSucursal(id_usuario, fecha, id_sucursal, id_empresa);
            
            for (j=0;j<carga.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(carga[j]["id_producto"], "1");
                var sto = parseInt(carga[j]["cantidad"]);
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        carga[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
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
                content: await liquidacion(carga, cargaDetalle, nrocarga),
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

function reporteTicketPreVentaCargaByUsuarioFecha(usuario, venta, id_empresa, fecha_entrega, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var preventa = await ventaModelo.listaPreVentaDetalleByUsuario(usuario, venta, id_empresa, fecha_entrega);

            for (j=0;j<preventa.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(preventa[j]["id_producto"], "1")
            
                var sto = preventa[j]["cantidad"];
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]) ;
                    var stmod = sto % parseInt(medida[i]["unidad"]) ;
                    if(st > 0 && stmod == 0){
                        preventa[j]["cant_medida"] = st;
                        preventa[j]["medida"] = medida[i]["medida"];
                        
                        preventa[j]["precio_medida"] = parseFloat(preventa[j]["precio"]) * parseFloat(medida[i]["unidad"]);
                        preventa[j]["subTotal"] = parseFloat(preventa[j]["precio_medida"]) * parseFloat(preventa[j]["cant_medida"]);

                        preventa[j]["descuento"] = (parseFloat(preventa[j]["precio_medida"]) * (0.01*parseFloat(preventa[j]["porcentaje_descuento"]))) * parseFloat(preventa[j]["cant_medida"]);
                        preventa[j]["precio_descuento_medida"] = parseFloat(preventa[j]["precio_medida"]) - (parseFloat(preventa[j]["precio_medida"]) * (0.01*parseFloat(preventa[j]["porcentaje_descuento"])));
                        preventa[j]["subTotalDescuento"] = parseFloat(preventa[j]["subTotal"]) - parseFloat(preventa[j]["descuento"]);
                        break;
                    }
                }
            }

            var content = await ticketPreVenta(preventa);
            var docDefinition = {
                pageSize: {
                    width: 78 / 0.35277,
                    height: 350 / 0.35277
                },
                pageMargins: [ 10, 10, 10, 10 ],
                content: content
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
    agregarCargaUsuario,
    cargaByPreVenta,
    listaVentaCargaByUsuarioFecha,
    listaDevolucionCargaByUsuarioFecha,
    listaCargaByUsuarioFecha,
    listaCargaProductoAgrupadoByUsuarioFecha,
    listaCargaDetalleByUsuarioFechaSucursalProductoEmpresa,
    listaDetallePreventaClienteByNroCarga,
    listaDetallePreventaClienteByDistribuidorFecha,

    reporteListaCargaByUsuarioFechaSucursal,
    reporteListaCargaProductoAgrupadoByUsuarioFechaSucursal,

    reporteListaVentaCargaByUsuarioFecha,
    reporteListaDevolucionCargaByUsuarioFecha,
    reporteListaCargaByUsuarioFecha,
    reporteTicketPreVentaCargaByUsuarioFecha
}