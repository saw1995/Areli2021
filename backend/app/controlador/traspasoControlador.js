const usuarioModelo = require('../modelo/usuarioModelo');
const sucursalModelo = require('../modelo/sucursalModelo');
const almacenModelo = require('../modelo/almacenModelo');
const traspasoModelo = require('../modelo/traspasoModelo');
const productoModelo = require('../modelo/productoModelo');
const productoStockModelo = require('../modelo/productoStockModelo');

var dateTime = require('node-datetime');
const meses = new Array ("","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

const PdfPrinter = require('pdfmake');
const fonts = require('../libreria/fonts');
const { header } = require('../pdfs/config_reporte');
const { reporteTrapaso } = require('../pdfs/reporte_traspaso');

// ------------> SELECT
function agregarTraspaso(concepto, id_producto, id_almacen_emisor, id_almacen_receptor, cantidad, estado, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(concepto !== undefined &&  id_producto !== undefined && id_almacen_emisor !== undefined && id_almacen_receptor !== undefined && cantidad !== undefined && id_usuario !== undefined && id_empresa !== undefined){
                var dt = dateTime.create();
                const fecha = dt.format('Y-m-d');
                const hora = dt.format('H:M:S');
                var resultado;
                var id_producto_stock_receptor;
                var nro_traspaso = 1;
                const id_generado_traspaso = Date.now();

                var traspaso = await traspasoModelo.ultimoTraspasoyEmpresa(id_empresa);
                if(traspaso.length > 0){
                    nro_traspaso = parseInt(traspaso[0]["nro_traspaso"]) + 1;
                }

                var productoStock = await productoStockModelo.listaProductoStockByProductoEmpresaAlmacen(id_producto, id_almacen_emisor, id_empresa, "1");
                var cant = parseInt(cantidad);

                for(j=0;j<productoStock.length;j++){
                    var id_generado = Date.now();

                    if(parseInt(productoStock[j]["stock"]) >= cant){
                        id_generado = Date.now();
                        var nuevo_stock = parseInt(productoStock[j]["stock"]) - cant;
                        resultado = await productoStockModelo.actualizarStockById(nuevo_stock, productoStock[j]["id"]);
                        resultado = await productoStockModelo.agregarKardexStock(id_generado+"-1", productoStock[j]["id"], "1", "Traspaso Enviado", cant, productoStock[j]["precio_sugerido"], concepto, "", fecha, hora, id_usuario, id_empresa);

                        var productoStockReceptor = await productoStockModelo.listaProductoStockByProductoEmpresaAlmacenCosto(id_producto, id_almacen_receptor, productoStock[j]["costo_adquisicion"], id_empresa, estado);
                        if(productoStockReceptor.length > 0){
                            var stock_actual = parseInt(productoStockReceptor[0]["stock"]) + cant;
                            id_producto_stock_receptor = productoStockReceptor[0]["id"];
                            resultado = await productoStockModelo.actualizarStockById(stock_actual, id_producto_stock_receptor);
                        }else{
                            id_generado = Date.now();
                            id_producto_stock_receptor = id_generado;
                            resultado = await productoStockModelo.agregarProductoStock(id_producto_stock_receptor, id_producto, id_almacen_receptor, cantidad, productoStock[j]["fecha_vencimiento"], productoStock[j]["costo_adquisicion"], productoStock[j]["precio_sugerido"], productoStock[j]["stock_minimo"], productoStock[j]["cantidad_minima"], id_empresa, estado);
                        }

                        resultado = await productoStockModelo.agregarKardexStock(id_generado+"-0", id_producto_stock_receptor, "0", "Traspaso Recepcionado", cantidad, productoStock[j]["precio_sugerido"], concepto, "", fecha, hora, id_usuario, id_empresa);
                        resultado = await traspasoModelo.agregarTraspaso(id_generado_traspaso, nro_traspaso, concepto, productoStock[j]["id"], id_producto_stock_receptor, cantidad, estado, fecha, hora, id_usuario, id_empresa);
                        break;
                    }else{
                        var stock_nuevo = parseInt(cant);
                        id_generado = Date.now();

                        resultado = await productoStockModelo.actualizarStockById(0, productoStock[j]["id"]);
                        cant = cant - parseInt(productoStock[j]["stock"]);
                        
                        if(cant >= 0){
                            stock_nuevo = parseInt(productoStock[j]["stock"]);
                        }
                        
                        resultado = await productoStockModelo.agregarKardexStock(id_generado+"-1", productoStock[j]["id"], "1", "Traspaso Enviado", stock_nuevo, productoStock[j]["precio_sugerido"], concepto, "", fecha, hora, id_usuario, id_empresa);

                        var productoStockReceptor = await productoStockModelo.listaProductoStockByProductoEmpresaAlmacenCosto(id_producto, id_almacen_receptor, productoStock[j]["costo_adquisicion"], id_empresa, estado);
                        if(productoStockReceptor.length > 0){
                            var stock_actual = parseInt(productoStockReceptor[0]["stock"]) + parseInt(stock_nuevo);
                            id_producto_stock_receptor = productoStockReceptor[0]["id"];
                            resultado = await productoStockModelo.actualizarStockById(stock_actual, id_producto_stock_receptor);
                        }else{
                            id_generado = Date.now();
                            id_producto_stock_receptor = id_generado;
                            resultado = await productoStockModelo.agregarProductoStock(id_producto_stock_receptor, id_producto, id_almacen_receptor, stock_nuevo, productoStock[j]["fecha_vencimiento"], productoStock[j]["costo_adquisicion"], productoStock[j]["precio_sugerido"], productoStock[j]["stock_minimo"], productoStock[j]["cantidad_minima"], id_empresa, estado);
                        }
                        resultado = await productoStockModelo.agregarKardexStock(id_generado+"-0", id_producto_stock_receptor, "0", "Traspaso Recepcionado", stock_nuevo, productoStock[j]["precio_sugerido"], concepto, "", fecha, hora, id_usuario, id_empresa);
                        resultado = await traspasoModelo.agregarTraspaso(id_generado_traspaso, nro_traspaso, concepto, productoStock[j]["id"], id_producto_stock_receptor, stock_nuevo, estado, fecha, hora, id_usuario, id_empresa);
                    }
                }
                
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error);
            return resolved({"mysql":error});
        }
    })
}

function listaTraspasoByFechaAlmacenesEstado(fecha_inicio, fecha_final, id_sucursal_receptor, id_almacen_receptor, id_sucursal_emisor, id_almacen_emisor, id_usuario, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(fecha_inicio !== undefined && fecha_final !== undefined && id_almacen_receptor !== undefined && id_sucursal_emisor !== undefined && id_almacen_emisor !== undefined){
                
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

                if(id_sucursal_receptor == "0"){
                    var almacen = await almacenModelo.listaAlmacenByEmpresa(id_empresa);
                    id_almacen_receptor = "";
                    for(i=0;i<almacen.length;i++){
                        id_almacen_receptor = id_almacen_receptor + "'" + almacen[i]["id"] + "'";
                        if(i+1 != almacen.length){
                            id_almacen_receptor = id_almacen_receptor + ",";
                        }
                    }
                }else{
                    if(id_almacen_receptor == "0"){
                        var almacen = await almacenModelo.listaAlmacenBySucursalEmpresa(id_empresa, id_sucursal_receptor);
                        id_almacen_receptor = "";
                        for(i=0;i<almacen.length;i++){
                            id_almacen_receptor = id_almacen_receptor + "'" + almacen[i]["id"] + "'";
                            if(i+1 != almacen.length){
                                id_almacen_receptor = id_almacen_receptor + ",";
                            }
                        }
                    }else{
                        id_almacen_receptor = "'" + id_almacen_receptor + "'";
                    }
                }

                if(id_sucursal_emisor == "0"){
                    var almacen = await almacenModelo.listaAlmacenByEmpresa(id_empresa);
                        id_almacen_emisor = "";
                        for(i=0;i<almacen.length;i++){
                            id_almacen_emisor = id_almacen_emisor + "'" + almacen[i]["id"] + "'";
                            if(i+1 != almacen.length){
                                id_almacen_emisor = id_almacen_emisor + ",";
                            }
                        }
                }else{
                    if(id_almacen_emisor == "0"){
                        var almacen = await almacenModelo.listaAlmacenBySucursalEmpresa(id_empresa, id_sucursal_emisor);
                        id_almacen_emisor = "";
                        for(i=0;i<almacen.length;i++){
                            id_almacen_emisor = id_almacen_emisor + "'" + almacen[i]["id"] + "'";
                            if(i+1 != almacen.length){
                                id_almacen_emisor = id_almacen_emisor + ",";
                            }
                        }
                    }else{
                        id_almacen_emisor = "'" + id_almacen_emisor + "'";
                    }
                }

                var traspaso = await traspasoModelo.listaTraspasoByFechaAlmacenesEstado(fecha_inicio, fecha_final, id_almacen_receptor, id_almacen_emisor, id_usuario, estado, id_empresa);
                
                for (j=0;j<traspaso.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(traspaso[j]["id_producto"], "1");
    
                    var sto = parseInt(traspaso[j]["cantidad"]);
                    var precio_total = (parseFloat(traspaso[j]["cantidad"]) * parseFloat(traspaso[j]["precio_sugerido"]))
                    traspaso[j]["precio_total"] = precio_total;
                    var cantidad = "";
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]);
                        st = Math.trunc(st);
                        var stmod = sto % parseInt(medida[i]["unidad"]);
    
                        if(st > 0){
                            cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                        }
    
                        if(stmod == 0){
                            traspaso[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
                            break;
                        }else {
                            sto = stmod;
                        }
                    }
                }

                if(traspaso.length == 0){
                    traspaso = [];
                }
                respuesta = {"datos":traspaso}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function reporteListaTraspasoByFechaAlmacenesEstado(fecha_inicio, fecha_final, id_sucursal_receptor, id_almacen_receptor, id_sucursal_emisor, id_almacen_emisor, id_usuario, estado, id_empresa, entrada_salida, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var usuario_reporte = "Todo los usuario";

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

            if(id_sucursal_receptor == "0"){
                var almacen = await almacenModelo.listaAlmacenByEmpresa(id_empresa);
                id_almacen_receptor = "";
                for(i=0;i<almacen.length;i++){
                    id_almacen_receptor = id_almacen_receptor + "'" + almacen[i]["id"] + "'";
                    if(i+1 != almacen.length){
                        id_almacen_receptor = id_almacen_receptor + ",";
                    }
                }
            }else{
                if(id_almacen_receptor == "0"){
                    var almacen = await almacenModelo.listaAlmacenBySucursalEmpresa(id_empresa, id_sucursal_receptor);
                    id_almacen_receptor = "";
                    for(i=0;i<almacen.length;i++){
                        id_almacen_receptor = id_almacen_receptor + "'" + almacen[i]["id"] + "'";
                        if(i+1 != almacen.length){
                            id_almacen_receptor = id_almacen_receptor + ",";
                        }
                    }
                }else{
                    id_almacen_receptor = "'" + id_almacen_receptor + "'";
                }
            }

            if(id_sucursal_emisor == "0"){
                var almacen = await almacenModelo.listaAlmacenByEmpresa(id_empresa);
                    id_almacen_emisor = "";
                    for(i=0;i<almacen.length;i++){
                        id_almacen_emisor = id_almacen_emisor + "'" + almacen[i]["id"] + "'";
                        if(i+1 != almacen.length){
                            id_almacen_emisor = id_almacen_emisor + ",";
                        }
                    }
            }else{
                if(id_almacen_emisor == "0"){
                    var almacen = await almacenModelo.listaAlmacenBySucursalEmpresa(id_empresa, id_sucursal_emisor);
                    id_almacen_emisor = "";
                    for(i=0;i<almacen.length;i++){
                        id_almacen_emisor = id_almacen_emisor + "'" + almacen[i]["id"] + "'";
                        if(i+1 != almacen.length){
                            id_almacen_emisor = id_almacen_emisor + ",";
                        }
                    }
                }else{
                    id_almacen_emisor = "'" + id_almacen_emisor + "'";
                }
            }

            var arrayFecInicio = fecha_inicio.split("-");
            var arrayFecFin = fecha_final.split("-");
            var fecha = arrayFecInicio[2]+" de "+ meses[arrayFecInicio[1]] + " del " + arrayFecInicio[0] + " al " + arrayFecFin[2]+" de "+ meses[arrayFecFin[1]] + " del " + arrayFecFin[0] ;
            if(arrayFecInicio[0] == arrayFecFin[0]){
                if(arrayFecInicio[1] == arrayFecFin[1]){
                    if(arrayFecInicio[2] == "01"){
                        if(arrayFecFin[2] == "31"){
                            fecha = "Mes de " + meses[arrayFecInicio[1]] + " del " + arrayFecInicio[0];
                        }
                    }
                } 
            }

            var traspaso = await traspasoModelo.listaTraspasoByFechaAlmacenesEstado(fecha_inicio, fecha_final, id_almacen_receptor, id_almacen_emisor, id_usuario, estado, id_empresa);
            
            for (j=0;j<traspaso.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(traspaso[j]["id_producto"], "1");

                var sto = parseInt(traspaso[j]["cantidad"]);
                var precio_total = (parseFloat(traspaso[j]["cantidad"]) * parseFloat(traspaso[j]["precio_sugerido"]))
                traspaso[j]["precio_total"] = precio_total;
                var cantidad = "";
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]);
                    st = Math.trunc(st);
                    var stmod = sto % parseInt(medida[i]["unidad"]);

                    if(st > 0){
                        cantidad = cantidad + st + " " + medida[i]["medida"] + " y ";
                    }

                    if(stmod == 0){
                        traspaso[j]["cant_medida"] = cantidad.substring(0, cantidad.length - 2);
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
                    stack: await header(traspaso[0]["id_sucursal_rec"], id_empresa, id_usuario_impresion),
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
                content: await reporteTrapaso(fecha, usuario_reporte, entrada_salida, traspaso),
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
    agregarTraspaso,
    listaTraspasoByFechaAlmacenesEstado,
    reporteListaTraspasoByFechaAlmacenesEstado
}